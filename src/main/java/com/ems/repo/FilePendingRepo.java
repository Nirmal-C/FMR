/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.ems.repo;

import com.ems.model.FilePendings;
import java.util.List;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

/**
 *
 * @author cpm.999cc
 */
@Repository
public interface FilePendingRepo extends CrudRepository<FilePendings, Integer> {

    Iterable<FilePendings> findByStatus(String status);

    Iterable<FilePendings> findByPendings(Integer id);

    List<FilePendings> findByPendingsAndStatus(Integer id, String status);

    public Object findById(String deleteId);
}
