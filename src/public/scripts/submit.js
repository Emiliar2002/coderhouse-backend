const formProduct = document.getElementById('formProduct')
const formLogin = document.getElementById('loginForm')
const logoutButton = document.getElementById('logoutButton')


if(logoutButton){
  logoutButton.addEventListener('click', async () => {
    location.replace(window.location.protocol+'//' + window.location.host+'/logout')
  })
}

if(formLogin){


formLogin.addEventListener('submit', async (e) => {
    e.preventDefault()
    const {user} = e.target
    await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            user: user.value
          })
    })
    location.reload()
  })
}

formProduct.addEventListener('submit', async (e) => {
    e.preventDefault()
    const {name, description, image, price, stock} = e.target
    const rawRes = await fetch('/api/productos', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            name: name.value,
            description: description.value,
            image: image.value,
            price: price.value,
            stock: stock.value
          })
    })
    const res = await rawRes.json()
    console.log(res)
    if(res.success){
        Toastify({
            text: `Producto creado con el código ${res.data.code}`,
            duration: 3000,
            close: true,
            gravity: "bottom",
            position: "right",
            stopOnFocus: true, 
            style: {
              background: "linear-gradient(to right, #00b09b, #96c93d)",
            },
          }).showToast();
          e.target.reset()
    }
    else{
        Toastify({
            text: `Error: ${res.data}`,
            duration: 3000,
            close: true,
            gravity: "bottom",
            position: "right",
            stopOnFocus: true, 
            style: {
              background: "#FF0000",
            },
          }).showToast();
    }

})