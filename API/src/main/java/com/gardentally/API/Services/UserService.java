package com.gardentally.API.Services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

import com.gardentally.API.Entities.User;
import com.gardentally.API.Repositories.UserRepository;

@Service
public class UserService {
    private final UserRepository userRepository;

    @Autowired
    public UserService(UserRepository userRepository){
        this.userRepository = userRepository;
    }

    public User addUser(User user){
        return userRepository.save(user);
    }

    public List<User> getAllUsers(){
        return userRepository.findAll();
    }

    public Optional<User> getUserFromOauthUser(OAuth2User user){
        return getUserFromOauthid(user.getAttribute("sub"));
    }

    public Boolean userOwnsGarden(OAuth2User user, Long id){
        return getUserFromOauthUser(user).get().getGardens().stream().anyMatch(garden -> garden.getId() == id);
    }

    public Optional<User> getUserFromOauthid(String oauthid){
        return userRepository.findByOauthid(oauthid);
    }
}
