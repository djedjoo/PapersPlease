package com.unical.papersplease.model;

import jakarta.persistence.*;

import java.io.Serializable;
@Entity
public class Favourite implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(nullable = false, updatable = false)
    private Long id;
    private Long lessonId;
    private String type;
    private String done;

    public Favourite(){}

    public Favourite(Long id, Long lessonId,String type, String done) {
        this.id = id;
        this.lessonId = lessonId;
        this.type = type;
        this.done = done;
    }

    public String getDone() {
        return done;
    }

    public void setDone(String done) {
        this.done = done;
    }

    public Long getId() {
        return id;
    }
    public void setId(Long id) {
        this.id = id;
    }

    public String getType() {
        return type;
    }
    public void setType(String type) {
        this.type = type;
    }

    public Long getLessonId() {
        return lessonId;
    }

    public void setLessonId(Long lessonId) {
        this.lessonId = lessonId;
    }

    @Override
    public String toString() {
        return "Favourite{" +
                "id=" + id +
                '}';
    }
}
