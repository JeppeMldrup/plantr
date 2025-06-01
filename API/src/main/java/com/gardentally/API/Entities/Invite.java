package com.gardentally.API.Entities;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "Invite")
public class Invite{
    @Id
    @Column(name = "invite_code")
    private String id;

    @ManyToOne
    @JoinColumn(name = "garden_id")
    private Garden garden;

    public String getId(){
        return id;
    }

    public void setId(String id){
        this.id = id;
    }

    public Garden getGarden(){
        return garden;
    }

    public void setGarden(Garden garden){
        this.garden = garden;
    }
}