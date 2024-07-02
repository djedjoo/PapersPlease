package com.unical.papersplease.service;

import com.unical.papersplease.exception.UserNotFoundException;
import com.unical.papersplease.model.User;
import com.unical.papersplease.repo.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public class UserService {
    private final UserRepo userRepo;
    @Autowired
    public UserService(UserRepo userRepo) {
        this.userRepo = userRepo;
    }

    public User addUser(User user){
        return userRepo.save(user);
    }

    public List<User> findAllUsers(){
        return (List<User>) userRepo.findAll();
    }

    public User findUserByEmail(String email){
        List<User> users= (List<User>) userRepo.findAll();
        Long id = 99999999l;
        for(User user: users)
            if(user.getEmail().equals(email))
                id = user.getId();
        return userRepo.findUserById(id).orElseThrow(()-> new UserNotFoundException("User with specified email "+ email + " was not found"));
    }

    public User findUserById(Long id){
        return userRepo.findUserById(id).orElseThrow(()-> new UserNotFoundException("User with specified id "+ id + " was not found"));
    }

    public User updateUser(User user){
        return userRepo.save(user);
    }

    public void deleteUserById(Long id){
        userRepo.deleteUserById(id);
    }

    public void deleteUserByEmail(String email){
        List<User> users= (List<User>) userRepo.findAll();
        Long id = 99999999l;
        for(User user: users)
            if (user.getEmail().equals(email))
                id = user.getId();
        userRepo.deleteUserById(id);
    }

}
