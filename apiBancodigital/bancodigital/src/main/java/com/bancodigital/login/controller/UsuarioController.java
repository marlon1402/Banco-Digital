package com.bancodigital.login.controller;

import com.bancodigital.login.model.Usuario;
import com.bancodigital.login.repository.UsuarioRepository;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/login")
public class UsuarioController {

    UsuarioRepository user;

    @GetMapping("/compara/cpf/senha")
    public List<Usuario> buscaCpfSenha(@PathVariable("cpf") String cpf, @PathVariable("senha") String senha){
        return user.findByCpfSenha(cpf,senha);
    }
}
