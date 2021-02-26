# import cv2
# import socket
# import sys
# import base64
# import time

此文件有问题

# class Sender:
#     def __init__(self, host="localhost", port=800):
#         self.address = (host, port)
#         self.s = None

#     def connecting(self):
#         self.s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
#         self.s.connect(self.address)

#     def pose(self, img):
#         base64_str = cv2.imencode('.jpg', img)[1].tostring()
#         base64_str = base64.b64encode(base64_str)
#         self.s.send(base64_str)

# # sender = Sender(port=801)
# # sender.connecting()

# # cap = cv2.VideoCapture("D:/outPut/fdm/asdf.mp4")
# # print("here")
# # while(1):
# #     print("hhhh")
# #     # get a frame
# #     ret, frame = cap.read()
# #     # show a frame
# #     cv2.imshow("capture", frame)
# #     # sender.pose(frame)
# #     if cv2.waitKey(100) & 0xFF == ord('q'):
# #         break