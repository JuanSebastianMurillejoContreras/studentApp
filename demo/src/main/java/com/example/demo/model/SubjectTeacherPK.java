package com.example.demo.model;

import jakarta.persistence.Embeddable;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.EqualsAndHashCode;

import java.io.Serializable;

@Embeddable
@EqualsAndHashCode
public class SubjectTeacherPK implements Serializable {
    @ManyToOne
    @JoinColumn(name = "id_subject", nullable = false)
    private Subject subject;
    @ManyToOne
    @JoinColumn(name = "id_teacher", nullable = false)
    private Teacher teacher;
}
