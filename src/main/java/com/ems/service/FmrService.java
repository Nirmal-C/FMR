/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.ems.service;

import com.ems.datatable.DataTableRepo;
import com.ems.datatable.DataTableRequest;
import com.ems.datatable.DataTablesResponse;
import com.ems.dto.SlimSelectDTO;
import com.ems.dto.FmrDTO;
import com.ems.dto.FmrLogDTO;
import com.ems.model.FilePendings;
import com.ems.model.Fmr;
import com.ems.model.FmrLog;
import com.ems.repo.FacilityTypeRepo;
import com.ems.repo.FilePendingRepo;
import com.ems.repo.FmrRepo;
import com.ems.repo.FmrLogRepo;
import com.ems.repo.UserRepo;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.servlet.http.HttpSession;
import java.io.File;
import java.nio.file.Path;
import java.time.LocalDate;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

/**
 *
 * @author L580
 */
@Service
public class FmrService {

    @Autowired
    private DataTableRepo<FmrDTO> userDt;
    @Autowired
    private FmrRepo repo;
    @Autowired
    private FmrLogRepo repolog;
    @Autowired
    private FacilityTypeRepo repor;
    @Autowired
    private UserRepo repors;
    @Autowired
    private FilePendingRepo fmrrepo;

//    Operation
    public DataTablesResponse<FmrDTO> getFmrs(DataTableRequest param) throws Exception {
        String stage = param.getData();
        String stage1 = param.getData();
        String stage2 = param.getData();
        String stage3 = param.getData();

        String sql = "SELECT x.`id`,x.`customer_name`,x.`status`,x.`ref_number`,(SELECT `description` FROM `loan`.`product`  WHERE `id` = x.`product`) AS product,(SELECT `name` FROM `loan`.`branch`  WHERE `id` = x.`branch`) AS branch ,x.`amount`,x.`pendings`,x.`comment`,x.`approver`,x.`facility_status`,(SELECT d.`name` FROM `users` d WHERE d.`id`=x.`ent_by`) AS `ent_by`,`ent_on`,(SELECT d.`name` FROM `users` d WHERE d.`id`=x.`mod_by`) AS `mod_by`,`mod_on` FROM `fmr` X WHERE TRUE";
        if (!stage.equals("all")) {
            if (stage.equals("acknowledgment")) {
                sql += " AND `status`='Acknowledgment Pending'";
            } else if (stage.equals("file")) {
                sql += " AND `status`='Exceptions'";
            } else if (stage.equals("acknowledged")) {
                sql += " AND `status`='Acknowledged'";
            } else if (stage.equals("underrec")) {
                sql += " AND `status`='Undertaking Recommendation'";
            } else if (stage.equals("underapp")) {
                sql += " AND `status`='Undertaking Approval Pending'";
            } else if (stage.equals("payment")) {
                sql += " AND `status` IN ('Payment Processing', 'Payment Voucher Hand Over To Finance')";
            } else if (stage.equals("paymentunder")) {
                sql += " AND `status` IN ('Payment Processing - Undertaking Approved','Payment Voucher Hand Over To Finance(Undertaking Approved)')";
            } else if (stage.equals("completed")) {
                sql += " AND `status`='Completed'";
            } else if (stage.equals("completedun")) {
                sql += " AND `status`='Completed(Undertaking Approved)'";
            } else if (stage.equals("rejected")) {
                sql += " AND `status`='Rejected'";
            }
        }
        return userDt.getData(FmrDTO.class, param, sql);

    }

    //    branch
    public DataTablesResponse<FmrDTO> getFmrsBrnch(DataTableRequest param, Integer userId) throws Exception {
        String stage = param.getData();
        StringBuilder sql = new StringBuilder("SELECT x.`id`, x.`customer_name`, x.`status`, x.`ref_number`, "
                + "(SELECT `description` FROM `loan`.`product` WHERE `id` = x.`product`) AS product, "
                + "(SELECT `name` FROM `loan`.`branch` WHERE `id` = x.`branch`) AS branch, x.`amount`, x.`pendings`, "
                + "x.`comment`, x.`approver`, x.`facility_status`, "
                + "(SELECT d.`name` FROM `users` d WHERE d.`id`=x.`ent_by`) AS `ent_by`, `ent_on`, "
                + "(SELECT d.`name` FROM `users` d WHERE d.`id`=x.`mod_by`) AS `mod_by`, `mod_on` "
                + "FROM `fmr` x WHERE TRUE AND x.branch = (SELECT `branch` FROM `users` WHERE `id` = ?)");

        if (!"all".equals(stage)) {
            switch (stage) {
                case "acknowledgment" ->
                    sql.append(" AND x.`status`='Acknowledgment Pending'");
                case "file" ->
                    sql.append(" AND x.`status`='Exceptions'");
                case "acknowledged" ->
                    sql.append(" AND x.`status`='Acknowledged'");
                case "underrec" ->
                    sql.append(" AND x.`status`='Undertaking Recommendation'");
                case "underapp" ->
                    sql.append(" AND x.`status`='Undertaking Approval Pending'");
                case "payment" ->
                    sql.append(" AND x.`status`='Payment Processing'");
                case "paymentunder" ->
                    sql.append(" AND x.`status`='Payment Processing - Undertaking Approved'");
                case "completed" ->
                    sql.append(" AND x.`status`='Completed'");
                case "completedun" ->
                    sql.append(" AND x.`status`='Completed(Undertaking Approved)'");
                case "rejected" ->
                    sql.append(" AND x.`status`='Rejected'");
                default -> {
                }
            }
        }

        return userDt.getData(FmrDTO.class, param, sql.toString(), userId);
    }

//Approver
    public DataTablesResponse<FmrDTO> getFmrApprove(DataTableRequest param, Integer userId) throws Exception {
        String stage = param.getData();
        String sql;

        // Construct SQL query based on the stage
        if (stage.equals("underrec")) {
            sql = "SELECT x.`id`, x.`customer_name`, x.`status`, x.`ref_number`, "
                    + "(SELECT `description` FROM `loan`.`product` WHERE `id` = x.`product`) AS product, "
                    + "(SELECT `name` FROM `loan`.`branch` WHERE `id` = x.`branch`) AS branch, "
                    + "x.`amount`, x.`pendings`, x.`comment`, x.`approver`, x.`facility_status`, "
                    + "(SELECT d.`name` FROM `users` d WHERE d.`id` = x.`ent_by`) AS `ent_by`, "
                    + "x.`ent_on`, "
                    + "(SELECT d.`name` FROM `users` d WHERE d.`id` = x.`mod_by`) AS `mod_by`, "
                    + "x.`mod_on` "
                    + "FROM `fmr` X "
                    + "WHERE x.`status` = 'Undertaking Recommendation'";
        } else {
            sql = "SELECT x.`id`, x.`customer_name`, x.`status`, x.`ref_number`, "
                    + "(SELECT `description` FROM `loan`.`product` WHERE `id` = x.`product`) AS product, "
                    + "(SELECT `name` FROM `loan`.`branch` WHERE `id` = x.`branch`) AS branch, "
                    + "x.`amount`, x.`pendings`, x.`comment`, x.`approver`, x.`facility_status`, "
                    + "(SELECT d.`name` FROM `users` d WHERE d.`id` = x.`ent_by`) AS `ent_by`, "
                    + "x.`ent_on`, "
                    + "(SELECT d.`name` FROM `users` d WHERE d.`id` = x.`mod_by`) AS `mod_by`, "
                    + "x.`mod_on` "
                    + "FROM `fmr` X "
                    + "WHERE x.`approver` = ? AND x.`status` = 'Undertaking Approval Pending'";
        }

        // Execute the query with the userId parameter if the stage is not underrec
        if (!stage.equals("underrec")) {
            return userDt.getData(FmrDTO.class, param, sql, userId);
        } else {
            return userDt.getData(FmrDTO.class, param, sql);
        }
    }

    public DataTablesResponse<FmrDTO> getFmrApprovse(DataTableRequest param, Integer userId) throws Exception {
        return userDt.getData(FmrDTO.class, param, "SELECT x.`id`,x.`customer_name`,x.`status`,x.`ref_number`,(SELECT `description` FROM `loan`.`product`  WHERE `id` = x.`product`) AS product,(SELECT `name` FROM `loan`.`branch`  WHERE `id` = x.`branch`) AS branch ,x.`amount`,x.`pendings`,x.`comment`,x.`approver`,x.`facility_status`,(SELECT d.`name` FROM `users` d WHERE d.`id`=x.`ent_by`) AS `ent_by`,`ent_on`,(SELECT d.`name` FROM `users` d WHERE d.`id`=x.`mod_by`) AS `mod_by`,`mod_on` FROM `fmr` X WHERE `status`='Acknowledgment Pending' AND x.branch = (SELECT `branch` FROM `users` WHERE `id` = ?)", userId);

    }

    public DataTablesResponse<FmrDTO> getFmrfileBranch(DataTableRequest param, Integer userId) throws Exception {
        return userDt.getData(FmrDTO.class, param, "SELECT x.`id`,x.`customer_name`,x.`status`,x.`ref_number`,(SELECT `description` FROM `loan`.`product`  WHERE `id` = x.`product`) AS product,(SELECT `name` FROM `loan`.`branch`  WHERE `id` = x.`branch`) AS branch ,x.`amount`,x.`pendings`,x.`comment`,x.`approver`,x.`facility_status`,(SELECT d.`name` FROM `users` d WHERE d.`id`=x.`ent_by`) AS `ent_by`,`ent_on`,(SELECT d.`name` FROM `users` d WHERE d.`id`=x.`mod_by`) AS `mod_by`,`mod_on` FROM `fmr` X WHERE `status`='File Pending Details' AND x.branch = (SELECT `branch` FROM `users` WHERE `id` = ?)", userId);

    }

    public DataTablesResponse<FmrDTO> getFmrclearanceBranch(DataTableRequest param, Integer userId) throws Exception {
        return userDt.getData(FmrDTO.class, param, "SELECT x.`id`,x.`customer_name`,x.`status`,x.`ref_number`,(SELECT `description` FROM `loan`.`product`  WHERE `id` = x.`product`) AS product,(SELECT `name` FROM `loan`.`branch`  WHERE `id` = x.`branch`) AS branch ,x.`amount`,x.`pendings`,x.`comment`,x.`approver`,x.`facility_status`,(SELECT d.`name` FROM `users` d WHERE d.`id`=x.`ent_by`) AS `ent_by`,`ent_on`,(SELECT d.`name` FROM `users` d WHERE d.`id`=x.`mod_by`) AS `mod_by`,`mod_on` FROM `fmr` X WHERE `status`='File Pending Clearance' AND x.branch = (SELECT `branch` FROM `users` WHERE `id` = ?)", userId);

    }

    public DataTablesResponse<FmrDTO> getFmrapprovalBranch(DataTableRequest param, Integer userId) throws Exception {
        return userDt.getData(FmrDTO.class, param, "SELECT x.`id`,x.`customer_name`,x.`status`,x.`ref_number`,(SELECT `description` FROM `loan`.`product`  WHERE `id` = x.`product`) AS product,(SELECT `name` FROM `loan`.`branch`  WHERE `id` = x.`branch`) AS branch ,x.`amount`,x.`pendings`,x.`comment`,(SELECT `name` FROM `users` WHERE `id` = x.`approver`)AS approver,x.`facility_status`,(SELECT d.`name` FROM `users` d WHERE d.`id`=x.`ent_by`) AS `ent_by`,`ent_on`,(SELECT d.`name` FROM `users` d WHERE d.`id`=x.`mod_by`) AS `mod_by`,`mod_on` FROM `fmr` X WHERE `status`='Undertaking Approval Pending' AND x.branch = (SELECT `branch` FROM `users` WHERE `id` = ?)", userId);

    }

    public DataTablesResponse<FmrDTO> getFmrpaymentBranch(DataTableRequest param, Integer userId) throws Exception {
        return userDt.getData(FmrDTO.class, param, "SELECT x.`id`,x.`customer_name`,x.`status`,x.`ref_number`,(SELECT `description` FROM `loan`.`product`  WHERE `id` = x.`product`) AS product,(SELECT `name` FROM `loan`.`branch`  WHERE `id` = x.`branch`) AS branch ,x.`amount`,x.`pendings`,x.`comment`,x.`approver`,x.`facility_status`,(SELECT d.`name` FROM `users` d WHERE d.`id`=x.`ent_by`) AS `ent_by`,`ent_on`,(SELECT d.`name` FROM `users` d WHERE d.`id`=x.`mod_by`) AS `mod_by`,`mod_on` FROM `fmr` X WHERE `status`='Payment Processing' AND x.branch = (SELECT `branch` FROM `users` WHERE `id` = ?)", userId);

    }

    public DataTablesResponse<FmrDTO> getFmrpaymentUABranch(DataTableRequest param, Integer userId) throws Exception {
        return userDt.getData(FmrDTO.class, param, "SELECT x.`id`,x.`customer_name`,x.`status`,x.`ref_number`,(SELECT `description` FROM `loan`.`product`  WHERE `id` = x.`product`) AS product,(SELECT `name` FROM `loan`.`branch`  WHERE `id` = x.`branch`) AS branch ,x.`amount`,x.`pendings`,x.`comment`,x.`approver`,x.`facility_status`,(SELECT d.`name` FROM `users` d WHERE d.`id`=x.`ent_by`) AS `ent_by`,`ent_on`,(SELECT d.`name` FROM `users` d WHERE d.`id`=x.`mod_by`) AS `mod_by`,`mod_on` FROM `fmr` X WHERE `status`='Payment Processing - Undertaking Approved' AND x.branch = (SELECT `branch` FROM `users` WHERE `id` = ?)", userId);

    }

    public DataTablesResponse<FmrDTO> getFmrCompletedBranch(DataTableRequest param, Integer userId) throws Exception {
        return userDt.getData(FmrDTO.class, param, "SELECT x.`id`,x.`customer_name`,x.`status`,x.`ref_number`,(SELECT `description` FROM `loan`.`product`  WHERE `id` = x.`product`) AS product,(SELECT `name` FROM `loan`.`branch`  WHERE `id` = x.`branch`) AS branch ,x.`amount`,x.`pendings`,x.`comment`,x.`approver`,x.`facility_status`,(SELECT d.`name` FROM `users` d WHERE d.`id`=x.`ent_by`) AS `ent_by`,`ent_on`,(SELECT d.`name` FROM `users` d WHERE d.`id`=x.`mod_by`) AS `mod_by`,`mod_on` FROM `fmr` X WHERE `status`='Completed' AND x.branch = (SELECT `branch` FROM `users` WHERE `id` = ?)", userId);

    }

    public DataTablesResponse<FmrDTO> getFmrRejectBranch(DataTableRequest param, Integer userId) throws Exception {
        return userDt.getData(FmrDTO.class, param, "SELECT x.`id`,x.`customer_name`,x.`status`,x.`ref_number`,(SELECT `description` FROM `loan`.`product`  WHERE `id` = x.`product`) AS product,(SELECT `name` FROM `loan`.`branch`  WHERE `id` = x.`branch`) AS branch ,x.`amount`,x.`pendings`,x.`comment`,x.`approver`,x.`facility_status`,(SELECT d.`name` FROM `users` d WHERE d.`id`=x.`ent_by`) AS `ent_by`,`ent_on`,(SELECT d.`name` FROM `users` d WHERE d.`id`=x.`mod_by`) AS `mod_by`,`mod_on` FROM `fmr` X WHERE `status`='Rejected' AND x.branch = (SELECT `branch` FROM `users` WHERE `id` = ?)", userId);

    }

    public Iterable<SlimSelectDTO> getStatus(String search) {
        return repor.getStatus("%" + search.trim() + "%");
    }

    public Iterable<SlimSelectDTO> getBranches(String search) {
        return repor.getBranches("%" + search.trim() + "%");
    }

    public Iterable<SlimSelectDTO> getProduct(String search) {
        return repor.getProduct("%" + search.trim() + "%");
    }

    public Fmr saveFmr(String ref_number, String customer_name, String product, String amount, String facility_status, HttpSession session) {
        Fmr savefmr = new Fmr();
        savefmr.setRef_number(ref_number);
        savefmr.setCustomer_name(customer_name);
        savefmr.setProduct(product);
        savefmr.setAmount(amount);
        savefmr.setFacility_status(facility_status);
        String branchFromSession = (String) session.getAttribute("branch");
        savefmr.setBranch(branchFromSession);
        savefmr.setStatus("Acknowledgment Pending");
        savefmr = repo.save(savefmr);

        return savefmr;
    }

    public Fmr updateFmr(Integer id, String ref_number, String customer_name, String product, String amount, String statustype, String reason) throws Exception {
        Fmr updatefmr = repo.findById(id).get();

        updatefmr.setRef_number(ref_number);
        updatefmr.setCustomer_name(customer_name);
        updatefmr.setProduct(product);
        updatefmr.setAmount(amount);

        switch (statustype) {
            case "reject":
                updatefmr.setStatus("Rejected");
                updatefmr.setReason(reason);
                break;

            case "acknowledged":
                updatefmr.setStatus("Acknowledged");
                break;

            default:
                // Handle default case if necessary
                break;
        }

        updatefmr = repo.save(updatefmr);
        return updatefmr;
    }

    public Map<String, Object> getFmrses(Integer id) throws Exception {
        Fmr sys = repo.findById(id).get();

        Map<String, Object> product = jdbc.queryForMap("SELECT `description` as product_txt FROM `loan`.`product`  WHERE `id` = ?", sys.getProduct());
        sys.setProductTxt((String) product.get("product_txt"));
        System.out.println(product);

        Map<String, Object> name = jdbc.queryForMap("SELECT `name` as entered FROM `users` WHERE `id` = ?", sys.getEnt_by());
        sys.setEntUser((String) name.get("entered"));
        System.out.println(name);

        Map<String, Object> combinedData = new HashMap<>();
        combinedData.put("d1", product);
        combinedData.put("d2", name);
        combinedData.put("obj", sys);

        return combinedData;
    }

    @Autowired
    private JdbcTemplate jdbc;

    public Fmr getFmrFile(Integer id) throws Exception {
        Fmr sys = repo.findById(id).get();

        Map<String, Object> data = jdbc.queryForMap("SELECT `description` as product_txt FROM `loan`.`product`  WHERE `id` = ?", sys.getProduct());
        System.out.println(data);
        sys.setProductTxt((String) data.get("product_txt"));

        return sys;
    }

    private final ObjectMapper mapper = new ObjectMapper();

    public Fmr uploadFiles(Integer id, String desclist, String statusack) throws Exception {
        Fmr system = repo.findById(id).orElseThrow(() -> new Exception("Record not found with id: " + id));
        system.setPendings(system.getId());

        system = repo.save(system);

        switch (statusack) {
            case "payProcess":
                system.setStatus("Payment Processing");
                break;

            case "fileped":
                system.setStatus("Exceptions");
                JsonNode fileList = mapper.readTree(desclist);
                for (JsonNode fileItem : fileList) {
                    FilePendings attachment = new FilePendings();
                    attachment.setPendings(system.getId());
                    attachment.setName(fileItem.get("name").asText());
//                    attachment.setJustification(fileItem.get("justification").asText());
                    attachment.setDate(LocalDate.parse(fileItem.get("completionDate").asText()));
                    attachment.setStatus("active");
                    fmrrepo.save(attachment);
                }
                break;

            default:
                // Handle default case if necessary
                break;
        }

        return repo.save(system);
    }

    public Object getClearance(Integer id) throws Exception {
        Fmr sys = repo.findById(id).orElseThrow(() -> new Exception("Fmr not found for id: " + id));

        // Fetch product data
        Map<String, Object> data;
        try {
            data = jdbc.queryForMap("SELECT `description` as product_txt FROM `loan`.`product` WHERE `id` = ?", sys.getProduct());
            sys.setProductTxt((String) data.get("product_txt"));
        } catch (EmptyResultDataAccessException e) {
            // Handle the case where no product is found
            data = new HashMap<>();
            data.put("product_txt", "Product not found");
            sys.setProductTxt("Product not found");
        }



        // Fetch approver data
        Map<String, Object> datas;
        try {
            datas = jdbc.queryForMap("SELECT `name` as approvername FROM `users` WHERE `id` = ?", sys.getApprover());
            sys.setApproverName((String) datas.get("approvername"));
        } catch (EmptyResultDataAccessException e) {
            // Handle the case where no approver is found
            datas = new HashMap<>();
            datas.put("approvername", "Approver not found");
            sys.setApproverName("Approver not found");
        }

//        Map<String, Object> modByUserData;
//        try {
//            modByUserData = jdbc.queryForMap("SELECT `name` as modby_name FROM `users` WHERE `id` = ?", sys.getMod_by());
//            String modbyName = (String) modByUserData.get("modby_name");
//            // Optionally set this value in the sys object or use it as needed
//        } catch (EmptyResultDataAccessException e) {
//            // Handle the case where no user is found
//            modByUserData = new HashMap<>();
//            modByUserData.put("modby_name", "User not found");
//        }

        // Fetch content again to ensure it's up-to-date
        Fmr content = repo.findById(id).orElseThrow(() -> new Exception("Fmr not found for id: " + id));
        List<FilePendings> videos = fmrrepo.findByPendingsAndStatus(id, "active");

        for (FilePendings video : videos) {
            try {
                Map<String, Object> name = jdbc.queryForMap("SELECT `name` as entered FROM `users` WHERE `id` = ?", video.getMod_by());
                String enteredName = (String) name.get("entered");
                video.setModby(enteredName);
            } catch (EmptyResultDataAccessException e) {
                // Handle the case where no user is found
                video.setModby("User not found");
            }
        }
        
        
     List<Map<String, Object>> log = jdbc.queryForList(
    "select id, (select name from users where id=l.mod_by) as mod_user, mod_on, action, justification from fmr_log l where fmr_id=?", 
    id
);

        // Adding all the data to the return map
        Map<String, Object> result = new HashMap<>();
        result.put("productData", data);
        result.put("approverData", datas);
        result.put("content", content);
        result.put("videos", videos);
        result.put("log", log);

        return result;
    }

    public Fmr updateClearance(Integer id, String desclist, String deleteIds, String statusclr) {
        try {
            Fmr system = repo.findById(id).orElseThrow(() -> new Exception("FMR not found"));
            //   system.setJustification(justification);
            // Handle deleteIds
            if (deleteIds != null) {
                JsonNode toBeDeleted = mapper.readTree(deleteIds);
                for (JsonNode jsonNode : toBeDeleted) {
                    Optional<FilePendings> optionalMembers = fmrrepo.findById(Integer.parseInt(jsonNode.asText()));
                    if (optionalMembers.isPresent()) {
                        FilePendings attachmentToDelete = optionalMembers.get();
                        attachmentToDelete.setStatus("deactivate");
                        fmrrepo.save(attachmentToDelete);
                    } else {
                        throw new Exception("FMR with ID " + jsonNode.asText() + " not found");
                    }
                }
            }

            // Handle desclist
            if (desclist != null && !desclist.isEmpty()) {
                JsonNode fileList = mapper.readTree(desclist);
                for (int i = 0; i < fileList.size(); i++) {
                    JsonNode fileItem = fileList.get(i);
                    String fileName = fileItem.get("name").asText();

                    FilePendings attachment = new FilePendings();
                    attachment.setPendings(system.getId());
                    attachment.setName(fileName);
                    attachment.setStatus("active");
                    fmrrepo.save(attachment);
                }
            }

            // Handle statusclr
            if ("approve".equals(statusclr)) {
//                system.setApprover(approver);
                system.setStatus("Undertaking Recommendation");
            } else if ("cleared".equals(statusclr)) {
                system.setStatus("Payment Processing");
            }

            return repo.save(system);
        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException("Failed to update FMR with File Pendings", e);
        }
    }

    private boolean containsMembersId(String desclist, Integer attachmentId) throws JsonProcessingException {
        JsonNode fileList = mapper.readTree(desclist);
        for (int i = 0; i < fileList.size(); i++) {
            JsonNode fileItem = fileList.get(i);
            Integer fileId = fileItem.get("fileId").asInt();
            if (fileId.equals(attachmentId)) {
                return true;
            }
        }
        return false;
    }

    public Iterable<SlimSelectDTO> getApprover(String search) {
        return repors.getApprover("%" + search.trim() + "%");
    }
    
    @Autowired
    FmrLogRepo fmrlog;

    public Fmr updateRecommendation(Integer id, String approver, String justification) throws Exception {
        Fmr rec = repo.findById(id).get();

//        rec.setPrev_action("Recommendation Undertaken");

//        rec.setJustification(justification);

        rec.setApprover(approver);
        rec.setStatus("Undertaking Approval Pending");

        rec = repo.save(rec);

        FmrLog ent = new FmrLog();
        ent.setAction("Undertaking Approval Pending");
        ent.setJustification(justification);
        ent.setFmrId(id);
        
        fmrlog.save(ent);

        return rec;
    }

//    public FmrLog updateRecommendations(Integer id, String approver, String justification) throws Exception {
//        FmrLog ent = repolog.findById(id).get();
//        ent.setAction("Undertaking Approval Pending");
//
//        return ent;
//    }

    public Fmr updateUndertaking(Integer id, String statusund, String justification) throws Exception {
        Fmr updatefmr = repo.findById(id).get();
FmrLog und = new FmrLog();
und.setAction("Undertaking Approval Pending");
        und.setJustification(justification);
        und.setFmrId(id);
 
        switch (statusund) {
            case "returned":
                updatefmr.setStatus("Exceptions");
                und.setAction("Not Approved");

                break;
            case "approved":
                updatefmr.setStatus("Payment Processing - Undertaking Approved");
                und.setAction("Approved");
                break;

            default:
                // Handle default case if necessary
                break;
        }

        updatefmr = repo.save(updatefmr);
        fmrlog.save(und);
        return updatefmr;
    }

    public Fmr updatePaymentUP(Integer id, String desclist, String deleteIds, String statusvoucherun) {
        try {
            Fmr system = repo.findById(id).orElseThrow(() -> new Exception("FMR not found"));

            // Handle deleteIds
            if (deleteIds != null) {
                JsonNode toBeDeleted = mapper.readTree(deleteIds);
                for (JsonNode jsonNode : toBeDeleted) {
                    Optional<FilePendings> optionalMembers = fmrrepo.findById(Integer.parseInt(jsonNode.asText()));
                    if (optionalMembers.isPresent()) {
                        FilePendings attachmentToDelete = optionalMembers.get();
                        attachmentToDelete.setStatus("deactivate");
                        fmrrepo.save(attachmentToDelete);
                    } else {
                        throw new Exception("FMR with ID " + jsonNode.asText() + " not found");
                    }
                }
            }

            // Handle desclist
            if (desclist != null && !desclist.isEmpty()) {
                JsonNode fileList = mapper.readTree(desclist);
                for (int i = 0; i < fileList.size(); i++) {
                    JsonNode fileItem = fileList.get(i);
                    String fileName = fileItem.get("name").asText();

                    FilePendings attachment = new FilePendings();
                    attachment.setPendings(system.getId());
                    attachment.setName(fileName);
                    attachment.setStatus("active");
                    fmrrepo.save(attachment);
                }
            }
            switch (statusvoucherun) {
                case "completedun":
                    system.setStatus("Completed(Undertaking Approved)");
                    break;

                default:
                    // Handle default case if necessary
                    break;
            }
            return repo.save(system);
        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException("Failed to update FMR with File Pendings", e);
        }
    }

    public Map<String, Object> getPayment(Integer id) throws Exception {
        // Fetch the Fmr object
        Fmr sys = repo.findById(id).orElseThrow(() -> new Exception("Fmr not found for id: " + id));

        // Fetch product data
        Map<String, Object> data;
        try {
            data = jdbc.queryForMap("SELECT `description` as product_txt FROM `loan`.`product` WHERE `id` = ?", sys.getProduct());
            sys.setProductTxt((String) data.get("product_txt"));
        } catch (EmptyResultDataAccessException e) {
            // Handle the case where no product is found
            data = new HashMap<>();
            data.put("product_txt", "Product not found");
            sys.setProductTxt("Product not found");
        }
        System.out.println(data);

        // Fetch approver data
        Map<String, Object> datas;
        try {
            datas = jdbc.queryForMap("SELECT `name` as approvername FROM `users` WHERE `id` = ?", sys.getApprover());
            sys.setApproverName((String) datas.get("approvername"));
        } catch (EmptyResultDataAccessException e) {
            // Handle the case where no approver is found
            datas = new HashMap<>();
            datas.put("approvername", "Approver not found");
            sys.setApproverName("Approver not found");
        }
        System.out.println(datas);

        // Combine the data into a single map
        Map<String, Object> combinedData = new HashMap<>();
        combinedData.put("d1", data);
        combinedData.put("d2", datas);
        combinedData.put("obj", sys);

        return combinedData;
    }

    public Fmr updateVoucher(Integer id, String statusvoucher) throws Exception {
        Fmr updatefmr = repo.findById(id).get();

        switch (statusvoucher) {
            case "completed":
                updatefmr.setStatus("Completed");
                break;

            case "completedun":
                updatefmr.setStatus("Completed(Undertaking Approved)");
                break;

            case "handover":
                updatefmr.setStatus("Payment Voucher Hand Over To Finance");
                break;

            case "handoverun":
                updatefmr.setStatus("Payment Voucher Hand Over To Finance(Undertaking Approved)");
                break;

            default:
                // Handle default case if necessary
                break;
        }

        updatefmr = repo.save(updatefmr);
        return updatefmr;
    }

    public Map<String, Long> getStatusCounts() {
        Map<String, Long> counts = new HashMap<>();
        counts.put("countAll", repo.countByStatusAll());
        counts.put("countAcknoPend", repo.countByStatusAcknoPe());
        counts.put("countAckno", repo.countByStatusAckno());
        counts.put("countExceptions", repo.countByStatusExceptions());
        counts.put("countUndertaking", repo.countByStatusUnder());
        counts.put("countPayment", repo.countByStatusPayment());
        counts.put("countCompleted", repo.countByStatusCompleted());
        counts.put("countRejected", repo.countByStatusRejected());
        return counts;
    }

//    public Long countAllStatus() {
//        return repo.countByStatusAll();
//    }
//
//    public Long countAcknoPendStatus() {
//        return repo.countByStatusAcknoPe();
//    }
//
//    public Long countAcknoStatus() {
//        return repo.countByStatusAckno();
//    }
//
//    public Long countExceptionsStatus() {
//        return repo.countByStatusExceptions();
//    }
//
//    public Long countUndertakinStatus() {
//        return repo.countByStatusUnder();
//    }
//
//    public Long countPaymentStatus() {
//        return repo.countByStatusPayment();
//    }
//
//    public Long countCompletedStatus() {
//        return repo.countByStatusCompleted();
//    }
//
//    public Long countRejectedStatus() {
//        return repo.countByStatusRejected();
//    }
}
