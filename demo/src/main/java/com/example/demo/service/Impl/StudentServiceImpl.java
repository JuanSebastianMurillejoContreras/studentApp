package com.example.demo.service.Impl;

import com.example.demo.model.Course;
import com.example.demo.model.Student;
import com.example.demo.repo.ICourseRepo;
import com.example.demo.repo.IGenericRepo;
import com.example.demo.repo.IStudentRepo;
import com.example.demo.service.ICourseService;
import com.example.demo.service.IStudentService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class StudentServiceImpl extends CRUDImpl<Student, Integer> implements IStudentService{

    private final IStudentRepo repo;
    @Override
    protected IGenericRepo<Student, Integer> getRepo() {
        return repo;
    }
}
