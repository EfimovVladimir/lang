package com.evv.service;

import com.evv.model.Lesson;
import com.evv.persistance.IGenericRepository;
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
}
