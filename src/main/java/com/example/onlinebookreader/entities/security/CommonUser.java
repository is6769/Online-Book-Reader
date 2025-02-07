package com.example.onlinebookreader.entities.security;

import com.example.onlinebookreader.entities.book.Book;
import com.example.onlinebookreader.entities.Review;
import com.example.onlinebookreader.entities.Series;
import com.example.onlinebookreader.entities.comments.BookComment;
import com.example.onlinebookreader.entities.comments.ChapterComment;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

import java.util.List;

@EqualsAndHashCode(callSuper = true)
@Entity
@Table(
        name = "common_users"
)
@Data
@NoArgsConstructor
@AllArgsConstructor
@SuperBuilder
public class CommonUser extends User{

    @OneToMany(mappedBy = "author")
    private List<Book> books;

    @OneToMany(mappedBy = "author")
    private List<BookComment> bookComments;

    @OneToMany(mappedBy = "author")
    private List<ChapterComment> chapterComments;

    @OneToMany(mappedBy = "author")
    private List<Review> reviews;

    @OneToMany(mappedBy = "author")
    private List<Series> series;

}
