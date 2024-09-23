/* 
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/JSP_Servlet/JavaScript.js to edit this template
 */







var status = '';
var secondFilter = '';



$("#filterAllComplaints").click(function () {



    status = '';
    dtableView.ajax.reload();

    $('#changeTopicDataTable').text("All Complaints");
});



$("#filterCompletedComplaints").click(function () {



    status = 'Completed';

    dtableView.ajax.reload();
    $('#changeTopicDataTable').text("Completed Complaints");
});






$("#filterRejectedComplaint").click(function () {

    status = 'Rejected';
    dtableView.ajax.reload();

    $('#changeTopicDataTable').text("Rejected Complaints");


});


$("#filterProgressComplaint").click(function () {


    status = 'Progress';
    dtableView.ajax.reload();

    $('#changeTopicDataTable').text("Progress Complaints");
});


$("#filterApprovedComplaint").click(function () {


    status = 'Approved';
    dtableView.ajax.reload();

    $('#changeTopicDataTable').text("Aprrove Complaints");
});

$("#filterQueueComplaint").click(function () {


    status = 'Queue';
    dtableView.ajax.reload();

    $('#changeTopicDataTable').text("Queue Complaints");
});


$("#filterTodayComplaint").click(function () {

    status = 'today';
    dtableView.ajax.reload();

    $('#changeTopicDataTable').text("Today Complaints");
});


$("#filterThisMonthComplaint").click(function () {
    status = 'month';

    dtableView.ajax.reload();
    $('#changeTopicDataTable').text("This Month Complaints");


});

$("#filterThisYearComplaint").click(function () {
    status = 'year';
    dtableView.ajax.reload();
    $('#changeTopicDataTable').text("This Year Complaints");

});







$("#filterResetCustomeDateComplaint").click(function () {
    document.getElementById("FromDateAdminDashboard").value = '';
    document.getElementById("ToDateAdminDashboard").value = '';
});


$.fn.dataTable.ext.errMode = 'none';




var dtableView = $('#viewAllComplaintasTableNewAdminDashboard').DataTable({

    "aLengthMenu": [[10, 25, -1], [10, 25, "All"]],
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
        {data: 'officerName', className: 'text-wrap'},
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
            $(action_td).append('<a  href="javascript:void(0)" class="viewFullComplaintDetails"> <i class="bi bi-eye" style="font-size:20px; color:blue;"></i></a><a href="javascript:void(0)" class="reOpenComplaint" > <i class="bi bi-arrow-repeat" style="font-size:20px; color:orange;"></i></a>');


            $(row).find('td').eq(4).html('<label class="badge  bg-success" style="font-size:12px">Completed</label>');
        } else if (data['actionTaken'] === 'Incomplete') {
            $(action_td).append('<a href="javascript:void(0)" class="viewFullComplaintDetails"><i class="bi bi-eye" style="font-size:20px; color:blue"></i></a><a href="javascript:void(0)" id=""><i class="bi bi-pencil-square" style="font-size:20px; margin-left:10px; color:green"></i></a>');

            $(row).find('td').eq(4).html('<label class="badge rounded-pill bg-danger" style="font-size:12px">Re-Open</label>');
        } else if (data['actionTaken'] === 'Queue') {
            $(action_td).append('<a href="javascript:void(0)" class="viewFullComplaintDetails"> <i class="bi bi-eye" style="font-size:20px; color:blue;"></i></a> <a href="javascript:void(0)" class="rejectComplaint" > <i class="bi bi-x-circle" style="font-size:20px; color:red;"></i></a>  <a href="javascript:void(0)" class="acceptComplaint"><i class="bi bi-check-circle" style="font-size:20px; color:green"></i></a>');

            $(row).find('td').eq(4).html('<label class="badge bg-info text-dark" style="font-size:12px">Queue</label>');


        } else if (data['actionTaken'] === 'Progress') {
            $(action_td).append('<a href="javascript:void(0)" class="viewFullComplaintDetails"><i class="bi bi-eye" style="font-size:20px; color:blue"></i></a><a href="javascript:void(0)" class="editAssignComplaint"><i class="bi bi-person-plus" style="font-size:20px; margin-left:10px; color:green"></i></a> <a href="javascript:void(0)" class="completedComplantByAdmin"> <i class="bi bi-hand-thumbs-up" style="font-size:20px; color:blue;"></i></a>');

            $(row).find('td').eq(4).html('<label class="badge bg-warning text-dark" style="font-size:12px;">Progress</label>');

        } else if (data['actionTaken'] === 'GetApproved') {
            $(action_td).append('<a href="javascript:void(0)" class="viewFullComplaintDetails"><i class="bi bi-eye" style="font-size:20px; color:blue"></i></a> <a href="javascript:void(0)" class="rejectComplaint" > <i class="bi bi-x-circle" style="font-size:20px; color:red;"></i></a> <a href="javascript:void(0)" class="editAssignComplaint"><i class="bi bi-person-plus" style="font-size:20px; margin-left:10px; color:green"></i></a> <a href="javascript:void(0)" class="completedComplantByAdmin"> <i class="bi bi-hand-thumbs-up" style="font-size:20px; color:blue;"></i></a>');

            $(row).find('td').eq(4).html('<label class="badge bg-primary" style="font-size:12px">GetApproved</label>');
        } else if (data['actionTaken'] === 'Rejected') {
            $(action_td).append('<a href="javascript:void(0)" class="viewFullComplaintDetails"><i class="bi bi-eye" style="font-size:20px; color:blue"></i></a><a href="javascript:void(0)" class="reOpenComplaint" ><i class="bi bi-arrow-repeat" style="font-size:20px; margin-left:10px; color:orange"></i></a>');

            $(row).find('td').eq(4).html('<label class="badge bg-danger" style="font-size:12px">Rejected</label>');
        }


        if (data['status'] === 'active' && data['status_repeat'] === 'Reopen') {



            $(row).find('td').eq(5).html('<label class="badge bg-primary" style="font-size:12px; background-color:#84649c !important;">Active </label>  <i class="bi bi-repeat" style="color:black; font-size: 20px; font-weight:bold;">');


        } else if (data['status'] === 'Deactive' && data['status_repeat'] === 'Reopen') {


            $(row).find('td').eq(5).html('<label class="badge bg-primary" style="font-size:12px; background-color:#84649c !important;">Deactive </label>  <i class="bi bi-repeat" style="color:black; font-size: 20px;">');





        } else if (data['status'] === 'active') {


            $(row).find('td').eq(5).html('<label class="badge bg-primary" style="font-size:12px; background-color:#84649c !important;">Active</label>');



        } else if (data['status'] === 'Deactive') {


            $(row).find('td').eq(5).html('<label class="badge bg-primary" style="font-size:12px; background-color:#84649c !important;">Deactive</label>');
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




    }
}



);





//$('#viewAllComplaintasTableNewAdminDashboard').on('click', '#viewFullComplaintDetails', function () {
//    var data = dtable.row($(this).closest('tr')).data(); // Get the row data from the DataTable
//    var complaintId = data.complaint_id;
//    alert(complaintId);
//});







$('#viewAllComplaintasTableNewAdminDashboard').on('click', '.viewFullComplaintDetails', function () {



    var data = dtableView.row($(this).closest('tr')).data(); // Get the row data from the DataTable
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
                        tlDot.classList.add('tl-dot');

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
                                '<div class="tl-date text-muted mt-1">Remarks - ' + item.remarks + '</div>';


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









            const modal = new bootstrap.Modal(document.getElementById('ExtralargeModalViewComplaint'));
            modal.show();
        } else {

            alert("data show is not success");
        }
    });

});



$('#viewAllComplaintasTableNewAdminDashboard').on('click', '.rejectComplaint', function () {
    var data = dtableView.row($(this).closest('tr')).data(); // Get the row data from the DataTable
    var complaintId = data.complaint_id;
    var officername = data.officerName;
    var serialNumber = data.serial_number;

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
            return Swal.fire({
                title: 'Why is the request rejected?',
                input: 'text',
                inputPlaceholder: 'Type the reason',
                showCancelButton: true,
                confirmButtonText: 'Confirm',
                showLoaderOnConfirm: true,
                preConfirm: (additionalText) => {
                    return fetch('admin/reject-complaint', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            id: complaintId,
                            additionalText: additionalText
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
                        Swal.fire('Error!', 'Failed to reject complaint', 'error');
                    } else {
                        Swal.fire('Successful!', 'This Complaint has been rejected!', 'success');
                        dtable.ajax.reload();
                    }
                } else if (result.dismiss === Swal.DismissReason.cancel) {
                    Swal.fire('Cancelled', 'Complaint rejection cancelled', 'info');
                }
            });




        },
        allowOutsideClick: () => !Swal.isLoading()
    })
});







$('#viewAllComplaintasTableNewAdminDashboard').on('click', '.acceptComplaint', function () {
    var data = dtableView.row($(this).closest('tr')).data(); // Get the row data from the DataTable
    var complaintId = data.complaint_id;
    var officername = data.officerName;
    var serialNumber = data.serial_number;

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
            return Swal.fire({
                title: 'Why is the request rejected?',
                input: 'text',
                inputPlaceholder: 'Type the reason',
                showCancelButton: true,
                confirmButtonText: 'Confirm',
                showLoaderOnConfirm: true,
                preConfirm: (additionalText) => {
                    return fetch('admin/accept-complaint', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            id: complaintId,
                            additionalText: additionalText
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
                        Swal.fire('Error!', 'Failed to reject complaint', 'error');
                    } else {
                        Swal.fire('Successful!', 'This Complaint has been rejected!', 'success');
                        dtable.ajax.reload();
                    }
                } else if (result.dismiss === Swal.DismissReason.cancel) {
                    Swal.fire('Cancelled', 'Complaint rejection cancelled', 'info');
                }
            });




        },
        allowOutsideClick: () => !Swal.isLoading()
    })
});













$('#viewAllComplaintasTableNewAdminDashboard').on('click', '.reOpenComplaint', function () {
    var data = dtableView.row($(this).closest('tr')).data(); // Get the row data from the DataTable
    var complaintId = data.complaint_id;
    var officername = data.officerName;
    var serialNumber = data.serial_number;

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
            return Swal.fire({
                title: 'Why is the complaint reopened?',
                input: 'text',
                inputPlaceholder: 'Type the reason',
                showCancelButton: true,
                confirmButtonText: 'Confirm',
                showLoaderOnConfirm: true,
                preConfirm: (additionalText) => {
                    return fetch('admin/reopen-complaint', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            id: complaintId,
                            additionalText: additionalText
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
                        Swal.fire('Error!', 'Failed to reopen complaint', 'error');
                    } else {
                        Swal.fire('Successful!', 'This Complaint has been reopened!', 'success');
                        dtable.ajax.reload();
                    }
                } else if (result.dismiss === Swal.DismissReason.cancel) {
                    Swal.fire('Cancelled', 'Complaint reopening cancelled', 'info');
                }
            });




        },
        allowOutsideClick: () => !Swal.isLoading()
    })
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


});















$('#viewAllComplaintasTableNewAdminDashboard').on('click', '.editAssignComplaint', function () {



    var data = dtableView.row($(this).closest('tr')).data(); // Get the row data from the DataTable
    var complaintId = data.complaint_id;
    var serialNumber = data.serial_number;


    alert(serialNumber);


    // Get the modal element
    var modal = $('#verticalycentered_complete_assign');
    modal.modal('show');




});




$("#assignNewOfficerToComplaint").click(function () {
    var officer = $('.OfficerSearchField').val();
    var selectedOfficer = $('.OfficerSearchField option:selected').text();
    var officername = selectedOfficer;
    var officerID = officer;
    alert(officerID);

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
//                dtable.ajax.reload();
            }
        } else if (result.dismiss === Swal.DismissReason.cancel) {
            Swal.fire('Cancelled', 'Complaint rejection cancelled', 'info');
        }
    });
});





$('#viewAllComplaintasTableNewAdminDashboard').on('click', '.completedComplantByAdmin', function () {

    var data = dtableView.row($(this).closest('tr')).data(); // Get the row data from the DataTable
    var complaintId = data.complaint_id;
    var officername = data.officerName;
    var serialNumber = data.serial_number;




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
                        Swal.fire('Error!', 'Failed to complete complaint', 'error');
                    } else {
                        Swal.fire('Successful!', 'This Complaint has been Completed!', 'success');
                        dtable.ajax.reload();
                    }
                } else if (result.dismiss === Swal.DismissReason.cancel) {
                    Swal.fire('Cancelled', 'Complaint completion cancelled', 'info');
                }
            });
        },
        allowOutsideClick: () => !Swal.isLoading(),
    });





});

























//this code is to show officer own complaints


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
        "url": "table-data-officerOwnComplaintData",
        "contentType": "application/json",
        "type": "POST",
        "data": function (d) {
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
                        tlDot.classList.add('tl-dot');

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
                                '<div class="tl-date text-muted mt-1">Remarks - ' + item.remarks + '</div>';


                        // Append the dot and content to the timeline item
                        tlItem.appendChild(tlDot);
                        tlItem.appendChild(tlContent);

                        // Append the timeline item to the timeline container
                        timelineContainer.appendChild(tlItem);
                    });




                    const modal = new bootstrap.Modal(document.getElementById('verticalycentered_complaint_tracking_processOnly'));
                    modal.show();
                } else {
                    alert("data show is not success");
                }
            });


        });

    }
}



);















$(document).ready(function () {
    // Disable the search button initially
    $('#SearchFilterCustomeDateComplaintDashboard').prop('disabled', true);

    // Function to check if both date fields are filled
    function checkDateFieldsDashboard() {
        var fromDate = document.getElementById("FromDateAdminDashboardDashboard").value;
        var toDate = document.getElementById("ToDateAdminDashboardDashboard").value;

        if (fromDate && toDate) {
            // Enable the search button
            $('#SearchFilterCustomeDateComplaintDashboard').prop('disabled', false);
        } else {
            // Disable the search button
            $('#SearchFilterCustomeDateComplaintDashboard').prop('disabled', true);
        }
    }

    // Add event listener to the date fields
    $('#FromDateAdminDashboardDashboard, #ToDateAdminDashboardDashboard').change(function () {
        checkDateFieldsDashboard();
    });



});






//these code is for own officer function

var status = '';
var secondFilter = '';



$("#filterAllComplaintsOfficer").click(function () {



    status = '';
    dtableViewOfficer.ajax.reload();

    $('#changeTopicDataTableOfficer').text("All Complaints");
});



$("#filterCompletedComplaintsOfficer").click(function () {



    status = 'Completed';

    dtableViewOfficer.ajax.reload();
    $('#changeTopicDataTableOfficer').text("Completed Complaints");
});






$("#filterRejectedComplaintOfficer").click(function () {

    status = 'Rejected';
    dtableViewOfficer.ajax.reload();

    $('#changeTopicDataTableOfficer').text("Rejected Complaints");


});


$("#filterProgressComplaintOfficer").click(function () {


    status = 'Progress';
    dtableViewOfficer.ajax.reload();

    $('#changeTopicDataTableOfficer').text("Progress Complaints");
});


$("#filterApprovedComplaintOfficer").click(function () {


    status = 'Approved';
    dtableViewOfficer.ajax.reload();

    $('#changeTopicDataTableOfficer').text("Aprrove Complaints");
});

$("#filterQueueComplaintOfficer").click(function () {


    status = 'Queue';
    dtableViewOfficer.ajax.reload();

    $('#changeTopicDataTableOfficer').text("Queue Complaints");
});


$("#filterTodayComplaintOfficer").click(function () {

    status = 'today';
    dtableViewOfficer.ajax.reload();

    $('#changeTopicDataTableOfficer').text("Today Complaints");
});


$("#filterThisMonthComplaintOfficer").click(function () {
    status = 'month';

    dtableViewOfficer.ajax.reload();
    $('#changeTopicDataTableOfficer').text("This Month Complaints");


});

$("#filterThisYearComplaintOfficer").click(function () {
    status = 'year';
    dtableViewOfficer.ajax.reload();
    $('#changeTopicDataTableOfficer').text("This Year Complaints");

});







$("#filterResetCustomeDateComplaintOfficer").click(function () {
    document.getElementById("FromDateAdminDashboard").value = '';
    document.getElementById("ToDateAdminDashboard").value = '';
});


$.fn.dataTable.ext.errMode = 'none';




var dtableViewOfficer = $('#viewMyComplaintasTableNewAdminDashboard').DataTable({

    "aLengthMenu": [[10, 25, -1], [10, 25, "All"]],
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
        {data: 'officerName', className: 'text-wrap'},
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
            $(action_td).append('<a  href="javascript:void(0)" class="viewFullComplaintDetails"> <i class="bi bi-eye" style="font-size:20px; color:blue;"></i></a><a href="javascript:void(0)" class="reOpenComplaint" > <i class="bi bi-arrow-repeat" style="font-size:20px; color:orange;"></i></a>');


            $(row).find('td').eq(4).html('<label class="badge  bg-success" style="font-size:12px">Completed</label>');
        } else if (data['actionTaken'] === 'Incomplete') {
            $(action_td).append('<a href="javascript:void(0)" class="viewFullComplaintDetails"><i class="bi bi-eye" style="font-size:20px; color:blue"></i></a><a href="javascript:void(0)" id=""><i class="bi bi-pencil-square" style="font-size:20px; margin-left:10px; color:green"></i></a>');

            $(row).find('td').eq(4).html('<label class="badge rounded-pill bg-danger" style="font-size:12px">Re-Open</label>');
        } else if (data['actionTaken'] === 'Queue') {
            $(action_td).append('<a href="javascript:void(0)" class="viewFullComplaintDetails"> <i class="bi bi-eye" style="font-size:20px; color:blue;"></i></a> <a href="javascript:void(0)" class="rejectComplaint" > <i class="bi bi-x-circle" style="font-size:20px; color:red;"></i></a>  <a href="javascript:void(0)" class="acceptComplaint"><i class="bi bi-check-circle" style="font-size:20px; color:green"></i></a>');

            $(row).find('td').eq(4).html('<label class="badge bg-info text-dark" style="font-size:12px">Queue</label>');


        } else if (data['actionTaken'] === 'Progress') {
            $(action_td).append('<a href="javascript:void(0)" class="viewFullComplaintDetails"><i class="bi bi-eye" style="font-size:20px; color:blue"></i></a><a href="javascript:void(0)" class="editAssignComplaint"><i class="bi bi-person-plus" style="font-size:20px; margin-left:10px; color:green"></i></a> <a href="javascript:void(0)" class="completedComplantByAdmin"> <i class="bi bi-hand-thumbs-up" style="font-size:20px; color:blue;"></i></a>');

            $(row).find('td').eq(4).html('<label class="badge bg-warning text-dark" style="font-size:12px;">Progress</label>');

        } else if (data['actionTaken'] === 'GetApproved') {
            $(action_td).append('<a href="javascript:void(0)" class="viewFullComplaintDetails"><i class="bi bi-eye" style="font-size:20px; color:blue"></i></a> <a href="javascript:void(0)" class="rejectComplaint" > <i class="bi bi-x-circle" style="font-size:20px; color:red;"></i></a> <a href="javascript:void(0)" class="editAssignComplaint"><i class="bi bi-person-plus" style="font-size:20px; margin-left:10px; color:green"></i></a> <a href="javascript:void(0)" class="completedComplantByAdmin"> <i class="bi bi-hand-thumbs-up" style="font-size:20px; color:blue;"></i></a>');

            $(row).find('td').eq(4).html('<label class="badge bg-primary" style="font-size:12px">GetApproved</label>');
        } else if (data['actionTaken'] === 'Rejected') {
            $(action_td).append('<a href="javascript:void(0)" class="viewFullComplaintDetails"><i class="bi bi-eye" style="font-size:20px; color:blue"></i></a><a href="javascript:void(0)" class="reOpenComplaint" ><i class="bi bi-arrow-repeat" style="font-size:20px; margin-left:10px; color:orange"></i></a>');

            $(row).find('td').eq(4).html('<label class="badge bg-danger" style="font-size:12px">Rejected</label>');
        }


        if (data['status'] === 'active' && data['status_repeat'] === 'Reopen') {



            $(row).find('td').eq(5).html('<label class="badge bg-primary" style="font-size:12px; background-color:#84649c !important;">Active </label>  <i class="bi bi-repeat" style="color:black; font-size: 20px; font-weight:bold;">');


        } else if (data['status'] === 'Deactive' && data['status_repeat'] === 'Reopen') {


            $(row).find('td').eq(5).html('<label class="badge bg-primary" style="font-size:12px; background-color:#84649c !important;">Deactive </label>  <i class="bi bi-repeat" style="color:black; font-size: 20px;">');





        } else if (data['status'] === 'active') {


            $(row).find('td').eq(5).html('<label class="badge bg-primary" style="font-size:12px; background-color:#84649c !important;">Active</label>');



        } else if (data['status'] === 'Deactive') {


            $(row).find('td').eq(5).html('<label class="badge bg-primary" style="font-size:12px; background-color:#84649c !important;">Deactive</label>');
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




    }
}



);





$('#viewMyComplaintasTableNewAdminDashboard').on('click', '.viewFullComplaintDetails', function () {



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


            $('#customer_name_previewOfficer').text(nameValue);
            $('#customer_nic_previewOfficer').text(nic);
            $('#customer_code_previewOfficer').text(customer_id);
            $('#customer_email_previewOfficer').text(customerEmail);
            $('#customer_landline_previewOfficer').text(customerLandLine);
            $('#customer_mobile_previewOfficer').text(customerMobile);
            $('#customer_address_previewOfficer').text(customerAddress);
            $('#customer_other_previewOfficer').text(customerOtherInfor);



            $('#officer_department_previewOfficer').text(department);
            $('#officer_id_previewOfficer').text(officer_id);
            $('#officer_branch_previewOfficer').text(branch);
            $('#officer_name_previewOfficer').text(officerName);



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
                        tlDot.classList.add('tl-dot');

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
                                '<div class="tl-date text-muted mt-1">Remarks - ' + item.remarks + '</div>';


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



$('#viewMyComplaintasTableNewAdminDashboard').on('click', '.rejectComplaint', function () {
    var data = dtableViewOfficer.row($(this).closest('tr')).data(); // Get the row data from the DataTable
    var complaintId = data.complaint_id;
    var officername = data.officerName;
    var serialNumber = data.serial_number;

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
            return Swal.fire({
                title: 'Why is the request rejected?',
                input: 'text',
                inputPlaceholder: 'Type the reason',
                showCancelButton: true,
                confirmButtonText: 'Confirm',
                showLoaderOnConfirm: true,
                preConfirm: (additionalText) => {
                    return fetch('admin/reject-complaint', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            id: complaintId,
                            additionalText: additionalText
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
                        Swal.fire('Error!', 'Failed to reject complaint', 'error');
                    } else {
                        Swal.fire('Successful!', 'This Complaint has been rejected!', 'success');
                        dtable.ajax.reload();
                    }
                } else if (result.dismiss === Swal.DismissReason.cancel) {
                    Swal.fire('Cancelled', 'Complaint rejection cancelled', 'info');
                }
            });




        },
        allowOutsideClick: () => !Swal.isLoading()
    })
});







$('#viewMyComplaintasTableNewAdminDashboard').on('click', '.acceptComplaint', function () {
    var data = dtableViewOfficer.row($(this).closest('tr')).data(); // Get the row data from the DataTable
    var complaintId = data.complaint_id;
    var officername = data.officerName;
    var serialNumber = data.serial_number;

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
            return Swal.fire({
                title: 'Why is the request rejected?',
                input: 'text',
                inputPlaceholder: 'Type the reason',
                showCancelButton: true,
                confirmButtonText: 'Confirm',
                showLoaderOnConfirm: true,
                preConfirm: (additionalText) => {
                    return fetch('admin/accept-complaint', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            id: complaintId,
                            additionalText: additionalText
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
                        Swal.fire('Error!', 'Failed to reject complaint', 'error');
                    } else {
                        Swal.fire('Successful!', 'This Complaint has been rejected!', 'success');
                        dtable.ajax.reload();
                    }
                } else if (result.dismiss === Swal.DismissReason.cancel) {
                    Swal.fire('Cancelled', 'Complaint rejection cancelled', 'info');
                }
            });




        },
        allowOutsideClick: () => !Swal.isLoading()
    })
});













$('#viewMyComplaintasTableNewAdminDashboard').on('click', '.reOpenComplaint', function () {
    var data = dtableViewOfficer.row($(this).closest('tr')).data(); // Get the row data from the DataTable
    var complaintId = data.complaint_id;
    var officername = data.officerName;
    var serialNumber = data.serial_number;

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
            return Swal.fire({
                title: 'Why is the complaint reopened?',
                input: 'text',
                inputPlaceholder: 'Type the reason',
                showCancelButton: true,
                confirmButtonText: 'Confirm',
                showLoaderOnConfirm: true,
                preConfirm: (additionalText) => {
                    return fetch('admin/reopen-complaint', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            id: complaintId,
                            additionalText: additionalText
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
                        Swal.fire('Error!', 'Failed to reopen complaint', 'error');
                    } else {
                        Swal.fire('Successful!', 'This Complaint has been reopened!', 'success');
                        dtable.ajax.reload();
                    }
                } else if (result.dismiss === Swal.DismissReason.cancel) {
                    Swal.fire('Cancelled', 'Complaint reopening cancelled', 'info');
                }
            });




        },
        allowOutsideClick: () => !Swal.isLoading()
    })
});





































$('#viewMyComplaintasTableNewAdminDashboard').on('click', '.editAssignComplaint', function () {





    var data = dtableViewOfficer.row($(this).closest('tr')).data(); // Get the row data from the DataTable
    var complaintId = data.complaint_id;
    var serialNumber = data.serial_number;


    alert("serialNumber");


    // Get the modal element
    var modal = $('#verticalycentered_complete_assignOfficer1');
    modal.modal('show');




    $("#assignNewOfficerToComplaintOfficer").click(function () {


        var officer = $('#OfficerSearchFieldAllComplaint').val();
        var selectedOfficer = $('#OfficerSearchFieldAllComplaint option:selected').text();
        var officername = selectedOfficer;
        var officerID = officer;


// Get the value of the textarea
        var addRemarkWhenAssignOfficer = document.getElementById('addRemarkWhenAssignOfficerOfficer').value;


        alert(addRemarkWhenAssignOfficer);


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
                }
            } else if (result.dismiss === Swal.DismissReason.cancel) {
                Swal.fire('Cancelled', 'Complaint rejection cancelled', 'info');
            }
        });
















    });


});





$('#viewMyComplaintasTableNewAdminDashboard').on('click', '.completedComplantByAdmin', function () {

    var data = dtableViewOfficer.row($(this).closest('tr')).data(); // Get the row data from the DataTable
    var complaintId = data.complaint_id;
    var officername = data.officerName;
    var serialNumber = data.serial_number;




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
                        Swal.fire('Error!', 'Failed to complete complaint', 'error');
                    } else {
                        Swal.fire('Successful!', 'This Complaint has been Completed!', 'success');
                        dtable.ajax.reload();
                    }
                } else if (result.dismiss === Swal.DismissReason.cancel) {
                    Swal.fire('Cancelled', 'Complaint completion cancelled', 'info');
                }
            });
        },
        allowOutsideClick: () => !Swal.isLoading(),
    });





});













