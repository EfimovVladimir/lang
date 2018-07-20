package com.evv.model;

import javax.persistence.*;
import java.io.Serializable;

@Embeddable
public class LessonCardId implements Serializable{

  @JoinColumn(updatable = false, name="ID_LESSON")
  @ManyToOne(optional = false, fetch = FetchType.EAGER)
  Lesson lesson = new Lesson();

  @JoinColumn(updatable = false, name="ID_CARD")
  @ManyToOne(optional = false, fetch = FetchType.EAGER)
  Card card = new Card();

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
