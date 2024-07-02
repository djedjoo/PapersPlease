package com.unical.papersplease.resource;

import com.unical.papersplease.model.Ebook;
import com.unical.papersplease.service.EbookService;
import jakarta.transaction.Transactional;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@Transactional
@RequestMapping("/ebook")
public class EbookResource {

    private final EbookService ebookService;

    public EbookResource(EbookService ebookService){ this.ebookService = ebookService; }

    @GetMapping("/all")
    public ResponseEntity<List<Ebook>> getAllEbooks(){
        List<Ebook> ebooks = ebookService.findAllEbooks();
        return new ResponseEntity<>(ebooks, HttpStatus.OK);
    }

    @GetMapping("/findId/{id}")
    public ResponseEntity<Ebook> getEbookById(@PathVariable("id") Long id){
        Ebook ebook = ebookService.findEbookById(id);
        return new ResponseEntity<>(ebook, HttpStatus.OK);
    }

    @GetMapping("/findTitle/{title}")
    public ResponseEntity<Ebook> getEbookByTitle(@PathVariable("title") String title){
        Ebook ebook = ebookService.findEbookByTitle(title);
        return new ResponseEntity<>(ebook, HttpStatus.OK);
    }

    @PostMapping("/add")
    public ResponseEntity<Ebook> addEbook(@RequestBody Ebook ebook){
        Ebook newEbook = ebookService.addEbook(ebook);
        return new ResponseEntity<>(newEbook, HttpStatus.CREATED);
    }

    @PutMapping("/update")
    public ResponseEntity<Ebook> updateEbook(@RequestBody Ebook ebook){
        Ebook updateEbook = ebookService.updateEbook(ebook);
        return new ResponseEntity<>(updateEbook, HttpStatus.OK);
    }

    @DeleteMapping("/deleteId/{id}")
    public ResponseEntity<?> deleteEbookById(@PathVariable("id") Long id){
        ebookService.deleteEbookById(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @DeleteMapping("/deleteTitle/{title}")
    public ResponseEntity<?> deleteEbookByTitle(@PathVariable("title") String title){
        ebookService.deleteEbookByTitle(title);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
