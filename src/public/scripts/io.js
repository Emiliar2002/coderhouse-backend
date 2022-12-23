const socket = io()
const rowContainer = document.getElementById('rowContainer')
const chat = document.getElementById('chat')
const messageContainer = document.getElementById('chatMessages')

// socket.on('GET_PRODUCTS', (p) => {
//     const row = document.createElement('tr')
//     for(property in p){
//         if(property !== 'timestamp' && property !== 'code'){
//             const cell = document.createElement('td')
//             if(property === 'price') cell.innerHTML =`$${p[property]}`
//             else cell.innerHTML = p[property]
//             row.appendChild(cell)
//         }
//     }
//     rowContainer.appendChild(row)

// })

socket.on('NEW_MESSAGE_FROM_SERVER', (message) => {
    const {author, text} = message
    const {email, alias, avatar, age, name, lastname} = author
    messageContainer.innerHTML += `<li><img title="Correo: ${email}, Edad: ${age}, Nombre Completo: ${name} ${lastname}" width=50 height=50 src="${avatar}">${alias}: ${text}`
})

chat.addEventListener('submit', (e) => {
    e.preventDefault()
    const {email, name, lastname, age, alias, avatar, text} = e.target
    socket.emit('NEW_MESSAGE_TO_SERVER', {text: text.value, author: {
        email: email.value,
        name: name.value,
        lastname: lastname.value,
        age: age.value,
        alias: alias.value,
        avatar: avatar.value
    }})
})
