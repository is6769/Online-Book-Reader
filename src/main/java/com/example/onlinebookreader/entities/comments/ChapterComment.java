package com.example.onlinebookreader.entities.comments;

import com.example.onlinebookreader.entities.Chapter;
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
        name = "chapter_comments"
)
@Data
@NoArgsConstructor
@AllArgsConstructor
@SuperBuilder
public class ChapterComment extends Comment {

    @ManyToOne
    @JoinColumn(
            name = "chapter_id",
            referencedColumnName = "id",
            nullable = false
    )
    private Chapter chapter;

    @ManyToOne
    @JoinColumn(
            name = "parent_comment_id",
            referencedColumnName = "id"
    )
    private ChapterComment parentComment;

    @OneToMany(mappedBy = "parentComment")
    private List<ChapterComment> replies;
}
