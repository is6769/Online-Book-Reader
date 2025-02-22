package com.example.onlinebookreader.security;

import jakarta.servlet.*;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.ProviderManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;

import java.io.IOException;

@Component
public class JwtAuthenticationFilter implements Filter {

    private JwtService jwtService;

    @Autowired
    public JwtAuthenticationFilter(JwtService jwtService) {
        this.jwtService = jwtService;
    }

    @Override
    public void init(FilterConfig filterConfig) throws ServletException {
        Filter.super.init(filterConfig);
    }

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws IOException, ServletException {
        HttpServletRequest httpServletRequest = (HttpServletRequest) request;
        String token = getTokenFromHeader(httpServletRequest, "Authorization");
        if (token!=null){
            jwtService.validateJwtToken(token);
        }


        chain.doFilter(request, response);
    }

    private String getTokenFromHeader(HttpServletRequest httpServletRequest, String header) {
        String headerContent = httpServletRequest.getHeader(header);
        if (headerContent!=null && headerContent.startsWith("Bearer "))
            return header.substring(7);
        return null;
    }

    @Override
    public void destroy() {
        Filter.super.destroy();
    }
}
