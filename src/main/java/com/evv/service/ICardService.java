package com.evv.service;

import com.evv.model.*;

import javax.transaction.Transactional;
import java.util.List;

public interface ICardService {

  Integer save(Card object);
  List<Card> findAllCards();
  List<Card> findAllSectionsCards(Section section);
  List<Card> findAllCardsForLesson(Lesson lesson);
  void deleteCard(Card card);
  void saveOrUpdateCard(Card card);
  List<Card> findCardsByFilter(CardFilter cardFilter);
}
