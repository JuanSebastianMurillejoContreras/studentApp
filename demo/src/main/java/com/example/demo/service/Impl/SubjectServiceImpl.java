package com.example.demo.service.Impl;

import com.example.demo.model.Subject;
import com.example.demo.repo.ISubjectRepo;
import com.example.demo.repo.IGenericRepo;
import com.example.demo.service.ISubjectService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class SubjectServiceImpl extends CRUDImpl<Subject, Integer> implements ISubjectService {

    private final ISubjectRepo repo;
    @Override
    protected IGenericRepo<Subject, Integer> getRepo() {
        return repo;
    }
}
