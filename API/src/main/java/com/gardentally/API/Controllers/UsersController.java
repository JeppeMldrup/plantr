package com.gardentally.API.Controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.gardentally.API.Entities.Users;
import com.gardentally.API.Services.UsersService;

@RestController
@RequestMapping("/api/users")
public class UsersController {
    private final UsersService usersService;

    @Autowired
    public UsersController(UsersService usersService){
        this.usersService = usersService;
    }

    @PostMapping("/add")
    public ResponseEntity<Users> addUser(@RequestBody Users user){
        Users newUser = usersService.addUser(user);
        return ResponseEntity.ok(newUser);
    }

    @GetMapping("/get")
    public List<Users> getAllUsers() {
        return usersService.getAllUsers();
    }
}
