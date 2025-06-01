package com.gardentally.API.Entities;

import java.math.BigDecimal;
import java.time.LocalDate;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "Harvest")
public class Harvest{
    @Id
    @Column(name = "harvest_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "amount")
    private Long amount;

    @Column(name = "weight")
    private BigDecimal weight;

    @Column(name = "date_of_harvest")
    private LocalDate dateOfHarvest;

    @ManyToOne
    @JoinColumn(name = "veg_id")
    private Veg veg;

    public Long getId(){
        return id;
    }

    public void setId(Long id){
        this.id = id;
    }

    public Long getAmount(){
        return amount;
    }

    public void setAmount(Long amount){
        this.amount = amount;
    }

    public BigDecimal getWeight(){
        return weight;
    }

    public void setStatus(BigDecimal weight){
        this.weight = weight;
    }

    public LocalDate getDateOfHarvest(){
        return dateOfHarvest;
    }

    public void setDateOfHarvest(LocalDate plantingDate){
        this.dateOfHarvest = plantingDate;
    }

    public Veg getVeg(){
        return veg;
    }

    public void setVeg(Veg veg){
        this.veg = veg;
    }
}