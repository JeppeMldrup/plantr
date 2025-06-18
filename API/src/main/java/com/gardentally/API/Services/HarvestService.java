package com.gardentally.API.Services;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.gardentally.API.Entities.Harvest;
import com.gardentally.API.Repositories.HarvestRepository;
import com.gardentally.API.Repositories.VegRepository;

@Service
public class HarvestService {
    private final HarvestRepository harvestRepository;
    private final VegRepository vegRepository;

    public HarvestService(HarvestRepository harvestRepository, VegRepository vegRepository){
        this.harvestRepository = harvestRepository;
        this.vegRepository = vegRepository;
    }

    public Optional<Harvest> createHarvestForVegetable(Long veg_id, LocalDate harvest_date, BigDecimal weight, Long amount){
        var harvest = new Harvest();
        var veg = vegRepository.findById(veg_id);
        if (veg.isEmpty()){
            return Optional.empty();
        }
        harvest.setAmount(amount);
        harvest.setDateOfHarvest(harvest_date);
        harvest.setWeight(weight);
        harvest.setVeg(veg.get());
        return Optional.of(harvestRepository.save(harvest));
    }
}
