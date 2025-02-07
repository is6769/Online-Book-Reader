package com.example.onlinebookreader.entities.book;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

@Embeddable
@Data
@NoArgsConstructor
@AllArgsConstructor
@SuperBuilder
public class BookMetadata {

    private String language;

    private String targetAudience;

    private String contentWarning;

    private String copyright;
}
