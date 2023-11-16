package com.example.demo.service.Impl;

import com.example.demo.model.Teacher;
import com.example.demo.repo.ITeacherRepo;
import com.example.demo.repo.IGenericRepo;
import com.example.demo.service.ITeacherService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class TeacherServiceImpl extends CRUDImpl<Teacher, Integer> implements ITeacherService {

    private final ITeacherRepo repo;
    @Override
    protected IGenericRepo<Teacher, Integer> getRepo() {
        return repo;
    }
}
