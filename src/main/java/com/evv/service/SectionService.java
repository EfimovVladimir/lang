package com.evv.service;

import com.evv.model.Section;
import com.evv.persistance.IGenericRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

@Service
public class SectionService implements ISectionService{

  @Autowired
  private IGenericRepository repository;

  public IGenericRepository getRepository() {
    return repository;
  }

  @Override
  @Transactional
  public Section getSectionById(Integer id) {
    return getRepository().get(Section.class, id);
  }

  @Override
  @Transactional
  public List<Section> findAllSections() {
    return getRepository().findAll(Section.class);
  }

  @Override
  @Transactional
  public void saveOrUpdateSection(Section object) {
    getRepository().saveOrUpdate(object);
  }

  @Override
  @Transactional
  public Integer save(Section object) {
    return getRepository().save(object);
  }

}
