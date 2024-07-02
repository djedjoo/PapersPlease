package com.unical.papersplease.model;

import jakarta.persistence.*;

import java.io.Serializable;
@Entity
public class Review implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(nullable = false, updatable = false)
    private Long id;
    private String title;
    @Lob
    @Column(columnDefinition = "LONGTEXT")
    private String text;
    private String score;
    private String type;
    private String name;
    private String surname;
    public Review() {
    }

    public Review(Long id, String title, String text, String score, String type, String name, String surname) {
        this.id = id;
        this.title = title;
        this.text = text;
        this.score = score;
        this.type = type;
        this.name = name;
        this.surname = surname;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getSurname() {
        return surname;
    }

    public void setSurname(String surname) {
        this.surname = surname;
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

    public String getText() {
        return text;
    }
    public void setText(String text) {
        this.text = text;
    }

    public String getScore() {
        return score;
    }
    public void setScore(String score) {
        this.score = score;
    }

    public String getType() {
        return type;
    }
    public void setType(String type) {
        this.type = type;
    }

    @Override
    public String toString() {
        return "Review{" +
                "id=" + id +
                ", title='" + title + '\'' +
                ", text='" + text + '\'' +
                ", score='" + score + '\'' +
                ", type='" + type + '\'' +
                '}';
    }
}
