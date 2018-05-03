package com.evv.model;

import javax.persistence.*;

@Entity
@Table
public class Card {

  @Id
  @GeneratedValue
  @Column
  Integer id;

  @Column(name="QUESTION")
  String question;

  @Column(name="Q_AUDIO")
  byte[] qAudio;

  @Column(name="Q_INFO")
  String qInfo;

  @Column(name="ANSWER")
  String answer;

  @Column(name="A_AUDIO")
  byte[] aAudio;

  @Column(name="A_INFO")
  String aInfo;

  @Column(name="CARD_IMAGE")
  byte[] cardImage;

  @Column(name="SECTION_ID")
  Integer sectionId;

  public Integer getId() {
    return id;
  }

  public void setId(Integer id) {
    this.id = id;
  }

  public String getQuestion() {
    return question;
  }

  public void setQuestion(String question) {
    this.question = question;
  }

  public byte[] getqAudio() {
    return qAudio;
  }

  public void setqAudio(byte[] qAudio) {
    this.qAudio = qAudio;
  }

  public String getqInfo() {
    return qInfo;
  }

  public void setqInfo(String qInfo) {
    this.qInfo = qInfo;
  }

  public String getAnswer() {
    return answer;
  }

  public void setAnswer(String answer) {
    this.answer = answer;
  }

  public byte[] getaAudio() {
    return aAudio;
  }

  public void setaAudio(byte[] aAudio) {
    this.aAudio = aAudio;
  }

  public String getaInfo() {
    return aInfo;
  }

  public void setaInfo(String aInfo) {
    this.aInfo = aInfo;
  }

  public byte[] getCardImage() {
    return cardImage;
  }

  public void setCardImage(byte[] cardImage) {
    this.cardImage = cardImage;
  }

  public Integer getSectionId() {
    return sectionId;
  }

  public void setSectionId(Integer sectionId) {
    this.sectionId = sectionId;
  }
}
