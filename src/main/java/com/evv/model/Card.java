package com.evv.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import javax.persistence.*;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table
public class Card implements Serializable {

  @Id
  @GeneratedValue
  @Column
  Integer id;

  @Column(name="QUESTION")
  String question;

  @Column(name="Q_AUDIO")
  @Lob
  byte[] qAudio;

  @Column(name="Q_INFO")
  String qInfo;

  @Column(name="ANSWER")
  String answer;

  @Column(name="A_AUDIO")
  @Lob
  byte[] aAudio;

  @Column(name="A_INFO")
  String aInfo;

  @Column(name="CARD_IMAGE")
  @Lob
  byte[] cardImage;

  @JoinColumn(updatable = false, name="SECTION_ID")
  @ManyToOne(optional = false, fetch = FetchType.EAGER)
  Section section = new Section();

  @JsonIgnoreProperties("cards")
  @ManyToMany(fetch = FetchType.EAGER)
  @JoinTable(name = "CARD_TAG",
      joinColumns = @JoinColumn(name = "ID_CARD"),
      inverseJoinColumns = @JoinColumn(name = "ID_TAG")
  )
  List<Tag> tags = new ArrayList<Tag>();

  @Column(name="USER_ID")
  Integer userId;

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

  public Section getSection() {
    return section;
  }

  public void setSection(Section section) {
    this.section = section;
  }

  public List<Tag> getTags() {
    return tags;
  }

  public void setTags(List<Tag> tags) {
    this.tags = tags;
  }

  public Integer getUserId() {
    return userId;
  }

  public void setUserId(Integer userId) {
    this.userId = userId;
  }
}
