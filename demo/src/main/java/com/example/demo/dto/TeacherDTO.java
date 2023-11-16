package com.example.demo.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonIncludeProperties;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@AllArgsConstructor
@NoArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
public class TeacherDTO {
    @JsonIncludeProperties(value = {"idTeacher"})
    private Integer idTeacher;

    @NotNull
    @Size(min = 8, max = 10)
    private String dni;

    @NotNull
    @Size(min = 2, max = 35)
    private String fistName;

    @NotNull
    @Size(min = 2, max = 25)
    private String lastName;

    @NotNull
    @Size(min = 8, max = 10)
    private String gender;

    private int age;

    @NotNull
    private LocalDate birthDate;

}
