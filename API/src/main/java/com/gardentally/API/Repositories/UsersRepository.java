package com.gardentally.API.Repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.gardentally.API.Entities.Users;

@Repository
public interface UsersRepository extends JpaRepository<Users, Long>{
}
