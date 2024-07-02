package com.unical.papersplease.service;

import com.unical.papersplease.exception.LessontextNotFoundException;
import com.unical.papersplease.model.Lessontext;
import com.unical.papersplease.repo.LessonTextRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class LessontextService {
    private final LessonTextRepo lessonTextRepo;

    @Autowired
    public LessontextService(LessonTextRepo lessonTextRepo){
        this.lessonTextRepo = lessonTextRepo;
    }

    public Lessontext addLessontext(Lessontext lessontext){
        return lessonTextRepo.save(lessontext);
    }

    public List<Lessontext> findAllLessonstext(){
        return (List<Lessontext>) lessonTextRepo.findAll();
    }

    public Lessontext findLessonTextById(Long id){
        return lessonTextRepo.findLessontextById(id).orElseThrow(() -> new LessontextNotFoundException(("Lesson with specified id" + id + "was not found")));
    }

    public Lessontext findLessontextByArgument(String argument){
        List<Lessontext> lessonsText = (List<Lessontext>) lessonTextRepo.findAll();
        Long id = 99999999l;
        for(Lessontext lessontext: lessonsText)
            if(lessontext.getArgument().equals(argument))
                id = lessontext.getId();
        return lessonTextRepo.findLessontextById(id).orElseThrow(() -> new LessontextNotFoundException("Lesson with specified argument" + argument + "was not found"));
    }

    public Lessontext updateLessontext(Lessontext lessontext){
        return lessonTextRepo.save(lessontext);
    }

    public void deleteLessonTextById(Long id){
        lessonTextRepo.deleteLessontextById(id);
    }

    public void deleteLessontextByArgument(String argument){
        List<Lessontext> lessontexts = (List<Lessontext>) lessonTextRepo.findAll();
        Long id = 99999999l;
        for(Lessontext lessontext: lessontexts)
            if(lessontext.getArgument().equals(argument))
                id = lessontext.getId();
        lessonTextRepo.deleteLessontextById(id);
    }
}
