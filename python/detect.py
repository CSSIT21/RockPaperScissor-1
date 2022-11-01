import torch

model = torch.hub.load('ultralytics/yolov5', 'custom',
                       path='/Volumes/Data/Forks/RockPaperScissor-1/python/best.pt')
predictions = model("/tmp/images3432.jpeg")

print(predictions)
