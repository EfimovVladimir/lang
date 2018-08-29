package com.evv.persistance;

import com.evv.model.Card;
import com.evv.model.IdBean;
import org.hibernate.Criteria;
import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.criterion.*;
import org.hibernate.transform.Transformers;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.Collection;
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
    executableCriteria.setResultTransformer(Criteria.DISTINCT_ROOT_ENTITY);
    return executableCriteria.list();
  }

  @Override
  public <T> List<T> findPageEntitiesByCriteria(DetachedCriteria criteria, Class<T> clazz, Order order, int first, int count) {
    List<Integer>  ids = findPageIdsByCriteria(criteria, order, first, count);
    Criteria execCriteria = getCurrentSession().createCriteria(clazz);
    execCriteria.setResultTransformer(Criteria.DISTINCT_ROOT_ENTITY);
//    criteria.add(Subqueries.propertyIn("id", filterCriteria));
    execCriteria.add(Restrictions.in(Projections.id().toString(), ids));
    execCriteria.addOrder(order);
    return execCriteria.list();
  }

  private List<Integer> findPageIdsByCriteria(DetachedCriteria criteria, Order order, int first, int count) {
    Criteria filterCriteria = criteria.getExecutableCriteria(getCurrentSession());
    filterCriteria.setProjection(Projections.projectionList()
        .add(Projections.groupProperty(Projections.id().toString()), "id")
        .add(Projections.min(order.getPropertyName())));
    filterCriteria.addOrder(order);
    filterCriteria.setMaxResults(count);
    filterCriteria.setFirstResult(first);
    filterCriteria.setResultTransformer(Transformers.aliasToBean(IdBean.class));
    List<IdBean> idCards = filterCriteria.list();
    List<Integer> ids = new ArrayList<>();
    for(IdBean card : idCards){
      ids.add(card.getId());
    }
    return ids;
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

  @Override
  public <T> T findByCriteriaSingle(DetachedCriteria criteria) {
    Criteria executableCriteria = criteria.getExecutableCriteria(getCurrentSession());
    List<T> objects = executableCriteria.list();
    return objects.isEmpty()? null : objects.get(0);
  }

  @Override
  public long countRows(DetachedCriteria criteria) {
    criteria.setProjection(Projections.rowCount());
    return this.<Long>findByCriteriaSingle(criteria).longValue();
  }
}
