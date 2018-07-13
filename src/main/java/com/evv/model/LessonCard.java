package com.evv.model;

import javax.persistence.*;
import java.io.Serializable;

@Entity
@Table(name = "LESSON_CARD")
public class LessonCard implements Serializable{

  @EmbeddedId
  LessonCardId lessonCardId;

  @Column(name = "SUCCESS_COUNT")
  Integer successCount;

  @Column(name = "FAILED_COUNT")
  Integer failedCount;

  @Column(name = "TARGET_COUNT")
  Integer targetCount;

  public LessonCardId getLessonCardId() {
    return lessonCardId;
  }

  public void setLessonCardId(LessonCardId lessonCardId) {
    this.lessonCardId = lessonCardId;
  }

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
}
