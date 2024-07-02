package com.unical.papersplease.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Entity
public class Ebook implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(nullable = false, updatable = false)
    private Long id;
    private String title;
    private String visibility;
    private String score;
    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = "fk_user_id", referencedColumnName = "id")
    private List<Review> reviews;


    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(name = "ebook_lessontext", joinColumns = @JoinColumn(name = "ebook_id"), inverseJoinColumns = @JoinColumn(name = "lessontext_id"))
    private Set<Lessontext> lessons = new HashSet<>();


    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(name = "ebook_photo", joinColumns = @JoinColumn(name = "ebook_id"), inverseJoinColumns = @JoinColumn(name = "photo_id"))
    private Set<Photo> photos = new HashSet<>();

    public Ebook() {
    }

    public Ebook(Long id, String title, String visibility, String score, List<Review> reviews, Set<Lessontext> lessons,
        Set<Photo> photos) {
        this.id = id;
        this.title = title;
        this.visibility = visibility;
        this.score = score;
        this.reviews = reviews;
        this.lessons = lessons;
        this.photos = photos;
    }

    public Set<Photo> getPhotos() {
        return photos;
    }

    public void setPhotos(Set<Photo> photos) {
        this.photos = photos;
    }

    public List<Review> getReviews() {
        return reviews;
    }

    public void setReviews(List<Review> reviews) {
        this.reviews = reviews;
    }

    public Set<Lessontext> getLessons() {
        return lessons;
    }

    public void setLessons(Set<Lessontext> lessons) {
        this.lessons = lessons;
    }

    public Long getId() {
        return id;
    }
    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }
    public void setTitle(String title) {
        this.title = title;
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
        return "Ebook{" +
                "id=" + id +
                ", title='" + title + '\'' +
                '}';
    }
}
