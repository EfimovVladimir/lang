package com.evv.service;

import com.evv.model.Card;
import com.evv.persistance.IGenericRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@Service
public class CardService implements ICardService {

  @Autowired
  private IGenericRepository repository;

  public IGenericRepository getRepository() {
    return repository;
  }

  @Override
  @Transactional
  public Integer save(Card object) {
    return getRepository().save(object);
  }

}
