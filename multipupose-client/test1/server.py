import socket
import logging
import threading
import time


def thread(c):
    print("connection is established")
    while True:
        try:
            msg = c.recv(1024)
            print(c)
            print(msg.decode())
            f = int(msg.decode())
            t = str(f * f)
            time.sleep(2)
            c.send(t.encode())
        except:
            c.close()
            break


s = socket.socket()
port = 8000
s.bind(("", port))
print("server started")
format = "%(asctime)s: %(message)s"
while True:
    logging.basicConfig(format=format, level=logging.INFO, datefmt="%H:%M:%S")
    s.listen(6)
    c, addr = s.accept()
    x = threading.Thread(target=thread, args=(c,))
    x.start()
    print("connection is established")
