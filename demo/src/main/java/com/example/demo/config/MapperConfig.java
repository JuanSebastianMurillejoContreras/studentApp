package com.example.demo.config;

import com.example.demo.dto.CourseDTO;
import com.example.demo.model.Course;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeMap;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class MapperConfig {

    @Bean("courseMapper")
    public ModelMapper courseMapper(){
        ModelMapper mapper = new ModelMapper();
        TypeMap<Course, CourseDTO> typeMap1 = mapper.createTypeMap(Course.class, CourseDTO.class);
        typeMap1.addMapping(Course::getCourseManager, (dest, v) -> dest.setCourseManager((String)v));

        TypeMap<CourseDTO, Course> typeMap2 = mapper.createTypeMap(CourseDTO.class, Course.class);
        typeMap2.addMapping(CourseDTO::getCourseMonitor, (dest, v) -> dest.setCourseMonitor((String)v));
        return mapper;
    }

    @Bean
    public ModelMapper defaultMapper(){
        return new ModelMapper();
    }
}
