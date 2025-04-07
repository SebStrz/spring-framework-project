package com.example.demo;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.config.ConfigDataResourceNotFoundException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.ResourceAccessException;

import java.awt.*;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @CrossOrigin
    @PostMapping
    public User createUser(@RequestBody User user) {
        return userRepository.save(user);
    }

    @CrossOrigin
    @GetMapping
    public ResponseEntity<List<User>> getAllUsers() {
        return ResponseEntity.ok(userRepository.findAll());
    }

    @CrossOrigin
    @PutMapping("/{id}")
    public ResponseEntity<User> editUserById(@PathVariable Long id, @RequestBody User user){
        User updateUser = userRepository.findById(id)
                .orElseThrow(() -> new ResourceAccessException("User with id: "+id+" does not exists"));

        updateUser.setImie(user.getImie());
        updateUser.setEmail(user.getEmail());

        userRepository.save(updateUser);

        return ResponseEntity.ok(updateUser);
    }

    @CrossOrigin
    @GetMapping("/{id}")
    public ResponseEntity<User> getUserById(@PathVariable Long id) {
        return userRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @CrossOrigin
    @DeleteMapping("/{id}")
    public void deleteUser(@PathVariable Long id) {
        userRepository.deleteById(id);
    }
}
