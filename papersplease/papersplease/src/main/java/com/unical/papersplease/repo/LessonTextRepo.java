package com.unical.papersplease.repo;

import com.unical.papersplease.model.Lessontext;
import org.springframework.data.repository.CrudRepository;

import java.util.Optional;

public interface LessonTextRepo extends CrudRepository<Lessontext, Long> {
    Optional<Lessontext> findLessontextById(Long id);
    void deleteLessontextById(Long id);
}
