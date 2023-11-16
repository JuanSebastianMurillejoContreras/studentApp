package com.example.demo.controller;

import com.example.demo.dto.QualificationDTO;
import com.example.demo.model.Qualification;
import com.example.demo.service.IQualificationService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/qualifications")
@RequiredArgsConstructor
public class QualificationController {

    private final IQualificationService service;
    @Qualifier("defaultMapper")
    private final ModelMapper mapper;

    @GetMapping
    public ResponseEntity <List<QualificationDTO>> readAll() throws Exception{
        List<QualificationDTO> list = service.readAll().stream().map(this::convertToDTO).toList();
        return new ResponseEntity<>(list, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<QualificationDTO> redById(@PathVariable("id") Integer id) throws Exception{
        QualificationDTO obj = convertToDTO(service.readById(id));
        return new ResponseEntity<>(obj, HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<QualificationDTO> create(@Valid @RequestBody QualificationDTO dto) throws Exception{
            Qualification obj = service.save(convertToEntity(dto));
            return new ResponseEntity<>(convertToDTO(obj), HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<QualificationDTO> update (@Valid @RequestBody QualificationDTO dto, @PathVariable("id") Integer id) throws Exception{
        dto.setIdQualification(id);
        Qualification obj = service.update(convertToEntity(dto),id);
        return new ResponseEntity<>(convertToDTO(obj), HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable("id")Integer id) throws Exception{
        service.delete(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    private QualificationDTO convertToDTO(Qualification obj){
        return mapper.map(obj, QualificationDTO.class);
    }
    private Qualification convertToEntity(QualificationDTO dto){
        return mapper.map(dto, Qualification.class);
    }
}
