package com.unical.papersplease.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import jakarta.persistence.*;
import org.hibernate.type.descriptor.java.BlobJavaType;

import java.io.Serializable;
import java.sql.Blob;
import java.util.List;

@Entity
public class Photo implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(nullable = false, updatable = false)
    private Long id;
    private String argument;
    private String type;
    private String visibility;
    private String score;
    @Lob
    @Column(columnDefinition = "LONGTEXT")
    private String image;

    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = "fk_user_id", referencedColumnName = "id")
    private List<Review> reviews;
    @JsonIgnore
    @ManyToMany(mappedBy = "photos", cascade = CascadeType.ALL)
    private List<Ebook> ebooks;

    public Photo() {
    }
    public Photo(Long id, String argument, String type, String visibility, String score, String image,
                 List<Review> reviews, List<Ebook> ebooks) {
        this.id = id;
        this.argument = argument;
        this.image = image;
        this.type = type;
        this.visibility = visibility;
        this.score = score;
        this.reviews = reviews;
        this.ebooks = ebooks;
    }

    public List<Ebook> getEbooks() {
        return ebooks;
    }

    public void setEbooks(List<Ebook> ebooks) {
        this.ebooks = ebooks;
    }

    public List<Review> getReviews() {
        return reviews;
    }

    public void setReviews(List<Review> reviews) {
        this.reviews = reviews;
    }

    public Long getId() {
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

    public String getImage() {
        return image;
    }
    public void setImage(String image) {
        this.image = image;
    }

    public String getType() {
        return type;
    }
    public void setType(String type) {
        this.type = type;
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
        return "Photo{" +
                "id=" + id +
                ", argument='" + argument + '\'' +
                ", image=" + image +
                '}';
    }
}
