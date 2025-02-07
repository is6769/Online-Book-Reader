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
        name = "tags"
)
@Data
@NoArgsConstructor
@AllArgsConstructor
@SuperBuilder
public class Tag {
    @Id
    @GeneratedValue
    private Long id;

    @Column(nullable = false)
    private String name;

    @ManyToMany(mappedBy = "tags")
    private List<Book> books;
}
