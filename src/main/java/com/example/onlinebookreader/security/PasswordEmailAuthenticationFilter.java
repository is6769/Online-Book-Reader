package com.example.onlinebookreader.security;

import jakarta.servlet.*;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;

import java.io.IOException;
import java.net.http.HttpRequest;

public class PasswordEmailAuthenticationFilter implements Filter {

    private final String HTTP_ALLOWED_METHOD="POST";
    private String email;
    private String password;

    @Override
    public void init(FilterConfig filterConfig) throws ServletException {
        Filter.super.init(filterConfig);
    }

    @Override
    public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse, FilterChain filterChain) throws IOException, ServletException {
        HttpServletRequest httpServletRequest = (HttpServletRequest) servletRequest;
        if (HTTP_ALLOWED_METHOD.equals(httpServletRequest.getMethod())){
            email=httpServletRequest.getParameter("email");
            password=httpServletRequest.getParameter("password");
            //UsernamePasswordAuthenticationToken
        }
        filterChain.doFilter(servletRequest,servletResponse);

    }

    @Override
    public void destroy() {
        Filter.super.destroy();
    }
}
