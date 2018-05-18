package com.evv.service;

import com.evv.model.Tag;
import com.evv.persistance.IGenericRepository;
import org.hibernate.Hibernate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

@Service
public class TagService implements ITagService {

  @Autowired
  private IGenericRepository repository;

  public IGenericRepository getRepository() {
    return repository;
  }

  @Override
  @Transactional
  public Tag getTagById(Integer id) {
    return getRepository().get(Tag.class, id);
  }

  @Override
  @Transactional
  public List<Tag> findAllTags() {
    return getRepository().findAll(Tag.class);
  }

  @Override
  @Transactional
  public void saveOrUpdateTag(Tag object) {
    getRepository().saveOrUpdate(object);
  }

  @Override
  @Transactional
  public Integer save(Tag object) {
    return getRepository().save(object);
  }

  @Override
  @Transactional
  public void deleteTag(Tag object) {
    getRepository().delete(object);
  }
}
