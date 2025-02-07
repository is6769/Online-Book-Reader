package com.example.onlinebookreader.entities.security;


import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

@EqualsAndHashCode(callSuper = true)
@Entity
@Table(
        name = "admin_users"
)
@Data
@NoArgsConstructor
@AllArgsConstructor
@SuperBuilder
public class AdminUser extends User{

    private String alias;
}
