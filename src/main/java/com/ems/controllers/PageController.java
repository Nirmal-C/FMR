/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.ems.controllers;

import jakarta.servlet.http.HttpSession;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

/**
 *
 * @author Chirantha Prasad
 */
@Controller
public class PageController {

    @GetMapping("/Dashboard-Operation")
    public String home() {
        return "admin_dashboard";
    }

    @GetMapping("/Dashboard-Branch")
    public String dashboard() {
        return "branch_dashbaord";
    }

    @GetMapping("/Dashboard-Branch-Manager")
    public String bmdashboard() {
        return "branchM_dashboard";
    }

    @GetMapping("/IT-Dashbaord")
    public String dashboardIT() {
        return "it_dashboard";
    }

    @GetMapping("/Dashbaord-Approver")
    public String dashboardApprover() {
        return "approver_dashboard";
    }

    @GetMapping("/users")
    public String users() {
        return "users";
    }

    @GetMapping("/login")
    public String login() {
        return "login";
    }

    @GetMapping("/index")
    public String viewDashboard(HttpSession session) {
        String userType = session.getAttribute("usertype") + "";

        if (userType != null) {
            switch (userType) {
                case "1":
                    return "it_dashboard";
                case "2":
                    return "approver_dashboard";
                case "3":
                    return "branch_dashbaord";
                case "4":
                    return "admin_dashboard";
                case "5":
                    return "branchM_dashboard";
                default:
                    return "login";
            }
        } else {

            return "login";
        }
    }

    @GetMapping("/")
    public String index(HttpSession session) {
        String userType = (String) session.getAttribute("usertype");

        if (userType != null) {
            switch (userType) {
                case "1":
                    return "it_dashboard";
                case "2":
                    return "approver_dashboard";
                case "3":
                    return "branch_dashbaord";
                case "4":
                    return "admin_dashboard";
                case "5":
                    return "branchM_dashboard";
                default:
                    return "login";
            }
        } else {

            return "login";
        }
    }

}
