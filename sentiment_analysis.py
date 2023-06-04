from langchain.llms import OpenAI
from langchain import PromptTemplate

openai_api_key = "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"
llm = OpenAI(model_name="text-davinci-003", openai_api_key=openai_api_key)

# Notice "input_text" below, that is a placeholder for another value later
template = """
请分析下一句话的情感，并从以下短语中选择一个作为回答，可选择的短语有："开心"，"悲伤"，"平静"。

'''{input_text}'''
"""

if __name__ == "__main__":

    print("请输入句子进行情感分析，输入stop结束测试...")
    
    while True:
        input_text = input("Input:") 

        if input_text == "stop":
            print("退出测试！")
            break

        prompt = PromptTemplate(
            input_variables=["input_text"],
            template=template,
        )

        final_prompt = prompt.format(input_text=input_text)
        ans = llm(final_prompt)
        print("Output:", ans.strip())