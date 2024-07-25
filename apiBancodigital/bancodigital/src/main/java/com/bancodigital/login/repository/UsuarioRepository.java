package com.bancodigital.login.repository;

import com.bancodigital.login.model.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface UsuarioRepository extends JpaRepository<Usuario, Integer> {

    @Query("select u from Usuario u where u.cpf = ?1 and u.senha = ?2")
    List<Usuario> findByCpfSenha(String cpf, String password);

}
