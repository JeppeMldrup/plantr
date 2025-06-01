package com.gardentally.API.Repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.gardentally.API.Entities.Garden;

public interface GardenRepository extends JpaRepository<Garden, Long>{
}
