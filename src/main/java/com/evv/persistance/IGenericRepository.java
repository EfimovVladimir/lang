package com.evv.persistance;

import java.util.List;

public interface IGenericRepository {

  <T> T get(Class<T> c, Integer id);
  <T> List<T> findAll(Class<T> clazz);

}
