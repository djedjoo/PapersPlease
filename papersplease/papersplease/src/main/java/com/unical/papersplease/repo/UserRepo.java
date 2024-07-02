package com.unical.papersplease.repo;

import com.unical.papersplease.model.User;
import org.springframework.data.repository.CrudRepository;

import java.util.Optional;

public interface UserRepo extends CrudRepository<User, Long> {
    Optional<User> findUserById(Long id);

    void deleteUserById(Long id);
}
