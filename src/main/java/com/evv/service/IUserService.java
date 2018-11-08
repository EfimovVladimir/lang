package com.evv.service;

import com.evv.model.User;

import java.util.List;

public interface IUserService {

  User getUserById(Integer id);
  List<User> findAllUsers();
  void saveOrUpdateUser(User object);
  Integer save(User object);
  void deleteUser(User object);
  List<User> findEnabledUsers(User user);
  User findOneByUsername(String login);
}
