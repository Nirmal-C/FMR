/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.ems.controllers;

import com.ems.datatable.DataTableRequest;
import com.ems.datatable.DataTablesResponse;
import com.ems.dto.SlimSelectDTO;
import com.ems.dto.FmrDTO;
import com.ems.dto.FmrLogDTO;
import com.ems.model.Fmr;
import com.ems.model.FmrLog;
import com.ems.service.FmrService;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.OutputStream;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

@RestController
@RequestMapping("/fmr")
public class FmrController {

    @Autowired
    FmrService service;

    @PostMapping("/fmrtable-all")
    public DataTablesResponse<FmrDTO> getFmrs(@RequestBody DataTableRequest param) throws Exception {
        return service.getFmrs(param);
    }

    @PostMapping("/facility-status")
    public Iterable<SlimSelectDTO> getStatus(@RequestParam String search) throws Exception {
        return service.getStatus(search);
    }

//    branch
    @PostMapping("/fmrtable-all-branches")
    public DataTablesResponse<FmrDTO> getFmrBrnch(@RequestBody DataTableRequest param, HttpSession session) throws Exception {
        return service.getFmrsBrnch(param, (Integer) session.getAttribute("uid"));
    }
//Approver

    @PostMapping("/fmrtable-all-approver")
    public DataTablesResponse<FmrDTO> getFmrApprove(@RequestBody DataTableRequest param, HttpSession session) throws Exception {
        return service.getFmrApprove(param, (Integer) session.getAttribute("uid"));
    }

    @PostMapping("/fmrtable-file-branch")
    public DataTablesResponse<FmrDTO> getFmrfileBranch(@RequestBody DataTableRequest param, HttpSession session) throws Exception {
        return service.getFmrfileBranch(param, (Integer) session.getAttribute("uid"));
    }

    @PostMapping("/fmrtable-clearance-branch")
    public DataTablesResponse<FmrDTO> getFmrclearanceBranch(@RequestBody DataTableRequest param, HttpSession session) throws Exception {
        return service.getFmrclearanceBranch(param, (Integer) session.getAttribute("uid"));
    }

    @PostMapping("/fmrtable-approve-branch")
    public DataTablesResponse<FmrDTO> getFmrapprovalBranch(@RequestBody DataTableRequest param, HttpSession session) throws Exception {
        return service.getFmrapprovalBranch(param, (Integer) session.getAttribute("uid"));
    }

    @PostMapping("/fmrtable-payment-branch")
    public DataTablesResponse<FmrDTO> getFmrpaymentBranch(@RequestBody DataTableRequest param, HttpSession session) throws Exception {
        return service.getFmrpaymentBranch(param, (Integer) session.getAttribute("uid"));
    }

    @PostMapping("/fmrtable-paymentua-branch")
    public DataTablesResponse<FmrDTO> getFmrpaymentUABranch(@RequestBody DataTableRequest param, HttpSession session) throws Exception {
        return service.getFmrpaymentUABranch(param, (Integer) session.getAttribute("uid"));
    }

    @PostMapping("/fmrtable-completed-branch")
    public DataTablesResponse<FmrDTO> getFmrCompletedBranch(@RequestBody DataTableRequest param, HttpSession session) throws Exception {
        return service.getFmrCompletedBranch(param, (Integer) session.getAttribute("uid"));
    }

    @PostMapping("/fmrtable-reject-branch")
    public DataTablesResponse<FmrDTO> getFmrRejectBranch(@RequestBody DataTableRequest param, HttpSession session) throws Exception {
        return service.getFmrRejectBranch(param, (Integer) session.getAttribute("uid"));
    }

    @PostMapping("/search-branch")
    public Iterable<SlimSelectDTO> getBranches(@RequestParam String search) throws Exception {
        return service.getBranches(search);
    }

    @PostMapping("/product")
    public Iterable<SlimSelectDTO> getProduct(@RequestParam String search) throws Exception {
        return service.getProduct(search);
    }

    @PostMapping("/save")
    public ResponseEntity<CommonResponse> saveFmr(@RequestParam String ref_number, @RequestParam String customer_name, @RequestParam String product, @RequestParam String amount, @RequestParam String facility_status, HttpSession session) throws Exception {
        service.saveFmr(ref_number, customer_name, product, amount, facility_status, session);
        CommonResponse response = new CommonResponse("Success!", 200);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @PostMapping("/update-ack")
    public ResponseEntity<CommonResponse> updateFmr(@RequestParam Integer id, @RequestParam String ref_number, @RequestParam String customer_name, @RequestParam String product, @RequestParam String amount, @RequestParam String statustype, @RequestParam(required = false) String reason) throws Exception {
        service.updateFmr(id, ref_number, customer_name, product, amount, statustype, reason);
        CommonResponse response = new CommonResponse("Success!", 200);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/details-all/{id}")
    public ResponseEntity<CommonResponse> details(@PathVariable Integer id) throws Exception {
        CommonResponse response = new CommonResponse("Success!", service.getFmrses(id), 200);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @GetMapping("/details-file/{id}")
    public ResponseEntity<CommonResponse> detailsFile(@PathVariable Integer id) throws Exception {
        CommonResponse response = new CommonResponse("Success!", service.getFmrFile(id), 200);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @PostMapping("/save-filePendings")
    @ResponseBody
    public Fmr uploadFiles(
            @RequestParam Integer id,
            @RequestParam(name = "desclist", required = false) String desclist,
            @RequestParam(name = "statusack") String statusack) throws Exception {
        return service.uploadFiles(id, desclist, statusack);
    }

    @GetMapping("/clearance-details/{id}")
    public ResponseEntity<CommonResponse> getClearance(@PathVariable Integer id) throws Exception {
        CommonResponse response = new CommonResponse("Success!", service.getClearance(id), 200);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @PostMapping("/update-fileclearance")
    @ResponseBody
    public Fmr updateClearance(String id, String desclist, @RequestParam(value = "deleteIds", required = false) String deleteIds, @RequestParam String statusclr) throws Exception {
        Integer idd = Integer.parseInt(id);
        // Pass deleteIds to the service method
        System.out.println(deleteIds);
        return service.updateClearance(idd, desclist, deleteIds, statusclr);

    }

   @PostMapping("/update-recommendation")
@ResponseBody
public Fmr updateRecommendation(@RequestParam Integer id, 
                                   @RequestParam String approver, 
                                   @RequestParam String justification) throws Exception {
    // Call the service layer to handle the update logic
    return service.updateRecommendation(id, approver, justification);
}


    
    @PostMapping("/approver")
    public Iterable<SlimSelectDTO> getApprover(@RequestParam String search) throws Exception {
        return service.getApprover(search);
    }

    @PostMapping("/update-undertakingap")
    @ResponseBody
    public Fmr updateUndertaking(String id, @RequestParam String statusund, @RequestParam String justification) throws Exception {
        Integer idd = Integer.parseInt(id);
        return service.updateUndertaking(idd, statusund, justification);

    }

    @PostMapping("/update-payment-undertaking")
    @ResponseBody
    public Fmr updatePaymentUP(String id, String desclist, @RequestParam(value = "deleteIds", required = false) String deleteIds, @RequestParam String statusvoucherun) throws Exception {
        Integer idd = Integer.parseInt(id);
        // Pass deleteIds to the service method
        System.out.println(deleteIds);
        return service.updatePaymentUP(idd, desclist, deleteIds, statusvoucherun);
    }

    
 
    
    
    @GetMapping("/paymentv-details/{id}")
    public ResponseEntity<CommonResponse> getPayment(@PathVariable Integer id) throws Exception {
        CommonResponse response = new CommonResponse("Success!", service.getPayment(id), 200);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @PostMapping("/update-payvoucher")
    @ResponseBody
    public Fmr updateVoucher(String id, @RequestParam String statusvoucher) throws Exception {
        Integer idd = Integer.parseInt(id);
        return service.updateVoucher(idd, statusvoucher);

    }

    @GetMapping("/counts")
    public Map<String, Long> getStatusCounts() {
        return service.getStatusCounts();
    }
//    @GetMapping("/count-all")
//    public Long getcountAllStatus() {
//        return service.countAllStatus();
//    }
//
//    @GetMapping("/count-acknopen")
//    public Long getcountAcknoPendStatus() {
//        return service.countAcknoPendStatus();
//    }
//
//    @GetMapping("/count-ackno")
//    public Long getcountAcknoStatus() {
//        return service.countAcknoStatus();
//    }
//
//    @GetMapping("/count-exception")
//    public Long getcountExceptionsStatus() {
//        return service.countExceptionsStatus();
//    }
//
//    @GetMapping("/count-undertaking")
//    public Long getcountUndertakinStatus() {
//        return service.countUndertakinStatus();
//    }
//
//    @GetMapping("/count-payment")
//    public Long getcountPaymentStatus() {
//        return service.countPaymentStatus();
//    }
//
//    @GetMapping("/count-completed")
//    public Long getCountOfCompletedStatus() {
//        return service.countCompletedStatus();
//    }
//
//    @GetMapping("/count-rejected")
//    public Long getcountRejectedStatus() {
//        return service.countRejectedStatus();
//    }
}
