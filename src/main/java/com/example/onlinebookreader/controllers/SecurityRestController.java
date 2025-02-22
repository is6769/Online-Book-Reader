package com.example.onlinebookreader.controllers;

import com.example.onlinebookreader.entities.security.AppRole;
import com.example.onlinebookreader.entities.security.CommonUser;
import com.example.onlinebookreader.payloads.UserCredentialsForLoginPayload;
import com.example.onlinebookreader.payloads.UserCredentialsForRegistrationPayload;
import com.example.onlinebookreader.repositories.AppRoleRepository;
import com.example.onlinebookreader.security.JwtService;
import com.example.onlinebookreader.security.UsernamePasswordAuthService;
import com.example.onlinebookreader.security.userdetails.ApplicationUserDetails;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.provisioning.UserDetailsManager;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/")
@CrossOrigin(origins = "http://localhost:5173")
public class SecurityRestController {

    private final UserDetailsManager userDetailsManager;
    private final UsernamePasswordAuthService usernamePasswordAuthService;
    private final JwtService jwtService;

    @Autowired
    public SecurityRestController(UserDetailsManager userDetailsManager, AppRoleRepository roleRepository, UsernamePasswordAuthService usernamePasswordAuthService, JwtService jwtService) {
        this.userDetailsManager = userDetailsManager;
        this.usernamePasswordAuthService = usernamePasswordAuthService;
        this.jwtService = jwtService;
    }

    @PostMapping("v1/registration")
    public String register(@RequestBody UserCredentialsForRegistrationPayload userCredentialsForRegistrationPayload){
        jwtService.generateJwtForRegistrationVerification();
        userDetailsManager.createUser(
                usernamePasswordAuthService.createCommonUser(userCredentialsForRegistrationPayload)
        );
        return "Successfully registered user";
    }

    @GetMapping("v1/registration/verify")
    public String register(@RequestParam String token){

        jwtService.validateJwtToken()

        userDetailsManager.createUser(
                usernamePasswordAuthService.createCommonUser(userCredentialsForRegistrationPayload)
        );
        return "Successfully registered user";
    }

    @PostMapping("v1/login")
    public String login(@RequestBody UserCredentialsForLoginPayload userCredentialsForLoginPayload){
        //userDetailsManager.loadUserByUsername()
        jwtService.generateJwt();
        return "Succefully Authenticated";
    }
}
