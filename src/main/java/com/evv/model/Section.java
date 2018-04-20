package com.evv.model;

import javax.persistence.*;

@Entity
@Table
public class Section {

  @Id
  @GeneratedValue
  @Column
  Integer id;

  @Column
  String name;

  @Column
  String info;

  @Column(name="parent_id")
  Integer parentId;

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

  public Integer getParentId() {
    return parentId;
  }

  public void setParentId(Integer parentId) {
    this.parentId = parentId;
  }
}
