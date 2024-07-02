package com.unical.papersplease.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

import java.io.Serializable;
import java.util.List;

@Entity
public class User implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(nullable = false, updatable = false)
    private Long id;
    private String email;
    private String name;
    private String surname;
    private String imageUrl;
    private String course;
    private String gender;
    @Column(nullable = false, updatable = false)
    private String role;
    private String password;
    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true) //with cascade I create the elements with the foreign key, and with orphanRemoval I delete them when the "father" is deleted
    @JoinColumn(name = "fk_user_id", referencedColumnName = "id")
    private List<Lessontext> lessons;
    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = "fk_user_id", referencedColumnName = "id")
    private List<Photo> photos;

    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = "fk_user_id", referencedColumnName = "id")
    private List<Ebook> ebooks;

    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = "fk_user_id", referencedColumnName = "id")
    private List<Favourite> favourites;

    public User() {
    }

    public User(Long id, String email, String name, String surname, String imageUrl, String course, String gender, String role, String password,
                List<Lessontext> lessons, List<Photo> photos, List<Ebook> ebooks, List<Favourite> favourites) {
        this.id = id;
        this.email = email;
        this.name = name;
        this.surname = surname;
        this.imageUrl = imageUrl;
        this.course = course;
        this.gender = gender;
        this.role = role;
        this.password = password;
        this.lessons = lessons;
        this.photos = photos;
        this.ebooks = ebooks;
        this.favourites = favourites;
    }

    public List<Photo> getPhotos() {
        return photos;
    }

    public void setPhotos(List<Photo> photos) {
        this.photos = photos;
    }

    public List<Ebook> getEbooks() {
        return ebooks;
    }

    public void setEbooks(List<Ebook> ebooks) {
        this.ebooks = ebooks;
    }

    public List<Favourite> getFavourites() {
        return favourites;
    }

    public void setFavourites(List<Favourite> favourites) {
        this.favourites = favourites;
    }

    public Long getId() {
        return id;
    }
    public void setId(Long id) {
        this.id = id;
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

    public String getImageUrl() {
        return imageUrl;
    }
    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    public String getGender() {
        return gender;
    }
    public void setGender(String gender) {
        this.gender = gender;
    }

    public String getRole() {
        return role;
    }
    public void setRole(String role) {
        this.role = role;
    }

    public String getCourse() {
        return course;
    }
    public void setCourse(String course) {
        this.course = course;
    }

    public String getEmail() {
        return email;
    }
    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }
    public void setPassword(String password) {
        this.password = password;
    }

    public List<Lessontext> getLessons() {
        return lessons;
    }

    public void setLessons(List<Lessontext> lessons) {
        this.lessons = lessons;
    }

    @Override
    public String toString() {
        return "User{" +
                "id='" + id+ + '\'' +
                "email='" + email+ + '\'' +
                ", name='" + name + '\'' +
                ", surname='" + surname + '\'' +
                ", imageUrl='" + imageUrl + '\'' +
                ", gender=" + gender +
                ", role=" + role +
                ", password=" + password +
                '}';
    }
}
