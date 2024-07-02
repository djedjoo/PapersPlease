package com.unical.papersplease.resource;

import com.unical.papersplease.model.Review;
import com.unical.papersplease.service.ReviewService;
import jakarta.transaction.Transactional;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@Transactional
@RequestMapping("/review")
public class ReviewResource {

    private final ReviewService reviewService;

    public ReviewResource(ReviewService reviewService){
        this.reviewService = reviewService;
    }

    @GetMapping("/all")
    public ResponseEntity<List<Review>> getAllReviews(){
        List<Review> reviews = reviewService.findAllReviews();
        return new ResponseEntity<>(reviews, HttpStatus.OK);
    }

    @GetMapping("/findId/{id}")
    public ResponseEntity<Review> getReviewBtId(@PathVariable("id") Long id){
        Review review = reviewService.findReviewById(id);
        return new ResponseEntity<>(review, HttpStatus.OK);
    }

    @GetMapping("/findTitle/{title}")
    public  ResponseEntity<Review> getReveiwByTitle(@PathVariable("title") String title){
        Review review = reviewService.findReviewByTitle(title);
        return new ResponseEntity<>(review, HttpStatus.OK);
    }

    @PostMapping("/add")
    public ResponseEntity<Review> addReview(@RequestBody Review review){
        Review newReview = reviewService.addReview(review);
        return new ResponseEntity<>(newReview, HttpStatus.CREATED);
    }

    @PutMapping("/update")
    public ResponseEntity<Review> updateReview(@RequestBody Review review){
        Review updateReview = reviewService.updateReview(review);
        return new ResponseEntity<>(updateReview, HttpStatus.OK);
    }

    @DeleteMapping("/deleteId/{id}")
    public ResponseEntity<?> deleteReview(@PathVariable("id") Long id){
        reviewService.deleteReviewById(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @DeleteMapping("/deleteTitle/{title}")
    public ResponseEntity<?> deleteReviewByTitle(@PathVariable("title") String title){
        reviewService.deleteReviewByTitle(title);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
