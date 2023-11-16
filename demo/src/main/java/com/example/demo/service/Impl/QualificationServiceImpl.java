package com.example.demo.service.Impl;

import com.example.demo.model.Course;
import com.example.demo.model.Qualification;
import com.example.demo.repo.ICourseRepo;
import com.example.demo.repo.IGenericRepo;
import com.example.demo.repo.IQualificationRepo;
import com.example.demo.service.ICourseService;
import com.example.demo.service.IQualificationService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class QualificationServiceImpl extends CRUDImpl<Qualification, Integer> implements IQualificationService{

    private final IQualificationRepo repo;
    @Override
    protected IGenericRepo<Qualification, Integer> getRepo() {
        return repo;
    }
}
