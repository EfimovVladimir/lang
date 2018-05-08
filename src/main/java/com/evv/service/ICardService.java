package com.evv.service;

import com.evv.model.Card;

import java.util.List;

public interface ICardService {

  Integer save(Card object);
  List<Card> findAllCards();
  void deleteCard(Card card);
  void saveOrUpdateCard(Card card);
}
