/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.ems.controllers;

import com.ems.datatable.DataTableRequest;
import com.ems.datatable.DataTablesResponse;
import com.ems.dto.SlimSelectDTO;
import com.ems.dto.UserDataTable;
import com.ems.model.Users;
import com.ems.service.UserService;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/admin")
public class UserController {

    @Autowired
    UserService service;

    @PostMapping("/users")
    public DataTablesResponse<UserDataTable> getUsers(@RequestBody DataTableRequest param) throws Exception {
        return service.getUsers(param);
    }

    @GetMapping("/user/{id}")
    public Users getUser(@PathVariable Integer id) throws Exception {
        return service.getUser(id);
    }

    @PostMapping("/save-user")
    public ResponseEntity<CommonResponse> saveUsers(@RequestParam String username, @RequestParam String name, @RequestParam Integer usertype, @RequestParam String branch) throws Exception {
        service.saveUser(name, username, usertype, branch);
        CommonResponse response = new CommonResponse("Success!", 200);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @PostMapping("/update-user")
    public ResponseEntity<CommonResponse> saveUsers(@RequestParam Integer id, @RequestParam String username, @RequestParam String name, @RequestParam Integer usertype, @RequestParam String branch) throws Exception {
        service.updateUser(id, name, username, usertype, branch);
        CommonResponse response = new CommonResponse("Success!", 200);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @PostMapping("/deactivate-user")
    public ResponseEntity<CommonResponse> deactivateUsers(@RequestParam Integer id) throws Exception {
        service.deactivateUser(id);
        CommonResponse response = new CommonResponse("Success!", 200);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @PostMapping("/reactivate-user")
    public ResponseEntity<CommonResponse> reactivateUsers(@RequestParam Integer id) throws Exception {
        service.reactivateUser(id);
        CommonResponse response = new CommonResponse("Success!", 200);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @PostMapping("/search-usertype")
    public Iterable<SlimSelectDTO> getUsertype(@RequestParam String search) throws Exception {
        return service.getUsertype(search);
    }

}
