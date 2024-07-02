package com.unical.papersplease.service;

import com.unical.papersplease.exception.PhotoNotFoundException;
import com.unical.papersplease.model.Photo;
import com.unical.papersplease.repo.PhotoRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PhotoService {
    private final PhotoRepo photoRepo;

    @Autowired
    public PhotoService(PhotoRepo photoRepo){
        this.photoRepo = photoRepo;
    }

    public Photo addPhoto(Photo photo){
        return photoRepo.save(photo);
    }

    public List<Photo> findAllPhotos(){
        return (List<Photo>) photoRepo.findAll();
    }

    public Photo findPhotoById(Long id){
        return photoRepo.findPhotoById(id).orElseThrow(() -> new PhotoNotFoundException("Photo with specified id "+ id + " was not found"));
    }

    public Photo findPhotoByArgument(String argument){
        List<Photo> photos = (List<Photo>) photoRepo.findAll();
        Long id = 99999999l;
        for(Photo photo: photos)
            if(photo.getArgument().equals(argument))
                id = photo.getId();
        return photoRepo.findPhotoById(id).orElseThrow(() -> new PhotoNotFoundException("Photo with specified argument "+ argument + " was not found"));
    }

    public Photo updatePhoto(Photo photo){
        return photoRepo.save(photo);
    }

    public void deletePhotoById(Long id){
        photoRepo.deletePhotoById(id);
    }

    public void deletePhotoByArgument(String argument){
        List<Photo> photos = (List<Photo>) photoRepo.findAll();
        Long id = 99999999l;
        for(Photo photo: photos)
            if(photo.getArgument().equals(argument))
                id = photo.getId();
        photoRepo.deletePhotoById(id);
    }
}
