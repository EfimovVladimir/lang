package com.evv.model;

import javax.persistence.*;
import java.io.Serializable;

@Entity
@Table
public class Lesson implements Serializable {

  @Id
  @GeneratedValue
  @Column(name = "ID")
  Integer id;

  @Column(name = "INFO")
  String info;

  @Column(name = "SYMBOLS")
  Integer symbols;

  @Column(name = "QUESTION_FIELD")
  Integer questionField;

  @Column(name="USER_ID")
  Integer userId;

  public Integer getId() {
    return id;
  }

  public void setId(Integer id) {
    this.id = id;
  }

  public String getInfo() {
    return info;
  }

  public void setInfo(String info) {
    this.info = info;
  }

  public Integer getSymbols() {
    return symbols;
  }

  public void setSymbols(Integer symbols) {
    this.symbols = symbols;
  }

  public Integer getQuestionField() {
    return questionField;
  }

  public void setQuestionField(Integer questionField) {
    this.questionField = questionField;
  }

  public Integer getUserId() {
    return userId;
  }

  public void setUserId(Integer userId) {
    this.userId = userId;
  }
}
