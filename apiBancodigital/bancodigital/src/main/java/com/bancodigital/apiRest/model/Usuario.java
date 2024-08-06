package com.bancodigital.apiRest.model;

import jakarta.persistence.*;

@Entity
@Table
public class Usuario {

    @Column
    private String nome;
    @Column
    private int idade;
    @Column
    private String telefone;
    @Column
    private String sexo;
    @Column(unique = true)
    private String cpf;
    @Column
    private String senha;
    @Column
    private int dinheiro;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idConta;

    //getters and setters

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public int getIdade() {
        return idade;
    }

    public void setIdade(int idade) {
        this.idade = idade;
    }

    public String getTelefone() {
        return telefone;
    }

    public void setTelefone(String telefone) {
        this.telefone = telefone;
    }

    public String getSexo() {
        return sexo;
    }

    public void setSexo(String sexo) {
        this.sexo = sexo;
    }

    public String getCpf() {
        return cpf;
    }

    public void setCpf(String cpf) {
        this.cpf = cpf;
    }

    public String getSenha() {
        return senha;
    }

    public Usuario(){
        this.dinheiro = 1000;
    }

    public void setSenha(String senha) {
        this.senha = senha;
    }

    public int getDinheiro() {
        return dinheiro;
    }

    public void setDinheiro(int dinheiro) {
        this.dinheiro = dinheiro;
    }

    public Long getIdConta() {
        return idConta;
    }

    public void setIdConta(Long idConta) {
        this.idConta = idConta;
    }
}
