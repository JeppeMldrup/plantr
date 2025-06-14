package com.gardentally.API.Repositories;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.gardentally.API.Entities.Garden;
import com.gardentally.API.Entities.Invite;

public interface InviteRepository extends JpaRepository<Invite, Long>{
    public List<Invite> findAllByGarden(Garden garden);
    public Optional<Invite> findById(String id);
}
