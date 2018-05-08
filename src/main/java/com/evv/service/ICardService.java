package com.evv.service;

import com.evv.model.Card;
import com.evv.model.Section;

import java.util.List;

public interface ICardService {

  Integer save(Card object);
  List<Card> findAllCards();
  List<Card> findAllSectionsCards(Section section);
  void deleteCard(Card card);
  void saveOrUpdateCard(Card card);
}
