package com.example.onlinebookreader.security;

import com.example.onlinebookreader.entities.security.AppRole;
import com.example.onlinebookreader.entities.security.CommonUser;
import com.example.onlinebookreader.payloads.UserCredentialsForRegistrationPayload;
import com.example.onlinebookreader.repositories.AppRoleRepository;
import com.example.onlinebookreader.security.userdetails.ApplicationUserDetails;
import org.springframework.security.provisioning.UserDetailsManager;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UsernamePasswordAuthService {

    private final UserDetailsManager userDetailsManager;
    private final AppRoleRepository roleRepository;

    public UsernamePasswordAuthService(UserDetailsManager userDetailsManager, AppRoleRepository roleRepository) {
        this.userDetailsManager = userDetailsManager;
        this.roleRepository = roleRepository;
    }

    public ApplicationUserDetails createCommonUser(UserCredentialsForRegistrationPayload userCredentialsForRegistrationPayload){
        AppRole role_common=roleRepository.findByName("ROLE_COMMON");
        CommonUser commonUser=CommonUser.builder()
                .username(userCredentialsForRegistrationPayload.username())
                .email(userCredentialsForRegistrationPayload.email())
                .password(userCredentialsForRegistrationPayload.password())
                .roles(List.of(role_common))
                .build();
        return new ApplicationUserDetails(commonUser);
    }
}
