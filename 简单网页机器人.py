# -*- coding: utf-8 -*-
# @Author  : YongbinMiao
# @Time    : 2023-06-07 12:27:54
import gradio as gr
import openai

openai.api_key = "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"


class Conversation:
    def __init__(self, prompt, num_of_round):
        self.prompt = prompt
        self.num_of_round = num_of_round
        self.messages = []
        self.messages.append({"role": "system", "content": self.prompt})

    def ask(self, question):
        try:
            self.messages.append({"role": "user", "content": question})
            response = openai.ChatCompletion.create(
                model="gpt-3.5-turbo",
                messages=self.messages,
                temperature=0.5,
                max_tokens=2048,
                top_p=1,
            )
        except Exception as e:
            print(e)
            return e

        message = response["choices"][0]["message"]["content"]
        self.messages.append({"role": "assistant", "content": message})

        if len(self.messages) > self.num_of_round * 2 + 1:
            del self.messages[1:3]  # Remove the first round conversation left.
        return message


prompt = """
    你担任一只虚拟的宠物。
    1. 以很可爱的口吻与我对话。
    2. 你的第一句话是“你好啊！我是你可爱的虚拟宠物，我叫妮妮，很高兴和你见面呢！”。第一次输出只输出这一句话。
    3. 结果历史对话信息分析我的情绪状态，从“Happy”、“Threaten”、“Sad”、“Dislike”、“Coquetry”、“Mad”、“Awkward”和“Like”9个类别中选择。
    4. 每次回复都要按照上述要求的格式进行回复。
"""

conv = Conversation(prompt, 10)


def answer(question, history=[], cons=conv):
    history.append(question)
    response = cons.ask(question)
    history.append(response)
    responses = [(u, b) for u, b in zip(history[::2], history[1::2])]
    return responses, history


with gr.Blocks(css="#chatbot{height:300px} .overflow-y-auto{height:500px}") as demo:
    chatbot = gr.Chatbot(elem_id="chatbot")
    state = gr.State([])

    with gr.Row():
        txt = gr.Textbox(show_label=False, placeholder="请输入文本，按回车提交").style(container=False)

    txt.submit(answer, [txt, state], [chatbot, state])
    clear = gr.Button("Clear")
    clear.click(lambda: None, None, chatbot, queue=False)

demo.launch(share=True)
