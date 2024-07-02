package com.unical.papersplease.resource;

import com.unical.papersplease.model.Lessontext;
import com.unical.papersplease.service.LessontextService;
import jakarta.transaction.Transactional;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@Transactional
@RequestMapping("/lessontext")
public class LessontextResource {
    private final LessontextService lessontextService;

    public  LessontextResource(LessontextService lessontextService){
        this.lessontextService = lessontextService;
    }

    @GetMapping("/all")
    public ResponseEntity<List<Lessontext>> getAllLessonsText(){
        List<Lessontext> lessontexts = lessontextService.findAllLessonstext();
        return new ResponseEntity<>(lessontexts, HttpStatus.OK);
    }

    @GetMapping("/findId/{id}")
    public ResponseEntity<Lessontext> getAllLessonstext(@PathVariable("id") Long id){
        Lessontext lessontext = lessontextService.findLessonTextById(id);
        return new ResponseEntity<>(lessontext, HttpStatus.OK);
    }

    @GetMapping("/findArgument/{argument}")
    public ResponseEntity<Lessontext> getLessontext(@PathVariable("argument") String argument){
        Lessontext lessontext = lessontextService.findLessontextByArgument(argument);
        return new ResponseEntity<>(lessontext, HttpStatus.OK);
    }

    @PostMapping("/add")
    public ResponseEntity<Lessontext> addLessontext(@RequestBody Lessontext lessontext){
        Lessontext newLessontext = lessontextService.addLessontext(lessontext);
        return new ResponseEntity<>(newLessontext, HttpStatus.OK);
    }

    @PutMapping("/update")
    public ResponseEntity<Lessontext> updateLessontext(@RequestBody Lessontext lessontext){
        Lessontext updateLessontext = lessontextService.updateLessontext((lessontext));
        return new ResponseEntity<>(updateLessontext, HttpStatus.OK);
    }

    @DeleteMapping("/deleteId/{id}")
    public ResponseEntity<?> deleteLessontextById(@PathVariable("id") Long id){
        lessontextService.deleteLessonTextById(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @DeleteMapping("/deleteArgument/{argument}")
    public ResponseEntity<?> deleteLessontextByArgument(@PathVariable("argument") String argument){
        lessontextService.deleteLessontextByArgument(argument);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
