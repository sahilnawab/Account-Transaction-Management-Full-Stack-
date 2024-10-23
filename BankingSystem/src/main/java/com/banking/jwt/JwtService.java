package com.banking.jwt;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.security.Key;

import java.util.Date;
import java.util.Map;
import java.util.function.Function;
import java.util.logging.Logger;


@Service
public class JwtService {

    private Logger logger=Logger.getLogger(JwtService.class.getName());

    // bind this data to application.properties
//    @Value("spring.application.security.jwt.secret")
    private Long JWT_EXPIRATION = 86400000L;

//    @Value("spring.application.security.jwt.expiration")
    private String SECRET="253c8ae9153f2dcf928ad2b8c487671f7acceb95b90ff85930676246939bd805";

    public String extractEmail(String jwt) {
        logger.info("Extracting email from jwt");
        return extractClaimFromToken(jwt, Claims::getSubject);

    }

    public boolean isTokenValid(String token,UserDetails userDetails){
        String email=extractEmail(token);
        return (email.equals(userDetails.getUsername()) && !isTokenExpired(token));
    }

    private boolean isTokenExpired(String token) {
        return extractExpiration(token).before(new Date());
    }

    private Date extractExpiration(String token) {
        return extractClaimFromToken(token,Claims::getExpiration);
    }

    //    It calls extractAllClaims to retrieve all the claims from the JWT.
//    It then applies the claimsResolver function to extract a particular claim from the full set of claims.
    private <T> T extractClaimFromToken(String jwt, Function<Claims,T> claimsResolver) {
        final Claims claims = extractAllClaims(jwt);
        return claimsResolver.apply(claims);

    }

//    It parses the JWT using a parser configured with a signing key.
//    It returns the body of the JWT, which contains all the claims.
    private Claims extractAllClaims(String jwt) {
        return Jwts
                .parserBuilder()                //will parse the jwt
                .setSigningKey(getSigninKey())  //set the key to verify the jwt
                .build()                        //build the parser
                .parseClaimsJws(jwt)            //parse the jwt to extract the claims
                .getBody();                     // get the body of the jwt
    }

    public String generateToken(Map<String,Object> claims, UserDetails userdetails) {
        return buildToken(claims,userdetails,JWT_EXPIRATION);
    }

    private String buildToken(Map<String, Object> claims, UserDetails userdetails, long JWT_EXPIRATION) {
        var Authorities=userdetails.getAuthorities()
                        .stream()
                                .map(GrantedAuthority::getAuthority)
                                        .toList();

       return Jwts.builder()
                .setClaims(claims)
               .setSubject(userdetails.getUsername())
               .setIssuedAt(new Date(System.currentTimeMillis()))
               .setExpiration(new Date(System.currentTimeMillis()+JWT_EXPIRATION))
               .claim("authorities",Authorities)
               .signWith(getSigninKey())
               .compact();
    }

    private Key getSigninKey() {
        //get the secret key from the environment variable
        byte[] keyBytes= Decoders.BASE64.decode(SECRET);
        //encode the key
        return Keys.hmacShaKeyFor(keyBytes);
    }



}
