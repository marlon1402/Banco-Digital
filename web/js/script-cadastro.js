// script-cadastro.js

document.addEventListener('DOMContentLoaded', () => {
    const cpfInput = document.getElementById('cpf');

    cpfInput.addEventListener('input', function (event) {
        const input = event.target.value.replace(/\D/g, ''); // Remove todos os caracteres não numéricos
        let formattedCpf = '';

        // Aplica a formatação do CPF
        if (input.length <= 3) {
            formattedCpf = input;
        } else if (input.length <= 6) {
            formattedCpf = `${input.slice(0, 3)}.${input.slice(3)}`;
        } else if (input.length <= 9) {
            formattedCpf = `${input.slice(0, 3)}.${input.slice(3, 6)}.${input.slice(6)}`;
        } else {
            formattedCpf = `${input.slice(0, 3)}.${input.slice(3, 6)}.${input.slice(6, 9)}-${input.slice(9, 11)}`;
        }

        event.target.value = formattedCpf;
    });

    const formulario = document.querySelector("form");
    const togglePassword = document.getElementById('togglePassword');
    const eyeIcon = document.getElementById('eyeIcon');
    const Isenha = document.querySelector(".senha");

    formulario.addEventListener('submit', function (event) {
        event.preventDefault();
        enviarDados();
        limparCampos();
    });

    togglePassword.addEventListener('click', function () {
        // Alterna o tipo de campo entre 'password' e 'text'
        const type = Isenha.getAttribute('type') === 'password' ? 'text' : 'password';
        Isenha.setAttribute('type', type);

        // Alterna o ícone entre 'fa-eye-slash' e 'fa-eye'
        if (type === 'password') {
            eyeIcon.classList.remove('fa-eye');
            eyeIcon.classList.add('fa-eye-slash');
        } else {
            eyeIcon.classList.remove('fa-eye-slash');
            eyeIcon.classList.add('fa-eye');
        }
    });

    function enviarDados() {
        // Capture os valores dos campos dentro da função para garantir que você esteja pegando os valores mais recentes
        const Inome = document.querySelector(".nome").value;
        const Iidade = document.querySelector(".idade").value;
        const Itelefone = document.querySelector(".tel").value;
        const Isexo = document.querySelector("input[name='sexo']:checked")?.value;
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
});
