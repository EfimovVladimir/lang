package com.evv.model;

import javax.persistence.*;
import java.io.Serializable;

@Entity
@Table
public class Section implements Serializable {

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

  @JoinColumn(updatable = false, name="USER_ID")
  @ManyToOne(optional = false, fetch = FetchType.EAGER)
  User user;

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

  public User getUser() {
    return user;
  }

  public void setUser(User user) {
    this.user = user;
  }
}
