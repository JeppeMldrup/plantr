package com.gardentally.API.Repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.gardentally.API.Entities.User;

@Repository
public interface UserRepository extends JpaRepository<User, Long>{
    Optional<User> findByOauthid(String oauthid);
}
