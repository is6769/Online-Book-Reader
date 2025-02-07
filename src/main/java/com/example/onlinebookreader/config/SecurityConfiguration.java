package com.example.onlinebookreader.config;

import com.example.onlinebookreader.security.CustomUserDetailsService;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class SecurityConfiguration {

    @Bean
    public UserDetailsService userDetailsService(){
        CustomUserDetailsService customUserDetailsService = new CustomUserDetailsService();
        return customUserDetailsService;
    }

    @Bean
    public PasswordEncoder passwordEncoder(){
        return new BCryptPasswordEncoder();
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http.formLogin( c -> {
            c.successHandler((
                (request, response, authentication) -> {
                    var roles= authentication.getAuthorities();
                    if (roles.stream().map(GrantedAuthority::getAuthority).anyMatch("ROLE_ADMIN"::equals)){
                        response.sendRedirect("/admin");
                    }
                    response.sendRedirect("/");
            }));
        });

        http.authorizeHttpRequests(c -> {
            c
                    .requestMatchers("/").permitAll()
                    .requestMatchers("/admin/**").hasRole("ADMIN")
                    .anyRequest().authenticated();
        });

        return http.build();
    }

}
