package com.evv.criteria;

import org.hibernate.criterion.DetachedCriteria;

public interface ICriteriaProvider<T> {

  DetachedCriteria getCriteria(T filter);

}
