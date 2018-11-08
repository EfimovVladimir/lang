package com.evv.service;

import com.evv.model.Card;
import com.evv.model.Lesson;
import com.evv.model.LessonCard;
import com.evv.model.User;
import com.evv.persistance.IGenericRepository;
import org.hibernate.criterion.DetachedCriteria;
import org.hibernate.criterion.Projections;
import org.hibernate.criterion.Restrictions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

@Service
public class UserService implements IUserService {

  @Autowired
  private IGenericRepository repository;

  public IGenericRepository getRepository() {
    return repository;
  }

  @Override
  @Transactional
  public User getUserById(Integer id) {
    return getRepository().get(User.class, id);
  }

  @Override
  @Transactional
  public List<User> findAllUsers() {
    return getRepository().findAll(User.class);
  }

  @Override
  @Transactional
  public void saveOrUpdateUser(User object) {
    getRepository().saveOrUpdate(object);
  }

  @Override
  @Transactional
  public Integer save(User object) {
    return getRepository().save(object);
  }

  @Override
  @Transactional
  public void deleteUser(User object) {
    getRepository().delete(object);
  }

  @Override
  @Transactional
  public List<User> findEnabledUsers(User user) {
    DetachedCriteria criteria = DetachedCriteria.forClass(User.class);
    criteria.add(Restrictions.eq("login", user.getLogin()));
    criteria.add(Restrictions.eq("password", user.getPassword()));
    criteria.add(Restrictions.eq("enabled", true));
    return getRepository().findByCriteria(criteria);
  }

  @Override
  @Transactional
  public User findOneByUsername(String login) {
    DetachedCriteria criteria = DetachedCriteria.forClass(User.class);
    criteria.add(Restrictions.eq("login", login));
    criteria.add(Restrictions.eq("enabled", true));
    List<User> users = getRepository().findByCriteria(criteria);
    return users.isEmpty() ? null : users.get(0);
  }

}
