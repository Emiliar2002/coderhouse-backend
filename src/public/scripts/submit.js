const formProduct = document.getElementById('formProduct')

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
            text: `Producto creado con el id ${res.data.uuid}`,
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
            text: `Error: ${res.message}`,
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