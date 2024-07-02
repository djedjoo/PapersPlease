package com.unical.papersplease.service;

import com.unical.papersplease.exception.FavouriteNotFoundException;
import com.unical.papersplease.model.Favourite;
import com.unical.papersplease.repo.FavouriteRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FavouriteService {
    private final FavouriteRepo favouriteRepo;

    @Autowired
    public FavouriteService(FavouriteRepo favouriteRepo){
        this.favouriteRepo = favouriteRepo;
    }

    public Favourite addFavourite(Favourite favourite){
        return favouriteRepo.save(favourite);
    }

    public List<Favourite> findAllFavourites(){
        return (List<Favourite>) favouriteRepo.findAll();
    }

    public Favourite findFavouriteById(Long id){
        return favouriteRepo.findFavouriteById(id).orElseThrow(() -> new FavouriteNotFoundException("Favourite with specified id " + id + "was not found"));
    }

    public Favourite updateFavourite(Favourite favourite){
        return favouriteRepo.save(favourite);
    }

    public void deleteFavouriteById(Long id){
        favouriteRepo.deleteFavouriteById(id);
    }

}
