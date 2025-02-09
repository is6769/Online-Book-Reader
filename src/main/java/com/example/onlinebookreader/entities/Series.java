package com.example.onlinebookreader.entities;

import com.example.onlinebookreader.entities.book.Book;
import com.example.onlinebookreader.entities.security.CommonUser;
import com.example.onlinebookreader.entities.statuses.SeriesStatus;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

import java.util.List;

@Entity
@Table(
        name = "series"
)
@Data
@NoArgsConstructor
@AllArgsConstructor
@SuperBuilder
public class Series {
    @Id
    @GeneratedValue
    private Long id;

    @ManyToOne
    @JoinColumn(
            name = "author_id",
            nullable = false
    )
    private CommonUser author;

    @Column(nullable = false)
    private String name;

    private String description;

    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private SeriesStatus seriesStatus;

    @OneToMany(mappedBy = "series")
    private List<Book> books;


}
