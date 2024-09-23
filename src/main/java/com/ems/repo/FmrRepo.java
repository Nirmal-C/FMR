/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.ems.repo;

import com.ems.model.Fmr;
import org.springframework.data.jdbc.repository.query.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

/**
 *
 * @author cpm.999cc
 */
@Repository
public interface FmrRepo extends CrudRepository<Fmr, Integer> {

    Iterable<Fmr> findByStatus(String status);

    @Query("SELECT COUNT(*) AS COUNT FROM fmr")
    Long countByStatusAll();

    @Query("SELECT COUNT(*) AS COUNT FROM fmr WHERE `status` = 'Acknowledgment Pending'")
    Long countByStatusAcknoPe();

    @Query("SELECT COUNT(*) AS COUNT FROM fmr WHERE `status` = 'Acknowledged'")
    Long countByStatusAckno();

    @Query("SELECT COUNT(*) AS COUNT FROM fmr WHERE `status` = 'Exceptions'")
    Long countByStatusExceptions();

    @Query("SELECT COUNT(*) AS COUNT FROM fmr WHERE `status` = 'Rejected'")
    Long countByStatusRejected();

    @Query("SELECT COUNT(*) AS COUNT FROM fmr WHERE `status` IN ('Undertaking Approval Pending', 'Undertaking Recommendation')")
    Long countByStatusUnder();

    @Query("SELECT COUNT(*) AS COUNT FROM fmr WHERE `status` IN ('Payment Processing', 'Payment Processing - Undertaking Approved','Payment Voucher Hand Over To Finance','Payment Voucher Hand Over To Finance(Undertaking Approved)')")
    Long countByStatusPayment();

    @Query("SELECT COUNT(*) AS COUNT FROM fmr WHERE `status` IN ('Completed', 'Completed(Undertaking Approved)')")
    Long countByStatusCompleted();
}
