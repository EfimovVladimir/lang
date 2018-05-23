package com.evv.model;

import com.fasterxml.jackson.annotation.JsonManagedReference;

import javax.persistence.*;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

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

  @JsonManagedReference
  @ManyToMany(mappedBy = "tags", fetch = FetchType.EAGER)
  Set<Card> cards = new HashSet<Card>();

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

  public Set<Card> getCards() {
    return cards;
  }

  public void setCards(Set<Card> cards) {
    this.cards = cards;
  }
}
