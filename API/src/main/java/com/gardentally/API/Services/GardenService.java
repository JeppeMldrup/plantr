package com.gardentally.API.Services;

import java.util.Optional;

import org.springframework.stereotype.Service;

import com.gardentally.API.Entities.Garden;
import com.gardentally.API.Entities.User;
import com.gardentally.API.Repositories.GardenRepository;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class GardenService {
    private final GardenRepository gardenRepository;

    public Garden createGardenForUser(String name, User userEntity){
        var garden = new Garden();
        garden.setName(name);
        userEntity.getGardens().add(garden);
        return gardenRepository.save(garden);
    }

    public Optional<Garden> getGardenFromId(Long id){
        return gardenRepository.findById(id);
    }
}
