const formulario = document.querySelector("form");
const Inome = document.querySelector(".nome");
const Iidade = document.querySelector(".idade");
const Itelefone = document.querySelector(".tel");
const Isexo = document.querySelector("input[name='sexo']:checked");
const Icpf = document.querySelector(".cpf");
const Isenha = document.querySelector(".senha");

formulario.addEventListener('submit', function(event){
    event.preventDefault();
    enviarDados();
    limparCampos();
});

function enviarDados(){

    fetch("http://localhost:8080/controller/cadastro", {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        method: "POST",
        body: JSON.stringify({
            nome: Inome.value,          // Certifique-se de que Inome.value está correto
            idade: Iidade.value,        // Certifique-se de que Iidade.value está correto
            telefone: Itelefone.value,  // Certifique-se de que Itelefone.value está correto
            sexo: document.querySelector("input[name='sexo']:checked").value,
            cpf: Icpf.value,            // Certifique-se de que Icpf.value está correto
            senha: Isenha.value         // Certifique-se de que Isenha.value está correto
        })
    })
    .then(response => {
        if (!response.ok) {
            return response.text().then(text => {
                throw new Error('Network response was not ok. Status: ' + response.status + ', Message: ' + text);
            });
        }
        return response.json(); // Assumindo que a resposta é JSON
    })
    .then(data => {
        window.location.href = 'homePage.html'; // Redireciona após sucesso
    })
    .catch(error => {
        console.error('There has been a problem with your fetch operation:', error);
    });
     
    
}

function limparCampos() {
    Inome = "";
    Iidade ="";
    Itelefone ="";
    Isexo = "";
    Icpf.value = "";
    Isenha.value = "";
}