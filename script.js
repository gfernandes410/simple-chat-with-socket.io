const socket = io('http://localhost:8900')
const massageForm = document.getElementById("send-container")
const massageInput = document.getElementById("massage-input")
const massageContainer = document.getElementById("message-container")

const name = prompt('What is your name?')
appendMassage('You joined')
socket.emit('new-user',name)

socket.on('chat-massage', data => {
    appendMassage(`${data.name}: ${data.massage}`)
})

socket.on('user-connected', name => {
    appendMassage(`${name} connected`)
})

socket.on('user-disconnected', name => {
    appendMassage(`${name} disconnected`)
})

massageForm.addEventListener('submit', e => {
    e.preventDefault()
    const massage = massageInput.value
    appendMassage(`You: ${massage}`)
    socket.emit('send-chat-massage',massage)
    massageInput.value = ''
})

function appendMassage(massage) {
    const massageElement = document.createElement('div')
    massageElement.innerText = massage
    massageContainer.append(massageElement)
}