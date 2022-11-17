const uuidInput = document.getElementById('uuidInput')
const formProduct = document.getElementById('formProduct')

const url_string = window.location.href;
const url = new URL(url_string);
const uuid = url.searchParams.get("uuid").split('/')[0];
if(uuid && uuid.length !== 0) uuidInput.value = uuid

formProduct.addEventListener('submit', async (e) => {
    e.preventDefault()
    const inputs = document.forms["formProduct"].getElementsByTagName("input");
    let reqBody = {}
    for (let i = 0; i < inputs.length; i++) {
        const input = inputs[i];
        if(input.value !== "" && input.name !== uuid){
            reqBody[input.name] = input.value
        }
    }
    const rawRes = await fetch('/api/productos/' + uuidInput.value, {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            ...reqBody
          })
    })
    const res = await rawRes.json()
    if(res.success){
        Toastify({
            text: `Producto ${res.data.uuid} actualizado`,
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