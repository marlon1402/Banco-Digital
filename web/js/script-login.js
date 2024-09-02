// script-login.js

document.addEventListener('DOMContentLoaded', () => {
    const formulario = document.querySelector("form");
    const Icpf = document.querySelector("#cpf"); // Use o ID em vez da classe
    const Isenha = document.querySelector(".senha");
    const togglePassword = document.getElementById('togglePassword');
    const eyeIcon = document.getElementById('eyeIcon');
    
    // Seleção dos elementos do modal
    const modal = document.getElementById('passwordResetModal');
    const openModalLink = document.getElementById('forgotPasswordLink');
    const closeModal = document.getElementById('closeModal');
    const resetForm = document.getElementById('resetForm');
    const IcpfModal = document.querySelector("#resetCpf"); // ID do CPF no modal

    // Função para formatar o CPF
    function formatCPF(cpf) {
        cpf = cpf.replace(/\D/g, ''); // Remove todos os caracteres não numéricos
        if (cpf.length <= 11) {
            return cpf.replace(/(\d{3})(\d{3})?(\d{3})?(\d{2})?/, function(_, a, b, c, d) {
                return [a, b, c].filter(Boolean).join('.') + (d ? '-' + d : '');
            });
        }
        return cpf;
    }

    // Função para formatar e definir o valor do CPF, mantendo a posição do cursor
    function formatCPFInput(event) {
        const input = event.target;
        const cursorPos = input.selectionStart;
        const formattedValue = formatCPF(input.value);
        input.value = formattedValue;

        // Ajusta a posição do cursor
        const newCursorPos = cursorPos + (formattedValue.length - input.value.length);
        input.selectionStart = input.selectionEnd = newCursorPos;
    }

    // Evento para formatar o CPF enquanto o usuário digita
    if (Icpf) {
        Icpf.addEventListener('input', formatCPFInput);
    }

    // Evento para formatar o CPF no modal enquanto o usuário digita
    if (IcpfModal) {
        IcpfModal.addEventListener('input', formatCPFInput);
    }

    // Evento de submissão do formulário
    if (formulario) {
        formulario.addEventListener('submit', function (event) {
            event.preventDefault();
            enviarDados();
            limparCampos();
        });
    }

    // Evento para alternar visibilidade da senha
    if (togglePassword) {
        togglePassword.addEventListener('click', function () {
            // Alterna o tipo de campo entre 'password' e 'text'
            const type = Isenha.getAttribute('type') === 'password' ? 'text' : 'password';
            Isenha.setAttribute('type', type);

            // Alterna o ícone
            if (eyeIcon) {
                eyeIcon.classList.toggle('fa-eye'); // Olho aberto
                eyeIcon.classList.toggle('fa-eye-slash'); // Olho fechado
            }
        });
    }

    // Evento para abrir o modal
    if (openModalLink) {
        openModalLink.addEventListener('click', function (event) {
            event.preventDefault();
            if (modal) {
                modal.style.display = 'block';
            }
        });
    }

    // Evento para fechar o modal ao clicar no 'x'
    if (closeModal) {
        closeModal.addEventListener('click', function () {
            if (modal) {
                modal.style.display = 'none';
            }
        });
    }

    // Evento para fechar o modal ao clicar fora dele
    window.addEventListener('click', function (event) {
        if (modal && event.target === modal) {
            modal.style.display = 'none';
        }
    });

    // Função para enviar dados do formulário
    function enviarDados() {
        fetch("http://localhost:8080/controller/login/" + Icpf.value + "/" + Isenha.value, {
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

    // Função para exibir mensagem toast
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

    // Função para limpar campos do formulário
    function limparCampos() {
        if (Icpf) Icpf.value = "";
        if (Isenha) Isenha.value = "";
        if (IcpfModal) IcpfModal.value = ""; // Limpa o campo CPF na modal
    }
});
