package com.unical.papersplease.service;

import com.unical.papersplease.exception.EbookNotFoundException;
import com.unical.papersplease.exception.UserNotFoundException;
import com.unical.papersplease.model.Ebook;
import com.unical.papersplease.model.User;
import com.unical.papersplease.repo.EbookRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EbookService {

    private final EbookRepo ebookRepo;
    @Autowired
    public EbookService(EbookRepo ebookRepo){ this.ebookRepo = ebookRepo; }

    public Ebook addEbook(Ebook ebook){
        return ebookRepo.save(ebook);
    }

    public List<Ebook> findAllEbooks(){ return (List<Ebook>) ebookRepo.findAll(); }

    public Ebook findEbookById(Long id){
        return ebookRepo.findEbookById(id).orElseThrow(() -> new EbookNotFoundException("EBook with specified id " + id + " was not found"));
    }

    public Ebook findEbookByTitle(String title){
        List<Ebook> ebooks= (List<Ebook>) ebookRepo.findAll();
        Long id = 99999999l;
        for(Ebook ebook: ebooks)
            if(ebook.getTitle().equals(title))
                id = ebook.getId();
        return ebookRepo.findEbookById(id).orElseThrow(()-> new UserNotFoundException("User with specified email "+ title + " was not found"));
    }

    public Ebook updateEbook(Ebook ebook){
        return ebookRepo.save(ebook);
    }

    public void deleteEbookById(Long id){
        ebookRepo.deleteEbookById(id);
    }

    public void deleteEbookByTitle(String title){
        List<Ebook> ebooks= (List<Ebook>) ebookRepo.findAll();
        Long id = 99999999l;
        for(Ebook ebook: ebooks)
            if (ebook.getTitle().equals(title))
                id = ebook.getId();
        ebookRepo.deleteEbookById(id);
    }
}
