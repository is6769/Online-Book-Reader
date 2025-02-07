package com.example.onlinebookreader.entities.security;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@Inheritance(strategy = InheritanceType.JOINED)
@Table(name = "Users")
@Data
@NoArgsConstructor
@AllArgsConstructor
@SuperBuilder
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String username;

    @Column(nullable = false)
    private String password;

    @Column(nullable = false)
    private LocalDateTime registrationDateAndTime;

    @Column(nullable = false)
    private LocalDateTime lastLoginDateAndTime;

    @ManyToMany
    @JoinTable
            (
                    name = "users_roles",
                    joinColumns = {
                            @JoinColumn(name = "user_id", referencedColumnName = "id")
                    },
                    inverseJoinColumns = {
                            @JoinColumn(name = "role_id", referencedColumnName = "id")
                    }
            )
    private List<AppRole> roles;

}
