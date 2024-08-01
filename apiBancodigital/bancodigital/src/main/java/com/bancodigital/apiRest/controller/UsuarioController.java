package com.bancodigital.apiRest.controller;

import com.bancodigital.apiRest.model.Usuario;
import com.bancodigital.apiRest.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/controller")
public class UsuarioController {

    @Autowired
    UsuarioRepository userRepo;

    @PostMapping("/cadastro")
    public ResponseEntity<Usuario> cadastrar(@RequestBody Usuario usuario){
        Usuario savedUser = (Usuario) userRepo.save(usuario);
        return new ResponseEntity<>(savedUser, HttpStatus.CREATED);
    }

    @GetMapping("/login/{cpf}/{senha}")
    public ResponseEntity<?> compara(@PathVariable("cpf") String cpf, @PathVariable("senha") String senha){
        List<Usuario> usuarios = userRepo.findByCpfSenha(cpf,senha);

        if(!usuarios.isEmpty()){
            return ResponseEntity.ok("{\"success\": true}");
        }
        else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("{\"success\": false}");
        }
    }
}
