import socketio
import eventlet

sio = socketio.Server(cors_allowed_origins="*")
app = socketio.WSGIApp(sio)

@sio.event
def connect(sid, environ):
    print('Client connected:', sid)

@sio.event
def disconnect(sid):
    print('Client disconnected:', sid)

@sio.event
def send_command(sid, command):
    print(f"Received command: {command}")
    sio.emit('command', command)

if __name__ == '__main__':
    eventlet.wsgi.server(eventlet.listen(('', 5005)), app)
