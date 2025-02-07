package com.example.onlinebookreader.entities.security;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

import java.util.List;

@Entity
@Table(
        name = "app_roles",
        uniqueConstraints = {
                @UniqueConstraint(name = "c_u_app_role_name",columnNames = {"name"})
        }
)
@Data
@NoArgsConstructor
@AllArgsConstructor
@SuperBuilder
public class AppRole{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @ManyToMany
    @JoinTable
            (
                    name = "roles_authorities",
                    joinColumns = {
                            @JoinColumn(name = "app_role_id", referencedColumnName = "id")
                    },
                    inverseJoinColumns = {
                            @JoinColumn(name = "app_authority_id", referencedColumnName = "id")
                    }
            )
    private List<AppAuthority> authorities;

    @ManyToMany(mappedBy = "roles")
    private List<User> users;

}
