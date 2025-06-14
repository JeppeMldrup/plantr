package com.gardentally.API.Services;

import java.time.LocalDate;

import org.springframework.stereotype.Service;

import com.gardentally.API.Entities.Garden;
import com.gardentally.API.Entities.Veg;
import com.gardentally.API.Repositories.VegRepository;

@Service
public class VegetableService {
    private final VegRepository vegRepository;

    public VegetableService(VegRepository vegRepository){
        this.vegRepository = vegRepository;
    }

    public Veg createNewVegForGarden(String name, String plantingDate, Garden garden){
        var veg = new Veg();
        veg.setGarden(garden);
        veg.setName(name);
        veg.setStatus("alive");
        if (plantingDate == null || plantingDate.isEmpty()){
            veg.setPlantingDate(LocalDate.now());
        }
        else{
            veg.setPlantingDate(LocalDate.parse(plantingDate));
        }
        return vegRepository.save(veg);
    }
}