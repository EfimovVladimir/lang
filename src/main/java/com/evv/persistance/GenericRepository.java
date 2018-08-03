package com.evv.persistance;

import org.hibernate.Criteria;
import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.criterion.DetachedCriteria;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class GenericRepository implements IGenericRepository {

  @Autowired
  private SessionFactory sessionFactory;

  @Override
  public final Session getCurrentSession() {
    return sessionFactory.getCurrentSession();
  }

  @Override
  public <T> T get(Class<T> c, Integer id) {
    return (T) getCurrentSession().get(c, id);
  }

  @Override
  public <T> Integer save(T entity) {
    return (Integer) getCurrentSession().save(entity);
  }

  @Override
  public <T> void update(T entity) {
    getCurrentSession().update(entity);
  }

  @Override
  public <T> void saveOrUpdate(T entity) {
    getCurrentSession().saveOrUpdate(entity);
  }

  @Override
  public <T> List<T> findAll(Class<T> clazz) {
    Criteria criteria = getCurrentSession().createCriteria(clazz);
    criteria.setResultTransformer(Criteria.DISTINCT_ROOT_ENTITY);
    return criteria.list();
  }

  @Override
  public <T> void delete(T entity) {
    getCurrentSession().delete(entity);
  }

  @Override
  public <T> List<T> findByCriteria(DetachedCriteria criteria) {
    Criteria executableCriteria = criteria.getExecutableCriteria(getCurrentSession());
//    executableCriteria.setResultTransformer(Criteria.DISTINCT_ROOT_ENTITY);
    return executableCriteria.list();
  }

  @Override
  public <T> List<T> findByCriteria(DetachedCriteria criteria, int first, int count) {
    Criteria executableCriteria = criteria.getExecutableCriteria(getCurrentSession());
//    executableCriteria.setResultTransformer(Criteria.DISTINCT_ROOT_ENTITY);
    executableCriteria.setFirstResult(first);
    executableCriteria.setMaxResults(count);
    return executableCriteria.list();
  }

  @Override
  public <T> List<T> findByQuery(String queryString, Object... params) {
    Query query = getCurrentSession().createQuery(queryString);
    if (params != null) {
      for (int i = 0; i < params.length; i++) {
        query.setParameter(i, params[i]);
      }
    }
    return query.list();
  }

}
