import cv2
import socket
import sys
import base64
import json


class Sender:
    def __init__(self, host="localhost", port=800):
        self.address = (host, port)
        self.s = None

    def connecting(self):
        self.s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        self.s.connect(self.address)

    def sendJson(self, jsonData):
        print("执行到了这里", jsonData)
        self.s.send(bytes(jsonData, encoding="utf8"))

    def pose(self, img): # 发送图片
        base64_str = cv2.imencode('.jpg', img)[1].tostring()
        base64_str = base64.b64encode(base64_str)
        self.sendJson(json.dumps({
            "command":"imgshow",
            "img":base64_str
        }))

    def sendcmd(self, cmd):
        self.sendJson(json.dumps({
            "command": cmd
        }))
    
    def senddict(self, cmd, myDict):
        self.sendJson(json.dumps{
            "command":cmd,
            "dict":myDict
        })