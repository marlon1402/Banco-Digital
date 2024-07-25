package com.bancodigital.login.controller;

import com.bancodigital.login.model.Usuario;
import com.bancodigital.login.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("*")
@RequestMapping("/login")
public class UsuarioController {

    @Autowired
    UsuarioRepository user;

    @GetMapping("{cpf}/{senha}")
    public ResponseEntity<?> compara(@PathVariable("cpf") String cpf, @PathVariable("senha") String senha){
        List<Usuario> usuarios = user.findByCpfSenha(cpf,senha);

        if (!usuarios.isEmpty()){
            return ResponseEntity.ok("{\"success\": true}");
        }
        else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("{\"success\": false}");
        }
    }

}
