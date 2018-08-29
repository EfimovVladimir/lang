package com.evv.criteria;

import com.evv.model.Card;
import com.evv.model.CardFilter;
import org.hibernate.criterion.DetachedCriteria;
import org.hibernate.criterion.MatchMode;
import org.hibernate.criterion.Restrictions;
import org.springframework.stereotype.Component;

@Component
public class CardCriteria implements ICriteriaProvider<CardFilter> {

  @Override
  public DetachedCriteria getCriteria(CardFilter cardFilter) {
    DetachedCriteria filter = DetachedCriteria.forClass(Card.class);
    if(!cardFilter.getQuestion().isEmpty()){
      filter.add(Restrictions.like("question", cardFilter.getQuestion(), MatchMode.START));
    }
    if(cardFilter.getSectionId() > 0){
      filter.add(Restrictions.eq("section.id", cardFilter.getSectionId()));
    }
    return filter;
  }
}
