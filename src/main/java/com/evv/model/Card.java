package com.evv.model;

import com.fasterxml.jackson.annotation.JsonBackReference;

import javax.persistence.*;
import java.io.Serializable;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

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

  @JoinColumn(updatable = false, name="SECTION_ID")
  @ManyToOne(optional = false, fetch = FetchType.EAGER)
  Section section = new Section();

  @JsonBackReference
  @ManyToMany(fetch = FetchType.EAGER)
  @JoinTable(name = "CARD_TAG",
      joinColumns = @JoinColumn(name = "ID_CARD"),
      inverseJoinColumns = @JoinColumn(name = "ID_TAG")
  )
  Set<Tag> tags = new HashSet<Tag>();

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

  public Set<Tag> getTags() {
    return tags;
  }

  public void setTags(Set<Tag> tags) {
    this.tags = tags;
  }
}
