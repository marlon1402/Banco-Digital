const formulario = document.querySelector("form");
const Icpf = document.querySelector(".cpf");
const Isenha = document.querySelector(".senha");

formulario.addEventListener('submit', function (event) {
    event.preventDefault();
    enviar_dados();
    limpar();
});

function enviar_dados(){
    fetch("https://localhost:8080/login",
        {
            headers: {
                'accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method:"POST",
            body: JSON.stringify({
                cpf: Icpf.value,
                senha: Isenha.value,
            }),
        })
        .then(response => response.json())
        .then(data => {
        console.log('Sucesso:', data);
        // redirecionar o usuario a outra pagina, pois ocorreu tudo certo.
        limpar();
        if (data.success) {
            window.location.href = '/exemplo'; // Redireciona para outra página
        } else {
            alert('Erro no login: ' + data.message);
            limpar();
        }
    })
    .catch((error) => {
        showToast('Ocorreu um erro. Tente novamente.'); // Mostra o toast com uma mensagem de erro genérica
    });
};


// Função para mostrar o toast com a mensagem de erro
function showToast(message) {
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    document.body.appendChild(toast);
    setTimeout(() => {
        toast.className = 'toast show';
    }, 100); // Atraso para iniciar a animação

    setTimeout(() => {
        toast.className = 'toast';
        setTimeout(() => document.body.removeChild(toast), 500); // Remove o toast após a animação de desaparecimento
    }, 3000); // Duração do toast visível
}

function limpar () {
    Icpf.value = "";
    Isenha.value = "";
};