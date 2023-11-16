package com.example.demo.controller;

import com.example.demo.dto.SubjectDTO;
import com.example.demo.model.Subject;
import com.example.demo.service.ISubjectService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/subjects")
@RequiredArgsConstructor
public class SubjectController {

    private final ISubjectService service;
    @Qualifier("defaultMapper")
    private final ModelMapper mapper;

    @GetMapping
    public ResponseEntity <List<SubjectDTO>> readAll() throws Exception{
        List<SubjectDTO> list = service.readAll().stream().map(this::convertToDTO).toList();
        return new ResponseEntity<>(list, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<SubjectDTO> redById(@PathVariable("id") Integer id) throws Exception{
        SubjectDTO obj = convertToDTO(service.readById(id));
        return new ResponseEntity<>(obj, HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<SubjectDTO> create(@Valid @RequestBody SubjectDTO dto) throws Exception{
            Subject obj = service.save(convertToEntity(dto));
            return new ResponseEntity<>(convertToDTO(obj), HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<SubjectDTO> update (@Valid @RequestBody SubjectDTO dto, @PathVariable("id") Integer id) throws Exception{
        dto.setIdSubject(id);
        Subject obj = service.update(convertToEntity(dto),id);
        return new ResponseEntity<>(convertToDTO(obj), HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable("id")Integer id) throws Exception{
        service.delete(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    private SubjectDTO convertToDTO(Subject obj){
        return mapper.map(obj, SubjectDTO.class);
    }
    private Subject convertToEntity(SubjectDTO dto){
        return mapper.map(dto, Subject.class);
    }
}
