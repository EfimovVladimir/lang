package com.evv.persistance;

import org.hibernate.Session;
import org.hibernate.criterion.DetachedCriteria;
import org.hibernate.criterion.Order;

import java.io.Serializable;
import java.util.List;

public interface IGenericRepository {

  Session getCurrentSession();

  <T> T get(Class<T> c, Integer id);

  <T> Integer save(T entity);

  <T> void update(T entity);

  <T> void saveOrUpdate(T entity);

  <T> List<T> findAll(Class<T> clazz);

  <T> void delete(T entity);

  <T> List<T> findByCriteria(DetachedCriteria criteria);

  <T> List<T> findPageEntitiesByCriteria(DetachedCriteria criteria, Class<T> clazz, Order order, int first, int count);

  <T> List<T> findByQuery(String query, Object... params);

  long countRows(DetachedCriteria criteria);

  <T> T findByCriteriaSingle(DetachedCriteria criteria);

}
