package com.example.onlinebookreader.controllers;


import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/book")
public class HomeController {

    public String getPage(){
        return "home";
    }
}
