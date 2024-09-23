/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.ems.datatable;

import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

/**
 *
 * @author chirantha
 */
@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
@ToString
public class DataTablesResponse<T> {

    private int draw;
    private long recordsTotal;
    private long recordsFiltered;
    private List<T> data;

}
