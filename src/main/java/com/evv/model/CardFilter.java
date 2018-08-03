package com.evv.model;

import java.io.Serializable;

public class CardFilter implements Serializable{

  String question = "";

  String answer = "";

  int[] tagIds;

  int sectionId;

  String orderBy = "asc";

  public String getAnswer() {
    return answer;
  }

  public void setAnswer(String answer) {
    this.answer = answer;
  }

  public String getQuestion() {
    return question;
  }

  public void setQuestion(String question) {
    this.question = question;
  }

  public int[] getTagIds() {
    return tagIds;
  }

  public void setTagIds(int[] tagIds) {
    this.tagIds = tagIds;
  }

  public int getSectionId() {
    return sectionId;
  }

  public void setSectionId(int sectionId) {
    this.sectionId = sectionId;
  }

  public String getOrderBy() {
    return orderBy;
  }

  public void setOrderBy(String orderBy) {
    this.orderBy = orderBy;
  }
}
