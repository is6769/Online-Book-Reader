package com.example.onlinebookreader.controllers;

import com.example.onlinebookreader.entities.security.AppRole;
import com.example.onlinebookreader.entities.security.CommonUser;
import com.example.onlinebookreader.payloads.UserCredentialsForLoginPayload;
import com.example.onlinebookreader.payloads.UserCredentialsForRegistrationPayload;
import com.example.onlinebookreader.repositories.AppRoleRepository;
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
    private final AppRoleRepository roleRepository;

    @Autowired
    public SecurityRestController(UserDetailsManager userDetailsManager,AppRoleRepository roleRepository) {
        this.userDetailsManager = userDetailsManager;
        this.roleRepository=roleRepository;
    }

    @PostMapping("v1/register")
    public String register(@RequestBody UserCredentialsForRegistrationPayload userCredentialsForRegistrationPayload){
        AppRole role_common=roleRepository.findByName("ROLE_COMMON");
        CommonUser commonUser=CommonUser.builder()
                .username(userCredentialsForRegistrationPayload.username())
                .email(userCredentialsForRegistrationPayload.email())
                .password(userCredentialsForRegistrationPayload.password())
                .roles(List.of(role_common))
                .build();
        var applicationUserDetails=new ApplicationUserDetails(commonUser);
        userDetailsManager.createUser(applicationUserDetails);
        return "Successfully registered user";
    }

    @PostMapping("v1/login")
    public String login(@RequestBody UserCredentialsForLoginPayload userCredentialsForLoginPayload){
        //userDetailsManager.loadUserByUsername()
        return "Succefully Authenticated";
    }
}
