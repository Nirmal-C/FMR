/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.ems.model;

import com.fasterxml.jackson.annotation.JsonFormat;
import java.util.Date;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import org.springframework.data.annotation.CreatedBy;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.LastModifiedBy;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.annotation.Transient;
import org.springframework.data.relational.core.mapping.Table;

/**
 *
 * @author cpm.999cc
 */
@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
@ToString
@Table("fmr")
public class Fmr {

    @Id
    private Integer id;
    private String ref_number;
    private String customer_name;
    private String product;
    @Transient
    private String productTxt;
    @Transient
    private String approverName;
    @Transient
    private String entUser;
    private String amount;
    private String branch;
    private Integer pendings;
    private String comment;
    private String returncomment;
    private String reason;
    private String approver;
    private String facility_status;
    private String status;
    private String prev_action;
//    private String justification;
    @CreatedBy
    private Integer ent_by;
    @CreatedDate
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd hh:mm:ss")
    private Date ent_on;
    @LastModifiedBy
    private Integer mod_by;
    
    @LastModifiedDate
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd hh:mm:ss")
    private Date mod_on;

}
