package com.unical.papersplease.repo;

import com.unical.papersplease.model.Favourite;
import org.springframework.data.repository.CrudRepository;

import java.util.Optional;

public interface FavouriteRepo extends CrudRepository<Favourite, Long> {
    Optional<Favourite> findFavouriteById(Long id);

    void deleteFavouriteById(Long id);
}
