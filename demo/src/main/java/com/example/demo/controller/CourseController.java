package com.example.demo.controller;

import com.example.demo.dto.CourseDTO;
import com.example.demo.model.Course;
import com.example.demo.service.ICourseService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/courses")
@RequiredArgsConstructor
public class CourseController {

    private final ICourseService service;
    @Qualifier("defaultMapper")
    private final ModelMapper mapper;

    @GetMapping
    public ResponseEntity <List<CourseDTO>> readAll() throws Exception{
        List<CourseDTO> list = service.readAll().stream().map(this::convertToDTO).toList();
        return new ResponseEntity<>(list, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<CourseDTO> redById(@PathVariable("id") Integer id) throws Exception{
        CourseDTO obj = convertToDTO(service.readById(id));
        return new ResponseEntity<>(obj, HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<CourseDTO> create(@Valid @RequestBody CourseDTO dto) throws Exception{
            Course obj = service.save(convertToEntity(dto));
            return new ResponseEntity<>(convertToDTO(obj), HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<CourseDTO> update (@Valid @RequestBody CourseDTO dto, @PathVariable("id") Integer id) throws Exception{
        dto.setIdCourse(id);
        Course obj = service.update(convertToEntity(dto),id);
        return new ResponseEntity<>(convertToDTO(obj), HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable("id")Integer id) throws Exception{
        service.delete(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    private CourseDTO convertToDTO(Course obj){
        return mapper.map(obj, CourseDTO.class);
    }
    private Course convertToEntity(CourseDTO dto){
        return mapper.map(dto, Course.class);
    }
}
