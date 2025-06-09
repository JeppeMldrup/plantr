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
import jakarta.persistence.Table;

@Entity
@Table(name = "App_user")
public class User{
    @Id
    @Column(name = "user_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "oauthid", unique = true)
    private String oauthid;

    @ManyToMany
    @JoinTable(
        name = "user_garden",
        joinColumns = @JoinColumn(name = "user_id"),
        inverseJoinColumns = @JoinColumn(name = "garden_id")
    )
    private Set<Garden> gardens;

    public Long getId(){
        return id;
    }

    public void setId(Long id){
        this.id = id;
    }

    public String getOauthid(){
        return oauthid;
    }

    public void setOauthid(String email){
        this.oauthid = email;
    }

    public Set<Garden> getGardens(){
        return gardens;
    }

    public void setGarden(Set<Garden> gardens){
        this.gardens = gardens;
    }
}