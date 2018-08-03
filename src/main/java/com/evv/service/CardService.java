package com.evv.service;

import com.evv.model.*;
import com.evv.persistance.IGenericRepository;
import org.hibernate.Criteria;
import org.hibernate.criterion.*;
import org.hibernate.sql.JoinType;
import org.hibernate.transform.Transformers;
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
    criteria.addOrder(Order.asc("question").ignoreCase());
    criteria.setResultTransformer(Criteria.DISTINCT_ROOT_ENTITY);
    return getRepository().findByCriteria(criteria);
//    String hsql = "from Card card where card.section = ?";
//    return getRepository().findByQuery(hsql, section);
  }

  @Override
  @Transactional
  public List<Card> findAllCardsForLesson(Lesson lesson) {
    DetachedCriteria criteria = DetachedCriteria.forClass(LessonCard.class);
    criteria.add(Restrictions.eq("lesson", lesson))
        .setProjection(Projections.property("card"));
    return getRepository().findByCriteria(criteria);
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

  @Override
  @Transactional
  public List<Card> findCardsByFilter(CardFilter cardFilter) {
//    DetachedCriteria criteria = DetachedCriteria.forClass(LessonCard.class);
//    criteria.createAlias("card", "crd");
//    if(!cardFilter.getQuestion().isEmpty()){
//      criteria.add(Restrictions.like("crd.question", cardFilter.getQuestion(), MatchMode.START));
//    }
//    if(cardFilter.getSectionId() > 0){
//      criteria.add(Restrictions.eq("crd.section.id", cardFilter.getSectionId()));
//    }
//    criteria.setProjection(Projections.property("card"));

    DetachedCriteria criteria = DetachedCriteria.forClass(Card.class);
    if(!cardFilter.getQuestion().isEmpty()){
      criteria.add(Restrictions.like("question", cardFilter.getQuestion(), MatchMode.START));
    }
    if(cardFilter.getSectionId() > 0){
      criteria.add(Restrictions.eq("section.id", cardFilter.getSectionId()));
    }
    criteria.addOrder(Order.asc("question").ignoreCase());
    criteria.setResultTransformer(Criteria.DISTINCT_ROOT_ENTITY);
    return getRepository().findByCriteria(criteria, 0, 12);
  }

}
