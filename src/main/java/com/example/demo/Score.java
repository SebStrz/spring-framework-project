package com.example.demo;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "scores")
public class Score {
    @Id
    @GeneratedValue( strategy = GenerationType.IDENTITY)
    private Long Id_score;

    private String game;


    private LocalDate score_date;
    private int score;

    @ManyToOne
    @JoinColumn(name = "id_user")
    @JsonIgnoreProperties({"scores"})
    private User user;
}
