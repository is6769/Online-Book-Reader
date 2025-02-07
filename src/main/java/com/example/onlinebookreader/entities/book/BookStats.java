package com.example.onlinebookreader.entities.book;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

@Embeddable
@Data
@NoArgsConstructor
@AllArgsConstructor
@SuperBuilder
public class BookStats {

    @Column(nullable = false)
    private Integer rating;

    @Column(nullable = false)
    private Integer readersNumber;

    @Column(nullable = false)
    private Integer views;

    @Column(nullable = false)
    private Integer likes;

    @Column(nullable = false)
    private Integer commentsCount;

    @Column(nullable = false)
    private Integer reviewsCount;


}
