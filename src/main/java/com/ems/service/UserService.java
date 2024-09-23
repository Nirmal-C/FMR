/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.ems.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.ems.datatable.DataTableRepo;
import com.ems.datatable.DataTableRequest;
import com.ems.datatable.DataTablesResponse;
import com.ems.dto.SlimSelectDTO;
import com.ems.dto.UserDataTable;
import com.ems.model.Users;
import com.ems.repo.UserRepo;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jdbc.core.mapping.AggregateReference;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    @Autowired
    UserRepo userRepo;

    @Autowired
    private DataTableRepo<UserDataTable> userDt;

    public DataTablesResponse<UserDataTable> getUsers(DataTableRequest param) throws Exception {
        return userDt.getData(UserDataTable.class, param, "SELECT `id`,`username`,`name`,(SELECT `type` FROM `user_type` WHERE `id`= u.`usertype`) AS `user_type`,(SELECT d.`name` FROM `users` d WHERE d.`id`=u.`ent_by`) AS `ent_by`,`ent_on`,(SELECT d.`name` FROM `users` d WHERE d.`id`=u.`mod_by`) AS `mod_by`,`mod_on`,(SELECT `name` FROM `loan`.`branch` WHERE `id` = `branch`) AS branch,`status`FROM `users` u WHERE TRUE");
    }

    public Users getUser(Integer id) throws Exception {
        Users user = userRepo.findById(id).get();
        return user;
    }

    public Users saveUser(String name, String username, Integer usertype, String branch) throws Exception {
        Users user = new Users();
        user.setUsername(username);
        user.setName(name);
        user.setUsertype(usertype);
        user.setBranch(branch);
        user.setStatus("active");
        user = userRepo.save(user);
        return user;
    }

    public Users updateUser(Integer id, String name, String username, Integer usertype, String branch) throws Exception {
        Users user = userRepo.findById(id).get();
        user.setUsername(username);
        user.setName(name);
        user.setUsertype(usertype);
        user.setBranch(branch);
        user = userRepo.save(user);
        return user;
    }

    public Users deactivateUser(Integer id) throws Exception {
        Users user = userRepo.findById(id).get();
        user.setStatus("deactivate");
        user = userRepo.save(user);
        return user;
    }

    public Users reactivateUser(Integer id) throws Exception {
        Users user = userRepo.findById(id).get();
        user.setStatus("active");
        user = userRepo.save(user);
        return user;
    }

    public Iterable<SlimSelectDTO> getUsertype(String search) {
        return userRepo.getUsertype("%" + search.trim() + "%");
    }

}
