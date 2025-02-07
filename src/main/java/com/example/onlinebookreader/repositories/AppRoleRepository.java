package com.example.onlinebookreader.repositories;

import com.example.onlinebookreader.entities.security.AppRole;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AppRoleRepository extends JpaRepository<AppRole, Long> {

    @Override
    List<AppRole> findAll();
}
