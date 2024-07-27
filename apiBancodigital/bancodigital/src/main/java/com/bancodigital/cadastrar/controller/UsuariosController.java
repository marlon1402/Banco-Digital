package com.bancodigital.cadastrar.controller;

import com.bancodigital.cadastrar.model.Usuarios;
import com.bancodigital.cadastrar.repository.UsuariosRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin("*")
@RequestMapping("/cadastrar")
public class UsuariosController {

    @Autowired
    UsuariosRepository user;

    @PostMapping
    public void criarUsuario (@RequestBody Usuarios users){
        Usuarios usuarioNovo = user.save(users);
    }
}
