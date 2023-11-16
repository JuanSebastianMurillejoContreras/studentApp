package com.example.demo.service;

import java.util.List;

public interface ICRUD<T, ID>{

    T save (T t) throws Exception;
    List<T> readAll() throws Exception;
    T readById(ID id) throws Exception;
    T update(T t, ID id) throws Exception;
    void delete(ID id) throws Exception;


}
