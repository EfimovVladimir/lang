package com.evv.service;

import com.evv.model.Lesson;

import java.util.List;

public interface ILessonService {

  Integer save(Lesson object);
  List<Lesson> findAllLessons();
  void deleteLesson(Lesson lesson);
  void saveOrUpdateLesson(Lesson lesson);

}
