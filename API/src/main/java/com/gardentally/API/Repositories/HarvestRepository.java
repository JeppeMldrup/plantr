package com.gardentally.API.Repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.gardentally.API.Entities.Harvest;

public interface HarvestRepository extends JpaRepository<Harvest, Long>{
}
