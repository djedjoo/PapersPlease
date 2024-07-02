package com.unical.papersplease.exception;

public class FavouriteNotFoundException extends RuntimeException{
    public FavouriteNotFoundException(String message){
        super(message);
    }
}
