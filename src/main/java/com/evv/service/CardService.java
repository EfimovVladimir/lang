package com.evv.service;

import com.evv.criteria.CardCriteria;
import com.evv.model.*;
import com.evv.persistance.IGenericRepository;
import org.hibernate.Criteria;
import org.hibernate.criterion.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

@Service
public class CardService implements ICardService {

  @Autowired
  private IGenericRepository repository;

  @Autowired
  private CardCriteria cardCriteria;

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
    Order order = Order.asc("question").ignoreCase();
    DetachedCriteria criteria = cardCriteria.getCriteria(cardFilter);
    criteria.addOrder(order);
    return getRepository().findByCriteria(criteria);
  }

  @Override
  @Transactional
  public List<Card> findRangeCardsByFilter(CardFilter cardFilter, int from, int sizePage) {
    Order order = Order.asc("question").ignoreCase();
    DetachedCriteria filter = cardCriteria.getCriteria(cardFilter);
    return getRepository().findPageEntitiesByCriteria(filter, Card.class, order, from, sizePage);
  }

  @Override
  @Transactional
  public long rowCountCardsByFilter(CardFilter cardFilter) {
    return getRepository().countRows(cardCriteria.getCriteria(cardFilter));
  }

}
