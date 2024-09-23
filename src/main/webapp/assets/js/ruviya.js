/* 
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/JSP_Servlet/JavaScript.js to edit this template
 */




////this code for slim select and search and fill data for the customer input field from database
//
//
//let customerLoad = new SlimSelect({
//    select: '#customerSearchField',
//    ajax: function (search, callback) {
//        fetch('search-customer?search=' + search).then((resp) => resp.json()).then((resp) => {
//
//            callback(resp);
//
//        });
//    }
//
//});
//
//
//
//$('#customerSearchField').change(function () {
//    if ($(this).val() === '') {
//        return;
//    }
//
//    fetch('filed_customer_details', {
//        method: 'POST',
//        body: new URLSearchParams({
//            id: document.getElementById('customerSearchField').value,
//
//        })
//    }).then((res) => res.text()).then(function (res) {
//        if (res === 'ok') {
//            alert("kasun");
//
//        } else
//        {
//
//            let parsedJson = JSON.parse(res);
//            parsedJson.forEach((item) => {
//
//                document.getElementById('customerLandLine').value = item.customerLandLine;
//                document.getElementById('customerName').value = item.customerName;
//                document.getElementById('customerEmail').value = item.customerEmail;
//                document.getElementById('customerMobile').value = item.customerMobile;
//                document.getElementById('customerOtherInfor').value = item.customerOtherInfor;
//                document.getElementById('customerAddress').value = item.customerAddress;
//                document.getElementById('customerId').value = item.nic;
//
//            });
//
//
//
//        }
//    });
//
//});



















var officerDetailsLoad = new SlimSelect({
    select: '.OfficerSearchField',
    placeholder: "Officer List",
    ajax: function (search, callback) {
        fetch('search-userByName', {
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
    $('.OfficerSearchField').data('select', officerDetailsLoad);



});








$('#OfficerSearchFieldAdminDashBoard').change(function () {


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
    
    
   
    
    
//
//this code is to show officer own complaints


var dtable12345 = $('#viewOfficerComplaintasTableNewAdminDashboardGood').DataTable({

    "aLengthMenu": [[5,10, 25, -1], [5,10, 25, "All"]],
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
  tlTime.textContent = " "+convertTo12Hour(item.time)+" ";


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
























//select data for a department of an officer whom assinged the complaint
document.getElementById("Branch_lable").style.visibility = "hidden";
document.getElementById("selectBranch").style.visibility = "hidden";
document.getElementById("officer_lable").style.visibility = "hidden";
document.getElementById("selectOfficer").style.visibility = "hidden";













let department_load = new SlimSelect({
    select: '#selectDepartment',
    ajax: function (search, callback) {
        fetch('search-department?search=' + search).then((resp) => resp.json()).then((resp) => {
            callback(resp);


        });
    }

});



$('#selectDepartment').change(function () {
    if ($(this).val() === '') {
        return;
    }

    document.getElementById("Branch_lable").style.visibility = "visible";
    document.getElementById("selectBranch").style.visibility = "visible";
    document.getElementById("officer_lable").style.visibility = "hidden";
    document.getElementById("selectOfficer").style.visibility = "hidden";

    searchOfficerBranchDetails.style.display = 'block';




    var officerDepartment = $('#selectDepartment option:selected').text();

    let branch_load = new SlimSelect({
        select: '#selectBranch',
        ajax: function (search, callback) {
            var url = 'search-branch?search=' + search + '&officerDepartment=' + encodeURIComponent(officerDepartment);
            fetch(url).then((resp) => resp.json()).then((resp) => {
                callback(resp);
            });
        }
    });
});







$('#selectBranch').change(function () {
    if ($(this).val() === '') {
        return;
    }

    document.getElementById("officer_lable").style.visibility = "visible";
    document.getElementById("selectOfficer").style.visibility = "visible";

    var selectBranch = $('#selectBranch option:selected').text();
    searchOfficerOfficerDetails.style.display = 'block';
    let officer_load = new SlimSelect({
        select: '#selectOfficer',

        ajax: function (search, callback) {
            var url = 'search-officer?search=' + search + '&selectBranch=' + encodeURIComponent(selectBranch);
            fetch(url).then((resp) => resp.json()).then((resp) => {
                callback(resp);
            });
        }

    });






});



//Get Officer ID number using user brancha and department and name

//
//$('#selectOfficer').on('change', function() {
//    var officerName = $('#selectOfficer option:selected').text();
//    var officerBranch = $('#selectBranch option:selected').text();
//    var officerDepartment = $('#selectDepartment option:selected').text();
//    
//        fetch('get_officer_id_from_database', {
//        method: 'POST',
//        body: new URLSearchParams({
//            officerName: $('#selectOfficer option:selected').text(),
//            officerBranch: $('#selectBranch option:selected').text(),
//            officerDepartment: $('#selectDepartment option:selected').text(),
//  
//        })
//    }).then((res) => res.text()).then(function (res) {
//        if (res === 'ok') {
//            alert("add officer id");
//
//        } else
//        {
//            alert("no officer id added");
//        }
//    });
//  
//});










//this code is to load complaint type from database
let complaintTypeLoad = new SlimSelect({
    select: '#complaint_type',
    ajax: function (search, callback) {
        fetch('search-complaintType?search=' + search).then((resp) => resp.json()).then((resp) => {

            callback(resp);


        });
    }

});






let productTypeLoads = document.querySelectorAll('.product_type');
productTypeLoads.forEach(function (select) {
    new SlimSelect({
        select: select,
        searchPlaceholder: 'Search...',
        searchHighlight: true,

        ajax: function (search, callback) {
            fetch('search-productType?search=' + search)
                    .then(function (response) {
                        return response.json();
                    })
                    .then(function (data) {
                        callback(data);
                        this.showContent();

                    })
                    .catch(function (error) {
                        console.error(error);
                    });
        },
    });
});























let complaintCategoryType = new SlimSelect({
    select: '#complaint_category',
    ajax: function (search, callback) {
        fetch('search-complaintCategory?search=' + search).then((resp) => resp.json()).then((resp) => {

            callback(resp);

        });
    }

});



let reachingModeeLoad = new SlimSelect({
    select: '#reaching_mode',
    ajax: function (search, callback) {
        fetch('search-reachingMode?search=' + search).then((resp) => resp.json()).then((resp) => {

            callback(resp);

        });
    }

});


















