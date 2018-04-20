package com.evv.service;

import com.evv.model.Section;
import com.evv.persistance.IGenericRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class SectionService implements ISectionService{

  @Autowired
  private IGenericRepository repository;

  public IGenericRepository getRepository() {
    return repository;
  }

  @Override
  public Section getById(Integer id) {
    return getRepository().get(Section.class, id);
  }

}
