/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.ems.repo;

import com.ems.dto.SlimSelectDTO;
import org.springframework.data.jdbc.repository.query.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import com.ems.model.FmrLog;
import java.util.List;

/**
 *
 * @author nirmal
 */
@Repository
public interface FmrLogRepo extends CrudRepository<FmrLog, Integer> {
    
   Iterable<FmrLog> findByFmrId(Integer id);

}