document.getElementById('inputRegisterPhone').addEventListener('input', function (e) {
    let value = e.target.value.replace(/\D/g, ''); 
    if (value.length > 11) {
        value = value.slice(0, 11);
    }
    if (value.length > 10) {
        value = value.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3'); 
    } else {
        value = value.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3'); 
    }
    e.target.value = value; 
});

let btnCadastrar = document.getElementById("btnCadastrar")
btnCadastrar.addEventListener('click', async ()=>{
    if (validateForm()) {
        let dataToSend = {
            name: document.getElementById("inputRegisterName").value,
            email: document.getElementById("inputRegisterEmail").value,
            phoneNumber: document.getElementById("inputRegisterPhone").value,
            password: document.getElementById("inputRegisterPassword").value,
            confirmPassword: document.getElementById("inputRegisterConfirmPassword").value,
        } 
            let response = await fetch(`${window.location.origin}/user`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json', 
                },
                body: JSON.stringify(dataToSend), 
            });
            let responseData = await response.json(); 
            if (responseData.has_error) {
                
                let errorMessages = responseData.error.map(err => err.message).join('\n');
            
               
                return alert(errorMessages);
            }
        
            btnFechar.click()

       
    }else{
        return;
    }
})
btnFechar.addEventListener('click', ()=>{
    
    document.getElementById("inputRegisterName").value = ''
    document.getElementById("inputRegisterEmail").value= ''
    document.getElementById("inputRegisterPhone").value= ''
    document.getElementById("inputRegisterPassword").value=''
    document.getElementById("inputRegisterConfirmPassword").value=''
    
})
function validateForm() {
    let name = document.getElementById("inputRegisterName").value;
    let email = document.getElementById("inputRegisterEmail").value;
    let phoneNumber = document.getElementById("inputRegisterPhone").value;
    let password = document.getElementById("inputRegisterPassword").value;
    let confirmPassword = document.getElementById("inputRegisterConfirmPassword").value;

    if (!name) {
        alert("O campo Nome está vazio.");
        return false;
    }
    if (!phoneNumber) {
        alert("O campo Telefone está vazio.");
        return false;
    }
    if (!email) {
        alert("O campo E-mail está vazio.");
        return false;
    }
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
        alert("Por favor, insira um e-mail válido.");
        return false;
    }
    if (!password) {
        alert("O campo Senha está vazio.");
        return false;
    }
    if (password.length < 8) {
        alert("A senha deve ter pelo menos 8 caracteres.");
        return false;
    }
    if (!confirmPassword) {
        alert("O campo Confirmar Senha está vazio.");
        return false;
    }
    if (password !== confirmPassword) {
        alert("As senhas não correspondem.");
        return false;
    }
    return true;
}
let btnEntrar = document.getElementById("btnEntrar")

btnEntrar.addEventListener('click', async ()=>{
    let inputLoginEmail = document.getElementById("inputLoginEmail").value
    let inputLoginPassword = document.getElementById("inputLoginPassword").value
    if(!inputLoginEmail) return alert("Você precisa informar um e-mail para entrar.")
    if(!inputLoginPassword) return alert("Você precisa informar uma senha para entrar")
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(inputLoginEmail)) return alert("Por favor, insira um e-mail válido.")
    
    let dataToSend = {
        email: inputLoginEmail,
        password: inputLoginPassword
    }
    let response = await fetch(`${window.location.origin}/user/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json', 
        },
        body: JSON.stringify(dataToSend), 
    });
    let responseData = await response.json(); 
    if (responseData.has_error) {
        return alert(responseData.data);
    }
    localStorage.setItem('userData', JSON.stringify(responseData));
    window.location.href = `/inicio?token=${encodeURIComponent(responseData.data.token)}`;
})