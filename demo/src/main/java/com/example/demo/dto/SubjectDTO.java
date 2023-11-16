package com.example.demo.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
public class SubjectDTO {
    @EqualsAndHashCode.Include
    private Integer idSubject;

    @EqualsAndHashCode.Include
    private Integer codSubject;

    @NotNull
    @Size(min = 1, max = 35)
    private String nameSubject;

    @NotNull
    private TeacherDTO teacher;

}
