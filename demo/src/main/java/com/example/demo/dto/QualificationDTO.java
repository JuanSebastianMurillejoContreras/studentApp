package com.example.demo.dto;

import com.example.demo.model.Student;
import com.example.demo.model.Subject;
import com.example.demo.model.Teacher;
import com.fasterxml.jackson.annotation.JsonInclude;
import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
@EqualsAndHashCode(onlyExplicitlyIncluded = true)

public class QualificationDTO {
    @EqualsAndHashCode.Include
    private Integer idQualification;

    @NotNull
    private Student student;

    @NotNull
    private Teacher teacher;

    @NotNull
    private Subject subject;

    @Min(0)
    @Max(100)
    private Double note;






}
