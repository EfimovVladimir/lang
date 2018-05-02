package com.evv.persistance;

import java.util.List;

public interface IGenericRepository {

  <T> T get(Class<T> c, Integer id);

  <T> Integer save(T entity);

  <T> void update(T entity);

  <T> void saveOrUpdate(T entity);

  <T> List<T> findAll(Class<T> clazz);

  <T> void delete(T entity);

}
