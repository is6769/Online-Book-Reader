package com.example.onlinebookreader.repositories;

import com.example.onlinebookreader.entities.book.Book;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BookRepository extends JpaRepository<Book, Long> {

    @Override
    List<Book> findAll();

    List<Book> findTop20ByOrderByLastUpdatedDesc();
}
