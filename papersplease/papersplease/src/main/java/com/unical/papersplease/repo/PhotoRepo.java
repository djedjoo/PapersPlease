package com.unical.papersplease.repo;

import com.unical.papersplease.model.Photo;
import org.springframework.data.repository.CrudRepository;

import java.util.Optional;

public interface PhotoRepo extends CrudRepository<Photo, Long> {
    Optional<Photo> findPhotoById(Long id);

    void deletePhotoById(Long id);
}
