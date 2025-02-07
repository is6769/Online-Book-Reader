package com.example.onlinebookreader.entities.security;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

import java.util.List;

@Entity
@Table(
        name = "app_authorities",
        uniqueConstraints = {
            @UniqueConstraint(name = "c_u_app_authority_name",columnNames = {"name"})
        }
)
@Data
@NoArgsConstructor
@AllArgsConstructor
@SuperBuilder
public class AppAuthority {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @ManyToMany(mappedBy = "authorities")
    private List<AppRole> roles;

}
