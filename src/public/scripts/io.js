const socket = io()
const rowContainer = document.getElementById('rowContainer')
const chat = document.getElementById('chat')
const messageContainer = document.getElementById('chatMessages')

socket.on('GET_PRODUCTS', (p) => {
    console.log(p)
    rowContainer.innerHTML += `
    <td>${p.name}</td>
    <td>${p.image}</td>
    `
})

socket.on('NEW_MESSAGE_FROM_SERVER', (message) => {
    const {email, text, date} = message
    messageContainer.innerHTML += `<li>${date}<br>${email}: ${text}`
})

chat.addEventListener('submit', (e) => {
    e.preventDefault()
    const {email, text} = e.target
    socket.emit('NEW_MESSAGE_TO_SERVER', {email: email.value, text: text.value})
})
