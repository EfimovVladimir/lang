package com.evv.service;

import com.evv.model.Card;
import com.evv.model.Section;
import com.evv.persistance.IGenericRepository;
import org.hibernate.Criteria;
import org.hibernate.criterion.DetachedCriteria;
import org.hibernate.criterion.Restrictions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

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

  @Override
  @Transactional
  public List<Card> findAllCards() {
    return getRepository().findAll(Card.class);
  }

  @Override
  @Transactional
  public List<Card> findAllSectionsCards(Section section) {
    DetachedCriteria criteria = DetachedCriteria.forClass(Card.class).
      add(Restrictions.eq("section", section));
    criteria.setResultTransformer(Criteria.DISTINCT_ROOT_ENTITY);
    return getRepository().findByCriteria(criteria);
//    String hsql = "from Card card where card.section = ?";
//    return getRepository().findByQuery(hsql, section);
  }

  @Override
  @Transactional
  public void deleteCard(Card card) {
    getRepository().delete(card);
  }

  @Override
  @Transactional
  public void saveOrUpdateCard(Card card) {
    getRepository().saveOrUpdate(card);
  }

}
