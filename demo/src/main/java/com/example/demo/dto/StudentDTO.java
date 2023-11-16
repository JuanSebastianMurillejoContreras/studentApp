package com.example.demo.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@AllArgsConstructor
@NoArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
public class StudentDTO {

    private Integer idStudent;

    @NotNull
    @Size(min = 8, max = 10)
    private String dni;

    @NotNull
    @Size(min = 2, max = 35)
    private String fistName;

    @NotNull
    @Size(min = 2, max = 35)
    private String lastName;

    @NotNull
    @Size(min = 1, max = 10)
    private String gender;

    private int age;

    @NotNull
    private LocalDate birthDate;






}
