package com.gardentally.API.Services;

import java.time.LocalDate;

import org.springframework.stereotype.Service;

import com.gardentally.API.Entities.Garden;
import com.gardentally.API.Entities.Veg;
import com.gardentally.API.Repositories.VegRepository;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class VegetableService {
    private final VegRepository vegRepository;

    public Veg createNewVegForGarden(String name, LocalDate plantingDate, Garden garden){
        var veg = new Veg();
        veg.setGarden(garden);
        veg.setName(name);
        veg.setStatus("alive");
        veg.setPlantingDate(plantingDate);
        return vegRepository.save(veg);
    }
}