const socket = io();
let user;
let chatBox = document.getElementById('chatBox');

Swal.fire({
    title:"Identificate",
    input:"text",
    text:"Ingresar usuario",
    inputValidator: (value) =>{
        return !value && "Ingresa un nombre de usuario"
    },
    allowOutsideClick: false
}).then(result =>{
    user= result.value;

    socket.emit('authenticate')
        socket.on('messageLogs', data => {
            let log = document.getElementById("messageLogs");
            let messages = "";
            data.forEach( message => {
                messages = messages+`${message.user} : ${message.message}</br>` 
                
            });
            log.innerHTML = messages;
        });
    socket.on('userConnected', data =>{
        swal.fire({
            text:"Nuevo usuario conectado",
            toast: true,
            position:"top-right"
        });
    })
})

chatBox.addEventListener('keyup', evt => {
    if(evt.key === "Enter"){
        if(chatBox.value.trim().length>0){
            socket.emit("message",{user: user, message:chatBox.value});
            chatBox.value="";
        }
    }
})

socket.on('messageLogs', data => {
    let log = document.getElementById("messageLogs");
    let messages = "";
    data.forEach( message => {
        messages = messages+`${message.user} : ${message.message}</br>` 
        
    });
    log.innerHTML = messages;
})