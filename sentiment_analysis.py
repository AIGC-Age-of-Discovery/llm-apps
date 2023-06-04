import numpy as np
from langchain.llms import OpenAI
from langchain import PromptTemplate
from openai.embeddings_utils import get_embedding, cosine_similarity

openai_api_key = "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"
llm = OpenAI(model_name="text-davinci-003", openai_api_key=openai_api_key)

template = """
请分析下一句话的情感，并从以下短语中选择一个作为回答，可选择的短语有："开心"，"悲伤"，"平静"。

'''{input_text}'''
"""
labels = ["开心", "悲伤", "平静"]

# 计算标签的embedding 
labels_embedding = {}
for label in labels:
    labels_embedding[label] = get_embedding(label)


if __name__ == "__main__":

    print("请输入句子进行情感分析，输入stop结束测试...")
    while True:
        input_text = input("Input:") 

        if input_text == "stop":
            print("退出测试！")
            break
        
        # 创建prompt
        prompt = PromptTemplate(
            input_variables=["input_text"],
            template=template,
        )

        final_prompt = prompt.format(input_text=input_text)

        # 获取LLM回复
        ans = llm(final_prompt).strip()
        if ans == "":   # LLM有时返回为空字符串，将输入作为回复
            ans = input_text
            
        # 计算回复与标签之间的相似性
        ans_embedding = get_embedding(ans)
        sims = np.array([cosine_similarity(ans_embedding, labels_embedding[key]) for key in labels_embedding.keys()])
        index = np.argmax(sims)
        print("Output:", labels[index])