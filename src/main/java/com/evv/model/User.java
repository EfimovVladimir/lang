package com.evv.model;

import javax.persistence.*;
import java.io.Serializable;

@Entity
@Table
public class User implements Serializable {

  @Id
  @GeneratedValue
  @Column
  Integer id;

  @Column
  String login;

  @Column
  String password;

  @Column
  Boolean enabled = true;

  @Column(name = "USER_ROLE")
  @Enumerated(EnumType.STRING)
  UserRole userRole = UserRole.USER;

  public Integer getId() {
    return id;
  }

  public void setId(Integer id) {
    this.id = id;
  }

  public String getLogin() {
    return login;
  }

  public void setLogin(String login) {
    this.login = login;
  }

  public String getPassword() {
    return password;
  }

  public void setPassword(String password) {
    this.password = password;
  }

  public Boolean getEnabled() {
    return enabled;
  }

  public void setEnabled(Boolean enabled) {
    this.enabled = enabled;
  }

  public UserRole getUserRole() {
    return userRole;
  }

  public void setUserRole(UserRole userRole) {
    this.userRole = userRole;
  }
}
