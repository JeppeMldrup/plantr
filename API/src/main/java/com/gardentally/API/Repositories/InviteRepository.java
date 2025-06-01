package com.gardentally.API.Repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.gardentally.API.Entities.Invite;

public interface InviteRepository extends JpaRepository<Invite, Long>{
}
