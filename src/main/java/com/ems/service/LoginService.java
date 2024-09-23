/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.ems.service;

import com.ems.model.Users;
import com.ems.repo.UserRepo;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

/**
 *
 * @author Nevanjith
 */
@Service
public class LoginService {

    @Autowired
    UserRepo serv;

    @Autowired
    JdbcTemplate temp;

    public Users checkLogin(String username) {
        return serv.findByUsername(username).orElse(null);
    }

    public Map<String, Object> checkLogins(String username) {
        try {
            Map<String, Object> user = temp.queryForMap("select u.id,u.username,e.branch from `hris_new`.user u join `hris_new`.employee e on u.employee_id=e.id where u.`username`=? and e.status='active'", username);
            return user;
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

}
