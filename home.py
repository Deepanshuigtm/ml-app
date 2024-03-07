from transformers import pipeline

text = 'Deepanshu'
oracle = pipeline(model="deepset/roberta-base-squad2")
ans = oracle(question="what is my name?", context="My name is {text}")
print(f"My name is {text}")
print(ans)