const socket = io()
const rowContainer = document.getElementById('rowContainer')
const chat = document.getElementById('chat')
const messageContainer = document.getElementById('chatMessages')

socket.on('GET_PRODUCTS', (p) => {
    const row = document.createElement('tr')
    for(property in p){
        if(property !== 'timestamp' && property !== 'uuid'){
            const cell = document.createElement('td')
            if(property === 'price') cell.innerHTML =`$${p[property]}`
            else cell.innerHTML = p[property]
            row.appendChild(cell)
        }
    }
    rowContainer.appendChild(row)

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
