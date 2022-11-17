const deleteButtons = document.getElementsByClassName('delete')

for (let i = 0; i < deleteButtons.length; i++) {
    const button = deleteButtons[i];
    button.addEventListener('click', async () => {
        const uuid = button.getAttribute('prodid')
            await fetch('/api/productos/' + uuid, {
            method: 'DELETE',
            headers: {
                'Content-type': 'application/json'
            }
        });
        location.reload()
    })
}

