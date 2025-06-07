package com.gardentally.API.Entities;

import java.time.LocalDate;
import java.util.List;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

@Entity
@Table(name = "Veg")
public class Veg{
    @Id
    @Column(name = "veg_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name")
    private String name;

    @Column(name = "status")
    private String status;

    @Column(name = "planting_date")
    private LocalDate plantingDate;

    @ManyToOne
    @JoinColumn(name = "garden_id")
    private Garden garden;

    @OneToMany
    private List<Harvest> harvests;

    public List<Harvest> getHarvests(){
        return harvests;
    }

    public void setHarvests(List<Harvest> harvests){
        this.harvests = harvests;
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

    public String getStatus(){
        return status;
    }

    public void setStatus(String status){
        this.status = status;
    }

    public LocalDate getPlantingDate(){
        return plantingDate;
    }

    public void setPlantingDate(LocalDate plantingDate){
        this.plantingDate = plantingDate;
    }

    public Garden getGarden(){
        return garden;
    }

    public void setGarden(Garden garden){
        this.garden = garden;
    }
}