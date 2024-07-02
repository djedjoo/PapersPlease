package com.unical.papersplease.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.transaction.Transactional;

import java.io.Serializable;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Entity
@Transactional
public class Lessontext implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(nullable = false, updatable = false)
    private Long id;
    private String argument;
    private String visibility;
    private String score;
    @Lob
    @Column(columnDefinition = "LONGTEXT")
    private String text;

    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = "fk_lesson_id", referencedColumnName = "id")
    private List<Review> reviews;

    @JsonIgnore
    @ManyToMany(mappedBy = "lessons", cascade = CascadeType.ALL)
    private List<Ebook> ebooks;

    public Lessontext(){}

    public Lessontext(Long id, String argument, String visibility, String score, String text,
                      List<Review> reviews, List<Ebook> ebooks) {
        this.id = id;
        this.argument = argument;
        this.text = text;
        this.visibility = visibility;
        this.score = score;
        this.reviews = reviews;
        this.ebooks = ebooks;
    }

    public List<Review> getReviews() {
        return reviews;
    }

    public void setReviews(List<Review> reviews) {
        this.reviews = reviews;
    }

    public List<Ebook> getEbooks() {
        return ebooks;
    }

    public void setEbooks(List<Ebook> ebooks) {
        this.ebooks = ebooks;
    }

    public long getId() {
        return id;
    }
    public void setId(Long id) {
        this.id = id;
    }

    public String getArgument() {
        return argument;
    }
    public void setArgument(String argument) {
        this.argument = argument;
    }

    public String getText() {
        return text;
    }
    public void setText(String text) {
        this.text = text;
    }

    public String getVisibility() {
        return visibility;
    }
    public void setVisibility(String visibility) {
        this.visibility = visibility;
    }

    public String getScore() {
        return score;
    }
    public void setScore(String score) {
        this.score = score;
    }


    @Override
    public String toString() {
        return "LessonText{" +
                "id=" + id +
                ", argument='" + argument + '\'' +
                ", text='" + text + '\'' +
                '}';
    }
}
