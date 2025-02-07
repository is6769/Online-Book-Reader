package com.example.onlinebookreader.entities;

import com.example.onlinebookreader.entities.book.Book;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

import java.util.List;

@Entity
@Table(
        name = "genres"
)
@Data
@NoArgsConstructor
@AllArgsConstructor
@SuperBuilder
public class Genre {
    @Id
    @GeneratedValue
    private Long id;

    @Column(nullable = false)
    private String name;

    @OneToMany(mappedBy = "genre")
    private List<Book> books;
}
