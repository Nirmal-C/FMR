/*
 * Click nbfs://nbhost/FacilityFileFacility/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/FacilityFileFacility/Templates/Classes/Class.java to edit this template
 */
package com.ems.repo;

import com.ems.dto.SlimSelectDTO;
import org.springframework.data.jdbc.repository.query.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import com.ems.model.Users;
import java.util.Optional;

/**
 *
 * @author chirantha
 */
@Repository
public interface UserRepo extends CrudRepository<Users, Integer> {

    @Query("SELECT `id` AS `value`, `name` AS `text` FROM `users` WHERE `usertype` = '2'")
    Iterable<SlimSelectDTO> getApprover(@Param("search") String search);

    @Query("SELECT `id` AS `value`, `type` AS `text` FROM `user_type` WHERE TRUE")
    Iterable<SlimSelectDTO> getUsertype(@Param("search") String search);

    Optional<Users> findByUsername(String username);
}
