package com.unical.papersplease.repo;

import com.unical.papersplease.model.Department;
import org.springframework.data.repository.CrudRepository;

import java.util.Optional;

public interface DepartmentRepo extends CrudRepository<Department, Long> {

    Optional<Department> findDepartmentById(Long id);

    void deleteDepartmentById(Long id);
}
