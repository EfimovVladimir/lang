package com.evv.persistance;

import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;

@Repository
public class GenericRepository implements IGenericRepository {

  @Autowired
  private SessionFactory sessionFactory;

  protected final Session getCurrentSession() {
    return sessionFactory.getCurrentSession();
  }

  @Override
  @Transactional
  public <T> T get(Class<T> c, Integer id) {
    return (T) getCurrentSession().get(c, id);
  }
}
