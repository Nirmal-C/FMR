/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.ems.dto;

import lombok.Getter;
import lombok.Setter;

import lombok.AllArgsConstructor;

import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class FmrDTO {

    private Integer id;
    private String ref_number;
    private String customer_name;
    private String product;
    private String amount;
    private String branch;
    private String pendings;
    private String comment;
    private String approver;
    private String facility_status;
    private String status;
    public String ent_by;
    public String ent_on;
    public String mod_by;
    public String mod_on;

}
