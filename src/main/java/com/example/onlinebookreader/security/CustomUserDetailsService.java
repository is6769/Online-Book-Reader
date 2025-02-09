package com.example.onlinebookreader.security;

import com.example.onlinebookreader.entities.security.AdminUser;
import com.example.onlinebookreader.entities.security.CommonUser;
import com.example.onlinebookreader.entities.security.User;
import com.example.onlinebookreader.repositories.UserRepository;
import com.example.onlinebookreader.security.userdetails.ApplicationUserDetails;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.provisioning.UserDetailsManager;
import org.springframework.stereotype.Service;

@Service
public class CustomUserDetailsService implements UserDetailsManager {


    private UserRepository repository;
    private PasswordEncoder passwordEncoder;

    @Autowired
    public CustomUserDetailsService(UserRepository repository) {
        this.repository = repository;
    }

    @Override
    public void createUser(UserDetails userDetails) {
        if (userDetails instanceof ApplicationUserDetails applicationUserDetails){
            var user = applicationUserDetails.getUser();
            user.setPassword(passwordEncoder.encode(user.getPassword()));
            if (user instanceof AdminUser adminUser){
                repository.save(adminUser);
            }else if (user instanceof CommonUser commonUser){
                repository.save(commonUser);
            }
        }else {
            throw new IllegalArgumentException("UserDetails must be instanceof ApplicationUserDetails.");
        }
    }

    @Override
    public void updateUser(UserDetails userDetails) {
        createUser(userDetails);
    }

    @Override
    public void deleteUser(String username) {
        var user=repository.findByUsername(username).orElseThrow(IllegalArgumentException::new);
        repository.delete(user);
    }

    @Override
    public void changePassword(String oldPassword, String newPassword) {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        User user = repository.findByUsername(username).orElseThrow(() -> new UsernameNotFoundException("User not found"));
        user.setPassword(passwordEncoder.encode(newPassword));
        repository.save(user);



        // Add logic to verify oldPassword and update to newPassword
    }
    @Override
    public boolean userExists(String username) {
        repository.findByUsername(username).orElseThrow(IllegalArgumentException::new);
        return true;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        if (userExists(username))
            return new ApplicationUserDetails(repository.findByUsername(username).get());
        throw new RuntimeException();
    }
}
