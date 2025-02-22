package com.example.onlinebookreader.security;

import com.example.onlinebookreader.entities.security.AppRole;
import com.example.onlinebookreader.entities.security.CommonUser;
import com.example.onlinebookreader.entities.security.User;
import com.example.onlinebookreader.security.userdetails.ApplicationUserDetails;
import io.jsonwebtoken.*;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.stereotype.Service;

import java.security.Key;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class JwtService {

    @Value("${auth.jwt.secret}")
    private String jwtSecret;

    private final String issuer = "JwtService";

    public JwtService(){

    }

    public String generateJwt(ApplicationUserDetails userDetails){
        User user = userDetails.getUser();
        String username = user.getUsername();
        List<String> roles = user.getRoles()
                .stream()
                .map(AppRole::getName)
                .toList();

        Key key = generateKey();

        String jwt = Jwts.builder()
                .issuer(issuer)
                .claims()
                    .issuedAt(new Date(System.currentTimeMillis()))
                    .expiration(new Date(System.currentTimeMillis()+1000*60*15))
                    .add("username", username)
                    .add("roles", roles)
                .and()
                .signWith(key,SignatureAlgorithm.HS256)
                .compact();
        return jwt;
    }

    private Key generateKey(){
        byte[] keyBytes = Decoders.BASE64.decode(jwtSecret);
        return Keys.hmacShaKeyFor(keyBytes);
    }

    public Authentication validateJwtToken(String jwtToken){
        try {
            Jws<Claims> jws = Jwts
                    .parser()
                    .setSigningKey(generateKey())
                    .build()
                    .parseSignedClaims(jwtToken);

            String username = jws.getPayload().get("username",String.class);
            List<String> roles = jws.getPayload().get("username",List.class);
            List<SimpleGrantedAuthority> securityRoles = roles.stream().map(SimpleGrantedAuthority::new).toList();
            Authentication usernameAndPasswordAuthToken = new UsernamePasswordAuthenticationToken(username,null,securityRoles);
            return usernameAndPasswordAuthToken;
        }catch (RuntimeException e){
            System.err.println(e.getMessage());
            return null;
        }
    }

}
