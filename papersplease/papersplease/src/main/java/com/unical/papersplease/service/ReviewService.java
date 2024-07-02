package com.unical.papersplease.service;

import com.unical.papersplease.exception.ReviewNotFoundException;
import com.unical.papersplease.model.Review;
import com.unical.papersplease.repo.ReviewRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public class ReviewService {
    private final ReviewRepo reviewRepo;

    @Autowired
    public ReviewService(ReviewRepo reviewRepo){
        this.reviewRepo = reviewRepo;
    }

    public Review addReview(Review review){
        return reviewRepo.save(review);
    }

    public List<Review> findAllReviews(){
        return (List<Review>) reviewRepo.findAll();
    }

    public Review findReviewByTitle(String title){
        List<Review> reviews = (List<Review>) reviewRepo.findAll();
        Long id = 99999999l;
        for(Review review: reviews)
            if(review.getTitle().equals(title))
                id = review.getId();
        return reviewRepo.findReviewById(id).orElseThrow(() -> new ReviewNotFoundException("Review with specified title" + title + "was not found"));
    }

    public Review findReviewById(Long id){
        return reviewRepo.findReviewById(id).orElseThrow(() -> new ReviewNotFoundException("Review with specified id" + id + "was not found"));
    }

    public Review updateReview(Review review){
        return reviewRepo.save(review);
    }

    public void deleteReviewById(Long id){
        reviewRepo.deleteReviewById(id);
    }

    public void deleteReviewByTitle(String title){
        List<Review> reviews = (List<Review>) reviewRepo.findAll();
        Long id = 99999999l;
        for(Review review: reviews)
            if(review.getTitle().equals(title))
                id = review.getId();
        reviewRepo.deleteReviewById(id);
    }
}
