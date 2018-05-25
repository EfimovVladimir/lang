package com.evv.model;

import com.fasterxml.jackson.annotation.JsonBackReference;

import javax.persistence.*;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table
public class Tag implements Serializable {

  @Id
  @GeneratedValue
  @Column
  Integer id;

  @Column
  String name;

  @Column
  String info;

  @JsonBackReference
  @ManyToMany(mappedBy = "tags", fetch = FetchType.EAGER)
  List<Card> cards = new ArrayList<Card>();

  public Integer getId() {
    return id;
  }

  public void setId(Integer id) {
    this.id = id;
  }

  public String getName() {
    return name;
  }

  public void setName(String name) {
    this.name = name;
  }

  public String getInfo() {
    return info;
  }

  public void setInfo(String info) {
    this.info = info;
  }

  public List<Card> getCards() {
    return cards;
  }

  public void setCards(List<Card> cards) {
    this.cards = cards;
  }
}
