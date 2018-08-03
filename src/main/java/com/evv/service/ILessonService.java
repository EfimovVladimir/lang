package com.evv.service;

import com.evv.model.Lesson;
import com.evv.model.LessonCard;

import java.util.List;

public interface ILessonService {

  Integer save(Lesson object);
  List<Lesson> findAllLessons();
  void deleteLesson(Lesson lesson);
  void saveOrUpdateLesson(Lesson lesson);
  List<LessonCard> findAllLessonCard();
  void saveOrUpdateLessonCard(LessonCard lessonCard);
  void deleteLessonCard(LessonCard lessonCard);
  List<LessonCard> findAllLessonCardsForLesson(Lesson lesson);
  List<LessonCard> findAllLessonCardsToStartLesson(Lesson lesson);


}
