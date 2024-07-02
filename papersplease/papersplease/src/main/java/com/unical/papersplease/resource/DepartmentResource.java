package com.unical.papersplease.resource;

import com.unical.papersplease.model.Department;
import com.unical.papersplease.service.DepartmentService;
import jakarta.transaction.Transactional;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@Transactional
@RequestMapping("/department")
public class DepartmentResource {

    private final DepartmentService departmentService;

    public DepartmentResource(DepartmentService departmentService){
        this.departmentService = departmentService;
    }

    @GetMapping("/all")
    public ResponseEntity<List<Department>> getAllDepartments(){
        List<Department> departments = departmentService.findAllDepartment();
        return new ResponseEntity<>(departments, HttpStatus.OK);
    }

    @GetMapping("/findId/{id}")
    public ResponseEntity<Department> getDepartmentById(@PathVariable("id") Long id){
        Department department = departmentService.findDepartmentById(id);
        return  new ResponseEntity<>(department, HttpStatus.OK);
    }

    @GetMapping("/findName/{name}")
    public ResponseEntity<Department> getDepartmentByName(@PathVariable("name") String name){
        Department department = departmentService.findDepartmentByName(name);
        return new ResponseEntity<>(department, HttpStatus.OK);
    }

    @PostMapping("/add")
    public ResponseEntity<Department> addDepartment(@RequestBody Department department){
        Department newDepartment = departmentService.addDepartment(department);
        return new ResponseEntity<>(newDepartment, HttpStatus.CREATED);
    }

    @PutMapping("/update")
    public ResponseEntity<Department> updateDepartment(@RequestBody Department department){
        Department updateDepartment = departmentService.updateDepartment(department);
        return new ResponseEntity<>(updateDepartment, HttpStatus.OK);
    }

    @DeleteMapping("/deleteId/{id}")
    public ResponseEntity<?> deleteDepartment(@PathVariable("id") Long id){
        departmentService.deleteDepartmentById(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @DeleteMapping("/deleteName/{name}")
    public ResponseEntity<?> deleteDepartmentByName(@PathVariable("name") String name){
        departmentService.deleteDepartmentByName(name);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
