package com.unical.papersplease.repo;

import com.unical.papersplease.model.Ebook;
import org.springframework.data.repository.CrudRepository;

import java.util.Optional;

public interface EbookRepo extends CrudRepository<Ebook, Long> {
    Optional<Ebook> findEbookById(Long id);

    void deleteEbookById(Long id);
}
