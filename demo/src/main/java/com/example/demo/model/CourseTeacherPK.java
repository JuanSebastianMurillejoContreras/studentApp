package com.example.demo.model;

import jakarta.persistence.Embeddable;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.EqualsAndHashCode;

import java.io.Serializable;

@Embeddable
@EqualsAndHashCode
public class CourseTeacherPK implements Serializable {
    @ManyToOne
    @JoinColumn(name = "id_course", nullable = false)
    private Course course;
    @ManyToOne
    @JoinColumn(name = "id_teacher", nullable = false)
    private Teacher teacher;
}
