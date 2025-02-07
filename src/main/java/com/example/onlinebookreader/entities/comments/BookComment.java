package com.example.onlinebookreader.entities.comments;

import com.example.onlinebookreader.entities.book.Book;
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
        name = "book_comments"
)
@Data
@NoArgsConstructor
@AllArgsConstructor
@SuperBuilder
public class BookComment extends Comment {

    @ManyToOne
    @JoinColumn(
            name = "book_id",
            referencedColumnName = "id",
            nullable = false
    )
    private Book book;

    @ManyToOne
    @JoinColumn(
            name = "parent_comment_id",
            referencedColumnName = "id"
    )
    private BookComment parentComment;

    @OneToMany(mappedBy = "parentComment")
    private List<BookComment> replies;
}
