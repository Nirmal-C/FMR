/* 
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/JSP_Servlet/JavaScript.js to edit this template
 */














//this code for slim select and search and fill data for the customer input field from database

//
//  var users = new SlimSelect({
//                        select: '#users',
//                        placeholder: "User List",
//                        ajax: function (search, callback) {
//                            fetch('user/search-users', {
//                                method: 'POST',
//                                body: new URLSearchParams({search: search || ''})
//                            }).then(res => res.json()).then((data) => {
//                                callback(data);
//                            });
//                        },
//                        allowDeselect: true,
//                        deselectLabel: '<span class="red">✖</span>'
//                    });
//                    $('#users').data('select', users);
//
//






//  var customerLoad = new SlimSelect({
//                        select: '#customerSearchField',
//                        placeholder: "User List",
//                        ajax: function (search, callback) {
//                            fetch('search-customer', {
//                                method: 'POST',
//                                body: new URLSearchParams({search: search || ''})
//                            }).then(res => res.json()).then((data) => {
//                                callback(data);
//                            });
//                        },
//                        allowDeselect: true,
//                        deselectLabel: '<span>&#10006</span>'
//                    });
//                    $('#customerSearchField').data('select', customerLoad);






var customerLoad = new SlimSelect({
    select: '#customerSearchField',
    placeholder: "User List",
    ajax: function (search, callback) {
        fetch('search-customer', {
            method: 'POST',
            body: new URLSearchParams({search: search || ''})
        }).then(res => res.json()).then((data) => {
            callback(data, data);
        });
    },
    allowDeselect: true,
    deselectLabel: '<span>&#10006</span>',
});






$(document).ready(function () {
    $('#customerSearchField').data('select', customerLoad);



});



//let customerLoad = new SlimSelect({
//    select: '#customerSearchField',
//    placeholder: "User List",
//    ajax: function (search, callback) {
//        fetch('search-customer?search=' + search).then((resp) => resp.json()).then((resp) => {
//
//            callback(resp);
//
//        });
//    },
//    allowDeselect: true,
//    deselectLabel: '<span class="red">✖</span>'
//});
//// $('#customerSearchField').data('select', customerLoad);





//this code is to hide the customer 

//
//$(document).on('click', '#clickoffieerche', function () {
//          $("#part4").toggle();
//    if ($("#part4").is(":visible")) {
//      $("#part3").removeClass("col-md-12").addClass("col-md-6");
//    } else {
//      $("#part3").removeClass("col-md-6").addClass("col-md-12");
//    }
//});





$('#customerSearchField').change(function () {



    $("#part2").toggle();
    if ($("#part2").is(":visible")) {
        $("#part1").removeClass("col-md-12").addClass("col-md-4");
    } else {
        $("#part1").removeClass("col-md-4").addClass("col-md-12");
    }



    const searchFieldValue = $(this).val();

    $('#customerIDForFilterComplaint').val(searchFieldValue);


    if (!searchFieldValue) {
        return;
    }

    fetch('filed_customer_details', {
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
                        
                        $('#cusidForSearch').val(item.id);
                        $('#customerLandLine').val(item.customerLandLine);
                        $('#customerName').val(item.customerName);
                        $('#customerEmail').val(item.customerEmail);
                        $('#customerMobile').val(item.customerMobile);
                        $('#customerOtherInfor').val(item.customerOtherInfor);
                        $('#customerAddress').val(item.customerAddress);
                        $('#customerId').val(item.nic);



var customerCode = document.getElementById("customerSearchField").value;

$('#customer_code_previewOrginal').text(customerCode);
                        $('#customer_name_preview').text(item.customerName);
                        $('#customer_nic_preview').text(item.nic);
                        $('#customer_code_preview').text(item.id);
                        $('#customer_email_preview').text(item.customerEmail);
                        $('#customer_landline_preview').text(item.customerLandLine);
                        $('#customer_mobile_preview').text(item.customerMobile);
                        $('#customer_address_preview').text(item.customerAddress);
                        $('#customer_other_preview').text(item.customerOtherInfor);


                        $('#customer_code_customerView').text(item.id);
                        $('#cutomer_name_customerView').text(item.customerName);
                        $('#customer_nic_customerView').text(item.nic);
                        $('#customer_address_customerView').text(item.customerAddress);







                    });
                }
            })
            .catch((error) => console.error(error));








//get customer complaint and see the complaint details



    $.fn.dataTable.ext.errMode = 'none';


    var status = "";
    var secondFilter = "";

    var dtable = $('#viewCustomerOwnComplaint').DataTable({

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
            "url": "table-data-allCustomerComplaintinAddComplaintPage",
            "contentType": "application/json",
            "type": "POST",
            "data": function (d) {
                d.data1 = status;
                d.data2 = secondFilter;
                d.data3 = searchFieldValue;
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
            {"data": "customer", className: "text-wrap", visible: false},
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
            {"data": "branch", className: "text-wrap", visible: false},
            {"data": "department", className: "text-wrap", visible: false},
        ],
        "createdRow": function (row, data) {
            let action_td = document.createElement('td');


            if (data['actionTaken'] === 'Completed') {
//            $(action_td).append('<a href="javascript:void(0)" class="viewFullComplaintDetails"> <i class="bi bi-eye" style="font-size:20px; color:blue;"></i></a><a href="javascript:void(0)" class="reOpenComplaint" > <i class="bi bi-arrow-repeat" style="font-size:20px; color:orange;"></i></a>');


                $(row).find('td').eq(3).html('<label class="badge  bg-success" style="font-size:11px">Completed</label>');
            } else if (data['actionTaken'] === 'Incomplete') {
//            $(action_td).append('<a href="javascript:void(0)" class="viewFullComplaintDetails"><i class="bi bi-eye" style="font-size:20px; color:blue"></i></a><a href="javascript:void(0)" id=""><i class="bi bi-pencil-square" style="font-size:20px; margin-left:10px; color:green"></i></a>');

                $(row).find('td').eq(3).html('<label class="badge rounded-pill bg-danger" style="font-size:11px">Re-Open</label>');
            } else if (data['actionTaken'] === 'Queue') {
//            $(action_td).append('<a href="javascript:void(0)" class="viewFullComplaintDetails"> <i class="bi bi-eye" style="font-size:20px; color:blue;"></i></a> <a href="javascript:void(0)" class="rejectComplaint" > <i class="bi bi-x-circle" style="font-size:20px; color:red;"></i></a>  <a href="javascript:void(0)" class="acceptComplaint"><i class="bi bi-check-circle" style="font-size:20px; color:green"></i></a>');

                $(row).find('td').eq(3).html('<label class="badge bg-info text-dark" style="font-size:11px">Queue</label>');


            } else if (data['actionTaken'] === 'Progress') {
//            $(action_td).append('<a href="javascript:void(0)" class="viewFullComplaintDetails"><i class="bi bi-eye" style="font-size:20px; color:blue"></i></a><a href="javascript:void(0)" class="editAssignComplaint"><i class="bi bi-pencil-square" style="font-size:20px; margin-left:10px; color:green"></i></a>');

                $(row).find('td').eq(3).html('<label class="badge bg-warning text-dark" style="font-size:11px;">Progress</label>');

            } else if (data['actionTaken'] === 'GetApproved') {
//            $(action_td).append('<a href="javascript:void(0)" class="viewFullComplaintDetails"><i class="bi bi-eye" style="font-size:20px; color:blue"></i></a><a href="javascript:void(0)" class="reOpenComplaint" ><i class="bi bi-arrow-repeat" style="font-size:20px; margin-left:10px; color:orange"></i></a>');

                $(row).find('td').eq(3).html('<label class="badge bg-primary" style="font-size:11px">GetApproved</label>');
            } else if (data['actionTaken'] === 'Rejected') {
//            $(action_td).append('<a href="javascript:void(0)" class="viewFullComplaintDetails"><i class="bi bi-eye" style="font-size:20px; color:blue"></i></a><a href="javascript:void(0)" class="reOpenComplaint" ><i class="bi bi-arrow-repeat" style="font-size:20px; margin-left:10px; color:orange"></i></a>');

                $(row).find('td').eq(3).html('<label class="badge bg-danger" style="font-size:11px">Rejected</label>');
            }


            if (data['status'] === 'active' && data['status_repeat'] === 'Reopen') {



                $(row).find('td').eq(4).html('<label class="badge bg-primary" style="font-size:11px; background-color:#84649c !important;">Active </label>  <i class="bi bi-reply-fill" style="color:black;">');


            } else if (data['status'] === 'Deactive' && data['status_repeat'] === 'Reopen') {


                $(row).find('td').eq(4).html('<label class="badge bg-primary" style="font-size:11px; background-color:#84649c !important;">Deactive </label>  <i class="bi bi-reply-fill" style="color:black;">');





            } else if (data['status'] === 'active') {


                $(row).find('td').eq(4).html('<label class="badge bg-primary" style="font-size:11px; background-color:#84649c !important;">Active</label>');



            } else if (data['status'] === 'Deactive') {


                $(row).find('td').eq(4).html('<label class="badge bg-primary" style="font-size:11px; background-color:#84649c !important;">Deactive</label>');
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
                var data = dtable.row($(this).closest('tr')).data(); // Get the row data from the DataTable
                var complaintId = data.complaint_id;
                var officername = data.officerName;
                var serialNumber = data.serial_number;
             





                var officerName = data.officerName;
                var officer_id = data.relaventOfficerId;
                var department = data.department;
                var branch = data.branch;


                var complaintType = data.complaintType;
                var complaint_id = data.complaint_id;
                var productType = data.productType;
                var complaintCateogry = data.complaintCategory;
                var actionTaken = data.actionTaken;
                var compaintFieldDate = data.compaintFieldDate;
                var jobComplitionDate = data.jobComplitionDate;
                var complitionTime = data.complitionTime;
                var agreementNumber = data.agreementNumber;
                var vehicleNumber = data.vehicleNumber;
                var senario = data.senario;
                var remarks = data.remarks;

                var reaching_mode = data.ReachingMode;






                $('#officer_department_preview').text(department);
                $('#officer_id_preview').text(officer_id);
                $('#officer_branch_preview').text(branch);
                $('#officer_name_preview').text(officerName);
//
//
//complaintCategoryPreview_new
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
                $('#remarksPreview_new').text(data.remarks);









fetch('admin/loadComplaintDetailsLog', {
    method: 'POST',
    body: new URLSearchParams({
        serialNumber: serialNumber,
    })
}).then((res) => res.text()).then(function (res) {
    if (res != null) {
        var data = JSON.parse(res);

        // Get the timeline container element
        var timelineContainer = document.querySelector('.timelineCustomerComplaintProcessExample');

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

            // Create the timeline dot wrapper element
            var tlDotWrapper = document.createElement('div');
            tlDotWrapper.classList.add('tl-dot-wrapper');

            // Set the appropriate color for the timeline dot

            // Create the timeline image element
            var tlImage = document.createElement('img');
            tlImage.src = 'assets/img/messages-2.jpg';
            tlImage.alt = 'Image';
            tlImage.classList.add('timeline-image');

            // Append the image to the dot wrapper element
            tlDotWrapper.appendChild(tlImage);

            // Append the dot wrapper to the dot element
            tlDot.appendChild(tlDotWrapper);

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

        const modal = new bootstrap.Modal(document.getElementById('ExtralargeModalCustomerViewComplaint'));
        modal.show();
    } else {
        alert("data show is not success");
    }
});
















          



            });





        }
    }



    );














});
/*
 * this function for insert and update customer details to database
 */








//this code is to clear the customer details from new complaint page

document.getElementById('clearCustomerData').addEventListener('click', function (evt) {
    evt.preventDefault();
    Swal.fire({
        title: 'Are you sure?',
        text: "All data will be cleared!" + document.getElementById('cusidForSearch').value,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, clear it!'
    }).then((result) => {
        if (result.isConfirmed) {

            //this is to clear slimselect of complaint type
            var slimSearchCustomer = new SlimSelect({
                select: '#customerSearchField'
            });

            slimSearchCustomer.set([]);

            document.getElementById('cusidForSearch').value = 0;
            document.getElementById('customerName').value = "";
            document.getElementById('customerId').value = "";
            document.getElementById('customerEmail').value = "";
            document.getElementById('customerAddress').value = "";
            document.getElementById('customerLandLine').value = "";
            document.getElementById('customerMobile').value = "";
            document.getElementById('customerOtherInfor').value = "";
            Swal.fire(
                    'Cleared!',
                    'All data has been cleared.',
                    'success'
                    )
        }
    })
});










//this code is to assign data to preview new modified version


//this code is to assign data to data preview page 
//after that, check all field are filled before submitted
//in the middle of the code, data is passed to database (insert or update customer data)
//when clear button is clicked, then customerid will be 0;



document.getElementById('saveUpdateCustomerDataAndToPreview').addEventListener('click', function (evt) {
    if ($('#customerName').val() !== '' && $('#customerEmail').val() !== '' && $('#customerLandLine').val() !== '' && $('#customerMobile').val() !== '' && $('#customerAddress').val() !== '' && $('#customerOtherInfor').val() !== '') {


        Swal.fire({

            title: 'Do you want to save the details of <span style="color: blue">' + document.getElementById('customerName').value.split(' ')[0] + '</span>?',

            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: 'Save',
            denyButtonText: `Don't save`,
        }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                fetch('save_customer_details', {
                    method: 'POST',
                    body: new URLSearchParams({
                        customerName: document.getElementById('customerName').value,
                        customerEmail: document.getElementById('customerEmail').value,
                        customerAddress: document.getElementById('customerAddress').value,
                        customerLandLine: document.getElementById('customerLandLine').value,
                        customerMobile: document.getElementById('customerMobile').value,
                        customerOtherInfor: document.getElementById('customerOtherInfor').value,
                        nic: document.getElementById('customerId').value,
                        id: document.getElementById('cusidForSearch').value,
                    })
                }).then((res) => res.text()).then(function (res) {
                    if (res != null) {

             

                        $('#customer_code_preview').text(res);
                        $('#customer_name_preview').text($('#customerName').val());
                        $('#customer_nic_preview').text($('#customerId').val());
                        $('#customer_email_preview').text($('#customerEmail').val());
                        $('#customer_landline_preview').text($('#customerLandLine').val());
                        $('#customer_mobile_preview').text($('#customerMobile').val());
                        $('#customer_address_preview').text($('#customerAddress').val());
                        $('#customer_other_preview').text($('#customerOtherInfor').val());




                        Swal.fire('Customer Details added!', '', 'success')
                    } else {

                        Swal.fire('Error!', 'No Customer Details added.', 'error')
                    }
                });
            } else if (result.isDenied) {
                Swal.fire('Changes are not saved', '', 'info')
            }
        });



    } else {
        Swal.fire(
                'Error!',
                'No Customer Details added.',
                'error'
                )
    }



});



































var officerDetailsLoadOtherTab12 = new SlimSelect({
    select: '#OfficerSearchFieldOtherTab123',
    placeholder: "Officer List",
    ajax: function (search, callback) {
        fetch('search-officerByName', {
            method: 'POST',
            body: new URLSearchParams({search: search || ''})
        }).then(res => res.json()).then((data) => {
            callback(data);
        });
    },
    allowDeselect: true,
    deselectLabel: '<span>&#10006</span>',
});


$(document).ready(function () {
    $('#OfficerSearchFieldOtherTab123').data('select', officerDetailsLoadOtherTab12);

});



