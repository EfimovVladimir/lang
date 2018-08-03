package com.evv.model;

import org.hibernate.annotations.Formula;

import javax.persistence.*;
import java.io.Serializable;

@Entity
@Table(name = "LESSON_CARD")
@IdClass(LessonCardId.class)
public class LessonCard implements Serializable{

  @Id
  Lesson lesson;

  @Id
  Card card;

  @Column(name = "SUCCESS_COUNT")
  Integer successCount;

  @Column(name = "FAILED_COUNT")
  Integer failedCount;

  @Column(name = "TARGET_COUNT")
  Integer targetCount;

  @Formula("TARGET_COUNT - SUCCESS_COUNT")
  private Integer deltaSuccess;

  public Integer getSuccessCount() {
    return successCount;
  }

  public void setSuccessCount(Integer successCount) {
    this.successCount = successCount;
  }

  public Integer getFailedCount() {
    return failedCount;
  }

  public void setFailedCount(Integer failedCount) {
    this.failedCount = failedCount;
  }

  public Integer getTargetCount() {
    return targetCount;
  }

  public void setTargetCount(Integer targetCount) {
    this.targetCount = targetCount;
  }

  public Lesson getLesson() {
    return lesson;
  }

  public void setLesson(Lesson lesson) {
    this.lesson = lesson;
  }

  public Card getCard() {
    return card;
  }

  public void setCard(Card card) {
    this.card = card;
  }
}
