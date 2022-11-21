import torch
import sys

model = torch.hub.load('ultralytics/yolov5', 'custom',
                       path='/Volumes/Data/Repos/RockPaperScissor-1/python/best.pt')
predictions = model(sys.argv[1])

print(predictions)
