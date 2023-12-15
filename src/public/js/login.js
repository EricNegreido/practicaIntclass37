const form = document.getElementById('loginForm');

form.addEventListener('submit', async evt => {
    evt.preventDefault();

    const data = {
        email: form[0].value,
        password:form[1].value,
    };
    await fetch('/api/sessions/login', {
        method: 'POST',
        headers : {
            'Accept' : 'application/json',
            'Content-type': 'application/json'
        },
        body: JSON.stringify(data)
    }).then(respuesta => {
        console.log('respond:', respuesta)
        console.log('Request Headers:', respuesta.headers);
        if(respuesta.status === 200){
            window.location.replace('/products');
        }else{
            window.location.replace('/login');
        }
    })
});

 