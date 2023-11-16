package com.example.demo.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
@JsonInclude(JsonInclude.Include.NON_NULL)
public class CourseDTO {
    @EqualsAndHashCode.Include
    private Integer idCourse;

    @NotNull
    @NotEmpty
    @Size(min = 1, max = 10)
    private String numClassroom;

    @NotNull
    @NotEmpty
    @Size(min = 2, max = 35)
    private String courseManager;

    @NotNull
    @NotEmpty
    @Size(min = 2, max = 35)
    private String courseMonitor;


}
