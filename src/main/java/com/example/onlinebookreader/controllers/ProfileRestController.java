package com.example.onlinebookreader.controllers;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController("/profile")
public class ProfileRestController {

    @GetMapping("/")
    public String getProfile() {
        return "Profile";
    }

}
