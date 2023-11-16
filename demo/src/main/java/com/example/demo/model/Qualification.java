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
public class Qualification {
    @Id
    @EqualsAndHashCode.Include
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer idQualification;

    @ManyToOne
    @JoinColumn(name = "id_student", nullable = false, foreignKey = @ForeignKey(name = "FK_QUALIFICATION_STUDENT"))
    private Student student;

    @ManyToOne
    @JoinColumn(name = "id_teacher", nullable = false, foreignKey = @ForeignKey(name = "FK_QUALIFICATION_TEACHER"))
    private Teacher teacher;

    @ManyToOne
    @JoinColumn(name = "id_subject", nullable = false, foreignKey = @ForeignKey(name = "FK_QUALIFICATION_SUBJECT"))
    private Subject subject;

    private double note;



}
