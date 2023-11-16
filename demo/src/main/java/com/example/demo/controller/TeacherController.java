package com.example.demo.controller;

import com.example.demo.dto.TeacherDTO;
import com.example.demo.model.Teacher;
import com.example.demo.service.ITeacherService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/teachers")
@RequiredArgsConstructor
public class TeacherController {

    private final ITeacherService service;
    @Qualifier("defaultMapper")
    private final ModelMapper mapper;

    @GetMapping
    public ResponseEntity <List<TeacherDTO>> readAll() throws Exception{
        List<TeacherDTO> list = service.readAll().stream().map(this::convertToDTO).toList();
        return new ResponseEntity<>(list, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<TeacherDTO> redById(@PathVariable("id") Integer id) throws Exception{
        TeacherDTO obj = convertToDTO(service.readById(id));
        return new ResponseEntity<>(obj, HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<TeacherDTO> create(@Valid @RequestBody TeacherDTO dto) throws Exception{
            Teacher obj = service.save(convertToEntity(dto));
            return new ResponseEntity<>(convertToDTO(obj), HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<TeacherDTO> update (@Valid @RequestBody TeacherDTO dto, @PathVariable("id") Integer id) throws Exception{
        dto.setIdTeacher(id);
        Teacher obj = service.update(convertToEntity(dto),id);
        return new ResponseEntity<>(convertToDTO(obj), HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable("id")Integer id) throws Exception{
        service.delete(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    private TeacherDTO convertToDTO(Teacher obj){
        return mapper.map(obj, TeacherDTO.class);
    }
    private Teacher convertToEntity(TeacherDTO dto){
        return mapper.map(dto, Teacher.class);
    }
}
