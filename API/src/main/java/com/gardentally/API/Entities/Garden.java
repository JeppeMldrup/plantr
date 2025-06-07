package com.gardentally.API.Entities;

import java.util.List;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

@Entity
@Table(name = "Garden")
public class Garden{
    @Id
    @Column(name = "garden_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name")
    private String name;

    @OneToMany
    private List<Veg> vegetables;

    @OneToMany
    private List<Users> users;

    public List<Users> getUsers(){
        return users;
    }

    public void setUsers(List<Users> users){
        this.users = users;
    }

    public List<Veg> getVegetables(){
        return vegetables;
    }

    public void setVegetables(List<Veg> vegetables){
        this.vegetables = vegetables;
    }

    public Long getId(){
        return id;
    }

    public void setId(Long id){
        this.id = id;
    }

    public String getName(){
        return name;
    }

    public void setName(String name){
        this.name = name;
    }
}