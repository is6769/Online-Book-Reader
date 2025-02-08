package com.example.onlinebookreader.entities;

import com.example.onlinebookreader.entities.book.Book;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

import java.time.LocalDateTime;

@Entity
@Table(
        name = "chapters"
)
@Data
@NoArgsConstructor
@AllArgsConstructor
@SuperBuilder
public class Chapter {

    @Id
    @GeneratedValue
    private Long id;

    private String title;

    private String content;

    private Integer wordsCount;

    private String status;

    private Integer orderNumber;

    private LocalDateTime lastModified;

    private LocalDateTime scheduledFor;

    private LocalDateTime publishedAt;

    @ManyToOne
    @JoinColumn(
            name = "book_id",
            referencedColumnName = "id",
            nullable = false
    )
    private Book book;

}
