package com.example.onlinebookreader.entities.book;

import com.example.onlinebookreader.entities.*;
import com.example.onlinebookreader.entities.comments.BookComment;
import com.example.onlinebookreader.entities.security.CommonUser;
import com.example.onlinebookreader.entities.statuses.BookStatus;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

import java.time.LocalDateTime;
import java.util.List;


/*
    * The Book entity class represents the book entity in the database.
    * See book.json for the JSON representation of the book entity.
    * {
  "$schema": "http://json-schema.org/draft-07/schema#",
  "type": "object",
  "properties": {
    "id": { "type": "integer" },
    "title": { "type": "string" },
    "author": { "type": "string" },
    "cover": { "type": "string", "format": "uri" },
    "genre": {
      "type": "object",
      "properties": {
        "id": { "type": "integer" },
        "name": { "type": "string" },
        "category": { "type": "string" }
      },
      "required": ["id", "name"]
    },
    "pages": { "type": "integer", "minimum": 1 },
    "language": { "type": "string" },
    "description": { "type": "string" },
    "publishedYear": { "type": "integer" },
    "status": {
      "type": "string",
      "enum": ["finished", "in-progress", "frozen"]
    },
    "isbn": { "type": "string" },
    "publisher": { "type": "string" },
    "format": { "type": "string", "enum": ["Hardcover", "Paperback", "E-book", "Audio"] },
    "fileSize": { "type": "string" },
    "duration": { "type": "string" },
    "categories": { "type": "array", "items": { "type": "string" } },
    "tags": {
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "id": { "type": "integer" },
          "name": { "type": "string" },
          "category": { "type": "string" }
        },
        "required": ["id", "name"]
      }
    },
    "series": {
      "type": "object",
      "properties": {
        "name": { "type": "string" },
        "bookNumber": { "type": "integer" }
      }
    },
    "chapters": {
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "id": { "type": "integer" },
          "title": { "type": "string" },
          "content": { "type": "string" },
          "wordCount": { "type": "integer" },
          "status": { "type": "string", "enum": ["draft", "published", "scheduled"] },
          "orderNumber": { "type": "integer" },
          "lastModified": { "type": "string", "format": "date-time" },
          "scheduledFor": { "type": "string", "format": "date-time" }
        },
        "required": ["id", "title", "content", "orderNumber"]
      }
    },
    "awards": { "type": "array", "items": { "type": "string" } },
    "bookPreview": { "type": "string", "format": "uri" },
    "lastUpdated": { "type": "string", "format": "date-time" },
    "finishedDate": { "type": "string" },
    "comments": {
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "id": { "type": "integer" },
          "userId": { "type": "integer" },
          "content": { "type": "string" },
          "createdAt": { "type": "string", "format": "date-time" },
          "updatedAt": { "type": "string", "format": "date-time" },
          "likes": { "type": "integer" },
          "replies": {
            "type": "array",
            "items": { "$ref": "#/properties/comments/items" }
          }
        },
        "required": ["id", "userId", "content", "createdAt"]
      }
    },
    "metadata": {
      "type": "object",
      "properties": {
        "language": { "type": "string" },
        "targetAudience": { "type": "string" },
        "themes": { "type": "array", "items": { "type": "string" } },
        "contentWarnings": { "type": "array", "items": { "type": "string" } },
        "copyright": { "type": "string" }
      }
    },
    "stats": {
      "type": "object",
      "properties": {
        "rating": { "type": "number", "minimum": 0, "maximum": 5 },
        "readers": { "type": "string" },
        "readersCount": { "type": "integer" },
        "views": { "type": "integer" },
        "uniqueReaders": { "type": "integer" },
        "likes": { "type": "integer" },
        "commentsCount": { "type": "integer" },
        "totalReviews": { "type": "integer" },
        "completionRate": { "type": "number" }
      }
    }
  },
  "required": [
    "id",
    "title",
    "author",
    "cover",
    "genre",
    "pages",
    "language",
    "description",
    "publishedYear",
    "chapters",
    "stats"
  ]
}

 */
@Entity
@Table(
        name = "books"
)
@Data
@NoArgsConstructor
@AllArgsConstructor
@SuperBuilder
public class Book {

    @Id
    @GeneratedValue
    @Column(nullable = false)
    private Long id;

    @Column(nullable = false)
    private String title;

    private Integer price;

    @ManyToOne
    @JoinColumn(
            name = "author_id",
            referencedColumnName = "books",
            nullable = false
    )
    private CommonUser author;

    @Column(nullable = false)
    private String cover;

    @ManyToOne
    @JoinColumn(
            name = "genre_id",
            referencedColumnName = "id",
            nullable = false
    )
    private Genre genre;

    private Integer pages;

    private String language;

    private String description;

    private LocalDateTime publishedAt;

    @Enumerated(EnumType.STRING)
    private BookStatus bookStatus;

    private String isbn;

    private String publisher;

    @Enumerated
    private String format;

    @ManyToMany
    @JoinTable(
            name = "books_tags",
            joinColumns = @JoinColumn(name = "book_id"),
            inverseJoinColumns = @JoinColumn(name = "category_id")
    )
    private List<Tag> tags;

    @ManyToOne
    @JoinColumn(
            name = "series_id",
            referencedColumnName = "id",
            nullable = false
    )
    private Series series;

    @OneToMany(mappedBy = "book")
    private List<Review> reviews;

    @OneToMany(mappedBy = "book")
    private List<Chapter> chapters;

    private String awards;

    private String bookPreview;

    @Column(nullable = false)
    private LocalDateTime lastUpdated;

    @OneToMany(mappedBy = "book")
    private List<BookComment> bookComments;

    @Embedded
    private BookMetadata bookMetadata;

    @Embedded
    private BookStats stats;

}
