package com.example.onlinebookreader.entities;

import com.example.onlinebookreader.entities.book.Book;
import com.example.onlinebookreader.entities.security.CommonUser;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

import java.time.LocalDateTime;

@Entity
@Table(
        name = "reviews"
)
@Data
@NoArgsConstructor
@AllArgsConstructor
@SuperBuilder
public class Review {

    @Id
    @GeneratedValue
    private Long id;

    @ManyToOne
    @JoinColumn(
            name = "author_id",
            referencedColumnName = "id",
            nullable = false
    )
    private CommonUser author;

    private String title;

    private String content;

    private Integer wordsCount;

    private String status;

    private LocalDateTime lastModified;

    @ManyToOne
    @JoinColumn(
            name = "book_id",
            referencedColumnName = "id",
            nullable = false
    )
    private Book book;

}
