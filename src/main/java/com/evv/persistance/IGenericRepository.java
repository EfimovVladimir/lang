package com.evv.persistance;

public interface IGenericRepository {

  <T> T get(Class<T> c, Integer id);

}
