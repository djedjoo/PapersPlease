package com.unical.papersplease.repo;

import com.unical.papersplease.model.Review;
import org.springframework.data.repository.CrudRepository;

import java.util.Optional;

public interface ReviewRepo extends CrudRepository<Review, Long> {
    Optional<Review> findReviewById(long id);

    void deleteReviewById(Long id);
}
