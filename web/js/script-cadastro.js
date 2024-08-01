const formulario = document.querySelector("form");

// Adicione um listener para o evento de submissão do formulário
formulario.addEventListener('submit', function(event) {
    event.preventDefault();
    enviarDados();
    limparCampos();
});

function enviarDados() {
    // Capture os valores dos campos dentro da função para garantir que você esteja pegando os valores mais recentes
    const Inome = document.querySelector(".nome").value;
    const Iidade = document.querySelector(".idade").value;
    const Itelefone = document.querySelector(".tel").value;
    const Isexo = document.querySelector("input[name='sexo']:checked")?.value; // Adicione o operador de encadeamento opcional
    const Icpf = document.querySelector(".cpf").value;
    const Isenha = document.querySelector(".senha").value;

    fetch("http://localhost:8080/controller/cadastro", {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        method: "POST",
        body: JSON.stringify({
            nome: Inome,
            idade: Iidade,
            telefone: Itelefone,
            sexo: Isexo,
            cpf: Icpf,
            senha: Isenha
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
        console.log('Success:', data);
        window.location.href = 'homePage.html'; // Redireciona após sucesso
    })
    .catch(error => {
        console.error('There has been a problem with your fetch operation:', error);
    });
}

function limparCampos() {
    formulario.reset();  
}
