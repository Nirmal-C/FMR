/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.ems.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class UserDataTable {

    public Integer id;
    public String username;
    public String name;
    public String user_type;
    public String branch;

    public String ent_on;
    public String ent_by;
    public String mod_by;
    public String mod_on;
    public String status;

}
