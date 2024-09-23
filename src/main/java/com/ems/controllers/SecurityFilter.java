package com.ems.controllers;

import jakarta.servlet.Filter;
import jakarta.servlet.FilterChain;
import jakarta.servlet.FilterConfig;
import jakarta.servlet.ServletException;
import jakarta.servlet.ServletRequest;
import jakarta.servlet.ServletResponse;
import jakarta.servlet.annotation.WebFilter;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;

@WebFilter("/*")
public class SecurityFilter implements Filter {

    @Override
    public void init(FilterConfig filterConfig) throws ServletException {

    }

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws IOException, ServletException {
        HttpServletRequest req = (HttpServletRequest) request;
        String ipAddress = req.getHeader("X-FORWARDED-FOR");
        if (ipAddress == null) {
            ipAddress = req.getRemoteAddr();
        }
        String url = req.getRequestURI();

        if (!(url.contains("/files") | url.contains("/images") | url.contains("/websocket") | url.contains("/pages") | url.contains("/monitoring"))) {
            if (!url.endsWith("/login") && req.getSession().getAttribute("uid") == null) {
                HttpServletResponse resp = (HttpServletResponse) response;
                if (url.contains("/ems")) {
                    resp.sendRedirect("/ems/login");
                } else {
                    resp.sendRedirect("/login");
                }
                return;
            } else if (url.endsWith("/login")) {
                if (req.getSession().getAttribute("uid") != null) {
                    HttpServletResponse resp = (HttpServletResponse) response;
                    resp.sendRedirect("index");
                    return;
                } else {
                    chain.doFilter(request, response);
                    return;
                }
            }

        }

        chain.doFilter(request, response);
    }

//    @Override
//    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws IOException, ServletException {
//        HttpServletRequest req = (HttpServletRequest) request;
//        HttpServletResponse resp = (HttpServletResponse) response;
//
//        String uri = req.getRequestURI();
//        System.out.println(uri);
//
//        // Check if the user is trying to access a restricted page
//        if (uri.contains("/IT-Dashbaord") || uri.contains("/Dashbaord-Approver") || uri.contains("/Dashboard-Branch") || uri.contains("/Dashboard-Operation")) {
//            // Check if the user is logged in
//            if (req.getSession().getAttribute("uid") == null) {
//                // If not logged in, redirect to the login page
//                resp.sendRedirect("login");
//                return;
//            }
//
//            // Get the userType from the session
//            String userType = (String) req.getSession().getAttribute("usertype");
//
//            // Check if the user's userType allows access to the requested page
//            if (!isValidUserTypeForPage(userType, uri)) {
//                // Redirect to a page indicating unauthorized access
//                resp.sendRedirect("login");
//                return;
//            }
//        }
//
//        // Continue with the filter chain
//        chain.doFilter(request, response);
//    }
//
//    private boolean isValidUserTypeForPage(String userType, String uri) {
//        // Check if the userType is valid for accessing the requested page
//        switch (uri) {
//            case "IT-Dashbaord":
//                return "1".equals(userType);
//            case "Dashbaord-Approver":
//                return "2".equals(userType);
//            case "Dashboard-Branch":
//                return "3".equals(userType);
//            case "Dashboard-Operation":
//                return "4".equals(userType);
//            default:
//                return false;
//        }
//    }
//
//    @Override
//    public void destroy() {
//
//    }
}
