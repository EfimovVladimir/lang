package com.evv.model;

import javax.persistence.*;

@Entity
@Table
public class Tag {

  @Id
  @GeneratedValue
  @Column
  Integer id;

  @Column
  String name;

  @Column
  String info;

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
}
