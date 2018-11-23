package com.evv.config;

import com.evv.model.User;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import java.io.Serializable;
import java.util.Date;

@Component
public class JwtTokenUtil implements Serializable {

  public static final long ACCESS_TOKEN_VALIDITY_SECONDS = 5*60*60;
  public static final String SIGNING_KEY = "evvsecretkey";
  public static final String DEFAULT_ROLE_PREFIX = "ROLE_";
  public static final String ROLE_KEY = "roleClaim";

  public Date getExpirationDateFromToken(String token) {
    Claims claims = getAllClaimsFromToken(token);
    return claims.getExpiration();
  }

  public String getUsernameFromToken(String token) {
    Claims claims = getAllClaimsFromToken(token);
    return claims.getSubject();
  }

  public String getAuthorityFromToken(String token){
    Claims claims = getAllClaimsFromToken(token);
    return (String) claims.get(ROLE_KEY);
  }

  public Boolean validateToken(String token, UserDetails userDetails){
    final String username = getUsernameFromToken(token);
    return ( username.equals(userDetails.getUsername()) );
  }

  public String generateToken(User user) {
    String subject = user.getLogin();
    Claims claims = Jwts.claims().setSubject(subject);
    claims.put(ROLE_KEY, DEFAULT_ROLE_PREFIX + user.getUserRole().toString());

    return Jwts.builder()
        .setClaims(claims)
        .setIssuer("me")
        .setIssuedAt(new Date(System.currentTimeMillis()))
        .setExpiration(new Date(System.currentTimeMillis() + ACCESS_TOKEN_VALIDITY_SECONDS*1000))
        .signWith(SignatureAlgorithm.HS256, SIGNING_KEY)
        .compact();
  }

  private Claims getAllClaimsFromToken(String token) {
    return Jwts.parser()
        .setSigningKey(SIGNING_KEY)
        .parseClaimsJws(token)
        .getBody();
  }

}
