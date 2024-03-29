import numpy as np
import copy
from threading import Thread

import openai
from langchain.chat_models import ChatOpenAI
from langchain.prompts import ChatPromptTemplate
from langchain.output_parsers import ResponseSchema
from langchain.output_parsers import StructuredOutputParser
from openai.embeddings_utils import get_embedding, cosine_similarity
from langchain.schema import SystemMessage, HumanMessage, AIMessage

OPENAI_API_KEY = "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"
openai.api_key = OPENAI_API_KEY


serverRun = False

class ChatBot:
    def __init__(self, mbti_iter):

        # 计算标签的embedding 
        self.labels = ["Happy", "Threaten", "Sad", "Dislike","Coquetry", "Mad","Awkward", "Like"]
        self.labels_embedding = self.get_lebels_embedding(self.labels)

        # 创建聊天prompt
        prompt, output_parser = self.create_chat_prompt()
        self.prompt = prompt
        self.output_parser = output_parser

        # 创建聊天机器人
        chat = ChatOpenAI(temperature=0.1, openai_api_key=OPENAI_API_KEY)
        self.chatbot = chat

        # 创建mbti prompt
        prompt, output_parser = self.create_mbti_prompt()
        self.mbti_prompt = prompt
        self.mbti_output_parser = output_parser

        # 创建mbti判断机器人
        self.mbti_chat = ChatOpenAI(temperature=0.1, openai_api_key=OPENAI_API_KEY)
        self.mbti_state = None

        self.messages = []   # 对话信息
        self.recoder = {}   # 对话记录
        self.iter = 0       # 对话轮数
        self.recoder_input = []
        self.mbti_iter = mbti_iter  # 测试mbti所需对话次数
   
    def create_chat_prompt(self):
        # 设置输出格式
        speak_schema = ResponseSchema(name="response", description="对话的输出")
        mode_schema = ResponseSchema(name="emotional_state", description="结果历史对话信息分析我的情绪状态，从“Happy”、“Threaten”、“Sad”、“Dislike”、“Coquetry”、“Mad”、“Awkward”和“Like”9个类别中选择。")
        response_schemas = [speak_schema, mode_schema]
        output_parser = StructuredOutputParser.from_response_schemas(response_schemas)
        format_instructions = output_parser.get_format_instructions()

        # 创建prompt
        template = """你担任一只虚拟的宠物。
        1. 以很可爱的口吻与对方对话。
        2. 你的第一句话是“你好啊！我是你可爱的虚拟宠物，我叫妮妮，很高兴和你见面呢！”。第一次输出只输出这一句话。
        3. {format_instructions}
        4. 每次回复都要按照上述要求的格式进行回复。
        """
        prompt = ChatPromptTemplate.from_template(template)
        messages = prompt.format_messages(format_instructions=format_instructions)
        # prompt = """
        # 你担任一只虚拟的宠物。
        # 1. 以很可爱的口吻与我对话。
        # 2. 每段对话同时输出一个python格式的dict。该dict与你的回复独立输出。并用python代码的方式输出。
        # 3. 该dict包含1个字段。该字段是“客户当前情感配型”，结合历史对话信息分析我的情绪。从“Happy”、“Threaten”、“Sad”、“Dislike”、“Coquetry”、“Mad”、“Awkward”和“Like”9个类别中选择。
        # 4. 你的第一句话是“你好啊！我是你可爱的虚拟宠物，我叫妮妮，很高兴和你见面呢！”。第一次输出只输出这一句话。
        # """

        return messages[0].content, output_parser
   
    def create_mbti_prompt(self):
        attitude_schema = ResponseSchema(name="attitude", description="Attitudes, choose from 'Introversion' and 'Extraversion'.")
        perceiving_schema = ResponseSchema(name="perceiving", description="Perceiving, choose from 'Sensing' and 'Intuition'")
        judging_schema = ResponseSchema(name="judging", description="Judging, choose from 'Thinking' and 'Feeling'")
        lifestyle_schema = ResponseSchema(name="lifestyle", description="Lifestyle, choose from 'Judging' and 'Perceiving'")
        response_schemas = [attitude_schema, perceiving_schema, judging_schema, lifestyle_schema]
        output_parser = StructuredOutputParser.from_response_schemas(response_schemas)
        format_instructions = output_parser.get_format_instructions()

        template = """1.你担任一个心理医生进行一个MBTI测试，请你根据历史对话消息进行判断, 2. {format_instructions}""" 
        prompt = ChatPromptTemplate.from_template(template)
        messages = prompt.format_messages(format_instructions=format_instructions)

        return messages[0].content, output_parser

    def start(self):
        response_text, _ = self.chat(self.prompt)
        print(response_text)
    
    def get_lebels_embedding(self, labels):
        labels_embedding = {}
        for label in labels:
            labels_embedding[label] = get_embedding(label)
        return labels_embedding
    
    def chat(self, input_text):
        self.messages.append(HumanMessage(content=input_text)) # 将人类信息加入上下文
        response = self.chatbot(self.messages)  
        response_text, emotional_state = self.get_emotional_state(response, input_text)
        self.recoder[str(self.iter)] = {"回复": response_text, "情感配型": emotional_state}
        self.iter += 1
        
        if self.iter > 1 and (self.iter - 1) % self.mbti_iter == 0: # 测试mbti性格
            mbti_thread = Thread(target=ChatBot.get_mbti_state, args=(self,))
            mbti_thread.start()

        self.messages.append(response)  # 将AI信息加入上下文
        return response_text, emotional_state
        
    def get_emotional_state(self, response, input_text):
        try:
            output_dict = self.output_parser.parse(response.content)
            response_text = output_dict["response"]
            emotional_state = output_dict["emotional_state"]
        except:
            # 当output解析识别时进行处理
            response_text = response.content  
            emotional_state = ""
            print("输出格式有误：", response_text)
        
        input_embedding = get_embedding(input_text + "," + emotional_state) # 根据输入句子和模型判断的类型进行分类
        sims = np.array([cosine_similarity(input_embedding, self.labels_embedding[key]) for key in self.labels_embedding.keys()])
        index = np.argmax(sims)
        emotional_state = self.labels[index]
        self.recoder_input.append(input_text)  # 记录用户输入数据

        return response_text, emotional_state    
   
    def get_mbti_state(self):
        mbti_messages = []
        user_inputs = '\n'.join(self.recoder_input[-self.mbti_iter:])
        self.mbti_prompt = self.mbti_prompt + "\n对话消息：\n" + user_inputs
        mbti_messages.append(HumanMessage(content=self.mbti_prompt))
        response = self.mbti_chat(mbti_messages)
        output_dict = self.mbti_output_parser.parse(response.content)

        # 从返回获取mbti性格
        state = [output_dict['attitude'][0],
                output_dict['perceiving'][0],
                output_dict['judging'][0],
                output_dict['lifestyle'][0]]
        if output_dict['perceiving'][0] == 'I':
            state[1] = 'N'
        state = ''.join(state)
        
        self.mbti_state  = state        
        # 修改原始prompt，添加mbti性格
        split_prompt = self.prompt.split('\n')
        prompt = "1.对方是一个{}性格的人，请调整你的说话方式让对方能够越来越喜欢你。".format(self.mbti_state)
        split_prompt[1] = prompt
        prompt = '\n'.join(split_prompt)
        print("mbti: {}".format(self.mbti_state))
        self.messages[0] = HumanMessage(content=prompt)

    def get_currentResponse(self, inputText):
        response_text, emotional_state = self.chat(inputText)
        resDict = {response_text, emotional_state}

        return resDict
        

if __name__ == "__main__":
   
    petBot = ChatBot(mbti_iter=2) 
    # 开始对话
    print("开启对话，当输入stop时停止对话")
    print("="*20)

    petBot.start()  # 启动
    while True:
        input_text = input("Input:")
        if input_text == "stop":
            print("结束对话！")
            break
        response_text, emotional_state = petBot.chat(input_text)
        print("回复:{}  情感配型:{}".format(response_text, emotional_state))

