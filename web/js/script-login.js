const formulario = document.querySelector("form");
const Icpf = document.querySelector(".cpf");
const Isenha = document.querySelector(".senha");

formulario.addEventListener('submit', function (event) {
    event.preventDefault();
    enviarDados();
    limparCampos();
});

function enviarDados() {
    fetch("http://localhost:8080/login/" + Icpf.value + "/" + Isenha.value, {
        method: "GET",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Erro ao fazer login.');
        }
        return response.json();
    })
    .then(data => {
        console.log('Sucesso:', data);
        if (data.success) {
            window.history.replaceState(null, null, window.location.href);

            window.location.href = 'homePage.html'; // Redireciona para outra página se o login for bem-sucedido
        } else {
            alert('Login falhou. CPF ou senha incorretos.');
        }
    })
    .catch(error => {
        console.error('Erro:', error);
        showToast('Ocorreu um erro ao fazer login. Tente novamente.');
    });
}

function showToast(message) {
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    document.body.appendChild(toast);
    setTimeout(() => {
        toast.className = 'toast show';
    }, 100);

    setTimeout(() => {
        toast.className = 'toast';
        setTimeout(() => document.body.removeChild(toast), 500);
    }, 3000);
}

function limparCampos() {
    Icpf.value = "";
    Isenha.value = "";
}
