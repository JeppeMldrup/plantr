package com.gardentally.API.Entities;

import java.util.Set;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
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

    @OneToMany(mappedBy = "garden")
    private Set<Veg> vegetables;

    @ManyToMany
    @JoinTable(
        name = "user_garden",
        joinColumns = @JoinColumn(name = "user_id"),
        inverseJoinColumns = @JoinColumn(name = "garden_id")
    )
    private Set<User> users;

    public Set<User> getUsers(){
        return users;
    }

    public void setUsers(Set<User> users){
        this.users = users;
    }

    public Set<Veg> getVegetables(){
        return vegetables;
    }

    public void setVegetables(Set<Veg> vegetables){
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