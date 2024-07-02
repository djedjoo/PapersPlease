package com.unical.papersplease.resource;

import com.unical.papersplease.model.Photo;
import com.unical.papersplease.service.PhotoService;
import jakarta.transaction.Transactional;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@Transactional
@RequestMapping("/photo")
public class PhotoResource {
    private final PhotoService photoService;

    public PhotoResource(PhotoService photoService){
        this.photoService = photoService;
    }

    @GetMapping("/all")
    public ResponseEntity<List<Photo>> getAllPhotos(){
        List<Photo> photos = photoService.findAllPhotos();
        return new ResponseEntity<>(photos, HttpStatus.OK);
    }

    @GetMapping("/findId/{id}")
    public ResponseEntity<Photo> getPhotoById(@PathVariable("id") Long id){
        Photo photo = photoService.findPhotoById(id);
        return new ResponseEntity<>(photo, HttpStatus.OK);
    }

    @GetMapping("/findArgument/{argument}")
    public ResponseEntity<Photo> getPhotoByArgument(@PathVariable("argument") String argument){
        Photo photo = photoService.findPhotoByArgument(argument);
        return new ResponseEntity<>(photo, HttpStatus.OK);
    }

    @PostMapping("/add")
    public ResponseEntity<Photo> addPhoto(@RequestBody Photo photo){
        Photo newPhoto = photoService.addPhoto(photo);
        return new ResponseEntity<>(newPhoto, HttpStatus.CREATED);
    }

    @PutMapping("/update")
    public ResponseEntity<Photo> updatePhoto(@RequestBody Photo photo){
        Photo updatePhoto = photoService.updatePhoto(photo);
        return new ResponseEntity<>(updatePhoto, HttpStatus.OK);
    }

    @DeleteMapping("/deleteId/{id}")
    public ResponseEntity<?> deletePhotoById(@PathVariable("id") Long id){
        photoService.deletePhotoById(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @DeleteMapping("/deleteArgument/{argument}")
    public ResponseEntity<?> deletePhotoByArgument(@PathVariable("argument") String argument){
        photoService.deletePhotoByArgument(argument);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
