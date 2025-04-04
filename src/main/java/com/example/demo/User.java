package com.example.demo;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "users")
public class User{
	@Id
	@GeneratedValue( strategy = GenerationType.IDENTITY)
	private Long Id;
	
	private String imie;
	private String email;
}
