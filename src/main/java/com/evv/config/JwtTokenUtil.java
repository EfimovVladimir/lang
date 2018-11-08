package com.evv.config;

import com.evv.model.User;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import java.io.Serializable;
import java.util.Arrays;
import java.util.Date;

@Component
public class JwtTokenUtil implements Serializable {

  public static final long ACCESS_TOKEN_VALIDITY_SECONDS = 5*60*60;
  public static final String SIGNING_KEY = "devglan123r";

  public Date getExpirationDateFromToken(String token) {
    Claims claims = getAllClaimsFromToken(token);
    return claims.getExpiration();
  }

  public String getUsernameFromToken(String token) {
    Claims claims = getAllClaimsFromToken(token);
    return claims.getSubject();
  }

  public String generateToken(User user) {
    return doGenerateToken(user.getLogin());
  }

  public Boolean validateToken(String token, UserDetails userDetails){
    final String username = getUsernameFromToken(token);
    return ( username.equals(userDetails.getUsername()) );
  }

  private String doGenerateToken(String subject) {

    Claims claims = Jwts.claims().setSubject(subject);
    claims.put("scopes", Arrays.asList(new SimpleGrantedAuthority("USER"), new SimpleGrantedAuthority("ADMIN")));

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
