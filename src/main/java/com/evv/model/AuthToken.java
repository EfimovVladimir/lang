package com.evv.model;

public class AuthToken {
  String token;
  UserRole userRole;

  public String getToken() {
    return token;
  }

  public void setToken(String token) {
    this.token = token;
  }

  public UserRole getUserRole() {
    return userRole;
  }

  public void setUserRole(UserRole userRole) {
    this.userRole = userRole;
  }

  public AuthToken(String token, UserRole userRole) {
    this.token = token;
    this.userRole = userRole;
  }
}
