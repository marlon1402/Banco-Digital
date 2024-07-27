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

    fetch("http://localhost:8080/cadastrar", {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        method: "POST",
        body: JSON.stringify({
            nome: Inome.value,
            idade: Iidade.value,
            telefone: Itelefone.value,
            sexo: document.querySelector("input[name='sexo']:checked").value,
            cpf: Icpf.value,
            senha: Isenha.value,
        })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok.');
        }
        return response.json(); // Assumindo que a resposta é JSON
    })
    .then(function (data) {
        window.location.href = 'homePage.html';
    })
    .catch(function (error) {
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