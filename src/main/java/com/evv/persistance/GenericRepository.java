package com.evv.persistance;

import org.hibernate.Criteria;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;
import java.util.List;

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

  @Override
  @Transactional
  public <T> List<T> findAll(Class<T> clazz) {
    Criteria criteria = getCurrentSession().createCriteria(clazz);
    criteria.setResultTransformer(Criteria.DISTINCT_ROOT_ENTITY);
    return criteria.list();
  }

}
