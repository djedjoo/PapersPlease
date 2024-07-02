package com.unical.papersplease.service;

import com.unical.papersplease.exception.DepartmentNotFoundException;
import com.unical.papersplease.model.Department;
import com.unical.papersplease.repo.DepartmentRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public class DepartmentService {

    private final DepartmentRepo departmentRepo;

    @Autowired
    public DepartmentService(DepartmentRepo departmentRepo){
        this.departmentRepo = departmentRepo;
    }

    public Department addDepartment(Department department){
        return departmentRepo.save(department);
    }

    public List<Department> findAllDepartment(){
        return (List<Department>) departmentRepo.findAll();
    }

    public Department findDepartmentByName(String name){
        List<Department> departments = (List<Department>) departmentRepo.findAll();
        Long id = 99999999l;
        for(Department department: departments)
            if(department.getName().equals(name))
                id = department.getId();
        return departmentRepo.findDepartmentById(id).orElseThrow(()-> new DepartmentNotFoundException("Department with specified name " + name + " was not found"));
    }

    public Department findDepartmentById(Long id){
        return departmentRepo.findDepartmentById(id).orElseThrow(()-> new DepartmentNotFoundException("Department with specified name " + id + " was not found"));
    }

    public Department updateDepartment(Department department){
        return departmentRepo.save(department);
    }

    public void deleteDepartmentById(Long id){
        departmentRepo.deleteDepartmentById(id);
    }

    public void deleteDepartmentByName(String name){
        List<Department> departments = (List<Department>) departmentRepo.findAll();
        Long id = 99999999l;
        for(Department department: departments)
            if(department.getName().equals(name))
                id = department.getId();
        departmentRepo.deleteDepartmentById(id);
    }
}
