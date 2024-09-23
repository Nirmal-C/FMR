/* 
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/JSP_Servlet/JavaScript.js to edit this template
 */







var status = '';
var secondFilter = '';



$("#filterAllComplaints").click(function () {



    status = '';
    dtable.ajax.reload();

    $('#changeTopicDataTable').text("All Complaints");
});



$("#filterCompletedComplaints").click(function () {



    status = 'Completed';

    dtable.ajax.reload();
    $('#changeTopicDataTable').text("Completed Complaints");
});






$("#filterRejectedComplaint").click(function () {

    status = 'Rejected';
    dtable.ajax.reload();

    $('#changeTopicDataTable').text("Rejected Complaints");


});


$("#filterProgressComplaint").click(function () {


    status = 'Progress';
    dtable.ajax.reload();

    $('#changeTopicDataTable').text("Progress Complaints");
});


$("#filterApprovedComplaint").click(function () {


    status = 'Approved';
    dtable.ajax.reload();

    $('#changeTopicDataTable').text("Aprrove Complaints");
});

$("#filterQueueComplaint").click(function () {


    status = 'Queue';
    dtable.ajax.reload();

    $('#changeTopicDataTable').text("Queue Complaints");
});


$("#filterTodayComplaint").click(function () {

    status = 'today';
    dtable.ajax.reload();

    $('#changeTopicDataTable').text("Today Complaints");
});


$("#filterThisMonthComplaint").click(function () {
    status = 'month';

    dtable.ajax.reload();
    $('#changeTopicDataTable').text("This Month Complaints");


});

$("#filterThisYearComplaint").click(function () {
    status = 'year';
    dtable.ajax.reload();
    $('#changeTopicDataTable').text("This Year Complaints");

});







$("#filterResetCustomeDateComplaint").click(function () {
    document.getElementById("FromDateAdminDashboard").value = '';
    document.getElementById("ToDateAdminDashboard").value = '';
});


$.fn.dataTable.ext.errMode = 'none';




var dtable = $('#viewAllComplaintasTableNewAdminDashboard').DataTable({

    "aLengthMenu": [[5, 10, 25, -1], [5, 10, 25, "All"]],
    "pageLength": 0,
    "ordering": true,
    "autoWidth": false,
    "processing": true,
    "serverSide": true,
    "order": [[0, "desc"]],
    "searchHighlight": true,
    "searchDelay": 350,
    "ajax": {
        "url": "table-data-allViewComplaintData",
        "contentType": "application/json",
        "type": "POST",
        "data": function (d) {
            d.data1 = status;
            d.data2 = secondFilter;

            return JSON.stringify(d);
        },
        error: function (xhr, error, code) {
            console.log(xhr);
            console.log(code);
        }
    },
    "columns": [
        {"data": "serial_number", className: "text-wrap"},
        {"data": "complaint_id", visible: false},
        {"data": "complaintType", className: "text-wrap", visible: false},
        {
            "data": "officerName",
            "className": "text-wrap",
            "render": function (data, type, row) {
                var names = data.split(' ');
                var initials = names.slice(0, -1).map(function (name) {
                    return name.charAt(0) + '.';
                }).join(' ');
                var formattedName = initials + ' ' + names.slice(-1);

                return formattedName;
            }
        },
        {
            "data": "customer",
            "className": "text-wrap",
            "render": function (data, type, row) {
                var names = data.split(' ');
                var initials = names.slice(0, -1).map(function (name) {
                    return name.charAt(0) + '.';
                }).join(' ');
                var formattedName = initials + ' ' + names.slice(-1);

                return formattedName;
            }
        }

        ,
        {"data": "complaintTypeName", className: "text-wrap"},
        {"data": "complaintCategoryName", className: "text-wrap", visible: false},
        {"data": "ReachingModeName", className: "text-wrap", visible: false},
        {"data": "complaintCategory", className: "text-wrap", visible: false},
        {"data": "ReachingMode", className: "text-wrap", visible: false},
        {"data": "compaintFieldDate", className: "text-wrap", visible: false},
        {
            "data": "jobComplitionDate",
            "className": "text-wrap",
            "render": function (data, type, row) {
                var dateString = data; // Assuming 'data' contains the date string
                var dateObj = new Date(dateString);
                var year = dateObj.getFullYear();
                var month = dateObj.toLocaleString('en-US', {month: 'long'});
                var day = ("0" + dateObj.getDate()).slice(-2);
                var hours = ("0" + dateObj.getHours()).slice(-2);
                var minutes = ("0" + dateObj.getMinutes()).slice(-2);
                var period = (dateObj.getHours() >= 12) ? "PM" : "AM";

                var formattedDate = year + '-' + month + '-' + day + ' | ' + hours + '.' + minutes + period;

                return formattedDate;
            }
        },
        {"data": "complitionTime", className: "text-wrap", visible: false},
        {"data": "agreementNumber", className: "text-wrap", visible: false},
        {"data": "vehicleNumber", className: "text-wrap", visible: false},
        {"data": "senario", className: "text-wrap", visible: false},
        {"data": "remarks", className: "text-wrap", visible: false},
        {"data": "actionTaken", className: "text-wrap"},
        {"data": "fileUpload", className: "text-wrap", visible: false},
        {"data": "relaventOfficerId", className: "text-wrap", visible: false},
        {"data": "productType", className: "text-wrap", visible: false},
        {"data": "status", className: "text-wrap"},
        {"data": "status_repeat", className: "text-wrap", visible: false},
        {"data": "age", className: "text-wrap", visible: false},
        {"data": "pending_complition", className: "text-wrap", visible: false}
    ],
    "language": {
        'loadingRecords': '&nbsp;',
        'processing': '<div class="loader2"></div>'
    },
    "createdRow": function (row, data) {
        if (data['age'] !== '') {
            var ageInSeconds = data['age'];
            var days = Math.floor(ageInSeconds / (24 * 60 * 60));
            var hours = Math.floor((ageInSeconds % (24 * 60 * 60)) / (60 * 60));
            var minutes = Math.floor((ageInSeconds % (60 * 60)) / 60);
            var seconds = ageInSeconds % 60;

            var final = '';
            if (days > 0) {
                final += days + " days";
            } else if (hours > 0 && hours < 24) {
                if (final !== '') {
                    final += ', ';
                }
                final += hours + " hours";
            } else if (minutes > 0 || seconds < 60) {
                if (final !== '') {
                    final += ', ';
                }
                final += minutes + " minutes";
            } else if (final === '') {
                final += "0 minutes";
            }

            $(row).find('td').eq(5).html('<label class="badge bg-primary" style="font-size:12px; background-color:#84649c !important;">' + final + '</label>');
        }




        if (data['pending_complition'] === 'true' && data['status_repeat'] === 'Reopen') {


            $(row).find('td').eq(6).html('<label class="badge bg-danger" style="font-size:12px">Pending</label>  <i class="bi bi-repeat" style="color:black; font-size: 20px; font-weight:bold;">');
        } else if (data['pending_complition'] === 'true') {


            $(row).find('td').eq(6).html('<label class="badge bg-danger" style="font-size:12px">Pending</label> ');


        } else if (data['actionTaken'] === 'Completed' && data['status_repeat'] === 'Reopen') {



            $(row).find('td').eq(6).html('<label class="badge  bg-success" style="font-size:12px">Completed</label>  <i class="bi bi-repeat" style="color:black; font-size: 20px; font-weight:bold;">');
        } else if (data['actionTaken'] === 'Incomplete') {


            $(row).find('td').eq(6).html('<label class="badge rounded-pill bg-danger" style="font-size:12px">Re-Open</label>  <i class="bi bi-repeat" style="color:black; font-size: 20px; font-weight:bold;">');
        } else if (data['actionTaken'] === 'Queue' && data['status_repeat'] === 'Reopen') {


            $(row).find('td').eq(6).html('<label class="badge bg-info text-dark" style="font-size:12px">Queue</label>  <i class="bi bi-repeat" style="color:black; font-size: 20px; font-weight:bold;">');


        } else if (data['actionTaken'] === 'Progress' && data['status_repeat'] === 'Reopen') {


            $(row).find('td').eq(6).html('<label class="badge bg-warning text-dark" style="font-size:12px;">Progress</label>  <i class="bi bi-repeat" style="color:black; font-size: 20px; font-weight:bold;">');

        } else if (data['actionTaken'] === 'GetApproved' && data['status_repeat'] === 'Reopen') {


            $(row).find('td').eq(6).html('<label class="badge bg-primary" style="font-size:12px">GetApproved</label>  <i class="bi bi-repeat" style="color:black; font-size: 20px; font-weight:bold;">');
        } else if (data['actionTaken'] === 'Rejected' && data['status_repeat'] === 'Reopen') {


            $(row).find('td').eq(6).html('<label class="badge bg-danger" style="font-size:12px">Rejected</label>  <i class="bi bi-repeat" style="color:black; font-size: 20px; font-weight:bold;">');



        } else if (data['actionTaken'] === 'Completed') {



            $(row).find('td').eq(6).html('<label class="badge  bg-success" style="font-size:12px">Completed</label>');
        } else if (data['actionTaken'] === 'Incomplete') {


            $(row).find('td').eq(6).html('<label class="badge rounded-pill bg-danger" style="font-size:12px">Re-Open</label>');
        } else if (data['actionTaken'] === 'Queue') {


            $(row).find('td').eq(6).html('<label class="badge bg-info text-dark" style="font-size:12px">Queue</label>');


        } else if (data['actionTaken'] === 'Progress') {


            $(row).find('td').eq(6).html('<label class="badge bg-warning text-dark" style="font-size:12px;">Progress</label>');

        } else if (data['actionTaken'] === 'GetApproved') {


            $(row).find('td').eq(6).html('<label class="badge bg-primary" style="font-size:12px">GetApproved</label>');
        } else if (data['actionTaken'] === 'Rejected') {


            $(row).find('td').eq(6).html('<label class="badge bg-danger" style="font-size:12px">Rejected</label>');


        }


        $(row).on('mouseover', function () {
            $(row).css({
                'background-color': '#b5a2c4',
//                'font-weight': 'bold'
            });


        });

        $(row).on('mouseout', function () {
            $(row).css({
                'background-color': '',
//                'font-weight': ''
            });

        });

        $(row).on('click', function () {
            var complaintId = data.complaint_id;
            var officername = data.officerName;
            var serialNumber = data.serial_number;


            refreshComplaintView();

            function refreshComplaintView() {

                fetch('showComplaintDatainModel', {
                    method: 'POST',
                    body: new URLSearchParams({
                        id: complaintId,
                    })
                }).then((res) => res.text()).then(function (res) {
                    if (res != null) {
                        var data = JSON.parse(res);
                        var nameValue = data[0].customerName;
                        var nic = data[0].nic;
                        var customer_id = data[0].customer_id;
                        var customerEmail = data[0].customerEmail;
                        var customerLandLine = data[0].customerLandLine;
                        var customerMobile = data[0].customerMobile;
                        var customerAddress = data[0].customerAddress;
                        var customerOtherInfor = data[0].customerOtherInfor;


                        var officerName = data[0].officerName;
                        var officer_id = data[0].officer_id;
                        var department = data[0].department;
                        var branch = data[0].branch;


                        var complaintType = data[0].complaintType;
                        var complaint_id = data[0].complaint_id;
                        var productType = data[0].productType;
                        var complaintCateogry = data[0].complaintCateogry;
                        var actionTaken = data[0].actionTaken;
                        var compaintFieldDate = data[0].compaintFieldDate;
                        var jobComplitionDate = data[0].jobComplitionDate;
                        var complitionTime = data[0].complitionTime;
                        var agreementNumber = data[0].agreementNumber;
                        var vehicleNumber = data[0].vehicleNumber;
                        var senario = data[0].senario;
                        var remarks = data[0].remarks;

                        var reaching_mode = data[0].reaching_mode;
                        var officeEmail = data[0].email;
                        var officerMobile = data[0].mobile;
                        var officerImage = data[0].image;
                        var customerImage = data[0].imageCustomer;


                        $('#customer_name_preview').text(nameValue);
                        $('#customer_nic_preview').text(nic);
                        $('#customer_code_preview').text(customer_id);
                        $('#customer_email_preview').text(customerEmail);
                        $('#customer_landline_preview').text(customerLandLine);
                        $('#customer_mobile_preview').text(customerMobile);
                        $('#customer_address_preview').text(customerAddress);
                        $('#customer_other_preview').text(customerOtherInfor);
                        $('#customer_image_preview').attr('src', "loadCustomer?file=" + customerImage);
                        $('#officer_image_preview').attr('src', "loadUsers?file=" + officerImage);


                        $('#officer_department_preview').text(department);
                        $('#officer_id_preview').text(officer_id);
                        $('#officer_branch_preview').text(branch);
                        $('#officer_name_preview').text(officerName);
                        $('#officer_mobile_preview').text(officerMobile);
                        $('#officer_email_preview').text(officeEmail);


                        $('#complaintTypePreview_new').text(complaintType);
                        $('#serialNumberPreview_new').text(serialNumber);
                        $('#productTypePreview_new').text(productType);
                        $('#complaintCategoryPreview_new').text(complaintCateogry);
                        $('#reachingModePreview_new').text(reaching_mode);
                        $('#action_takenComplaintPreview').text(actionTaken);
                        $('#complaint_field_dateComplaintPreview').text(compaintFieldDate);
                        $('#job_complition_dateComplaintPreview').text(jobComplitionDate);
                        $('#job_complition_timeComplaintPreview').text(complitionTime);
                        $('#agreementNoPreview_new').text(agreementNumber);
                        $('#vehicleNoPreview_new').text(vehicleNumber);
                        $('#senarioPreview_new').text(senario);
                        $('#remarksPreview_new').text(remarks);


                        fetch('admin/loadComplaintDetailsLog', {
                            method: 'POST',
                            body: new URLSearchParams({
                                serialNumber: serialNumber,
                            })
                        }).then((res) => res.text()).then(function (res) {
                            if (res != null) {
                                var data = JSON.parse(res);


// Get the timeline container element
                                var timelineContainer = document.querySelector('.timelineMyComplaintExample123');

// Clear the previous data in the timeline container
                                timelineContainer.innerHTML = '';

// Loop through the timeline data and create the timeline items dynamically
                                data.forEach(function (item) {
                                    document.getElementById('topicOfMyComplaintProcess').innerHTML = 'Complaint No: <span style="color: red;">' + item.serial_no + '</span>';


                                    function convertTo12Hour(timeString) {
                                        var timeParts = timeString.split(':');
                                        var hour = parseInt(timeParts[0], 10);
                                        var minute = timeParts[1];
                                        var period = hour >= 12 ? 'PM' : 'AM';

                                        // Convert hour to 12-hour format
                                        hour = hour % 12;
                                        hour = hour ? hour : 12;

                                        return hour + ':' + minute + ' ' + period;
                                    }



                                    // Create a new timeline item
                                    var tlItem = document.createElement('div');
                                    tlItem.classList.add('tl-item');

                                    // Create the timeline dot element
                                    var tlDot = document.createElement('div');
//                                    tlDot.classList.add('tl-dot');

                                    // Set the appropriate color for the timeline dot


                                    // Create the timeline image element
                                    var tlImage = document.createElement('img');
                                    tlImage.src = "loadUsers?file=" + item.image;
                                    tlImage.alt = 'Image';
                                    tlImage.classList.add('timeline-image');

                                    // Append the image to the dot element
                                    tlDot.appendChild(tlImage);

                                    // Create the timeline time element
                                    var tlTime = document.createElement('div');
                                    tlTime.classList.add('tl-time');
                                    tlTime.textContent = " " + convertTo12Hour(item.time) + " ";


                                    // Append the time to the dot element
                                    tlDot.appendChild(tlTime);

                                    // Create the timeline content
                                    var tlContent = document.createElement('div');
                                    tlContent.classList.add('tl-content');

                                    // Set the content of the timeline item
                                    tlContent.innerHTML = '<div>' + item.status_detail + '</div>' +
                                            '<div class="tl-date text-muted mt-1">Updated - ' + item.date + ' (' + item.time + ')</div>' +
                                            '<div class="tl-date text-muted mt-1"' + (item.status_type === '11' ? '   style=" color:red !important; font-size:17px; font-weight:900; " ' : '') + '>' + (item.status_type === '11' ? 'Comment - ' : 'Remarks - ') + '<span  style="color: #6c757d; font-size:16px; font-weight:400;">' + item.remarks + '</span></div>';


                                    // Append the dot and content to the timeline item
                                    tlItem.appendChild(tlDot);
                                    tlItem.appendChild(tlContent);

                                    // Append the timeline item to the timeline container
                                    timelineContainer.appendChild(tlItem);
                                });


                            } else {
                                alert("data show is not success");
                            }
                        });

                        const modal123 = new bootstrap.Modal(document.getElementById('ExtralargeModalViewComplaint'));
                        modal123.show();


                    } else {

                        alert("data show is not success");
                    }
                });
            }

        });


    }
}

);




$('#viewAllComplaintasTableNewAdminDashboard').on('click', 'tr', function () {
    // Open the modal here

    var data = dtable.row($(this).closest('tr')).data(); // Get the row data from the DataTable
    var complaintId = data.complaint_id;
    var officername = data.officerName;
    var serialNumber = data.serial_number;
    var officerEmp = data.relaventOfficerId;
    var actionTaken = data.actionTaken; // Assuming you have the value of data.actionTaken
    var pending_complition = data.pending_complition;


    hadleButtonInAction(actionTaken, pending_complition);
// Remove existing buttons in the "buttonGroupforComplaint" class

    function hadleButtonInAction(actionTaken) {
        $('.buttonGroupforComplaint').empty();

        if (actionTaken === 'Rejected' && pending_complition === 'false') {
            var rejectButton = $('<a href="javascript:void(0)" class="printButton" data-toggle="tooltip" data-placement="top" title="Print Complaint"><i class="bi bi-printer" style="font-size:40px; margin-left:5px; margin-right:5px; color:Gray"></i></a><a href="javascript:void(0)" class="addComment" data-toggle="tooltip" data-placement="top" title="Add Complaint"><i class="bi bi-chat-left-text" style="font-size:40px; margin-left:10px; color:black"></i></a><a href="javascript:void(0)" class="reOpenComplaint" data-toggle="tooltip" data-placement="top" title="Reopen Complaint"><i class="bi bi-arrow-repeat" style="font-size:40px; margin-left:10px; color:orange"></i></a>');
            $('.buttonGroupforComplaint').append(rejectButton);
        } else if (actionTaken === 'Completed' && pending_complition === 'false') {
            var completedButton = $('<a href="javascript:void(0)" class="printButton" data-toggle="tooltip" data-placement="top" title="Print Complaint"><i class="bi bi-printer" style="font-size:40px; margin-left:5px; margin-right:5px; color:Gray"></i></a><a href="javascript:void(0)" class="addComment" data-toggle="tooltip" data-placement="top" title="Add Complaint"><i class="bi bi-chat-left-text" style="font-size:40px; margin-left:10px; color:black"></i></a><a href="javascript:void(0)" class="reOpenComplaint" data-toggle="tooltip" data-placement="top" title="Reopen Complaint"><i class="bi bi-arrow-repeat" style="font-size:40px; color:orange;"></i></a>');
            $('.buttonGroupforComplaint').append(completedButton);
        } else if (actionTaken === 'Queue' && pending_complition === 'false') {
            var completedButton = $('<a href="javascript:void(0)" class="printButton" data-toggle="tooltip" data-placement="top" title="Print Complaint"><i class="bi bi-printer" style="font-size:40px; margin-left:5px; margin-right:5px; color:Gray"></i></a><a href="javascript:void(0)" class="addComment" data-toggle="tooltip" data-placement="top" title="Add Complaint"><i class="bi bi-chat-left-text" style="font-size:40px; margin-left:10px; color:black"></i></a><a href="javascript:void(0)" class="rejectComplaint" data-toggle="tooltip" data-placement="top" title="Reject Complaint"><i class="bi bi-x-circle" style="font-size:40px; margin-left:10px; color:red;"></i></a><a href="javascript:void(0)" class="acceptComplaint" data-toggle="tooltip" data-placement="top" title="Accept Complaint"><i class="bi bi-check-circle" style="font-size:40px; margin-left:10px; color:green"></i></a>');
            $('.buttonGroupforComplaint').append(completedButton);
        } else if (actionTaken === 'Progress' && pending_complition === 'false') {
            var completedButton = $('<a href="javascript:void(0)" class="printButton" data-toggle="tooltip" data-placement="top" title="Print Complaint"><i class="bi bi-printer" style="font-size:40px; margin-left:5px; margin-right:5px; color:Gray"></i></a><a href="javascript:void(0)" class="addComment" data-toggle="tooltip" data-placement="top" title="Add Complaint"><i class="bi bi-chat-left-text" style="font-size:40px; margin-left:10px; color:black"></i></a><a href="javascript:void(0)" class="editAssignComplaint" data-toggle="tooltip" data-placement="top" title="Edit/Assign Complaint"><i class="bi bi-person-plus" style="font-size:40px; margin-left:10px; color:green"></i></a><a href="javascript:void(0)" class="completedComplantByAdmin" data-toggle="tooltip" data-placement="top" title="Complete Complaint"><i class="bi bi-hand-thumbs-up" style="font-size:40px; color:blue;"></i></a>');
            $('.buttonGroupforComplaint').append(completedButton);

        } else if (pending_complition === 'true') {
            var completedButton = $('<a href="javascript:void(0)" class="printButton" data-toggle="tooltip" data-placement="top" title="Print Complaint"><i class="bi bi-printer" style="font-size:40px; margin-left:5px; margin-right:5px; color:Gray"></i></a><a href="javascript:void(0)" class="addComment" data-toggle="tooltip" data-placement="top" title="Add Complaint"><i class="bi bi-chat-left-text" style="font-size:40px; margin-left:10px; color:black"></i></a><a href="javascript:void(0)" class="editAssignComplaint" data-toggle="tooltip" data-placement="top" title="Edit/Assign Complaint"><i class="bi bi-person-plus" style="font-size:40px; margin-left:10px; color:green"></i></a><a href="javascript:void(0)" class="completedComplantByAdmin" data-toggle="tooltip" data-placement="top" title="Complete Complaint"><i class="bi bi-hand-thumbs-up" style="font-size:40px; color:blue;"></i></a>');
            $('.buttonGroupforComplaint').append(completedButton);
        }

// Initialize tooltips
        $('[data-toggle="tooltip"]').tooltip();

    }






//this function is to refresh the complaint view model
    function refreshComplaintView() {
        fetch('showComplaintDatainModel', {
            method: 'POST',
            body: new URLSearchParams({
                id: complaintId,
            })
        }).then((res) => res.text()).then(function (res) {
            if (res != null) {
                var data = JSON.parse(res);
                var nameValue = data[0].customerName;
                var nic = data[0].nic;
                var customer_id = data[0].customer_id;
                var customerEmail = data[0].customerEmail;
                var customerLandLine = data[0].customerLandLine;
                var customerMobile = data[0].customerMobile;
                var customerAddress = data[0].customerAddress;
                var customerOtherInfor = data[0].customerOtherInfor;


                var officerName = data[0].officerName;
                var officer_id = data[0].officer_id;
                var department = data[0].department;
                var branch = data[0].branch;


                var complaintType = data[0].complaintType;
                var complaint_id = data[0].complaint_id;
                var productType = data[0].productType;
                var complaintCateogry = data[0].complaintCateogry;
                var actionTaken = data[0].actionTaken;
                var compaintFieldDate = data[0].compaintFieldDate;
                var jobComplitionDate = data[0].jobComplitionDate;
                var complitionTime = data[0].complitionTime;
                var agreementNumber = data[0].agreementNumber;
                var vehicleNumber = data[0].vehicleNumber;
                var senario = data[0].senario;
                var remarks = data[0].remarks;

                var reaching_mode = data[0].reaching_mode;


                $('#customer_name_preview').text(nameValue);
                $('#customer_nic_preview').text(nic);
                $('#customer_code_preview').text(customer_id);
                $('#customer_email_preview').text(customerEmail);
                $('#customer_landline_preview').text(customerLandLine);
                $('#customer_mobile_preview').text(customerMobile);
                $('#customer_address_preview').text(customerAddress);
                $('#customer_other_preview').text(customerOtherInfor);



                $('#officer_department_preview').text(department);
                $('#officer_id_preview').text(officer_id);
                $('#officer_branch_preview').text(branch);
                $('#officer_name_preview').text(officerName);



                $('#complaintTypePreview_new').text(complaintType);
                $('#serialNumberPreview_new').text(serialNumber);
                $('#productTypePreview_new').text(productType);
                $('#complaintCategoryPreview_new').text(complaintCateogry);
                $('#reachingModePreview_new').text(reaching_mode);
                $('#action_takenComplaintPreview').text(actionTaken);
                $('#complaint_field_dateComplaintPreview').text(compaintFieldDate);
                $('#job_complition_dateComplaintPreview').text(jobComplitionDate);
                $('#job_complition_timeComplaintPreview').text(complitionTime);
                $('#agreementNoPreview_new').text(agreementNumber);
                $('#vehicleNoPreview_new').text(vehicleNumber);
                $('#senarioPreview_new').text(senario);
                $('#remarksPreview_new').text(remarks);


                fetch('admin/loadComplaintDetailsLog', {
                    method: 'POST',
                    body: new URLSearchParams({
                        serialNumber: serialNumber,
                    })
                }).then((res) => res.text()).then(function (res) {
                    if (res != null) {
                        var data = JSON.parse(res);


// Get the timeline container element
                        var timelineContainer = document.querySelector('.timelineMyComplaintExample123');

// Clear the previous data in the timeline container
                        timelineContainer.innerHTML = '';

// Loop through the timeline data and create the timeline items dynamically
                        data.forEach(function (item) {
                            document.getElementById('topicOfMyComplaintProcess').innerHTML = 'Complaint No: <span style="color: red;">' + item.serial_no + '</span>';


                            function convertTo12Hour(timeString) {
                                var timeParts = timeString.split(':');
                                var hour = parseInt(timeParts[0], 10);
                                var minute = timeParts[1];
                                var period = hour >= 12 ? 'PM' : 'AM';

                                // Convert hour to 12-hour format
                                hour = hour % 12;
                                hour = hour ? hour : 12;

                                return hour + ':' + minute + ' ' + period;
                            }



                            // Create a new timeline item
                            var tlItem = document.createElement('div');
                            tlItem.classList.add('tl-item');

                            // Create the timeline dot element
                            var tlDot = document.createElement('div');
//                            tlDot.classList.add('tl-dot');

                            // Set the appropriate color for the timeline dot


                            // Create the timeline image element
                            var tlImage = document.createElement('img');
                            tlImage.src = "loadUsers?file=" + item.image;
                            tlImage.alt = 'Image';
                            tlImage.classList.add('timeline-image');

                            // Append the image to the dot element
                            tlDot.appendChild(tlImage);

                            // Create the timeline time element
                            var tlTime = document.createElement('div');
                            tlTime.classList.add('tl-time');
                            tlTime.textContent = " " + convertTo12Hour(item.time) + " ";


                            // Append the time to the dot element
                            tlDot.appendChild(tlTime);

                            // Create the timeline content
                            var tlContent = document.createElement('div');
                            tlContent.classList.add('tl-content');

                            // Set the content of the timeline item
                            tlContent.innerHTML = '<div>' + item.status_detail + '</div>' +
                                    '<div class="tl-date text-muted mt-1">Age - ' + item.age + '</div>' +
                                    '<div class="tl-date text-muted mt-1">Updated - ' + item.date + ' (' + item.time + ')</div>' +
                                    '<div class="tl-date text-muted mt-1"' + (item.status_type === '11' ? '   style=" color:red !important; font-size:17px; font-weight:900; " ' : '') + '>' + (item.status_type === '11' ? 'Comment - ' : 'Remarks - ') + '<span  style="color: #6c757d; font-size:16px; font-weight:400;">' + item.remarks + '</span></div>';


                            // Append the dot and content to the timeline item
                            tlItem.appendChild(tlDot);
                            tlItem.appendChild(tlContent);

                            // Append the timeline item to the timeline container
                            timelineContainer.appendChild(tlItem);
                        });

                    } else {
                        alert("data show is not success");
                    }
                });

                const modal123 = new bootstrap.Modal(document.getElementById('ExtralargeModalViewComplaint'));
                modal123.show();


            } else {

                alert("data show is not success");
            }
        });

    }





//this is the function to reject the complaint
    $(document).off('click', '.rejectComplaint').on('click', '.rejectComplaint', function () {

        const modalElement = document.getElementById('ExtralargeModalViewComplaint');
        modalElement.classList.add('d-none');

        Swal.fire({
            title: 'Are you sure?',
            text: "This Complaint Will be rejected!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, Proceed!',
            showLoaderOnConfirm: true,
            preConfirm: () => {
                modalElement.classList.add('d-none');
                return Swal.fire({
                    title: 'Why is the request rejected?',
                    html:
                            '<textarea id="input1" class="swal2-textarea" placeholder="Enter reason"></textarea>' +
                            '<label for="input2" class="swal2-file-input">',

                    inputPlaceholder: 'Type the reason',
                    showCancelButton: true,
                    confirmButtonText: 'Confirm',
                    showLoaderOnConfirm: true,
                    preConfirm: (additionalText) => {
                        const input1 = document.getElementById('input1').value;
                        return fetch('admin/reject-complaint', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({
                                id: complaintId,
                                additionalText: input1
                            })
                        })
                                .then(response => {
                                    if (!response.ok) {
                                        throw new Error(response.statusText);
                                    }
                                    return response.json();
                                })
                                .catch(error => {

                                    Swal.showValidationMessage('Request failed: ' + error);
                                });
                    },
                    allowOutsideClick: () => !Swal.isLoading()
                }).then((result) => {
                    if (result.isConfirmed) {
                        if (result.value.status === 'error') {
                            modalElement.classList.remove('d-none');
                            Swal.fire('Error!', 'Failed to reject complaint', 'error');

                        } else {
                            dtable.ajax.reload();
                            dtableViewOfficer.ajax.reload();
                            hadleButtonInAction("Rejected");
                            refreshComplaintView();
                            modalElement.classList.remove('d-none');
                            Swal.fire('Successful!', 'This Complaint has been rejected!', 'success');


                        }
                    } else if (result.dismiss === Swal.DismissReason.cancel) {

                        Swal.fire('Cancelled', 'Complaint rejection cancelled', 'info');
                        modalElement.classList.remove('d-none');


                        const modal123 = new bootstrap.Modal(document.getElementById('ExtralargeModalViewComplaint'));
                        modal123.show();
                    }
                });
            },

            allowOutsideClick: () => !Swal.isLoading()

        })

        modalElement.classList.remove('d-none');
    });






//this is the function to reopen the complaint

    $(document).off('click', '.reOpenComplaint').on('click', '.reOpenComplaint', function () {

        const modalElementReopen = document.getElementById('ExtralargeModalViewComplaint');
        modalElementReopen.classList.add('d-none');

        Swal.fire({
            title: 'Are you sure?',
            text: 'This Complaint (' + serialNumber + ') will be reopened!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, Proceed!',
            showLoaderOnConfirm: true,

            preConfirm: () => {
                modalElementReopen.classList.add('d-none');
                return Swal.fire({
                    title: 'Why is the complaint reopened?',
                    html:
                            '<textarea id="input1" class="swal2-textarea" placeholder="Enter reason"></textarea>' +
                            '<label for="input2" class="swal2-file-input">',

                    inputPlaceholder: 'Type the reason',
                    showCancelButton: true,
                    confirmButtonText: 'Confirm',
                    showLoaderOnConfirm: true,
                    preConfirm: () => {
                        const input1 = document.getElementById('input1').value;
                        return fetch('admin/reopen-complaint', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({
                                id: complaintId,
                                additionalText: input1
                            })
                        })
                                .then(response => {
                                    if (!response.ok) {
                                        throw new Error(response.statusText);
                                    }
                                    return response.json();
                                })
                                .catch(error => {
                                    Swal.showValidationMessage('Request failed: ' + error);
                                });
                    },
                    allowOutsideClick: () => !Swal.isLoading()
                }).then((result) => {
                    if (result.isConfirmed) {
                        if (result.value.status === 'error') {
                            modalElementReopen.classList.remove('d-none');
                            Swal.fire('Error!', 'Failed to reopen complaint', 'error');
                        } else {
                            dtable.ajax.reload();
                            dtableViewOfficer.ajax.reload();
                            hadleButtonInAction("Queue");
                            refreshComplaintView();
                            modalElementReopen.classList.remove('d-none');
                            Swal.fire('Successful!', 'This Complaint has been reopened!', 'success');

                        }
                    } else if (result.dismiss === Swal.DismissReason.cancel) {

                        Swal.fire('Cancelled', 'Complaint reopening cancelled', 'info');
                        modalElementReopen.classList.remove('d-none');
                        const modalReopen = new bootstrap.Modal(document.getElementById('ExtralargeModalViewComplaint'));
                        modalReopen.show();
                    }
                });
            },
            allowOutsideClick: () => !Swal.isLoading()
        })

        modalElementReopen.classList.remove('d-none');
    });





//this is the function to accept the complaint
    $(document).off('click', '.acceptComplaint').on('click', '.acceptComplaint', function () {
        const modalElementAccept = document.getElementById('ExtralargeModalViewComplaint');
        modalElementAccept.classList.add('d-none');
        Swal.fire({
            title: 'Are you sure?',
            text: "This Complaint Will be rejected!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, Proceed!',
            showLoaderOnConfirm: true,
            preConfirm: () => {
                modalElementAccept.classList.add('d-none');
                return Swal.fire({
                    title: 'Why is the request rejected?',
                    html:
                            '<textarea id="input1" class="swal2-textarea" placeholder="Enter reason"></textarea>' +
                            '<label for="input2" class="swal2-file-input">',
                    inputPlaceholder: 'Type the reason',
                    showCancelButton: true,
                    confirmButtonText: 'Confirm',
                    showLoaderOnConfirm: true,
                    preConfirm: (additionalText) => {
                        const input1 = document.getElementById('input1').value;
                        return fetch('admin/accept-complaint', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({
                                id: complaintId,
                                additionalText: input1
                            })
                        })
                                .then(response => {
                                    if (!response.ok) {
                                        throw new Error(response.statusText);
                                    }
                                    return response.json();
                                })
                                .catch(error => {
                                    Swal.showValidationMessage('Request failed: ' + error);
                                });
                    },
                    allowOutsideClick: () => !Swal.isLoading()
                }).then((result) => {
                    if (result.isConfirmed) {
                        if (result.value.status === 'error') {
                            modalElementAccept.classList.remove('d-none');
                            Swal.fire('Error!', 'Failed to reject complaint', 'error');
                        } else {
                            dtable.ajax.reload();
                            dtableViewOfficer.ajax.reload();
                            hadleButtonInAction("Progress");
                            refreshComplaintView();
                            modalElementAccept.classList.remove('d-none');
                            Swal.fire('Successful!', 'This Complaint has been rejected!', 'success');

                        }
                    } else if (result.dismiss === Swal.DismissReason.cancel) {
                        Swal.fire('Cancelled', 'Complaint rejection cancelled', 'info');
                        modalElementAccept.classList.remove('d-none');
                        const modalAccept = new bootstrap.Modal(document.getElementById('ExtralargeModalViewComplaint'));
                        modalAccept.show();
                    }
                });
            },
            allowOutsideClick: () => !Swal.isLoading()
        })
        modalElementAccept.classList.remove('d-none');
    });



    $(document).off('click', '.completedComplantByAdmin').on('click', '.completedComplantByAdmin', function () {

        const modalElementComplete = document.getElementById('ExtralargeModalViewComplaint');
        modalElementComplete.classList.add('d-none');
        Swal.fire({
            title: 'Are you sure?',
            text: 'This Complaint will be completed!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, Proceed!',
            showLoaderOnConfirm: true,
            preConfirm: () => {
                modalElementComplete.classList.add('d-none');
                return Swal.fire({
                    title: 'Why is the complaint completed?',
                    html:
                            '<textarea id="input1" class="swal2-textarea" placeholder="Enter reason"></textarea>' +
                            '<label for="input2" class="swal2-file-input">' +
                            '<input id="input2" type="file" class="swal2-file" style="display: none;">' +
                            '<span class="swal2-file-label">' +
                            '<i class="fas fa-file-upload"></i> Choose File' +
                            '</span>' +
                            '</label>',
                    showCancelButton: true,
                    confirmButtonText: 'Confirm',
                    showLoaderOnConfirm: true,
                    preConfirm: () => {
                        const input1 = document.getElementById('input1').value;
                        const input2 = document.getElementById('input2').files[0];

                        const formData = new FormData();
                        formData.append('file', input2);

                        return fetch('admin/completed-complaint', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify({
                                id: complaintId,
                                input1: input1,
                                file: formData,
                            }),
                        })
                                .then((response) => {
                                    if (!response.ok) {
                                        throw new Error(response.statusText);
                                    }
                                    return response.json();
                                })
                                .catch((error) => {
                                    Swal.showValidationMessage('Request failed: ' + error);
                                });
                    },
                    allowOutsideClick: () => !Swal.isLoading(),
                }).then((result) => {
                    if (result.isConfirmed) {
                        if (result.value.status === 'error') {
                            modalElementComplete.classList.remove('d-none');
                            Swal.fire('Error!', 'Failed to complete complaint', 'error');
                        } else {

                            dtableViewOfficer.ajax.reload();
                            dtable.ajax.reload();
                            hadleButtonInAction("Completed");
                            refreshComplaintView();
                            modalElementComplete.classList.remove('d-none');
                            Swal.fire('Successful!', 'This Complaint has been Completed!', 'success');

                        }
                    } else if (result.dismiss === Swal.DismissReason.cancel) {
                        Swal.fire('Cancelled', 'Complaint completion cancelled', 'info');
                        modalElementComplete.classList.remove('d-none');
                        const modalCompleted = new bootstrap.Modal(document.getElementById('ExtralargeModalViewComplaint'));
                        modalCompleted.show();
                    }
                });
            },
            allowOutsideClick: () => !Swal.isLoading(),
        });


        modalElementComplete.classList.remove('d-none');
    });



    $(document).off('click', '.addComment').on('click', '.addComment', function () {
        const modalElementAccept = document.getElementById('ExtralargeModalViewComplaint');
        modalElementAccept.classList.add('d-none');
        Swal.fire({
            title: 'Do you want to add a Comment ?',
            text: "This Comment  Will be Added!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, Proceed!',
            showLoaderOnConfirm: true,
            preConfirm: () => {
                modalElementAccept.classList.add('d-none');
                return Swal.fire({
                    title: 'Why is the comment added?',
                    html:
                            '<textarea id="input1" class="swal2-textarea" placeholder="Enter reason"></textarea>' +
                            '<label for="input2" class="swal2-file-input">',
                    inputPlaceholder: 'Type the reason',
                    showCancelButton: true,
                    confirmButtonText: 'Confirm',
                    showLoaderOnConfirm: true,
                    preConfirm: (additionalText) => {
                        const input1 = document.getElementById('input1').value;
                        return fetch('admin/add-comment', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({
                                id: complaintId,
                                additionalText: input1
                            })
                        })
                                .then(response => {
                                    if (!response.ok) {
                                        throw new Error(response.statusText);
                                    }
                                    return response.json();
                                })
                                .catch(error => {
                                    Swal.showValidationMessage('Request failed: ' + error);
                                });
                    },
                    allowOutsideClick: () => !Swal.isLoading()
                }).then((result) => {
                    if (result.isConfirmed) {
                        if (result.value.status === 'error') {
                            modalElementAccept.classList.remove('d-none');
                            Swal.fire('Error!', 'Failed to add comment', 'error');
                        } else {
                            hadleButtonInAction("Progress", pending_complition);
                            refreshComplaintView();
                            modalElementAccept.classList.remove('d-none');
                            Swal.fire('Successful!', 'This comment has been added!', 'success');
                            dtable.ajax.reload();
                        }
                    } else if (result.dismiss === Swal.DismissReason.cancel) {
                        Swal.fire('Cancelled', 'Comment addition cancelled', 'info');
                        modalElementAccept.classList.remove('d-none');
                        const modalAccept = new bootstrap.Modal(document.getElementById('ExtralargeModalViewComplaint'));
                        modalAccept.show();
                    }
                });
            },
            allowOutsideClick: () => !Swal.isLoading()
        })
        modalElementAccept.classList.remove('d-none');
    }
    );



    $(document).off('click', '.editAssignComplaint').on('click', '.editAssignComplaint', function () {


        // Get the modal element
        var modalAssginOfficerMdel = $('#verticalycentered_complete_assign');
        modalAssginOfficerMdel.modal('show');

        var modal = $('#ExtralargeModalViewComplaint');
        modal.modal('hide');

        const modalElementAssign = document.getElementById('ExtralargeModalViewComplaint');
//        modalElementAssign.classList.add('d-none');


// const modalElementAssignHide = document.getElementById('verticalycentered_complete_assign');



        $("#assignNewOfficerToComplaint").click(function () {


            var officer = $('#OfficerSearchFieldAllComplaint').val();
            var selectedOfficer = $('#OfficerSearchFieldAllComplaint option:selected').text();
            var officername = selectedOfficer;
            var officerID = officer;


// Get the value of the textarea
            var addRemarkWhenAssignOfficer = document.getElementById('addRemarkWhenAssignOfficer').value;



            Swal.fire({
                title: 'Are you sure?',
                text: 'Will be Assigned!',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, Proceed!',
                showLoaderOnConfirm: true,
                preConfirm: () => {
                    modalAssginOfficerMdel.modal('hide');
                    return fetch('admin/assign-new-officer', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            id: complaintId,
                            officerID: officerID,
                            officername: officername,
                            additionalText: addRemarkWhenAssignOfficer,

                        }),
                    })
                            .then((response) => {
                                if (!response.ok) {
                                    throw new Error(response.statusText);
                                }
                                return response.json();
                            })
                            .catch((error) => {
                                Swal.showValidationMessage('Request failed: ' + error);
                            });
                },
            }).then((result) => {
                if (result.isConfirmed) {
                    if (result.value.status === 'error') {
                        modalElementAssign.classList.remove('d-none');
                        Swal.fire('Error!', 'Failed to reject complaint', 'error');

                    } else {
                        dtable.ajax.reload();
                        dtableViewOfficer.ajax.reload();
                        hadleButtonInAction("Progress");
                        refreshComplaintView();
                        modalElementAssign.classList.remove('d-none');
                        modalElementAssignHide.classList.add('d-none');
                        modalAssginOfficerMdel.modal('hide');
                        Swal.fire('Successful!', 'This Complaint has been rejected!', 'success');

                    }
                } else if (result.dismiss === Swal.DismissReason.cancel) {
                    Swal.fire('Cancelled', 'Complaint rejection cancelled', 'info');
                    modalElementAssign.classList.remove('d-none');

                    const modalAssign = new bootstrap.Modal(document.getElementById('ExtralargeModalViewComplaint'));
                    modalAssign.show();
                }
            });
        });
        modalElementAssign.classList.remove('d-none');
    });





});







$('#OfficerSearchFieldAllComplaint').change(function () {


    if ($("#part6").is(":visible")) {
        // Update the data without hiding #part6
        // Code to update the data here

        // Remove and add the same class to #part5 (not necessary in this case)
        $("#part5").removeClass("col-md-12").addClass("col-md-12");
    } else {
        $("#part6").show(); // Show #part6 if it's hidden
    }

    const searchFieldValue = $(this).val();


    if (!searchFieldValue) {
        return;
    }

    fetch('filed_officer_details', {
        method: 'POST',
        body: new URLSearchParams({
            id: searchFieldValue,
        })
    })
            .then((res) => res.text())
            .then((res) => {
                if (res === 'ok') {

                } else {
                    const parsedJson = JSON.parse(res);
                    parsedJson.forEach((item) => {


                        $('#officer_name_new').text(item.officerName);
                        $('#officer_id_new').text(item.officerID);
                        $('#officer_mobile_new').text(item.officerrMobile);
                        $('#officer_landline_new').text(item.officerLandline);
                        $('#officer_email_new').text(item.officeremail);
                        $('#officer_status_new').text("?");
                        $('#officer_branch_new').text(item.officerBranch);
                        $('#officer_department_new').text(item.officerdepartment);
                        $('#officer_completed_complaint_new').text("?");
                        $('#officer_queue_complaint_new').text("?");
                        $('#officer_lastlogin_new').text("?");
                        $('#officer_lastAcessComputer_new').text("?");
                        $('#viewComplaintOfficerSelectImage').attr('src', "loadUsers?file=" + item.officerImage);
//$('#officer_imageHidden_newNewComplaintPage').text(item.officerImage);

                    });
                }
            })
            .catch((error) => console.error(error));

//this code is to show officer own complaints

    var dtableAllComplaintDetails = $('#viewOfficerComplaintasTableNewAdminDashboard').DataTable({

        "aLengthMenu": [[5, 10, 25, -1], [5, 10, 25, "All"]],
        "pageLength": 0,
        "ordering": true,
        "autoWidth": false,
        "processing": true,
        "serverSide": true,
        "order": [[0, "desc"]],
        "searchHighlight": true,
        "searchDelay": 350,
        "ajax": {
            "url": "table-data-officerOwnComplaintDataWithID",
            "contentType": "application/json",
            "type": "POST",
            "data": function (d) {
                d.data1 = searchFieldValue;

                return JSON.stringify(d);
            },
            error: function (xhr, error, code) {
                console.log(xhr);
                console.log(code);
            }
        },
        "columns": [
            {"data": "serial_number", className: "text-wrap"},
            {"data": "complaint_id", visible: false},
            {"data": "complaintType", className: "text-wrap", visible: false},
            {data: 'officerName', className: 'text-wrap', visible: false},
            {
                "data": "customer",
                "className": "text-wrap",
                "render": function (data, type, row) {
                    var names = data.split(' ');
                    var initials = names.slice(0, -1).map(function (name) {
                        return name.charAt(0) + '.';
                    }).join(' ');
                    var formattedName = initials + ' ' + names.slice(-1);

                    return formattedName;
                }
            },
            {"data": "complaintCategory", className: "text-wrap", visible: false},
            {"data": "ReachingMode", className: "text-wrap", visible: false},
            {"data": "compaintFieldDate", className: "text-wrap", visible: false},
            {
                "data": "jobComplitionDate",
                "className": "text-wrap",
                "render": function (data, type, row) {
                    var dateString = data; // Assuming 'data' contains the date string
                    var dateObj = new Date(dateString);
                    var year = dateObj.getFullYear();
                    var month = dateObj.toLocaleString('en-US', {month: 'long'});
                    var day = ("0" + dateObj.getDate()).slice(-2);
                    var hours = ("0" + dateObj.getHours()).slice(-2);
                    var minutes = ("0" + dateObj.getMinutes()).slice(-2);
                    var period = (dateObj.getHours() >= 12) ? "PM" : "AM";

                    var formattedDate = year + '-' + month + '-' + day + ' | ' + hours + '.' + minutes + period;

                    return formattedDate;
                }
            },
            {"data": "complitionTime", className: "text-wrap", visible: false},
            {"data": "agreementNumber", className: "text-wrap", visible: false},
            {"data": "vehicleNumber", className: "text-wrap", visible: false},
            {"data": "senario", className: "text-wrap", visible: false},
            {"data": "remarks", className: "text-wrap", visible: false},
            {"data": "actionTaken", className: "text-wrap"},
            {"data": "fileUpload", className: "text-wrap", visible: false},
            {"data": "relaventOfficerId", className: "text-wrap", visible: false},
            {"data": "productType", className: "text-wrap", visible: false},
            {"data": "status", className: "text-wrap"},
            {"data": "status_repeat", className: "text-wrap", visible: false},
        ],
        "language": {
            'loadingRecords': '&nbsp;',
            'processing': '<div class="loader2"></div>'
        },
        "createdRow": function (row, data) {
            let action_td = document.createElement('td');


            if (data['actionTaken'] === 'Completed') {
//            $(action_td).append('<a href="javascript:void(0)" class="viewFullComplaintDetails"> <i class="bi bi-eye" style="font-size:20px; color:blue;"></i></a><a href="javascript:void(0)" class="reOpenComplaint" > <i class="bi bi-arrow-repeat" style="font-size:20px; color:orange;"></i></a>');


                $(row).find('td').eq(3).html('<label class="badge rounded-pill bg-success" style="font-size:12px">Completed</label>');
            } else if (data['actionTaken'] === 'Incomplete') {
//            $(action_td).append('<a href="javascript:void(0)" class="viewFullComplaintDetails"><i class="bi bi-eye" style="font-size:20px; color:blue"></i></a><a href="javascript:void(0)" id=""><i class="bi bi-pencil-square" style="font-size:20px; margin-left:10px; color:green"></i></a>');

                $(row).find('td').eq(3).html('<label class="badge rounded-pill bg-danger" style="font-size:12px">Re-Open</label>');
            } else if (data['actionTaken'] === 'Queue') {
//            $(action_td).append('<a href="javascript:void(0)" class="viewFullComplaintDetails"> <i class="bi bi-eye" style="font-size:20px; color:blue;"></i></a> <a href="javascript:void(0)" class="rejectComplaint" > <i class="bi bi-x-circle" style="font-size:20px; color:red;"></i></a>  <a href="javascript:void(0)" class="acceptComplaint"><i class="bi bi-check-circle" style="font-size:20px; color:green"></i></a>');

                $(row).find('td').eq(3).html('<label class="badge rounded-pill bg-danger" style="font-size:12px">Queue</label>');


            } else if (data['actionTaken'] === 'Progress') {
//            $(action_td).append('<a href="javascript:void(0)" class="viewFullComplaintDetails"><i class="bi bi-eye" style="font-size:20px; color:blue"></i></a><a href="javascript:void(0)" class="editAssignComplaint"><i class="bi bi-pencil-square" style="font-size:20px; margin-left:10px; color:green"></i></a>');

                $(row).find('td').eq(3).html('<label class="badge rounded-pill bg-danger" style="font-size:12px">Progress</label>');

            } else {
//            $(action_td).append('<a href="javascript:void(0)" class="viewFullComplaintDetails"><i class="bi bi-eye" style="font-size:20px; color:blue"></i></a><a href="javascript:void(0)" class="reOpenComplaint" ><i class="bi bi-arrow-repeat" style="font-size:20px; margin-left:10px; color:orange"></i></a>');

                $(row).find('td').eq(3).html('<label class="badge rounded-pill bg-danger" style="font-size:12px">Rejected</label>');
            }

            if (data['status'] === 'active' && data['status_repeat'] === 'Reopen') {

                $(row).find('td').eq(4).html('<label class="badge bg-primary" style="font-size:12px;">Active <i class="bi bi-reply-fill"></label>');


            } else if (data['status'] === 'Deactive' && data['status_repeat'] === 'Reopen') {


                $(row).find('td').eq(4).html('<label class="badge bg-primary" style="font-size:12px">Deactive <i class="bi bi-reply-fill"></label>');

            } else if (data['status'] === 'active') {


                $(row).find('td').eq(4).html('<label class="badge bg-primary" style="font-size:12px">Active</label>');



            } else if (data['status'] === 'Deactive') {


                $(row).find('td').eq(4).html('<label class="badge bg-primary" style="font-size:12px">Deactive</label>');
            }

            $(row).append(action_td);

            $(row).on('mouseover', function () {
                $(row).css({
                    'background-color': '#b5a2c4',
//                'font-weight': 'bold'
                });

            });

            $(row).on('mouseout', function () {
                $(row).css({
                    'background-color': '',
//                'font-weight': ''
                });

            });

            $(row).on('click', function () {
                var complaintId = data.complaint_id;
                var officername = data.officerName;
                var serialNumber = data.serial_number;



                fetch('admin/loadComplaintDetailsLog', {
                    method: 'POST',
                    body: new URLSearchParams({
                        serialNumber: serialNumber,
                    })
                }).then((res) => res.text()).then(function (res) {
                    if (res != null) {
                        var data = JSON.parse(res);


// Get the timeline container element
                        var timelineContainer = document.querySelector('.timelineMyComplaintProcessOnly');

// Clear the previous data in the timeline container
                        timelineContainer.innerHTML = '';

// Loop through the timeline data and create the timeline items dynamically
                        data.forEach(function (item
                                ) {
                            document.getElementById('topicOfMyComplaintProcess').innerHTML = 'Complaint No: <span style="color: red;">' + item.serial_no + '</span>';


                            function convertTo12Hour(timeString) {
                                var timeParts = timeString.split(':');
                                var hour = parseInt(timeParts[0], 10);
                                var minute = timeParts[1];
                                var period = hour >= 12 ? 'PM' : 'AM';

                                // Convert hour to 12-hour format
                                hour = hour % 12;
                                hour = hour ? hour : 12;

                                return hour + ':' + minute + ' ' + period;
                            }



                            // Create a new timeline item
                            var tlItem = document.createElement('div');
                            tlItem.classList.add('tl-item');

                            // Create the timeline dot element
                            var tlDot = document.createElement('div');
//                            tlDot.classList.add('tl-dot');

                            // Set the appropriate color for the timeline dot


                            // Create the timeline image element
                            // Create the timeline image element
                            var tlImage = document.createElement('img');
                            tlImage.src = "loadUsers?file=" + item.image;
                            tlImage.alt = 'Image';
                            tlImage.classList.add('timeline-image');

                            // Append the image to the dot element
                            tlDot.appendChild(tlImage);

                            // Create the timeline time element
                            var tlTime = document.createElement('div');
                            tlTime.classList.add('tl-time');
                            tlTime.textContent = " " + convertTo12Hour(item.time) + " ";


                            // Append the time to the dot element
                            tlDot.appendChild(tlTime);

                            // Create the timeline content
                            var tlContent = document.createElement('div');
                            tlContent.classList.add('tl-content');

                            // Set the content of the timeline item
                            tlContent.innerHTML = '<div>' + item.status_detail + '</div>' +
                                    '<div class="tl-date text-muted mt-1">Updated - ' + item.date + ' (' + item.time + ')</div>' +
                                    '<div class="tl-date text-muted mt-1"' + (item.status_type === '11' ? '   style=" color:red !important; font-size:17px; font-weight:900; " ' : '') + '>' + (item.status_type === '11' ? 'Comment - ' : 'Remarks - ') + '<span  style="color: #6c757d; font-size:16px; font-weight:400;">' + item.remarks + '</span></div>';

                            // Append the dot and content to the timeline item
                            tlItem.appendChild(tlDot);
                            tlItem.appendChild(tlContent);

                            // Append the timeline item to the timeline container
                            timelineContainer.appendChild(tlItem);
                        });

                        const modalAdmin12 = new bootstrap.Modal(document.getElementById('verticalycentered_complaint_tracking_processOnlyDashAdmin'));
                        modalAdmin12.show();
                    } else {
                        alert("data show is not success");
                    }
                });
            });

        }
    }
    );
});






$('#viewAllComplaintasTableNewAdminDashboard').on('click', '.editAssignComplaint', function () {



    var data = dtableView.row($(this).closest('tr')).data(); // Get the row data from the DataTable
    var complaintId = data.complaint_id;
    var serialNumber = data.serial_number;


    // Get the modal element
    var modal = $('#verticalycentered_complete_assign');
    modal.modal('show');


    $('#OfficerSearchFieldAllComplaint').change(function () {


        if ($("#part6").is(":visible")) {
            // Update the data without hiding #part6
            // Code to update the data here

            // Remove and add the same class to #part5 (not necessary in this case)
            $("#part5").removeClass("col-md-12").addClass("col-md-12");
        } else {
            $("#part6").show(); // Show #part6 if it's hidden
        }

        const searchFieldValue = $(this).val();




        if (!searchFieldValue) {
            return;
        }

        fetch('filed_officer_details', {
            method: 'POST',
            body: new URLSearchParams({
                id: searchFieldValue,
            })
        })
                .then((res) => res.text())
                .then((res) => {
                    if (res === 'ok') {

                    } else {
                        const parsedJson = JSON.parse(res);
                        parsedJson.forEach((item) => {


                            $('#officer_name_new').text(item.officerName);
                            $('#officer_id_new').text(item.officerID);
                            $('#officer_mobile_new').text(item.officerrMobile);
                            $('#officer_landline_new').text(item.officerLandline);
                            $('#officer_email_new').text(item.officeremail);
                            $('#officer_status_new').text("?");
                            $('#officer_branch_new').text(item.officerBranch);
                            $('#officer_department_new').text(item.officerdepartment);
                            $('#officer_completed_complaint_new').text("?");
                            $('#officer_queue_complaint_new').text("?");
                            $('#officer_lastlogin_new').text("?");
                            $('#officer_lastAcessComputer_new').text("?");





                        });
                    }
                })
                .catch((error) => console.error(error));









        var dtableOfficer = $('#viewOfficerComplaintasTableNewAdminDashboard').DataTable({

            "aLengthMenu": [[5, 10, 25, -1], [5, 10, 25, "All"]],
            "pageLength": 0,
            "ordering": true,
            "autoWidth": false,
            "processing": true,
            "serverSide": true,
            "order": [[0, "desc"]],
            "searchHighlight": true,
            "searchDelay": 350,
            "ajax": {
                "url": "table-data-officerOwnComplaintDataWithID",
                "contentType": "application/json",
                "type": "POST",
                "data": function (d) {
                    d.data1 = searchFieldValue;

                    return JSON.stringify(d);
                },
                error: function (xhr, error, code) {
                    console.log(xhr);
                    console.log(code);
                }
            },
            "columns": [
                {"data": "serial_number", className: "text-wrap"},
                {"data": "complaint_id", visible: false},
                {"data": "complaintType", className: "text-wrap", visible: false},
                {data: 'officerName', className: 'text-wrap', visible: false},
                {"data": "customer", className: "text-wrap"},
                {"data": "complaintCategory", className: "text-wrap", visible: false},
                {"data": "ReachingMode", className: "text-wrap", visible: false},
                {"data": "compaintFieldDate", className: "text-wrap", visible: false},
                {"data": "jobComplitionDate", className: "text-wrap"},
                {"data": "complitionTime", className: "text-wrap", visible: false},
                {"data": "agreementNumber", className: "text-wrap", visible: false},
                {"data": "vehicleNumber", className: "text-wrap", visible: false},
                {"data": "senario", className: "text-wrap", visible: false},
                {"data": "remarks", className: "text-wrap", visible: false},
                {"data": "actionTaken", className: "text-wrap"},
                {"data": "fileUpload", className: "text-wrap", visible: false},
                {"data": "relaventOfficerId", className: "text-wrap", visible: false},
                {"data": "productType", className: "text-wrap", visible: false},
                {"data": "status", className: "text-wrap"},
                {"data": "status_repeat", className: "text-wrap", visible: false},
            ],
            "language": {
                'loadingRecords': '&nbsp;',
                'processing': '<div class="loader2"></div>'
            },
            "createdRow": function (row, data) {
                let action_td = document.createElement('td');


                if (data['actionTaken'] === 'Completed') {
//            $(action_td).append('<a href="javascript:void(0)" class="viewFullComplaintDetails"> <i class="bi bi-eye" style="font-size:20px; color:blue;"></i></a><a href="javascript:void(0)" class="reOpenComplaint" > <i class="bi bi-arrow-repeat" style="font-size:20px; color:orange;"></i></a>');


                    $(row).find('td').eq(3).html('<label class="badge rounded-pill bg-success" style="font-size:15px">Completed</label>');
                } else if (data['actionTaken'] === 'Incomplete') {
//            $(action_td).append('<a href="javascript:void(0)" class="viewFullComplaintDetails"><i class="bi bi-eye" style="font-size:20px; color:blue"></i></a><a href="javascript:void(0)" id=""><i class="bi bi-pencil-square" style="font-size:20px; margin-left:10px; color:green"></i></a>');

                    $(row).find('td').eq(3).html('<label class="badge rounded-pill bg-danger" style="font-size:15px">Re-Open</label>');
                } else if (data['actionTaken'] === 'Queue') {
//            $(action_td).append('<a href="javascript:void(0)" class="viewFullComplaintDetails"> <i class="bi bi-eye" style="font-size:20px; color:blue;"></i></a> <a href="javascript:void(0)" class="rejectComplaint" > <i class="bi bi-x-circle" style="font-size:20px; color:red;"></i></a>  <a href="javascript:void(0)" class="acceptComplaint"><i class="bi bi-check-circle" style="font-size:20px; color:green"></i></a>');

                    $(row).find('td').eq(3).html('<label class="badge rounded-pill bg-danger" style="font-size:15px">Queue</label>');


                } else if (data['actionTaken'] === 'Progress') {
//            $(action_td).append('<a href="javascript:void(0)" class="viewFullComplaintDetails"><i class="bi bi-eye" style="font-size:20px; color:blue"></i></a><a href="javascript:void(0)" class="editAssignComplaint"><i class="bi bi-pencil-square" style="font-size:20px; margin-left:10px; color:green"></i></a>');

                    $(row).find('td').eq(3).html('<label class="badge rounded-pill bg-danger" style="font-size:15px">Progress</label>');

                } else {
//            $(action_td).append('<a href="javascript:void(0)" class="viewFullComplaintDetails"><i class="bi bi-eye" style="font-size:20px; color:blue"></i></a><a href="javascript:void(0)" class="reOpenComplaint" ><i class="bi bi-arrow-repeat" style="font-size:20px; margin-left:10px; color:orange"></i></a>');

                    $(row).find('td').eq(3).html('<label class="badge rounded-pill bg-danger" style="font-size:15px">Rejected</label>');
                }


                if (data['status'] === 'active' && data['status_repeat'] === 'Reopen') {



                    $(row).find('td').eq(4).html('<label class="badge bg-primary" style="font-size:15px;">Active <i class="bi bi-reply-fill"></label>');


                } else if (data['status'] === 'Deactive' && data['status_repeat'] === 'Reopen') {


                    $(row).find('td').eq(4).html('<label class="badge bg-primary" style="font-size:15px">Deactive <i class="bi bi-reply-fill"></label>');





                } else if (data['status'] === 'active') {


                    $(row).find('td').eq(4).html('<label class="badge bg-primary" style="font-size:15px">Deactive</label>');



                } else if (data['status'] === 'Deactive') {


                    $(row).find('td').eq(4).html('<label class="badge bg-primary" style="font-size:15px">Deactive</label>');
                }



                $(row).append(action_td);

                $(row).on('mouseover', function () {
                    $(row).css({
                        'background-color': '#b5a2c4',
//                'font-weight': 'bold'
                    });


                });

                $(row).on('mouseout', function () {
                    $(row).css({
                        'background-color': '',
//                'font-weight': ''
                    });

                });

                $(row).on('click', function () {
                    var complaintId = data.complaint_id;
                    var officername = data.officerName;
                    var serialNumber = data.serial_number;






                    fetch('admin/loadComplaintDetailsLog', {
                        method: 'POST',
                        body: new URLSearchParams({
                            serialNumber: serialNumber,
                        })
                    }).then((res) => res.text()).then(function (res) {
                        if (res != null) {
                            var data = JSON.parse(res);




// Get the timeline container element
                            var timelineContainer = document.querySelector('.timelineMyComplaintProcessOnly');

// Clear the previous data in the timeline container
                            timelineContainer.innerHTML = '';

// Loop through the timeline data and create the timeline items dynamically
                            data.forEach(function (item
                                    ) {
                                document.getElementById('topicOfMyComplaintProcess').innerHTML = 'Complaint No: <span style="color: red;">' + item.serial_no + '</span>';


                                function convertTo12Hour(timeString) {
                                    var timeParts = timeString.split(':');
                                    var hour = parseInt(timeParts[0], 10);
                                    var minute = timeParts[1];
                                    var period = hour >= 12 ? 'PM' : 'AM';

                                    // Convert hour to 12-hour format
                                    hour = hour % 12;
                                    hour = hour ? hour : 12;

                                    return hour + ':' + minute + ' ' + period;
                                }



                                // Create a new timeline item
                                var tlItem = document.createElement('div');
                                tlItem.classList.add('tl-item');

                                // Create the timeline dot element
                                var tlDot = document.createElement('div');
//  tlDot.classList.add('tl-dot');

                                // Set the appropriate color for the timeline dot


                                // Create the timeline image element
                                var tlImage = document.createElement('img');
                                tlImage.src = 'assets/img/messages-2.jpg';
                                tlImage.alt = 'Image';
                                tlImage.classList.add('timeline-image');

                                // Append the image to the dot element
                                tlDot.appendChild(tlImage);

                                // Create the timeline time element
                                var tlTime = document.createElement('div');
                                tlTime.classList.add('tl-time');
                                tlTime.textContent = " " + convertTo12Hour(item.time) + " ";


                                // Append the time to the dot element
                                tlDot.appendChild(tlTime);

                                // Create the timeline content
                                var tlContent = document.createElement('div');
                                tlContent.classList.add('tl-content');

                                // Set the content of the timeline item
                                tlContent.innerHTML = '<div>' + item.status_detail + '</div>' +
                                        '<div class="tl-date text-muted mt-1">Age - ' + item.age + '</div>' +
                                        '<div class="tl-date text-muted mt-1">Updated - ' + item.date + ' (' + item.time + ')</div>' +
                                        '<div class="tl-date text-muted mt-1"' + (item.status_type === '11' ? '   style=" color:red !important; font-size:17px; font-weight:900; " ' : '') + '>' + (item.status_type === '11' ? 'Comment - ' : 'Remarks - ') + '<span  style="color: #6c757d; font-size:16px; font-weight:400;">' + item.remarks + '</span></div>';


                                // Append the dot and content to the timeline item
                                tlItem.appendChild(tlDot);
                                tlItem.appendChild(tlContent);

                                // Append the timeline item to the timeline container
                                timelineContainer.appendChild(tlItem);
                            });


                            const modalAdmin12 = new bootstrap.Modal(document.getElementById('verticalycentered_complaint_tracking_processOnly'));
                            modalAdmin12.show();

                        } else {
                            alert("data show is not success");
                        }
                    });


                });

            }

        });



    });






    $("#assignNewOfficerToComplaint").click(function () {

        var officer = $('#OfficerSearchFieldAllComplaint').val();
        var selectedOfficer = $('#OfficerSearchFieldAllComplaint option:selected').text();
        var officername = selectedOfficer;
        var officerID = officer;


        // Get the value of the textarea
        var addRemarkWhenAssignOfficer = document.getElementById('addRemarkWhenAssignOfficer').value;

        Swal.fire({
            title: 'Are you sure?',
            text: 'Will be Assigned!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, Proceed!',
            showLoaderOnConfirm: true,
            preConfirm: () => {
                return fetch('admin/assign-new-officer', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        id: complaintId,
                        officerID: officerID,
                        officername: officername,
                        additionalText: addRemarkWhenAssignOfficer,
                    }),
                })
                        .then((response) => {
                            if (!response.ok) {
                                throw new Error(response.statusText);
                            }
                            return response.json();
                        })
                        .catch((error) => {
                            Swal.showValidationMessage('Request failed: ' + error);
                        });
            },
        }).then((result) => {
            if (result.isConfirmed) {
                if (result.value.status === 'error') {
                    Swal.fire('Error!', 'Failed to reject complaint', 'error');
                } else {
                    Swal.fire('Successful!', 'This Complaint has been rejected!', 'success');
                    dtable.ajax.reload();
                    dtableViewOfficer.ajax.reload();

                }
            } else if (result.dismiss === Swal.DismissReason.cancel) {
                Swal.fire('Cancelled', 'Complaint rejection cancelled', 'info');
            }
        });
    });

});
































//thsese codes for own complaint of the relavent officer




//these code is for own officer function

var statusOfficer = '';
var secondFilterOfficer = '';



$("#filterAllComplaintsOfficer").click(function () {



    statusOfficer = '';
    dtableViewOfficer.ajax.reload();

    $('#changeTopicDataTableOfficer').text("All Complaints");
});



$("#filterCompletedComplaintsOfficer").click(function () {



    statusOfficer = 'Completed';

    dtableViewOfficer.ajax.reload();
    $('#changeTopicDataTableOfficer').text("Completed Complaints");
});






$("#filterRejectedComplaintOfficer").click(function () {

    statusOfficer = 'Rejected';
    dtableViewOfficer.ajax.reload();

    $('#changeTopicDataTableOfficer').text("Rejected Complaints");


});


$("#filterProgressComplaintOfficer").click(function () {


    statusOfficer = 'Progress';
    dtableViewOfficer.ajax.reload();

    $('#changeTopicDataTableOfficer').text("Progress Complaints");
});


$("#filterApprovedComplaintOfficer").click(function () {


    statusOfficer = 'Approved';
    dtableViewOfficer.ajax.reload();

    $('#changeTopicDataTableOfficer').text("Aprrove Complaints");
});

$("#filterQueueComplaintOfficer").click(function () {


    statusOfficer = 'Queue';
    dtableViewOfficer.ajax.reload();

    $('#changeTopicDataTableOfficer').text("Queue Complaints");
});


$("#filterTodayComplaintOfficer").click(function () {

    statusOfficer = 'today';
    dtableViewOfficer.ajax.reload();

    $('#changeTopicDataTableOfficer').text("Today Complaints");
});


$("#filterThisMonthComplaintOfficer").click(function () {
    statusOfficer = 'month';

    dtableViewOfficer.ajax.reload();
    $('#changeTopicDataTableOfficer').text("This Month Complaints");


});

$("#filterThisYearComplaintOfficer").click(function () {
    statusOfficer = 'year';
    dtableViewOfficer.ajax.reload();
    $('#changeTopicDataTableOfficer').text("This Year Complaints");

});







$("#filterResetCustomeDateComplaintOfficer").click(function () {
    document.getElementById("FromDateAdminDashboard").value = '';
    document.getElementById("ToDateAdminDashboard").value = '';
});




$.fn.dataTable.ext.errMode = 'none';




var dtableViewOfficer = $('#viewMyComplaintasTableNewAdminDashboard').DataTable({

    "aLengthMenu": [[5, 10, 25, -1], [5, 10, 25, "All"]],
    "pageLength": 0,
    "ordering": true,
    "autoWidth": false,
    "processing": true,
    "serverSide": true,
    "order": [[0, "desc"]],
    "searchHighlight": true,
    "searchDelay": 350,
    "ajax": {
        "url": "table-data-ownOfficerViewComplaintData",
        "contentType": "application/json",
        "type": "POST",
        "data": function (d) {
            d.data1 = statusOfficer;
            d.data2 = secondFilterOfficer;

            return JSON.stringify(d);
        },
        error: function (xhr, error, code) {
            console.log(xhr);
            console.log(code);
        }
    },
    "columns": [
        {"data": "serial_number", className: "text-wrap"},
        {"data": "complaint_id", visible: false},
        {"data": "complaintType", className: "text-wrap", visible: false},
        {
            "data": "officerName",
            "className": "text-wrap",
            "render": function (data, type, row) {
                var names = data.split(' ');
                var initials = names.slice(0, -1).map(function (name) {
                    return name.charAt(0) + '.';
                }).join(' ');
                var formattedName = initials + ' ' + names.slice(-1);

                return formattedName;
            }
        },
        {
            "data": "customer",
            "className": "text-wrap",
            "render": function (data, type, row) {
                var names = data.split(' ');
                var initials = names.slice(0, -1).map(function (name) {
                    return name.charAt(0) + '.';
                }).join(' ');
                var formattedName = initials + ' ' + names.slice(-1);

                return formattedName;
            }
        }

        ,
        {"data": "complaintTypeName", className: "text-wrap"},
        {"data": "complaintCategoryName", className: "text-wrap", visible: false},
        {"data": "ReachingModeName", className: "text-wrap", visible: false},
        {"data": "complaintCategory", className: "text-wrap", visible: false},
        {"data": "ReachingMode", className: "text-wrap", visible: false},
        {"data": "compaintFieldDate", className: "text-wrap", visible: false},
        {
            "data": "jobComplitionDate",
            "className": "text-wrap",
            "render": function (data, type, row) {
                var dateString = data; // Assuming 'data' contains the date string
                var dateObj = new Date(dateString);
                var year = dateObj.getFullYear();
                var month = dateObj.toLocaleString('en-US', {month: 'long'});
                var day = ("0" + dateObj.getDate()).slice(-2);
                var hours = ("0" + dateObj.getHours()).slice(-2);
                var minutes = ("0" + dateObj.getMinutes()).slice(-2);
                var period = (dateObj.getHours() >= 12) ? "PM" : "AM";

                var formattedDate = year + '-' + month + '-' + day + ' | ' + hours + '.' + minutes + period;

                return formattedDate;
            }
        },
        {"data": "complitionTime", className: "text-wrap", visible: false},
        {"data": "agreementNumber", className: "text-wrap", visible: false},
        {"data": "vehicleNumber", className: "text-wrap", visible: false},
        {"data": "senario", className: "text-wrap", visible: false},
        {"data": "remarks", className: "text-wrap", visible: false},
        {"data": "actionTaken", className: "text-wrap"},
        {"data": "fileUpload", className: "text-wrap", visible: false},
        {"data": "relaventOfficerId", className: "text-wrap", visible: false},
        {"data": "productType", className: "text-wrap", visible: false},
        {"data": "status", className: "text-wrap"},
        {"data": "status_repeat", className: "text-wrap", visible: false},
        {"data": "age", className: "text-wrap", visible: false},
        {"data": "pending_complition", className: "text-wrap", visible: false}

    ],
    "language": {
        'loadingRecords': '&nbsp;',
        'processing': '<div class="loader2"></div>'
    },
    "createdRow": function (row, data) {
        if (data['age'] !== '') {
            var ageInSeconds = data['age'];
            var days = Math.floor(ageInSeconds / (24 * 60 * 60));
            var hours = Math.floor((ageInSeconds % (24 * 60 * 60)) / (60 * 60));
            var minutes = Math.floor((ageInSeconds % (60 * 60)) / 60);
            var seconds = ageInSeconds % 60;

            var final = '';
            if (days > 0) {
                final += days + " days";
            } else if (hours > 0 && hours < 24) {
                if (final !== '') {
                    final += ', ';
                }
                final += hours + " hours";
            } else if (minutes > 0 || seconds < 60) {
                if (final !== '') {
                    final += ', ';
                }
                final += minutes + " minutes";
            } else if (final === '') {
                final += "0 minutes";
            }

            $(row).find('td').eq(5).html('<label class="badge bg-primary" style="font-size:12px; background-color:#84649c !important;">' + final + '</label>');
        }




        if (data['pending_complition'] === 'true' && data['status_repeat'] === 'Reopen') {


            $(row).find('td').eq(6).html('<label class="badge bg-danger" style="font-size:12px">Pending</label>  <i class="bi bi-repeat" style="color:black; font-size: 20px; font-weight:bold;">');
        } else if (data['pending_complition'] === 'true') {


            $(row).find('td').eq(6).html('<label class="badge bg-danger" style="font-size:12px">Pending</label> ');


        } else if (data['actionTaken'] === 'Completed' && data['status_repeat'] === 'Reopen') {



            $(row).find('td').eq(6).html('<label class="badge  bg-success" style="font-size:12px">Completed</label>  <i class="bi bi-repeat" style="color:black; font-size: 20px; font-weight:bold;">');
        } else if (data['actionTaken'] === 'Incomplete') {


            $(row).find('td').eq(6).html('<label class="badge rounded-pill bg-danger" style="font-size:12px">Re-Open</label>  <i class="bi bi-repeat" style="color:black; font-size: 20px; font-weight:bold;">');
        } else if (data['actionTaken'] === 'Queue' && data['status_repeat'] === 'Reopen') {


            $(row).find('td').eq(6).html('<label class="badge bg-info text-dark" style="font-size:12px">Queue</label>  <i class="bi bi-repeat" style="color:black; font-size: 20px; font-weight:bold;">');


        } else if (data['actionTaken'] === 'Progress' && data['status_repeat'] === 'Reopen') {


            $(row).find('td').eq(6).html('<label class="badge bg-warning text-dark" style="font-size:12px;">Progress</label>  <i class="bi bi-repeat" style="color:black; font-size: 20px; font-weight:bold;">');

        } else if (data['actionTaken'] === 'GetApproved' && data['status_repeat'] === 'Reopen') {


            $(row).find('td').eq(6).html('<label class="badge bg-primary" style="font-size:12px">GetApproved</label>  <i class="bi bi-repeat" style="color:black; font-size: 20px; font-weight:bold;">');
        } else if (data['actionTaken'] === 'Rejected' && data['status_repeat'] === 'Reopen') {


            $(row).find('td').eq(6).html('<label class="badge bg-danger" style="font-size:12px">Rejected</label>  <i class="bi bi-repeat" style="color:black; font-size: 20px; font-weight:bold;">');



        } else if (data['actionTaken'] === 'Completed') {



            $(row).find('td').eq(6).html('<label class="badge  bg-success" style="font-size:12px">Completed</label>');
        } else if (data['actionTaken'] === 'Incomplete') {


            $(row).find('td').eq(6).html('<label class="badge rounded-pill bg-danger" style="font-size:12px">Re-Open</label>');
        } else if (data['actionTaken'] === 'Queue') {


            $(row).find('td').eq(6).html('<label class="badge bg-info text-dark" style="font-size:12px">Queue</label>');


        } else if (data['actionTaken'] === 'Progress') {


            $(row).find('td').eq(6).html('<label class="badge bg-warning text-dark" style="font-size:12px;">Progress</label>');

        } else if (data['actionTaken'] === 'GetApproved') {


            $(row).find('td').eq(6).html('<label class="badge bg-primary" style="font-size:12px">GetApproved</label>');
        } else if (data['actionTaken'] === 'Rejected') {


            $(row).find('td').eq(6).html('<label class="badge bg-danger" style="font-size:12px">Rejected</label>');


        }







        $(row).on('mouseover', function () {
            $(row).css({
                'background-color': '#b5a2c4',
//                'font-weight': 'bold'
            });


        });

        $(row).on('mouseout', function () {
            $(row).css({
                'background-color': '',
//                'font-weight': ''
            });

        });


        $(row).on('click', function () {





            var data = dtableViewOfficer.row($(this).closest('tr')).data(); // Get the row data from the DataTable
            var complaintId = data.complaint_id;
            var officername = data.officerName;
            var serialNumber = data.serial_number;







            fetch('showComplaintDatainModel', {
                method: 'POST',
                body: new URLSearchParams({
                    id: complaintId,
                })
            }).then((res) => res.text()).then(function (res) {
                if (res != null) {
                    var data = JSON.parse(res);
                    var nameValue = data[0].customerName;
                    var nic = data[0].nic;
                    var customer_id = data[0].customer_id;
                    var customerEmail = data[0].customerEmail;
                    var customerLandLine = data[0].customerLandLine;
                    var customerMobile = data[0].customerMobile;
                    var customerAddress = data[0].customerAddress;
                    var customerOtherInfor = data[0].customerOtherInfor;


                    var officerName = data[0].officerName;
                    var officer_id = data[0].officer_id;
                    var department = data[0].department;
                    var branch = data[0].branch;




                    var complaintType = data[0].complaintType;
                    var complaint_id = data[0].complaint_id;
                    var productType = data[0].productType;
                    var complaintCateogry = data[0].complaintCateogry;
                    var actionTaken = data[0].actionTaken;
                    var compaintFieldDate = data[0].compaintFieldDate;
                    var jobComplitionDate = data[0].jobComplitionDate;
                    var complitionTime = data[0].complitionTime;
                    var agreementNumber = data[0].agreementNumber;
                    var vehicleNumber = data[0].vehicleNumber;
                    var senario = data[0].senario;
                    var remarks = data[0].remarks;

                    var reaching_mode = data[0].reaching_mode;
                    var officeEmail = data[0].email;
                    var officerMobile = data[0].mobile;
                    var officerImage = data[0].image;
                    var customerImage = data[0].imageCustomer;

                    $('#customer_name_previewOfficer').text(nameValue);
                    $('#customer_nic_previewOfficer').text(nic);
                    $('#customer_code_previewOfficer').text(customer_id);
                    $('#customer_email_previewOfficer').text(customerEmail);
                    $('#customer_landline_previewOfficer').text(customerLandLine);
                    $('#customer_mobile_previewOfficer').text(customerMobile);
                    $('#customer_address_previewOfficer').text(customerAddress);
                    $('#customer_other_previewOfficer').text(customerOtherInfor);
                    $('#customer_image_previewOfficer').attr('src', "loadCustomer?file=" + customerImage);



                    $('#officer_department_previewOfficer').text(department);
                    $('#officer_id_previewOfficer').text(officer_id);
                    $('#officer_branch_previewOfficer').text(branch);
                    $('#officer_name_previewOfficer').text(officerName);
                    $('#officer_mobile_previewOfficer').text(officerMobile);
                    $('#officer_email_previewOfficer').text(officeEmail);
                    $('#officer_image_previewOfficer').attr('src', "loadUsers?file=" + officerImage);


                    $('#complaintTypePreview_newOfficer').text(complaintType);
                    $('#serialNumberPreview_newOfficer').text(serialNumber);
                    $('#productTypePreview_newOfficer').text(productType);
                    $('#complaintCategoryPreview_newOfficer').text(complaintCateogry);
                    $('#reachingModePreview_newOfficer').text(reaching_mode);
                    $('#action_takenComplaintPreviewOfficer').text(actionTaken);
                    $('#complaint_field_dateComplaintPreviewOfficer').text(compaintFieldDate);
                    $('#job_complition_dateComplaintPreviewOfficer').text(jobComplitionDate);
                    $('#job_complition_timeComplaintPreviewOfficer').text(complitionTime);
                    $('#agreementNoPreview_newOfficer').text(agreementNumber);
                    $('#vehicleNoPreview_newOfficer').text(vehicleNumber);
                    $('#senarioPreview_newOfficer').text(senario);
                    $('#remarksPreview_newOfficer').text(remarks);










                    fetch('admin/loadComplaintDetailsLog', {
                        method: 'POST',
                        body: new URLSearchParams({
                            serialNumber: serialNumber,
                        })
                    }).then((res) => res.text()).then(function (res) {
                        if (res != null) {
                            var data = JSON.parse(res);


// Get the timeline container element
                            var timelineContainer = document.querySelector('.timelineMyComplaintExampleOfficer');

// Clear the previous data in the timeline container
                            timelineContainer.innerHTML = '';

// Loop through the timeline data and create the timeline items dynamically
                            data.forEach(function (item) {
                                document.getElementById('topicOfMyComplaintProcessOfficer').innerHTML = 'Complaint No: <span style="color: red;">' + item.serial_no + '</span>';


                                function convertTo12Hour(timeString) {
                                    var timeParts = timeString.split(':');
                                    var hour = parseInt(timeParts[0], 10);
                                    var minute = timeParts[1];
                                    var period = hour >= 12 ? 'PM' : 'AM';

                                    // Convert hour to 12-hour format
                                    hour = hour % 12;
                                    hour = hour ? hour : 12;

                                    return hour + ':' + minute + ' ' + period;
                                }



                                // Create a new timeline item
                                var tlItem = document.createElement('div');
                                tlItem.classList.add('tl-item');

                                // Create the timeline dot element
                                var tlDot = document.createElement('div');
//  tlDot.classList.add('tl-dot');

                                // Set the appropriate color for the timeline dot


                                // Create the timeline image element
                                var tlImage = document.createElement('img');
                                tlImage.src = "loadUsers?file=" + item.image;
                                tlImage.alt = 'Image';
                                tlImage.classList.add('timeline-image');
                                // Append the image to the dot element
                                tlDot.appendChild(tlImage);

                                // Create the timeline time element
                                var tlTime = document.createElement('div');
                                tlTime.classList.add('tl-time');
                                tlTime.textContent = " " + convertTo12Hour(item.time) + " ";


                                // Append the time to the dot element
                                tlDot.appendChild(tlTime);

                                // Create the timeline content
                                var tlContent = document.createElement('div');
                                tlContent.classList.add('tl-content');

                                // Set the content of the timeline item
                                tlContent.innerHTML = '<div>' + item.status_detail + '</div>' +
                                        '<div class="tl-date text-muted mt-1">Updated - ' + item.date + ' (' + item.time + ')</div>' +
                                        '<div class="tl-date text-muted mt-1"' + (item.status_type === '11' ? '   style=" color:red !important; font-size:17px; font-weight:900; " ' : '') + '>' + (item.status_type === '11' ? 'Comment - ' : 'Remarks - ') + '<span  style="color: #6c757d; font-size:16px; font-weight:400;">' + item.remarks + '</span></div>';


                                // Append the dot and content to the timeline item
                                tlItem.appendChild(tlDot);
                                tlItem.appendChild(tlContent);

                                // Append the timeline item to the timeline container
                                timelineContainer.appendChild(tlItem);
                            });




                            const modal = new bootstrap.Modal(document.getElementById('ExtralargeModalViewComplaintTrackingHirachy'));
                            modal.show();
                        } else {
                            alert("data show is not success");
                        }
                    });

                    const modal = new bootstrap.Modal(document.getElementById('ExtralargeModalViewComplaintOfficer'));
                    modal.show();
                } else {

                    alert("data show is not success");
                }
            });

        });

    }
}



);






$('#viewMyComplaintasTableNewAdminDashboard').on('click', 'tr', function () {
    // Open the modal here

    var data = dtableViewOfficer.row($(this).closest('tr')).data(); // Get the row data from the DataTable
    var complaintId = data.complaint_id;
    var officername = data.officerName;
    var serialNumber = data.serial_number;
    var officerEmp = data.relaventOfficerId;
    var actionTaken = data.actionTaken; // Assuming you have the value of data.actionTaken
    var pending_complition = data.pending_complition;


    hadleButtonInAction(actionTaken, pending_complition);
// Remove existing buttons in the "buttonGroupforComplaint" class

    function hadleButtonInAction(actionTaken) {
        $('.buttonGroupforComplaintOfficer').empty();

        if (actionTaken === 'Rejected' && pending_complition === 'false') {
            var rejectButton = $('<a href="javascript:void(0)" class="printButton" data-toggle="tooltip" data-placement="top" title="Print Complaint"><i class="bi bi-printer" style="font-size:40px; margin-left:5px; margin-right:5px; color:Gray"></i></a><a href="javascript:void(0)" class="addComment" data-toggle="tooltip" data-placement="top" title="Add Complaint"><i class="bi bi-chat-left-text" style="font-size:40px; margin-left:10px; color:black"></i></a><a href="javascript:void(0)" class="reOpenComplaint" data-toggle="tooltip" data-placement="top" title="Reopen Complaint"><i class="bi bi-arrow-repeat" style="font-size:40px; margin-left:10px; color:orange"></i></a>');
            $('.buttonGroupforComplaintOfficer').append(rejectButton);
        } else if (actionTaken === 'Completed' && pending_complition === 'false') {
            var completedButton = $('<a href="javascript:void(0)" class="printButton" data-toggle="tooltip" data-placement="top" title="Print Complaint"><i class="bi bi-printer" style="font-size:40px; margin-left:5px; margin-right:5px; color:Gray"></i></a><a href="javascript:void(0)" class="addComment" data-toggle="tooltip" data-placement="top" title="Add Complaint"><i class="bi bi-chat-left-text" style="font-size:40px; margin-left:10px; color:black"></i></a><a href="javascript:void(0)" class="reOpenComplaint" data-toggle="tooltip" data-placement="top" title="Reopen Complaint"><i class="bi bi-arrow-repeat" style="font-size:40px; color:orange;"></i></a>');
            $('.buttonGroupforComplaintOfficer').append(completedButton);
        } else if (actionTaken === 'Queue' && pending_complition === 'false') {
            var completedButton = $('<a href="javascript:void(0)" class="printButton" data-toggle="tooltip" data-placement="top" title="Print Complaint"><i class="bi bi-printer" style="font-size:40px; margin-left:5px; margin-right:5px; color:Gray"></i></a><a href="javascript:void(0)" class="addComment" data-toggle="tooltip" data-placement="top" title="Add Complaint"><i class="bi bi-chat-left-text" style="font-size:40px; margin-left:10px; color:black"></i></a><a href="javascript:void(0)" class="rejectComplaint" data-toggle="tooltip" data-placement="top" title="Reject Complaint"><i class="bi bi-x-circle" style="font-size:40px; margin-left:10px; color:red;"></i></a><a href="javascript:void(0)" class="acceptComplaint" data-toggle="tooltip" data-placement="top" title="Accept Complaint"><i class="bi bi-check-circle" style="font-size:40px; margin-left:10px; color:green"></i></a>');
            $('.buttonGroupforComplaintOfficer').append(completedButton);
        } else if (actionTaken === 'Progress' && pending_complition === 'false') {
            var completedButton = $('<a href="javascript:void(0)" class="printButton" data-toggle="tooltip" data-placement="top" title="Print Complaint"><i class="bi bi-printer" style="font-size:40px; margin-left:5px; margin-right:5px; color:Gray"></i></a><a href="javascript:void(0)" class="addComment" data-toggle="tooltip" data-placement="top" title="Add Complaint"><i class="bi bi-chat-left-text" style="font-size:40px; margin-left:10px; color:black"></i></a><a href="javascript:void(0)" class="editAssignComplaint" data-toggle="tooltip" data-placement="top" title="Edit/Assign Complaint"><i class="bi bi-person-plus" style="font-size:40px; margin-left:10px; color:green"></i></a><a href="javascript:void(0)" class="completedComplantByAdmin" data-toggle="tooltip" data-placement="top" title="Complete Complaint"><i class="bi bi-hand-thumbs-up" style="font-size:40px; color:blue;"></i></a>');
            $('.buttonGroupforComplaintOfficer').append(completedButton);

        } else if (pending_complition === 'true') {
            var completedButton = $('<a href="javascript:void(0)" class="printButton" data-toggle="tooltip" data-placement="top" title="Print Complaint"><i class="bi bi-printer" style="font-size:40px; margin-left:5px; margin-right:5px; color:Gray"></i></a><a href="javascript:void(0)" class="addComment" data-toggle="tooltip" data-placement="top" title="Add Complaint"><i class="bi bi-chat-left-text" style="font-size:40px; margin-left:10px; color:black"></i></a><a href="javascript:void(0)" class="assignNewOfficerPendingComplition" data-toggle="tooltip" data-placement="top" title="Assign Officer"><i class=" bi bi-person-bounding-box " style="font-size:40px; margin-left:10px; color:green"></i></a><a href="javascript:void(0)" class="completedComplantByAdmin" data-toggle="tooltip" data-placement="top" title="Complete Complaint"><i class="bi bi-hand-thumbs-up" style="font-size:40px; color:blue;"></i></a>');
            $('.buttonGroupforComplaintOfficer').append(completedButton);
        }

// Initialize tooltips
        $('[data-toggle="tooltip"]').tooltip();

    }





//this function is to refresh the complaint view model
    function refreshComplaintView() {
        fetch('showComplaintDatainModel', {
            method: 'POST',
            body: new URLSearchParams({
                id: complaintId,
            })
        }).then((res) => res.text()).then(function (res) {
            if (res != null) {
                var data = JSON.parse(res);
                var nameValue = data[0].customerName;
                var nic = data[0].nic;
                var customer_id = data[0].customer_id;
                var customerEmail = data[0].customerEmail;
                var customerLandLine = data[0].customerLandLine;
                var customerMobile = data[0].customerMobile;
                var customerAddress = data[0].customerAddress;
                var customerOtherInfor = data[0].customerOtherInfor;


                var officerName = data[0].officerName;
                var officer_id = data[0].officer_id;
                var department = data[0].department;
                var branch = data[0].branch;


                var complaintType = data[0].complaintType;
                var complaint_id = data[0].complaint_id;
                var productType = data[0].productType;
                var complaintCateogry = data[0].complaintCateogry;
                var actionTaken = data[0].actionTaken;
                var compaintFieldDate = data[0].compaintFieldDate;
                var jobComplitionDate = data[0].jobComplitionDate;
                var complitionTime = data[0].complitionTime;
                var agreementNumber = data[0].agreementNumber;
                var vehicleNumber = data[0].vehicleNumber;
                var senario = data[0].senario;
                var remarks = data[0].remarks;

                var reaching_mode = data[0].reaching_mode;
                var officeEmail = data[0].email;
                var officerMobile = data[0].mobile;
                var officerImage = data[0].image;
                var customerImage = data[0].imageCustomer;


                $('#customer_name_previewOfficer').text(nameValue);
                $('#customer_nic_previewOfficer').text(nic);
                $('#customer_code_previewOfficer').text(customer_id);
                $('#customer_email_previewOfficer').text(customerEmail);
                $('#customer_landline_previewOfficer').text(customerLandLine);
                $('#customer_mobile_previewOfficer').text(customerMobile);
                $('#customer_address_previewOfficer').text(customerAddress);
                $('#customer_other_previewOfficer').text(customerOtherInfor);
                $('#customer_image_preview').attr('src', "loadCustomer?file=" + customerImage);



                $('#officer_department_previewOfficer').text(department);
                $('#officer_id_previewOfficer').text(officer_id);
                $('#officer_branch_previewOfficer').text(branch);
                $('#officer_name_previewOfficer').text(officerName);
                $('#officer_mobile_preview').text(officerMobile);
                $('#officer_email_preview').text(officeEmail);
                $('#officer_image_preview').attr('src', "loadUsers?file=" + officerImage);



                $('#complaintTypePreview_newOfficer').text(complaintType);
                $('#serialNumberPreview_newOfficer').text(serialNumber);
                $('#productTypePreview_newOfficer').text(productType);
                $('#complaintCategoryPreview_newOfficer').text(complaintCateogry);
                $('#reachingModePreview_newOfficer').text(reaching_mode);
                $('#action_takenComplaintPreviewOfficer').text(actionTaken);
                $('#complaint_field_dateComplaintPreviewOfficer').text(compaintFieldDate);
                $('#job_complition_dateComplaintPreviewOfficer').text(jobComplitionDate);
                $('#job_complition_timeComplaintPreviewOfficer').text(complitionTime);
                $('#agreementNoPreview_newOfficer').text(agreementNumber);
                $('#vehicleNoPreview_newOfficer').text(vehicleNumber);
                $('#senarioPreview_newOfficer').text(senario);
                $('#remarksPreview_newOfficer').text(remarks);


                fetch('admin/loadComplaintDetailsLog', {
                    method: 'POST',
                    body: new URLSearchParams({
                        serialNumber: serialNumber,
                    })
                }).then((res) => res.text()).then(function (res) {
                    if (res != null) {
                        var data = JSON.parse(res);


// Get the timeline container element
                        var timelineContainer = document.querySelector('.timelineMyComplaintExampleOfficer');

// Clear the previous data in the timeline container
                        timelineContainer.innerHTML = '';

// Loop through the timeline data and create the timeline items dynamically
                        data.forEach(function (item) {
                            document.getElementById('topicOfMyComplaintProcessOfficer').innerHTML = 'Complaint No: <span style="color: red;">' + item.serial_no + '</span>';


                            function convertTo12Hour(timeString) {
                                var timeParts = timeString.split(':');
                                var hour = parseInt(timeParts[0], 10);
                                var minute = timeParts[1];
                                var period = hour >= 12 ? 'PM' : 'AM';

                                // Convert hour to 12-hour format
                                hour = hour % 12;
                                hour = hour ? hour : 12;

                                return hour + ':' + minute + ' ' + period;
                            }



                            // Create a new timeline item
                            var tlItem = document.createElement('div');
                            tlItem.classList.add('tl-item');

                            // Create the timeline dot element
                            var tlDot = document.createElement('div');
//                            tlDot.classList.add('tl-dot');

                            // Set the appropriate color for the timeline dot


                            // Create the timeline image element
                            var tlImage = document.createElement('img');
                            tlImage.src = 'assets/img/messages-2.jpg';
                            tlImage.alt = 'Image';
                            tlImage.classList.add('timeline-image');

                            // Append the image to the dot element
                            tlDot.appendChild(tlImage);

                            // Create the timeline time element
                            var tlTime = document.createElement('div');
                            tlTime.classList.add('tl-time');
                            tlTime.textContent = " " + convertTo12Hour(item.time) + " ";


                            // Append the time to the dot element
                            tlDot.appendChild(tlTime);

                            // Create the timeline content
                            var tlContent = document.createElement('div');
                            tlContent.classList.add('tl-content');

                            // Set the content of the timeline item
                            tlContent.innerHTML = '<div>' + item.status_detail + '</div>' +
                                    '<div class="tl-date text-muted mt-1">Age - ' + item.age + '</div>' +
                                    '<div class="tl-date text-muted mt-1">Updated - ' + item.date + ' (' + item.time + ')</div>' +
                                    '<div class="tl-date text-muted mt-1"' + (item.status_type === '11' ? '   style=" color:red !important; font-size:17px; font-weight:900; " ' : '') + '>' + (item.status_type === '11' ? 'Comment - ' : 'Remarks - ') + '<span  style="color: #6c757d; font-size:16px; font-weight:400;">' + item.remarks + '</span></div>';


                            // Append the dot and content to the timeline item
                            tlItem.appendChild(tlDot);
                            tlItem.appendChild(tlContent);

                            // Append the timeline item to the timeline container
                            timelineContainer.appendChild(tlItem);
                        });

                    } else {
                        alert("data show is not success");
                    }
                });

                const modal123 = new bootstrap.Modal(document.getElementById('ExtralargeModalViewComplaintOfficer'));
                modal123.show();


            } else {

                alert("data show is not success");
            }
        });

    }




//this is the function to reject the complaint
    $(document).off('click', '.rejectComplaint').on('click', '.rejectComplaint', function () {


        const modalElement = document.getElementById('ExtralargeModalViewComplaintOfficer');
        modalElement.classList.add('d-none');

        Swal.fire({
            title: 'Are you sure?',
            text: "This Complaint Will be rejected!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, Proceed!',
            showLoaderOnConfirm: true,
            preConfirm: () => {
                modalElement.classList.add('d-none');
                return Swal.fire({
                    title: 'Why is the request rejected?',
                    html:
                            '<textarea id="input1" class="swal2-textarea" placeholder="Enter reason"></textarea>' +
                            '<label for="input2" class="swal2-file-input">',

                    inputPlaceholder: 'Type the reason',
                    showCancelButton: true,
                    confirmButtonText: 'Confirm',
                    showLoaderOnConfirm: true,
                    preConfirm: (additionalText) => {
                        const input1 = document.getElementById('input1').value;
                        return fetch('admin/reject-complaint', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({
                                id: complaintId,
                                additionalText: input1
                            })
                        })
                                .then(response => {
                                    if (!response.ok) {
                                        throw new Error(response.statusText);
                                    }
                                    return response.json();
                                })
                                .catch(error => {

                                    Swal.showValidationMessage('Request failed: ' + error);
                                });
                    },
                    allowOutsideClick: () => !Swal.isLoading()
                }).then((result) => {
                    if (result.isConfirmed) {
                        if (result.value.status === 'error') {
                            modalElement.classList.remove('d-none');
                            Swal.fire('Error!', 'Failed to reject complaint', 'error');

                        } else {
                            hadleButtonInAction("Rejected");
                            refreshComplaintView();
                            modalElement.classList.remove('d-none');
                            Swal.fire('Successful!', 'This Complaint has been rejected!', 'success');

                            dtableViewOfficer.ajax.reload();
                        }
                    } else if (result.dismiss === Swal.DismissReason.cancel) {

                        Swal.fire('Cancelled', 'Complaint rejection cancelled', 'info');
                        modalElement.classList.remove('d-none');


                        const modal123 = new bootstrap.Modal(document.getElementById('ExtralargeModalViewComplaintOfficer'));
                        modal123.show();
                    }
                });
            },

            allowOutsideClick: () => !Swal.isLoading()

        })

        modalElement.classList.remove('d-none');



    }
    );







//this is the function to reopen the complaint

    $(document).off('click', '.reOpenComplaint').on('click', '.reOpenComplaint', function () {

        const modalElementReopen = document.getElementById('ExtralargeModalViewComplaintOfficer');
        modalElementReopen.classList.add('d-none');

        Swal.fire({
            title: 'Are you sure?',
            text: 'This Complaint (' + serialNumber + ') will be reopened!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, Proceed!',
            showLoaderOnConfirm: true,

            preConfirm: () => {
                modalElementReopen.classList.add('d-none');
                return Swal.fire({
                    title: 'Why is the complaint reopened?',
                    html:
                            '<textarea id="input1" class="swal2-textarea" placeholder="Enter reason"></textarea>' +
                            '<label for="input2" class="swal2-file-input">',

                    inputPlaceholder: 'Type the reason',
                    showCancelButton: true,
                    confirmButtonText: 'Confirm',
                    showLoaderOnConfirm: true,
                    preConfirm: () => {
                        const input1 = document.getElementById('input1').value;
                        return fetch('admin/reopen-complaint', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({
                                id: complaintId,
                                additionalText: input1
                            })
                        })
                                .then(response => {
                                    if (!response.ok) {
                                        throw new Error(response.statusText);
                                    }
                                    return response.json();
                                })
                                .catch(error => {
                                    Swal.showValidationMessage('Request failed: ' + error);
                                });
                    },
                    allowOutsideClick: () => !Swal.isLoading()
                }).then((result) => {
                    if (result.isConfirmed) {
                        if (result.value.status === 'error') {
                            modalElementReopen.classList.remove('d-none');
                            Swal.fire('Error!', 'Failed to reopen complaint', 'error');
                        } else {
                            hadleButtonInAction("Queue");
                            refreshComplaintView();
                            modalElementReopen.classList.remove('d-none');
                            Swal.fire('Successful!', 'This Complaint has been reopened!', 'success');
                            dtableViewOfficer.ajax.reload();
                        }
                    } else if (result.dismiss === Swal.DismissReason.cancel) {

                        Swal.fire('Cancelled', 'Complaint reopening cancelled', 'info');
                        modalElementReopen.classList.remove('d-none');
                        const modalReopen = new bootstrap.Modal(document.getElementById('ExtralargeModalViewComplaintOfficer'));
                        modalReopen.show();
                    }
                });
            },
            allowOutsideClick: () => !Swal.isLoading()
        })

        modalElementReopen.classList.remove('d-none');
    });






//this is the function to accept the complaint
    $(document).off('click', '.acceptComplaint').on('click', '.acceptComplaint', function () {
        const modalElementAccept = document.getElementById('ExtralargeModalViewComplaintOfficer');
        modalElementAccept.classList.add('d-none');
        Swal.fire({
            title: 'Are you sure?',
            text: "This Complaint Will be rejected!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, Proceed!',
            showLoaderOnConfirm: true,
            preConfirm: () => {
                modalElementAccept.classList.add('d-none');
                return Swal.fire({
                    title: 'Why is the request rejected?',
                    html:
                            '<textarea id="input1" class="swal2-textarea" placeholder="Enter reason"></textarea>' +
                            '<label for="input2" class="swal2-file-input">',
                    inputPlaceholder: 'Type the reason',
                    showCancelButton: true,
                    confirmButtonText: 'Confirm',
                    showLoaderOnConfirm: true,
                    preConfirm: (additionalText) => {
                        const input1 = document.getElementById('input1').value;
                        return fetch('admin/accept-complaint', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({
                                id: complaintId,
                                additionalText: input1
                            })
                        })
                                .then(response => {
                                    if (!response.ok) {
                                        throw new Error(response.statusText);
                                    }
                                    return response.json();
                                })
                                .catch(error => {
                                    Swal.showValidationMessage('Request failed: ' + error);
                                });
                    },
                    allowOutsideClick: () => !Swal.isLoading()
                }).then((result) => {
                    if (result.isConfirmed) {
                        if (result.value.status === 'error') {
                            modalElementAccept.classList.remove('d-none');
                            Swal.fire('Error!', 'Failed to reject complaint', 'error');
                        } else {
                            hadleButtonInAction("Progress");
                            refreshComplaintView();
                            modalElementAccept.classList.remove('d-none');
                            Swal.fire('Successful!', 'This Complaint has been rejected!', 'success');
                            dtableViewOfficer.ajax.reload();
                        }
                    } else if (result.dismiss === Swal.DismissReason.cancel) {
                        Swal.fire('Cancelled', 'Complaint rejection cancelled', 'info');
                        modalElementAccept.classList.remove('d-none');
                        const modalAccept = new bootstrap.Modal(document.getElementById('ExtralargeModalViewComplaintOfficer'));
                        modalAccept.show();
                    }
                });
            },
            allowOutsideClick: () => !Swal.isLoading()
        })
        modalElementAccept.classList.remove('d-none');
    });





    $(document).off('click', '.completedComplantByAdmin').on('click', '.completedComplantByAdmin', function () {
        const modalElementComplete = document.getElementById('ExtralargeModalViewComplaintOfficer');
        modalElementComplete.classList.add('d-none');
        Swal.fire({
            title: 'Are you sure?',
            text: 'This Complaint will be completed!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, Proceed!',
            showLoaderOnConfirm: true,
            preConfirm: () => {
                modalElementComplete.classList.add('d-none');
                return Swal.fire({
                    title: 'Why is the complaint completed?',
                    html:
                            '<textarea id="input1" class="swal2-textarea" placeholder="Enter reason"></textarea>' +
                            '<label for="input2" class="swal2-file-input">' +
                            '<input id="input2" type="file" class="swal2-file" style="display: none;">' +
                            '<span class="swal2-file-label">' +
                            '<i class="fas fa-file-upload"></i> Choose File' +
                            '</span>' +
                            '</label>',
                    showCancelButton: true,
                    confirmButtonText: 'Confirm',
                    showLoaderOnConfirm: true,
                    preConfirm: () => {
                        const input1 = document.getElementById('input1').value;
                        const input2 = document.getElementById('input2').files[0];

                        const formData = new FormData();
                        formData.append('file', input2);

                        return fetch('admin/completed-complaint', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify({
                                id: complaintId,
                                input1: input1,
                                file: formData,
                            }),
                        })
                                .then((response) => {
                                    if (!response.ok) {
                                        throw new Error(response.statusText);
                                    }
                                    return response.json();
                                })
                                .catch((error) => {
                                    Swal.showValidationMessage('Request failed: ' + error);
                                });
                    },
                    allowOutsideClick: () => !Swal.isLoading(),
                }).then((result) => {
                    if (result.isConfirmed) {
                        if (result.value.status === 'error') {
                            modalElementComplete.classList.remove('d-none');
                            Swal.fire('Error!', 'Failed to complete complaint', 'error');
                        } else {
                            hadleButtonInAction("Completed");
                            refreshComplaintView();
                            modalElementComplete.classList.remove('d-none');
                            Swal.fire('Successful!', 'This Complaint has been Completed!', 'success');
                            dtableViewOfficer.ajax.reload();
                        }
                    } else if (result.dismiss === Swal.DismissReason.cancel) {
                        Swal.fire('Cancelled', 'Complaint completion cancelled', 'info');
                        modalElementComplete.classList.remove('d-none');
                        const modalCompleted = new bootstrap.Modal(document.getElementById('ExtralargeModalViewComplaintOfficer'));
                        modalCompleted.show();
                    }
                });
            },
            allowOutsideClick: () => !Swal.isLoading(),
        });


        modalElementComplete.classList.remove('d-none');
    });


    $(document).off('click', '.addComment').on('click', '.addComment', function () {
        const modalElementAccept = document.getElementById('ExtralargeModalViewComplaint');
        modalElementAccept.classList.add('d-none');
        Swal.fire({
            title: 'Do you want to add a Comment ?',
            text: "This Comment  Will be Added!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, Proceed!',
            showLoaderOnConfirm: true,
            preConfirm: () => {
                modalElementAccept.classList.add('d-none');
                return Swal.fire({
                    title: 'Why is the comment added?',
                    html:
                            '<textarea id="input1" class="swal2-textarea" placeholder="Enter reason"></textarea>' +
                            '<label for="input2" class="swal2-file-input">',
                    inputPlaceholder: 'Type the reason',
                    showCancelButton: true,
                    confirmButtonText: 'Confirm',
                    showLoaderOnConfirm: true,
                    preConfirm: (additionalText) => {
                        const input1 = document.getElementById('input1').value;
                        return fetch('admin/add-comment', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({
                                id: complaintId,
                                additionalText: input1
                            })
                        })
                                .then(response => {
                                    if (!response.ok) {
                                        throw new Error(response.statusText);
                                    }
                                    return response.json();
                                })
                                .catch(error => {
                                    Swal.showValidationMessage('Request failed: ' + error);
                                });
                    },
                    allowOutsideClick: () => !Swal.isLoading()
                }).then((result) => {
                    if (result.isConfirmed) {
                        if (result.value.status === 'error') {
                            modalElementAccept.classList.remove('d-none');
                            Swal.fire('Error!', 'Failed to add comment', 'error');
                        } else {
                            hadleButtonInAction("Progress", pending_complition);
                            refreshComplaintView();
                            modalElementAccept.classList.remove('d-none');
                            Swal.fire('Successful!', 'This comment has been added!', 'success');
                            dtable.ajax.reload();
                        }
                    } else if (result.dismiss === Swal.DismissReason.cancel) {
                        Swal.fire('Cancelled', 'Comment addition cancelled', 'info');
                        modalElementAccept.classList.remove('d-none');
                        const modalAccept = new bootstrap.Modal(document.getElementById('ExtralargeModalViewComplaint'));
                        modalAccept.show();
                    }
                });
            },
            allowOutsideClick: () => !Swal.isLoading()
        })
        modalElementAccept.classList.remove('d-none');
    }
    );




    $(document).off('click', '.editAssignComplaint').on('click', '.editAssignComplaint', function () {


        // Get the modal element
        var modalAssginOfficerMdel = $('#verticalycentered_complete_assignOfficer');
        modalAssginOfficerMdel.modal('show');

        var modal = $('#ExtralargeModalViewComplaintOfficer');
        modal.modal('hide');

        const modalElementAssign = document.getElementById('ExtralargeModalViewComplaintOfficer');
//        modalElementAssign.classList.add('d-none');


// const modalElementAssignHide = document.getElementById('verticalycentered_complete_assign');










        $('#OfficerSearchFieldMy').change(function () {


            if ($("#part8").is(":visible")) {
                // Update the data without hiding #part6
                // Code to update the data here

                // Remove and add the same class to #part5 (not necessary in this case)
                $("#part7").removeClass("col-md-12").addClass("col-md-12");
            } else {
                $("#part8").show(); // Show #part6 if it's hidden
            }

            const searchFieldValue = $(this).val();




            if (!searchFieldValue) {
                return;
            }

            fetch('filed_officer_details', {
                method: 'POST',
                body: new URLSearchParams({
                    id: searchFieldValue,
                })
            })
                    .then((res) => res.text())
                    .then((res) => {
                        if (res === 'ok') {

                        } else {
                            const parsedJson = JSON.parse(res);
                            parsedJson.forEach((item) => {



                                $('#officer_name_newOfficerMy').text(item.officerName);
                                $('#officer_id_newOfficerMy').text(item.officerID);
                                $('#officer_mobile_newOfficerMy').text(item.officerrMobile);
                                $('#officer_landline_newOfficerMy').text(item.officerLandline);
                                $('#officer_email_newOfficerMy').text(item.officeremail);
                                $('#officer_status_newOfficerMy').text("-");
                                $('#officer_branch_neOfficerwMy').text(item.officerBranch);
                                $('#officer_department_newOfficerMy').text(item.officerdepartment);
                                $('#officer_completed_complaint_newOfficerMy').text("?");
                                $('#officer_queue_complaint_newOfficerMy').text("-");
                                $('#officer_lastlogin_newOfficerMy').text("-");
                                $('#officer_lastAcessComputer_newOfficerMy').text("-");


                                var officerImage = item.officerImage;
                                $('#officer_image_newOfficerMy').attr('src', "loadUsers?file=" + officerImage);


                            });
                        }
                    })
                    .catch((error) => console.error(error));









            var dtableOfficer = $('#viewOfficerComplaintasTableNewAdminDashboardMy').DataTable({

                "aLengthMenu": [[5, 10, 25, -1], [5, 10, 25, "All"]],
                "pageLength": 0,
                "ordering": true,
                "autoWidth": false,
                "processing": true,
                "serverSide": true,
                "order": [[0, "desc"]],
                "searchHighlight": true,
                "searchDelay": 350,
                "ajax": {
                    "url": "table-data-officerOwnComplaintDataWithID",
                    "contentType": "application/json",
                    "type": "POST",
                    "data": function (d) {
                        d.data1 = searchFieldValue;

                        return JSON.stringify(d);
                    },
                    error: function (xhr, error, code) {
                        console.log(xhr);
                        console.log(code);
                    }
                },
                "columns": [
                    {"data": "serial_number", className: "text-wrap"},
                    {"data": "complaint_id", visible: false},
                    {"data": "complaintType", className: "text-wrap", visible: false},
                    {data: 'officerName', className: 'text-wrap', visible: false},
                    {
                        "data": "customer",
                        "className": "text-wrap",
                        "render": function (data, type, row) {
                            var names = data.split(' ');
                            var initials = names.slice(0, -1).map(function (name) {
                                return name.charAt(0) + '.';
                            }).join(' ');
                            var formattedName = initials + ' ' + names.slice(-1);

                            return formattedName;
                        }
                    }

                    ,
                    {"data": "complaintCategory", className: "text-wrap", visible: false},
                    {"data": "ReachingMode", className: "text-wrap", visible: false},
                    {"data": "compaintFieldDate", className: "text-wrap", visible: false},
                    {
                        "data": "jobComplitionDate",
                        "className": "text-wrap",
                        "render": function (data, type, row) {
                            var dateString = data; // Assuming 'data' contains the date string
                            var dateObj = new Date(dateString);
                            var year = dateObj.getFullYear();
                            var month = dateObj.toLocaleString('en-US', {month: 'long'});
                            var day = ("0" + dateObj.getDate()).slice(-2);
                            var hours = ("0" + dateObj.getHours()).slice(-2);
                            var minutes = ("0" + dateObj.getMinutes()).slice(-2);
                            var period = (dateObj.getHours() >= 12) ? "PM" : "AM";

                            var formattedDate = year + '-' + month + '-' + day + ' | ' + hours + '.' + minutes + period;

                            return formattedDate;
                        }
                    },
                    {"data": "complitionTime", className: "text-wrap", visible: false},
                    {"data": "agreementNumber", className: "text-wrap", visible: false},
                    {"data": "vehicleNumber", className: "text-wrap", visible: false},
                    {"data": "senario", className: "text-wrap", visible: false},
                    {"data": "remarks", className: "text-wrap", visible: false},
                    {"data": "actionTaken", className: "text-wrap"},
                    {"data": "fileUpload", className: "text-wrap", visible: false},
                    {"data": "relaventOfficerId", className: "text-wrap", visible: false},
                    {"data": "productType", className: "text-wrap", visible: false},
                    {"data": "status", className: "text-wrap"},
                    {"data": "status_repeat", className: "text-wrap", visible: false},
                ],
                "language": {
                    'loadingRecords': '&nbsp;',
                    'processing': '<div class="loader2"></div>'
                },
                "createdRow": function (row, data) {
                    let action_td = document.createElement('td');


                    if (data['actionTaken'] === 'Completed') {
//            $(action_td).append('<a href="javascript:void(0)" class="viewFullComplaintDetails"> <i class="bi bi-eye" style="font-size:20px; color:blue;"></i></a><a href="javascript:void(0)" class="reOpenComplaint" > <i class="bi bi-arrow-repeat" style="font-size:20px; color:orange;"></i></a>');


                        $(row).find('td').eq(3).html('<label class="badge rounded-pill bg-success" style="font-size:15px">Completed</label>');
                    } else if (data['actionTaken'] === 'Incomplete') {
//            $(action_td).append('<a href="javascript:void(0)" class="viewFullComplaintDetails"><i class="bi bi-eye" style="font-size:20px; color:blue"></i></a><a href="javascript:void(0)" id=""><i class="bi bi-pencil-square" style="font-size:20px; margin-left:10px; color:green"></i></a>');

                        $(row).find('td').eq(3).html('<label class="badge rounded-pill bg-danger" style="font-size:15px">Re-Open</label>');
                    } else if (data['actionTaken'] === 'Queue') {
//            $(action_td).append('<a href="javascript:void(0)" class="viewFullComplaintDetails"> <i class="bi bi-eye" style="font-size:20px; color:blue;"></i></a> <a href="javascript:void(0)" class="rejectComplaint" > <i class="bi bi-x-circle" style="font-size:20px; color:red;"></i></a>  <a href="javascript:void(0)" class="acceptComplaint"><i class="bi bi-check-circle" style="font-size:20px; color:green"></i></a>');

                        $(row).find('td').eq(3).html('<label class="badge rounded-pill bg-danger" style="font-size:15px">Queue</label>');


                    } else if (data['actionTaken'] === 'Progress') {
//            $(action_td).append('<a href="javascript:void(0)" class="viewFullComplaintDetails"><i class="bi bi-eye" style="font-size:20px; color:blue"></i></a><a href="javascript:void(0)" class="editAssignComplaint"><i class="bi bi-pencil-square" style="font-size:20px; margin-left:10px; color:green"></i></a>');

                        $(row).find('td').eq(3).html('<label class="badge rounded-pill bg-danger" style="font-size:15px">Progress</label>');

                    } else {
//            $(action_td).append('<a href="javascript:void(0)" class="viewFullComplaintDetails"><i class="bi bi-eye" style="font-size:20px; color:blue"></i></a><a href="javascript:void(0)" class="reOpenComplaint" ><i class="bi bi-arrow-repeat" style="font-size:20px; margin-left:10px; color:orange"></i></a>');

                        $(row).find('td').eq(3).html('<label class="badge rounded-pill bg-danger" style="font-size:15px">Rejected</label>');
                    }


                    if (data['status'] === 'active' && data['status_repeat'] === 'Reopen') {



                        $(row).find('td').eq(4).html('<label class="badge bg-primary" style="font-size:15px;">Active <i class="bi bi-reply-fill"></label>');


                    } else if (data['status'] === 'Deactive' && data['status_repeat'] === 'Reopen') {


                        $(row).find('td').eq(4).html('<label class="badge bg-primary" style="font-size:15px">Deactive <i class="bi bi-reply-fill"></label>');





                    } else if (data['status'] === 'active') {


                        $(row).find('td').eq(4).html('<label class="badge bg-primary" style="font-size:15px">Deactive</label>');



                    } else if (data['status'] === 'Deactive') {


                        $(row).find('td').eq(4).html('<label class="badge bg-primary" style="font-size:15px">Deactive</label>');
                    }



                    $(row).append(action_td);

                    $(row).on('mouseover', function () {
                        $(row).css({
                            'background-color': '#b5a2c4',
//                'font-weight': 'bold'
                        });


                    });

                    $(row).on('mouseout', function () {
                        $(row).css({
                            'background-color': '',
//                'font-weight': ''
                        });

                    });

                    $(row).on('click', function () {
                        var complaintId = data.complaint_id;
                        var officername = data.officerName;
                        var serialNumber = data.serial_number;







                        fetch('admin/loadComplaintDetailsLog', {
                            method: 'POST',
                            body: new URLSearchParams({
                                serialNumber: serialNumber,
                            })
                        }).then((res) => res.text()).then(function (res) {
                            if (res != null) {
                                var data = JSON.parse(res);




// Get the timeline container element
                                var timelineContainer = document.querySelector('.timelineMyComplaintProcessOnlyOwn');

// Clear the previous data in the timeline container
                                timelineContainer.innerHTML = '';

// Loop through the timeline data and create the timeline items dynamically
                                data.forEach(function (item
                                        ) {
                                    document.getElementById('topicOfMyComplaintProcessOwn').innerHTML = 'Complaint No: <span style="color: red;">' + item.serial_no + '</span>';


                                    function convertTo12Hour(timeString) {
                                        var timeParts = timeString.split(':');
                                        var hour = parseInt(timeParts[0], 10);
                                        var minute = timeParts[1];
                                        var period = hour >= 12 ? 'PM' : 'AM';

                                        // Convert hour to 12-hour format
                                        hour = hour % 12;
                                        hour = hour ? hour : 12;

                                        return hour + ':' + minute + ' ' + period;
                                    }



                                    // Create a new timeline item
                                    var tlItem = document.createElement('div');
                                    tlItem.classList.add('tl-item');

                                    // Create the timeline dot element
                                    var tlDot = document.createElement('div');
//  tlDot.classList.add('tl-dot');

                                    // Set the appropriate color for the timeline dot


                                    // Create the timeline image element
                                    // Create the timeline image element
                                    var tlImage = document.createElement('img');
                                    tlImage.src = "loadUsers?file=" + item.image;
                                    tlImage.alt = 'Image';
                                    tlImage.classList.add('timeline-image');

                                    // Append the image to the dot element
                                    tlDot.appendChild(tlImage);

                                    // Create the timeline time element
                                    var tlTime = document.createElement('div');
                                    tlTime.classList.add('tl-time');
                                    tlTime.textContent = " " + convertTo12Hour(item.time) + " ";


                                    // Append the time to the dot element
                                    tlDot.appendChild(tlTime);

                                    // Create the timeline content
                                    var tlContent = document.createElement('div');
                                    tlContent.classList.add('tl-content');

                                    // Set the content of the timeline item
                                    tlContent.innerHTML = '<div>' + item.status_detail + '</div>' +
                                            '<div class="tl-date text-muted mt-1">Updated - ' + item.date + ' (' + item.time + ')</div>' +
                                            '<div class="tl-date text-muted mt-1"' + (item.status_type === '11' ? '   style=" color:red !important; font-size:17px; font-weight:900; " ' : '') + '>' + (item.status_type === '11' ? 'Comment - ' : 'Remarks - ') + '<span  style="color: #6c757d; font-size:16px; font-weight:400;">' + item.remarks + '</span></div>';


                                    // Append the dot and content to the timeline item
                                    tlItem.appendChild(tlDot);
                                    tlItem.appendChild(tlContent);

                                    // Append the timeline item to the timeline container
                                    timelineContainer.appendChild(tlItem);
                                });


                                const modalAdmin12 = new bootstrap.Modal(document.getElementById('verticalycentered_complaint_tracking_processOnlyOwn'));
                                modalAdmin12.show();

                            } else {
                                alert("data show is not success");
                            }
                        });


                    });

                }

            });









        });














        $("#assignNewOfficerToComplaintOfficerMy").click(function () {

            var officer = $('#OfficerSearchFieldMy').val();
            var selectedOfficer = $('#OfficerSearchFieldMy option:selected').text();
            var officername = selectedOfficer;
            var officerID = officer;


// Get the value of the textarea
            var addRemarkWhenAssignOfficer = document.getElementById('addRemarkWhenAssignOfficerOfficerMy').value;



            Swal.fire({
                title: 'Are you sure?',
                text: 'Will be Assigned!',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, Proceed!',
                showLoaderOnConfirm: true,
                preConfirm: () => {
                    modalAssginOfficerMdel.modal('hide');
                    return fetch('admin/assign-new-officer', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            id: complaintId,
                            officerID: officerID,
                            officername: officername,
                            additionalText: addRemarkWhenAssignOfficer,

                        }),
                    })
                            .then((response) => {
                                if (!response.ok) {
                                    throw new Error(response.statusText);
                                }
                                return response.json();
                            })
                            .catch((error) => {
                                Swal.showValidationMessage('Request failed: ' + error);
                            });
                },
            }).then((result) => {
                if (result.isConfirmed) {
                    if (result.value.status === 'error') {
                        modalElementAssign.classList.remove('d-none');
                        Swal.fire('Error!', 'Failed to reject complaint', 'error');

                    } else {
                        dtable.ajax.reload();
                        dtableViewOfficer.ajax.reload();
                        hadleButtonInAction("Progress");
                        refreshComplaintView();
                        modalElementAssign.classList.remove('d-none');
                        modalElementAssignHide.classList.add('d-none');
                        modalAssginOfficerMdel.modal('hide');
                        Swal.fire('Successful!', 'This Complaint has been rejected!', 'success');

                    }
                } else if (result.dismiss === Swal.DismissReason.cancel) {
                    Swal.fire('Cancelled', 'Complaint rejection cancelled', 'info');
                    modalElementAssign.classList.remove('d-none');

                    const modalAssign = new bootstrap.Modal(document.getElementById('ExtralargeModalViewComplaint'));
                    modalAssign.show();
                }
            });
        });
        modalElementAssign.classList.remove('d-none');
    });






});





















$('#viewMyComplaintasTableNewAdminDashboard').on('click', '.editAssignComplaint', function () {



    var data = dtableViewOfficer.row($(this).closest('tr')).data(); // Get the row data from the DataTable
    var complaintId = data.complaint_id;
    var serialNumber = data.serial_number;


    // Get the modal element
    var modalOfficerOwn = $('#verticalycentered_complete_assignOfficer');
    modalOfficerOwn.modal('show');

    $('#OfficerSearchFieldMy').change(function () {


        if ($("#part8").is(":visible")) {
            // Update the data without hiding #part6
            // Code to update the data here

            // Remove and add the same class to #part5 (not necessary in this case)
            $("#part7").removeClass("col-md-12").addClass("col-md-12");
        } else {
            $("#part8").show(); // Show #part6 if it's hidden
        }

        const searchFieldValue = $(this).val();




        if (!searchFieldValue) {
            return;
        }

        fetch('filed_officer_details', {
            method: 'POST',
            body: new URLSearchParams({
                id: searchFieldValue,
            })
        })
                .then((res) => res.text())
                .then((res) => {
                    if (res === 'ok') {

                    } else {
                        const parsedJson = JSON.parse(res);
                        parsedJson.forEach((item) => {


                            $('#officer_name_newOfficerMy').text(item.officerName);
                            $('#officer_id_newOfficerMy').text(item.officerID);
                            $('#officer_mobile_newOfficerMy').text(item.officerrMobile);
                            $('#officer_landline_newOfficerMy').text(item.officerLandline);
                            $('#officer_email_newOfficerMy').text(item.officeremail);
                            $('#officer_status_newOfficerMy').text("?");
                            $('#officer_branch_newOfficerMy').text(item.officerBranch);
                            $('#officer_department_newOfficerMy').text(item.officerdepartment);
                            $('#officer_completed_complaint_newOfficerMy').text("?");
                            $('#officer_queue_complaint_newOfficerMy').text("?");
                            $('#officer_lastlogin_newOfficerMy').text("?");
                            $('#officer_lastAcessComputer_newOfficerMy').text("?");





                        });
                    }
                })
                .catch((error) => console.error(error));









        var dtableOfficer = $('#viewOfficerComplaintasTableNewAdminDashboardMy').DataTable({

            "aLengthMenu": [[5, 10, 25, -1], [5, 10, 25, "All"]],
            "pageLength": 0,
            "ordering": true,
            "autoWidth": false,
            "processing": true,
            "serverSide": true,
            "order": [[0, "desc"]],
            "searchHighlight": true,
            "searchDelay": 350,
            "ajax": {
                "url": "table-data-officerOwnComplaintDataWithID",
                "contentType": "application/json",
                "type": "POST",
                "data": function (d) {
                    d.data1 = searchFieldValue;

                    return JSON.stringify(d);
                },
                error: function (xhr, error, code) {
                    console.log(xhr);
                    console.log(code);
                }
            },
            "columns": [
                {"data": "serial_number", className: "text-wrap"},
                {"data": "complaint_id", visible: false},
                {"data": "complaintType", className: "text-wrap", visible: false},
                {data: 'officerName', className: 'text-wrap', visible: false},
                {"data": "customer", className: "text-wrap"},
                {"data": "complaintCategory", className: "text-wrap", visible: false},
                {"data": "ReachingMode", className: "text-wrap", visible: false},
                {"data": "compaintFieldDate", className: "text-wrap", visible: false},
                {"data": "jobComplitionDate", className: "text-wrap"},
                {"data": "complitionTime", className: "text-wrap", visible: false},
                {"data": "agreementNumber", className: "text-wrap", visible: false},
                {"data": "vehicleNumber", className: "text-wrap", visible: false},
                {"data": "senario", className: "text-wrap", visible: false},
                {"data": "remarks", className: "text-wrap", visible: false},
                {"data": "actionTaken", className: "text-wrap"},
                {"data": "fileUpload", className: "text-wrap", visible: false},
                {"data": "relaventOfficerId", className: "text-wrap", visible: false},
                {"data": "productType", className: "text-wrap", visible: false},
                {"data": "status", className: "text-wrap"},
                {"data": "status_repeat", className: "text-wrap", visible: false},
            ],
            "language": {
                'loadingRecords': '&nbsp;',
                'processing': '<div class="loader2"></div>'
            },
            "createdRow": function (row, data) {
                let action_td = document.createElement('td');


                if (data['actionTaken'] === 'Completed') {
//            $(action_td).append('<a href="javascript:void(0)" class="viewFullComplaintDetails"> <i class="bi bi-eye" style="font-size:20px; color:blue;"></i></a><a href="javascript:void(0)" class="reOpenComplaint" > <i class="bi bi-arrow-repeat" style="font-size:20px; color:orange;"></i></a>');


                    $(row).find('td').eq(3).html('<label class="badge rounded-pill bg-success" style="font-size:15px">Completed</label>');
                } else if (data['actionTaken'] === 'Incomplete') {
//            $(action_td).append('<a href="javascript:void(0)" class="viewFullComplaintDetails"><i class="bi bi-eye" style="font-size:20px; color:blue"></i></a><a href="javascript:void(0)" id=""><i class="bi bi-pencil-square" style="font-size:20px; margin-left:10px; color:green"></i></a>');

                    $(row).find('td').eq(3).html('<label class="badge rounded-pill bg-danger" style="font-size:15px">Re-Open</label>');
                } else if (data['actionTaken'] === 'Queue') {
//            $(action_td).append('<a href="javascript:void(0)" class="viewFullComplaintDetails"> <i class="bi bi-eye" style="font-size:20px; color:blue;"></i></a> <a href="javascript:void(0)" class="rejectComplaint" > <i class="bi bi-x-circle" style="font-size:20px; color:red;"></i></a>  <a href="javascript:void(0)" class="acceptComplaint"><i class="bi bi-check-circle" style="font-size:20px; color:green"></i></a>');

                    $(row).find('td').eq(3).html('<label class="badge rounded-pill bg-danger" style="font-size:15px">Queue</label>');


                } else if (data['actionTaken'] === 'Progress') {
//            $(action_td).append('<a href="javascript:void(0)" class="viewFullComplaintDetails"><i class="bi bi-eye" style="font-size:20px; color:blue"></i></a><a href="javascript:void(0)" class="editAssignComplaint"><i class="bi bi-pencil-square" style="font-size:20px; margin-left:10px; color:green"></i></a>');

                    $(row).find('td').eq(3).html('<label class="badge rounded-pill bg-danger" style="font-size:15px">Progress</label>');

                } else {
//            $(action_td).append('<a href="javascript:void(0)" class="viewFullComplaintDetails"><i class="bi bi-eye" style="font-size:20px; color:blue"></i></a><a href="javascript:void(0)" class="reOpenComplaint" ><i class="bi bi-arrow-repeat" style="font-size:20px; margin-left:10px; color:orange"></i></a>');

                    $(row).find('td').eq(3).html('<label class="badge rounded-pill bg-danger" style="font-size:15px">Rejected</label>');
                }


                if (data['status'] === 'active' && data['status_repeat'] === 'Reopen') {



                    $(row).find('td').eq(4).html('<label class="badge bg-primary" style="font-size:15px;">Active <i class="bi bi-reply-fill"></label>');


                } else if (data['status'] === 'Deactive' && data['status_repeat'] === 'Reopen') {


                    $(row).find('td').eq(4).html('<label class="badge bg-primary" style="font-size:15px">Deactive <i class="bi bi-reply-fill"></label>');





                } else if (data['status'] === 'active') {


                    $(row).find('td').eq(4).html('<label class="badge bg-primary" style="font-size:15px">Deactive</label>');



                } else if (data['status'] === 'Deactive') {


                    $(row).find('td').eq(4).html('<label class="badge bg-primary" style="font-size:15px">Deactive</label>');
                }



                $(row).append(action_td);

                $(row).on('mouseover', function () {
                    $(row).css({
                        'background-color': '#b5a2c4',
//                'font-weight': 'bold'
                    });


                });

                $(row).on('mouseout', function () {
                    $(row).css({
                        'background-color': '',
//                'font-weight': ''
                    });

                });

                $(row).on('click', function () {
                    var complaintId = data.complaint_id;
                    var officername = data.officerName;
                    var serialNumber = data.serial_number;







                    fetch('admin/loadComplaintDetailsLog', {
                        method: 'POST',
                        body: new URLSearchParams({
                            serialNumber: serialNumber,
                        })
                    }).then((res) => res.text()).then(function (res) {
                        if (res != null) {
                            var data = JSON.parse(res);




// Get the timeline container element
                            var timelineContainer = document.querySelector('.timelineMyComplaintProcessOnlyOwn');

// Clear the previous data in the timeline container
                            timelineContainer.innerHTML = '';

// Loop through the timeline data and create the timeline items dynamically
                            data.forEach(function (item
                                    ) {
                                document.getElementById('topicOfMyComplaintProcessOwn').innerHTML = 'Complaint No: <span style="color: red;">' + item.serial_no + '</span>';


                                function convertTo12Hour(timeString) {
                                    var timeParts = timeString.split(':');
                                    var hour = parseInt(timeParts[0], 10);
                                    var minute = timeParts[1];
                                    var period = hour >= 12 ? 'PM' : 'AM';

                                    // Convert hour to 12-hour format
                                    hour = hour % 12;
                                    hour = hour ? hour : 12;

                                    return hour + ':' + minute + ' ' + period;
                                }



                                // Create a new timeline item
                                var tlItem = document.createElement('div');
                                tlItem.classList.add('tl-item');

                                // Create the timeline dot element
                                var tlDot = document.createElement('div');
//  tlDot.classList.add('tl-dot');

                                // Set the appropriate color for the timeline dot


                                // Create the timeline image element
                                var tlImage = document.createElement('img');
                                tlImage.src = 'assets/img/messages-2.jpg';
                                tlImage.alt = 'Image';
                                tlImage.classList.add('timeline-image');

                                // Append the image to the dot element
                                tlDot.appendChild(tlImage);

                                // Create the timeline time element
                                var tlTime = document.createElement('div');
                                tlTime.classList.add('tl-time');
                                tlTime.textContent = " " + convertTo12Hour(item.time) + " ";


                                // Append the time to the dot element
                                tlDot.appendChild(tlTime);

                                // Create the timeline content
                                var tlContent = document.createElement('div');
                                tlContent.classList.add('tl-content');

                                // Set the content of the timeline item
                                tlContent.innerHTML = '<div>' + item.status_detail + '</div>' +
                                        '<div class="tl-date text-muted mt-1">Age - ' + item.age + '</div>' +
                                        '<div class="tl-date text-muted mt-1">Updated - ' + item.date + ' (' + item.time + ')</div>' +
                                        '<div class="tl-date text-muted mt-1"' + (item.status_type === '11' ? '   style=" color:red !important; font-size:17px; font-weight:900; " ' : '') + '>' + (item.status_type === '11' ? 'Comment - ' : 'Remarks - ') + '<span  style="color: #6c757d; font-size:16px; font-weight:400;">' + item.remarks + '</span></div>';


                                // Append the dot and content to the timeline item
                                tlItem.appendChild(tlDot);
                                tlItem.appendChild(tlContent);

                                // Append the timeline item to the timeline container
                                timelineContainer.appendChild(tlItem);
                            });


                            const modalAdminownComplaint = new bootstrap.Modal(document.getElementById('verticalycentered_complaint_tracking_processOnlyOwn'));
                            modalAdminownComplaint.show();

                        } else {
                            alert("data show is not success");
                        }
                    });


                });

            }

        });



    });




    $("#assignNewOfficerToComplaintOfficerMy").click(function () {
        var officer = $('#OfficerSearchFieldMy').val();
        var selectedOfficer = $('#OfficerSearchFieldMy option:selected').text();
        var officername = selectedOfficer;
        var officerID = officer;


        // Get the value of the textarea
        var addRemarkWhenAssignOfficer = document.getElementById('addRemarkWhenAssignOfficerOfficerMy').value;

        Swal.fire({
            title: 'Are you sure?',
            text: 'Will be Assigned!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, Proceed!',
            showLoaderOnConfirm: true,
            preConfirm: () => {
                return fetch('admin/assign-new-officer', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        id: complaintId,
                        officerID: officerID,
                        officername: officername,
                        additionalText: addRemarkWhenAssignOfficer,
                    }),
                })
                        .then((response) => {
                            if (!response.ok) {
                                throw new Error(response.statusText);
                            }
                            return response.json();
                        })
                        .catch((error) => {
                            Swal.showValidationMessage('Request failed: ' + error);
                        });
            },
        }).then((result) => {
            if (result.isConfirmed) {
                if (result.value.status === 'error') {
                    Swal.fire('Error!', 'Failed to reject complaint', 'error');
                } else {
                    Swal.fire('Successful!', 'This Complaint has been rejected!', 'success');
                    dtable.ajax.reload();
                    dtableViewOfficer.ajax.reload();
                }
            } else if (result.dismiss === Swal.DismissReason.cancel) {
                Swal.fire('Cancelled', 'Complaint rejection cancelled', 'info');
            }
        });
    });

});



