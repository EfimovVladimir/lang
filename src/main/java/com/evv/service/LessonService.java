package com.evv.service;

import com.evv.model.Lesson;
import com.evv.model.LessonCard;
import com.evv.persistance.IGenericRepository;
import org.hibernate.Criteria;
import org.hibernate.criterion.DetachedCriteria;
import org.hibernate.criterion.Projections;
import org.hibernate.criterion.Restrictions;
import org.hibernate.transform.Transformers;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

@Service
public class LessonService implements ILessonService{

  @Autowired
  private IGenericRepository repository;

  public IGenericRepository getRepository() {
    return repository;
  }

  @Override
  @Transactional
  public Integer save(Lesson object) {
    return getRepository().save(object);
  }

  @Override
  @Transactional
  public List<Lesson> findAllLessons() {
    return getRepository().findAll(Lesson.class);
  }

  @Override
  @Transactional
  public void deleteLesson(Lesson lesson) {
    getRepository().delete(lesson);
  }

  @Override
  @Transactional
  public void saveOrUpdateLesson(Lesson lesson) {
    getRepository().saveOrUpdate(lesson);
  }

  @Override
  @Transactional
  public List<LessonCard> findAllLessonCard() {
    return getRepository().findAll(LessonCard.class);
  }

  @Override
  @Transactional
  public void saveOrUpdateLessonCard(LessonCard lessonCard) {
    getRepository().saveOrUpdate(lessonCard);
  }

  @Override
  @Transactional
  public void deleteLessonCard(LessonCard lessonCard) {
    getRepository().delete(lessonCard);
  }

  @Override
  @Transactional
  public List<LessonCard> findAllLessonCardsForLesson(Lesson lesson) {
    DetachedCriteria criteria = DetachedCriteria.forClass(LessonCard.class);
    criteria.add(Restrictions.eq("id.lesson", lesson));
    criteria.setResultTransformer(Criteria.DISTINCT_ROOT_ENTITY);
    return getRepository().findByCriteria(criteria);
  }

  @Override
  @Transactional
  public List<LessonCard> findAllLessonCardsToStartLesson(Lesson lesson) {
    DetachedCriteria criteria = DetachedCriteria.forClass(LessonCard.class);
    criteria.add(Restrictions.eq("id.lesson", lesson));
    criteria.add(Restrictions.sqlRestriction("TARGET_COUNT > SUCCESS_COUNT"));
    //.add(Restrictions.gt("deltaSuccess", 0)
    return getRepository().findByCriteria(criteria);
  }
}
