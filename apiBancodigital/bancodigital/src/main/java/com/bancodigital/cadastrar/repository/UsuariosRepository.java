package com.bancodigital.cadastrar.repository;

import com.bancodigital.cadastrar.model.Usuarios;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UsuariosRepository extends JpaRepository<Usuarios, Integer> {
}
