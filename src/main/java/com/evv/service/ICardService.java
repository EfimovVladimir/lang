package com.evv.service;

import com.evv.model.Card;
import com.evv.model.Lesson;
import com.evv.model.Section;

import java.util.List;

public interface ICardService {

  Integer save(Card object);
  List<Card> findAllCards();
  List<Card> findAllSectionsCards(Section section);
  List<Card> findAllCardsForLesson(Lesson lesson);
  void deleteCard(Card card);
  void saveOrUpdateCard(Card card);
}
