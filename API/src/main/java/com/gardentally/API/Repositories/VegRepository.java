package com.gardentally.API.Repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.gardentally.API.Entities.Veg;

public interface VegRepository extends JpaRepository<Veg, Long>{
    List<Veg> findVegByGardenId(Long garden_id);
}
