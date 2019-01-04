package com.evv.controller;

import com.evv.config.JwtTokenUtil;
import com.evv.model.AuthToken;
import com.evv.model.User;
import com.evv.service.IUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/auth/*")
public class AuthenticationController {

  @Autowired
  private AuthenticationManager authenticationManager;

  @Autowired
  private JwtTokenUtil jwtTokenUtil;

  @Autowired
  private IUserService userService;

  public AuthenticationController() {
  }

  @RequestMapping(value = "/auth/generate-token", method = RequestMethod.POST)
  public ResponseEntity register(@RequestBody User loginUser) throws AuthenticationException {
    Authentication authentication = authenticationManager.authenticate(
        new UsernamePasswordAuthenticationToken(loginUser.getLogin(), loginUser.getPassword())
    );
    SecurityContextHolder.getContext().setAuthentication(authentication);
    User user = userService.findOneByUsername(loginUser.getLogin());
    String token = jwtTokenUtil.generateToken(user);
    return ResponseEntity.ok(new AuthToken(token, user.getUserRole()));
  }

  @RequestMapping(value = "/auth/login", method = RequestMethod.POST)
  @ResponseBody
  public User getUser(@RequestParam(value = "username", required=false) String uname,
                      @RequestParam(value = "password", required=false) String pwd) {
    User user = new User();
    user.setLogin(uname);
    user.setPassword(pwd);
    List<User> users = userService.findEnabledUsers(user);
    return users.size() > 0 ? users.get(0) : user;
  }

  @RequestMapping(value = "/auth/signUp", method = RequestMethod.POST)
  @ResponseBody
  public User createUser(@RequestBody User user) {
    int id = userService.save(user);
    user.setId(id);
    return user;
  }

  @RequestMapping(value = "/auth/logout", method = RequestMethod.POST)
  @ResponseBody
  public User logout(@RequestBody User user) {
    return new User();
  }

}
