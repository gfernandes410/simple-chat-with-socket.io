const io = require("socket.io")(8900)

const user = {}

io.on('connection', socket => {
    socket.on('new-user', name => {
        user[socket.id] = name
        socket.broadcast.emit('user-connected', name)
    })
    socket.emit('chat-massage','Hello World')
    socket.on('send-chat-massage', massage => {
        socket.broadcast.emit('chat-massage',{
            massage: massage,
            name: user[socket.id]
        })
    })
    socket.on('disconnect',() => {
        socket.broadcast.emit('user-disconnected', user[socket.id])
        delete user[socket.id]
    })
})