import socket

s = socket.socket()
s.connect(("127.0.0.1", 8000))
print("connecton")

while True:
    a = input("first number")
    msg = a
    if msg == "back":
        s.close()
        break
    s.send(msg.encode())
    ms = s.recv(1024)
    print("Answer:" + ms.decode())
#  msg=input("Bob:")
#  s.send(msg.encode())
