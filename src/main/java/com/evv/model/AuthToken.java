package com.evv.model;

public class AuthToken {
  String token;

  public String getToken() {
    return token;
  }

  public void setToken(String token) {
    this.token = token;
  }

  public AuthToken(String token) {
    this.token = token;
  }
}
