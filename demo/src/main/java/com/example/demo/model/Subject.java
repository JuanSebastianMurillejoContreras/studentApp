package com.example.demo.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
@Entity
public class Subject {
    @Id
    @EqualsAndHashCode.Include
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer idSubject;

    private Integer codSubject;

    @Column(length = 35, nullable = false)
    private String nameSubject;

    @ManyToOne
    @JoinColumn(name = "id_teacher", nullable = false, foreignKey = @ForeignKey(name = "FK_SUBJECT_TEACHER"))
    private Teacher teacher;



}
