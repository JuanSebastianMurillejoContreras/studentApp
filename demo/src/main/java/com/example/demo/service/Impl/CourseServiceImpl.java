package com.example.demo.service.Impl;

import com.example.demo.model.Course;
import com.example.demo.repo.ICourseRepo;
import com.example.demo.repo.IGenericRepo;
import com.example.demo.service.ICourseService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CourseServiceImpl extends CRUDImpl<Course, Integer> implements ICourseService {

    private final ICourseRepo repo;
    @Override
    protected IGenericRepo<Course, Integer> getRepo() {
        return repo;
    }
}
