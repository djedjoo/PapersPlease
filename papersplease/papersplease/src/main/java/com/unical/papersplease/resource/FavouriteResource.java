package com.unical.papersplease.resource;

import com.unical.papersplease.model.Favourite;
import com.unical.papersplease.service.FavouriteService;
import jakarta.transaction.Transactional;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@Transactional
@RequestMapping("/favourite")
public class FavouriteResource {
    private final FavouriteService favouriteService;

    public FavouriteResource(FavouriteService favouriteService){
        this.favouriteService = favouriteService;
    }

    @GetMapping("/all")
    public ResponseEntity<List<Favourite>> getAllFavourites(){
        List<Favourite> favourites = favouriteService.findAllFavourites();
        return new ResponseEntity<>(favourites, HttpStatus.OK);
    }

    @GetMapping("/findId/{id}")
    public ResponseEntity<Favourite> getFavouriteById(@PathVariable("id") Long id){
        Favourite favourite = favouriteService.findFavouriteById(id);
        return new ResponseEntity<>(favourite, HttpStatus.OK);
    }

    @PostMapping("/add")
    public ResponseEntity<Favourite> addFavourite(@RequestBody Favourite favourite){
        Favourite newFavourite = favouriteService.addFavourite(favourite);
        return new ResponseEntity<>(newFavourite, HttpStatus.CREATED);
    }

    @PutMapping("/update")
    public ResponseEntity<Favourite> updateFavourite(@RequestBody Favourite favourite){
        Favourite updateFavourite = favouriteService.updateFavourite(favourite);
        return new ResponseEntity<>(updateFavourite, HttpStatus.OK);
    }

    @DeleteMapping("/deleteId/{id}")
    public ResponseEntity<?> deleteFavourite(@PathVariable("id") Long id){
        favouriteService.deleteFavouriteById(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
