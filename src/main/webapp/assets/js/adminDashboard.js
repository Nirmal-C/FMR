

var status = '';
var highlightedCard = '';
var secondFilter = '';



function hideFilter() {

    var filterElement = document.querySelector('#filterDataTableAdmin');
    filterElement.style.display = 'none';
}


function showFilter() {

    var filterElement = document.querySelector('#filterDataTableAdmin');
    filterElement.style.display = 'inline';
}


$("#totalComplaintFilterToDataTable").click(function () {
    showFilter();
    fetchData('all');
    secondFilter = '';
    status = '';
    dtable.ajax.reload();
    highlightCard($(this), "total");
    $('#changeTopicDataTable').text("All Complaints");
});



$("#completedComplaintFilterToDataTable").click(function () {
    showFilter();
    fetchData('all');
    secondFilter = '';
    status = 'Completed';
    highlightCard($(this), "Completed");
    dtable.ajax.reload();
    $('#changeTopicDataTable').text("Completed Complaints");
});






$("#queueComplaintFilterToDataTable").click(function () {
    showFilter();
    fetchData('all');
    secondFilter = '';
    status = 'Queue';
    dtable.ajax.reload();
    highlightCard($(this), "Queue");
    $('#changeTopicDataTable').text("Queue Complaints");


});


$("#progressComplaintFilterToDataTable").click(function () {
    showFilter();
    fetchData('all');
    secondFilter = '';
    status = 'Progress';
    dtable.ajax.reload();
    highlightCard($(this), "Progress");
    $('#changeTopicDataTable').text("Progress Complaints");
});


$("#rejectedComplaintFilterToDataTable").click(function () {
    showFilter();
    fetchData('all');
    secondFilter = '';
    status = 'Rejected';
    dtable.ajax.reload();
    highlightCard($(this), "Rejected");
    $('#changeTopicDataTable').text("Rejected Complaints");
});

$("#reOpenComplaintFilterToDataTable").click(function () {
    showFilter();
    fetchData('all');
    secondFilter = '';
    status = 'ReOpen';
    dtable.ajax.reload();
    highlightCard($(this), "ReOpen");
    $('#changeTopicDataTable').text("Reopen Complaints");
});


$("#getApprovedComplaintFilterToDataTable").click(function () {
    showFilter();
    fetchData('all');
    secondFilter = '';
    status = 'GetApproved';
    dtable.ajax.reload();
    highlightCard($(this), "Approved");
    $('#changeTopicDataTable').text("Get Approved Complaints");
});


$("#pendingComplitionComplaintFilterToDataTable").click(function () {
    showFilter();
    fetchData('all');
    secondFilter = '';
    status = 'true';
    dtable.ajax.reload();
    highlightCard($(this), "true");
    $('#changeTopicDataTable').text("Pending Complition");
});


$("#filterAllComplaints").click(function () {
    status = '';
    secondFilter = highlightedCard;
    dtable.ajax.reload();
    var x = $('#changeTopicDataTable').text();
    $('#changeTopicDataTable').text(x + " /All Complaints");


});

$("#filterCompletedComplaint").click(function () {
    status = 'Completed';
    dtable.ajax.reload();


});

$("#filterNotCompletedComplaint").click(function () {
    status = 'Incomplete';
    dtable.ajax.reload();
});




$("#filterTodayComplaint").click(function () {
    status = 'today';
    secondFilter = highlightedCard;
    dtable.ajax.reload();
    var x = $('#changeTopicDataTable').text().split("/")[0];
    var y = "Today Complaints";
    $('#changeTopicDataTable').text(x + "/" + y);
});

$("#filterThisMonthComplaint").click(function () {
    status = 'month';
    secondFilter = highlightedCard;
    dtable.ajax.reload();
    var x = $('#changeTopicDataTable').text().split("/")[0];
    var y = "Month Complaints";
    $('#changeTopicDataTable').text(x + "/" + y);
});

$("#filterThisYearComplaint").click(function () {
    status = 'year';
    secondFilter = highlightedCard;
    dtable.ajax.reload();
    var x = $('#changeTopicDataTable').text().split("/")[0];
    var y = "Year Complaints";
    $('#changeTopicDataTable').text(x + "/" + y);
});


function highlightCard($card, cardName) {
    // Remove the highlight class from all cards
    $(".info-card").removeClass("highlight-card");

    // Add the highlight class to the clicked card
    $card.closest(".info-card").addClass("highlight-card");

    // Set the highlighted card name
    highlightedCard = cardName;
//    alert("Highlighted Card: " + highlightedCard);
}

//this function for custom serch
$(document).ready(function () {
    // Disable the search button initially
    $('#SearchFilterCustomeDateComplaint').prop('disabled', true);

    // Function to check if both date fields are filled
    function checkDateFields() {
        var fromDate = document.getElementById("FromDateAdminDashboard").value;
        var toDate = document.getElementById("ToDateAdminDashboard").value;

        if (fromDate && toDate) {
            // Enable the search button
            $('#SearchFilterCustomeDateComplaint').prop('disabled', false);
        } else {
            // Disable the search button
            $('#SearchFilterCustomeDateComplaint').prop('disabled', true);
        }
    }

    // Add event listener to the date fields
    $('#FromDateAdminDashboard, #ToDateAdminDashboard').change(function () {
        checkDateFields();
    });

    // Search button click event
    $("#SearchFilterCustomeDateComplaint").click(function () {
        var fromDate = document.getElementById("FromDateAdminDashboard").value;
        var toDate = document.getElementById("ToDateAdminDashboard").value;

        status = fromDate + "+" + toDate;
        document.getElementById("FromDateAdminDashboard").value = "";
        document.getElementById("ToDateAdminDashboard").value = "";
        dtable.ajax.reload();
        $('#verticalycentered_custom_date_period').modal('hide');
    });

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
        "url": "table-data-allComplaintData1",
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










//
//        if (data['status'] === 'active' && data['status_repeat'] === 'Reopen') {
//
//
//
//            $(row).find('td').eq(5).html('<label class="badge bg-primary" style="font-size:12px; background-color:#84649c !important;">Active </label>  <i class="bi bi-repeat" style="color:black; font-size: 20px; font-weight:bold;">');
//
//
//        } else if (data['status'] === 'Deactive' && data['status_repeat'] === 'Reopen') {
//
//
//            $(row).find('td').eq(5).html('<label class="badge bg-primary" style="font-size:12px; background-color:#84649c !important;">Deactive </label>  <i class="bi bi-repeat" style="color:black; font-size: 20px;">');
//
//
//        } else if (data['status'] === 'active') {
//
//
//            $(row).find('td').eq(5).html('<label class="badge bg-primary" style="font-size:12px; background-color:#84649c !important;">Active</label>');
//
//        } else if (data['status'] === 'Deactive') {
//
//            $(row).find('td').eq(5).html('<label class="badge bg-primary" style="font-size:12px; background-color:#84649c !important;">Deactive</label>');
//        }


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
                        var customerBranch = data[0].customerBranch;


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
                        $('#customer_branch_preview').text(customerBranch);
                        $('#customer_image_preview').attr('src', "loadCustomer?file=" + customerImage);


                        $('#officer_department_preview').text(department);
                        $('#officer_id_preview').text(officer_id);
                        $('#officer_branch_preview').text(branch);
                        $('#officer_name_preview').text(officerName);
                        $('#officer_mobile_preview').text(officerMobile);
                        $('#officer_email_preview').text(officeEmail);
                        $('#officer_image_preview').attr('src', "loadUsers?file=" + officerImage);



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


//                                    // Create the timeline image element
//                                    var tlImage = document.createElement('img');
//                                    tlImage.src = 'loadFile?file=CCMP-20230629-000157_1.jpg';
//                                    tlImage.alt = 'Image';
//                                    tlImage.classList.add('timeline-image');
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

    function hadleButtonInAction(actionTaken, pending_complition) {
        $('.buttonGroupforComplaint').empty();

        if (actionTaken === 'Rejected' && pending_complition === 'false') {
            var rejectButton = $('<a href="javascript:void(0)" class="printButton" data-toggle="tooltip" data-placement="top" title="Print Complaint"><i class="bi bi-printer" style="font-size:40px; margin-left:5px; margin-right:5px; color:Gray"></i></a><a href="javascript:void(0)" class="addComment" data-toggle="tooltip" data-placement="top" title="Add Complaint"><i class="bi bi-chat-left-text" style="font-size:40px; margin-left:5px; margin-right:5px; color:black"></i></a><a href="javascript:void(0)" class="reOpenComplaint" data-toggle="tooltip" data-placement="top" title="Reopen Complaint"><i class="bi bi-arrow-repeat" style="font-size:40px; margin-left:5px; margin-right:5px; color:orange"></i></a>');
            $('.buttonGroupforComplaint').append(rejectButton);
        } else if (actionTaken === 'Completed' && pending_complition === 'false') {
            var completedButton = $('<a href="javascript:void(0)" class="printButton" data-toggle="tooltip" data-placement="top" title="Print Complaint"><i class="bi bi-printer" style="font-size:40px; margin-left:5px; margin-right:5px; color:Gray"></i></a><a href="javascript:void(0)" class="addComment" data-toggle="tooltip" data-placement="top" title="Add Complaint"><i class="bi bi-chat-left-text" style="font-size:40px; margin-left:5px; margin-right:5px; color:black"></i></a><a href="javascript:void(0)" class="reOpenComplaint" data-toggle="tooltip" data-placement="top" title="Reopen Complaint"><i class="bi bi-arrow-repeat" style="font-size:40px; margin-left:5px; margin-right:5px; color:orange;"></i></a>');
            $('.buttonGroupforComplaint').append(completedButton);
        } else if (actionTaken === 'Queue' && pending_complition === 'false') {
            var completedButton = $('<a href="javascript:void(0)" class="printButton" data-toggle="tooltip" data-placement="top" title="Print Complaint"><i class="bi bi-printer" style="font-size:40px; margin-left:5px; margin-right:5px; color:Gray"></i></a><a href="javascript:void(0)" class="addComment" data-toggle="tooltip" data-placement="top" title="Add Complaint"><i class="bi bi-chat-left-text" style="font-size:40px; margin-left:5px; margin-right:5px; color:black"></i></a><a href="javascript:void(0)" class="rejectComplaint" data-toggle="tooltip" data-placement="top" title="Reject Complaint"><i class="bi bi-x-circle" style="font-size:40px; margin-left:5px; margin-right:5px; color:red;"></i></a><a href="javascript:void(0)" class="acceptComplaint" data-toggle="tooltip" data-placement="top" title="Accept Complaint"><i class="bi bi-check-circle" style="font-size:40px; margin-left:5px; margin-right:5px; color:green"></i></a>');
            $('.buttonGroupforComplaint').append(completedButton);
        } else if (actionTaken === 'Progress' && pending_complition === 'false') {
            var completedButton = $('<a href="javascript:void(0)" class="printButton" data-toggle="tooltip" data-placement="top" title="Print Complaint"><i class="bi bi-printer" style="font-size:40px; margin-left:5px; margin-right:5px; color:Gray"></i></a><a href="javascript:void(0)" class="addComment" data-toggle="tooltip" data-placement="top" title="Add Complaint"><i class="bi bi-chat-left-text" style="font-size:40px; margin-left:5px; margin-right:5px; color:black"></i></a><a href="javascript:void(0)" class="editAssignComplaint" data-toggle="tooltip" data-placement="top" title="Edit/Assign Complaint"><i class="bi bi-person-plus" style="font-size:40px; margin-left:5px; margin-right:5px; color:green"></i></a><a href="javascript:void(0)" class="completedComplantByAdmin" data-toggle="tooltip" data-placement="top" title="Complete Complaint"><i class="bi bi-hand-thumbs-up" style="font-size:40px; margin-left:5px; margin-right:5px; color:blue;"></i></a>');
            $('.buttonGroupforComplaint').append(completedButton);

        } else if (pending_complition === 'true') {
            var completedButton = $('<a href="javascript:void(0)" class="printButton" data-toggle="tooltip" data-placement="top" title="Print Complaint"><i class="bi bi-printer" style="font-size:40px; margin-left:5px; margin-right:5px; color:Gray"></i></a><a href="javascript:void(0)" class="addComment" data-toggle="tooltip" data-placement="top" title="Add Complaint"><i class="bi bi-chat-left-text" style="font-size:40px; margin-left:5px; margin-right:5px; color:black"></i></a><a href="javascript:void(0)" class="assignNewOfficerPendingComplition" data-toggle="tooltip" data-placement="top" title="Assign Officer"><i class=" bi bi-person-bounding-box " style="font-size:40px; margin-left:5px; margin-right:5px; color:green"></i></a><a href="javascript:void(0)" class="completedComplantByAdmin" data-toggle="tooltip" data-placement="top" title="Complete Complaint"><i class="bi bi-hand-thumbs-up" style="font-size:40px; margin-left:5px; margin-right:5px; color:blue;"></i></a>');
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
                var customerBranch = data[0].customerBranch;


                var officerName = data[0].officerName;
                var officer_id = data[0].officer_id;
                var department = data[0].department;
                var branch = data[0].branch;
                var officerImage = data[0].image;


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
                $('#customer_branch_preview').text(customerBranch);



                $('#officer_department_preview').text(department);
                $('#officer_id_preview').text(officer_id);
                $('#officer_branch_preview').text(branch);
                $('#officer_name_preview').text(officerName);
                $('#officer_image_preview').attr('src', "loadUsers?file=" + officerImage);


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
                            document.getElementById('topicOfMyComplaintProcess').innerHTML = 'Complaint No123: <span style="color: red;">' + item.serial_no + '</span>';


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
    $(document).off('click', '.printButton').on('click', '.printButton', function () {


        var printWindow = window.open('', '_blank');
        printWindow.document.open();

        var modelContent = document.getElementById('pdfPrintkasun').innerHTML;

        // Remove any Bootstrap classes from the model content
        modelContent = modelContent.replace(/class="[^"]+"/g, '');

        // Remove data-bs-dismiss attributes
        modelContent = modelContent.replace(/data-bs-dismiss="[^"]+"/g, '');

        var htmlContent = `
          <!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8" />
		<title>A simple, clean, and responsive HTML invoice template</title>

		<style>
			.invoice-box {
				max-width: 800px;
				margin: auto;
				padding: 30px;
				border: 1px solid #eee;
				box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);
				font-size: 16px;
				line-height: 24px;
				font-family: 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif;
				color: #555;
			}

			.invoice-box table {
				width: 100%;
				line-height: inherit;
				text-align: left;
			}

			.invoice-box table td {
				padding: 5px;
				vertical-align: top;
			}

			.invoice-box table tr td:nth-child(2) {
				text-align: right;
			}

			.invoice-box table tr.top table td {
				padding-bottom: 20px;
			}

			.invoice-box table tr.top table td.title {
				font-size: 45px;
				line-height: 45px;
				color: #333;
			}

			.invoice-box table tr.information table td {
				padding-bottom: 40px;
			}

			.invoice-box table tr.heading td {
				background: #eee;
				border-bottom: 1px solid #ddd;
				font-weight: bold;
			}

			.invoice-box table tr.details td {
				padding-bottom: 20px;
			}

			.invoice-box table tr.item td {
				border-bottom: 1px solid #eee;
			}

			.invoice-box table tr.item.last td {
				border-bottom: none;
			}

			.invoice-box table tr.total td:nth-child(2) {
				border-top: 2px solid #eee;
				font-weight: bold;
			}

			@media only screen and (max-width: 600px) {
				.invoice-box table tr.top table td {
					width: 100%;
					display: block;
					text-align: center;
				}

				.invoice-box table tr.information table td {
					width: 100%;
					display: block;
					text-align: center;
				}
			}

			/** RTL **/
			.invoice-box.rtl {
				direction: rtl;
				font-family: Tahoma, 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif;
			}

			.invoice-box.rtl table {
				text-align: right;
			}

			.invoice-box.rtl table tr td:nth-child(2) {
				text-align: left;
			}
		</style>
	</head>

	<body>
		<div class="invoice-box">
			<table cellpadding="0" cellspacing="0">
				<tr class="top">
					<td colspan="2">
						<table>
							<tr>
								<td class="title">
									<img src="data:image/png;base64,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" style="width: 100px; max-width: 100px" />
								</td>

								<td>
									Invoice #: 123<br />
									Created: January 1, 2015<br />
									Due: February 1, 2015
								</td>
							</tr>
						</table>
					</td>
				</tr>

				<tr class="information">
					<td colspan="2">
						<table>
							<tr>
								<td>
									Sparksuite, Inc.<br />
									12345 Sunny Road<br />
									Sunnyville, CA 12345
								</td>

								<td>
									Acme Corp.<br />
									John Doe<br />
									john@example.com
								</td>
							</tr>
						</table>
					</td>
				</tr>

				<tr class="heading">
					<td>Payment Method</td>

					<td>Check #</td>
				</tr>

				<tr class="details">
					<td>Check</td>

					<td>1000</td>
				</tr>

				<tr class="heading">
					<td>Item</td>

					<td>Price</td>
				</tr>

				<tr class="item">
					<td>Website design</td>

					<td>$300.00</td>
				</tr>

				<tr class="item">
					<td>Hosting (3 months)</td>

					<td>$75.00</td>
				</tr>

				<tr class="item last">
					<td>Domain name (1 year)</td>

					<td>$10.00</td>
				</tr>

				<tr class="total">
					<td></td>

					<td>Total: $385.00</td>
				</tr>
			</table>
		</div>
	</body>
</html>
            `;

        printWindow.document.write(htmlContent);
        printWindow.document.close();

        printWindow.onload = function () {
            printWindow.print();
            printWindow.close();
        };


    }
    );


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
                            hadleButtonInAction("Rejected", pending_complition);
                            refreshComplaintView();
                            modalElement.classList.remove('d-none');
                            Swal.fire('Successful!', 'This Complaint has been rejected!', 'success');

                            dtable.ajax.reload();
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
                            hadleButtonInAction("Queue", pending_complition);
                            refreshComplaintView();
                            modalElementReopen.classList.remove('d-none');
                            Swal.fire('Successful!', 'This Complaint has been reopened!', 'success');
                            dtable.ajax.reload();
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


//this is the function to accept the complaint
    $(document).off('click', '.acceptComplaint').on('click', '.acceptComplaint', function () {



        // Get the modal element
        var modalAssginOfficerMdel = $('#verticalycentered_complete_assign');
        modalAssginOfficerMdel.modal('show');

        var modal = $('#ExtralargeModalViewComplaint');
        modal.modal('hide');

        const modalElementAssign = document.getElementById('ExtralargeModalViewComplaint');
//        modalElementAssign.classList.add('d-none');


// const modalElementAssignHide = document.getElementById('verticalycentered_complete_assign');



        $("#assignNewOfficerToComplaint").click(function () {


            var officer = $('#OfficerSearchFieldAdminDashboard').val();
            var selectedOfficer = $('#OfficerSearchFieldAdminDashboard option:selected').text();
            var officername = selectedOfficer;
            var officerID = officer;


// Get the value of the textarea
            var addRemarkWhenAssignOfficer = document.getElementById('addRemarkWhenAssignOfficer').value;



            Swal.fire({
                title: 'Are you sure?',
                text: 'The complaint Will be Accepted & Assigned!',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, Proceed!',
                showLoaderOnConfirm: true,
                preConfirm: () => {
                    modalAssginOfficerMdel.modal('hide');
                    return fetch('admin/accept-complaint', {
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
                        hadleButtonInAction("Progress", pending_complition);
                        refreshComplaintView();
                        dtable.ajax.reload();
                        modalElementAssign.classList.remove('d-none');
                        modalElementAssignHide.classList.add('d-none');
                        modalAssginOfficerMdel.modal('hide');
                        Swal.fire('Successful!', 'This Complaint has been accepted!', 'success');

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
                            hadleButtonInAction("Completed", pending_complition);
                            refreshComplaintView();
                            dtable.ajax.reload();
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


            var officer = $('#OfficerSearchFieldAdminDashboard').val();
            var selectedOfficer = $('#OfficerSearchFieldAdminDashboard option:selected').text();
            var officername = selectedOfficer;
            var officerID = officer;


// Get the value of the textarea
            var addRemarkWhenAssignOfficer = document.getElementById('addRemarkWhenAssignOfficer').value;



            Swal.fire({
                title: 'Are you sure?',
                text: 'The complaint Will be Accepted & Assigned!',
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
                        hadleButtonInAction("Progress", pending_complition);
                        refreshComplaintView();
                        dtable.ajax.reload();
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







//this code is to assing and accept the officer



    $(document).off('click', '.assignNewOfficerPendingComplition').on('click', '.assignNewOfficerPendingComplition', function () {



        //load the officer from the user datatable

        var officerDetailsLoadDashboardPage_acceptAssignOfficer = new SlimSelect({
            select: '#OfficerSearchFieldAdminDashboard_acceptAssignOfficer',
            placeholder: officerEmp + "-" + officername,
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



        // Set the default value
        var defaultValue = officerEmp;
        var selectedText = officerEmp + "-" + officername;


        // Find the select element by its ID
        var selectElement = $('#OfficerSearchFieldAdminDashboard_acceptAssignOfficer');

        // Create a new option element
        var defaultOption = $('<option>').val(defaultValue).text(selectedText);

        // Set the selected attribute on the default option
        defaultOption.attr('selected', 'selected');

        // Append the default option to the select element
        selectElement.append(defaultOption);








        fetch('filed_officer_details', {
            method: 'POST',
            body: new URLSearchParams({
                id: officerEmp,
            })
        })
                .then((res) => res.text())
                .then((res) => {
                    if (res === 'ok') {

                    } else {
                        const parsedJson = JSON.parse(res);
                        parsedJson.forEach((item) => {


                            $('#officer_name_new_acceptAssignOfficer').text(item.officerName);
                            $('#officer_id_new_acceptAssignOfficer').text(item.officerID);
                            $('#officer_mobile_new_acceptAssignOfficer').text(item.officerrMobile);
                            $('#officer_landline_new_acceptAssignOfficer').text(item.officerLandline);
                            $('#officer_email_new_acceptAssignOfficer').text(item.officeremail);
                            $('#officer_status_new_acceptAssignOfficer').text("?");
                            $('#officer_branch_new_acceptAssignOfficer').text(item.officerBranch);
                            $('#officer_department_new_acceptAssignOfficer').text(item.officerdepartment);
                            $('#officer_completed_complaint_new_acceptAssignOfficer').text("?");
                            $('#officer_queue_complaint_new_acceptAssignOfficer').text("?");
                            $('#officer_lastlogin_new_acceptAssignOfficer').text("?");
                            $('#officer_lastAcessComputer_new_acceptAssignOfficer').text("?");

                        });
                    }
                })
                .catch((error) => console.error(error));




        // Get the modal element
        var modalAssginOfficerMdel = $('#verticalycentered_complete_assign_acceptAssignOfficer');
        modalAssginOfficerMdel.modal('show');

        var modal = $('#ExtralargeModalViewComplaint');
        modal.modal('hide');

        const modalElementAssign = document.getElementById('ExtralargeModalViewComplaint');
//        modalElementAssign.classList.add('d-none');


// const modalElementAssignHide = document.getElementById('verticalycentered_complete_assign');




        $("#assignNewOfficerToComplain_acceptAssignOfficert").click(function () {


            var officer = $('#OfficerSearchFieldAdminDashboard_acceptAssignOfficer').val();
            var selectedOfficer = $('#OfficerSearchFieldAdminDashboard_acceptAssignOfficer option:selected').text();
            var officername = selectedOfficer;
            var officerID = officer;


// Get the value of the textarea
            var addRemarkWhenAssignOfficer = document.getElementById('addRemarkWhenAssignOfficer_acceptAssignOfficer').value;



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
                        hadleButtonInAction("Progress", pending_complition);
                        refreshComplaintView();
                        dtable.ajax.reload();
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


//this code is to show officer own complaints

    var dtable_acceptAssignOfficer = $('#viewOfficerComplaintasTableNewAdminDashboardGood_acceptAssignOfficer').DataTable({

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
                d.data1 = officerEmp

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
                        var timelineContainer = document.querySelector('.timelineMyComplaintProcessOnly_acceptAssignOfficer');

// Clear the previous data in the timeline container
                        timelineContainer.innerHTML = '';

// Loop through the timeline data and create the timeline items dynamically
                        data.forEach(function (item
                                ) {
                            document.getElementById('topicOfMyComplaintProcess_acceptAssignOfficer').innerHTML = 'Complaint No: <span style="color: red;">' + item.serial_no + '</span>';


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

                        const modalAdmin_acceptAssignOfficer = new bootstrap.Modal(document.getElementById('verticalycentered_complaint_tracking_processOnlyDashAdmin_acceptAssignOfficer'));
                        modalAdmin_acceptAssignOfficer.show();
                    } else {
                        alert("data show is not success");
                    }
                });
            });

        }
    }
    );

});




$('#OfficerSearchFieldAdminDashboard').change(function () {


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


//this code is to show officer own complaints

    var dtable12345 = $('#viewOfficerComplaintasTableNewAdminDashboardGood').DataTable({

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
        "createdRow": function (row, data) {
            let action_td = document.createElement('td');
            $(action_td).addClass('text-center');

            if (data['actionTaken'] === 'Completed') {
//            $(action_td).append('<a href="javascript:void(0)" class="viewFullComplaintDetails"> <i class="bi bi-eye" style="font-size:20px; color:blue;"></i></a><a href="javascript:void(0)" class="reOpenComplaint" > <i class="bi bi-arrow-repeat" style="font-size:20px; color:orange;"></i></a>');


                $(row).find('td').eq(4).html('<label class="badge rounded-pill bg-success" style="font-size:12px">Completed</label>');
            } else if (data['actionTaken'] === 'Incomplete') {
//            $(action_td).append('<a href="javascript:void(0)" class="viewFullComplaintDetails"><i class="bi bi-eye" style="font-size:20px; color:blue"></i></a><a href="javascript:void(0)" id=""><i class="bi bi-pencil-square" style="font-size:20px; margin-left:10px; color:green"></i></a>');

                $(row).find('td').eq(4).html('<label class="badge rounded-pill bg-danger" style="font-size:12px">Re-Open</label>');
            } else if (data['actionTaken'] === 'Queue') {
//            $(action_td).append('<a href="javascript:void(0)" class="viewFullComplaintDetails"> <i class="bi bi-eye" style="font-size:20px; color:blue;"></i></a> <a href="javascript:void(0)" class="rejectComplaint" > <i class="bi bi-x-circle" style="font-size:20px; color:red;"></i></a>  <a href="javascript:void(0)" class="acceptComplaint"><i class="bi bi-check-circle" style="font-size:20px; color:green"></i></a>');

                $(row).find('td').eq(4).html('<label class="badge rounded-pill bg-danger" style="font-size:12px">Queue</label>');


            } else if (data['actionTaken'] === 'Progress') {
//            $(action_td).append('<a href="javascript:void(0)" class="viewFullComplaintDetails"><i class="bi bi-eye" style="font-size:20px; color:blue"></i></a><a href="javascript:void(0)" class="editAssignComplaint"><i class="bi bi-pencil-square" style="font-size:20px; margin-left:10px; color:green"></i></a>');

                $(row).find('td').eq(4).html('<label class="badge rounded-pill bg-danger" style="font-size:12px">Progress</label>');

            } else {
//            $(action_td).append('<a href="javascript:void(0)" class="viewFullComplaintDetails"><i class="bi bi-eye" style="font-size:20px; color:blue"></i></a><a href="javascript:void(0)" class="reOpenComplaint" ><i class="bi bi-arrow-repeat" style="font-size:20px; margin-left:10px; color:orange"></i></a>');

                $(row).find('td').eq(4).html('<label class="badge rounded-pill bg-danger" style="font-size:12px">Rejected</label>');
            }

            if (data['status'] === 'active' && data['status_repeat'] === 'Reopen') {

                $(row).find('td').eq(5).html('<label class="badge bg-primary" style="font-size:12px;">Active <i class="bi bi-reply-fill"></label>');


            } else if (data['status'] === 'Deactive' && data['status_repeat'] === 'Reopen') {


                $(row).find('td').eq(5).html('<label class="badge bg-primary" style="font-size:12px">Deactive <i class="bi bi-reply-fill"></label>');

            } else if (data['status'] === 'active') {


                $(row).find('td').eq(5).html('<label class="badge bg-primary" style="font-size:12px">Deactive</label>');



            } else if (data['status'] === 'Deactive') {


                $(row).find('td').eq(5).html('<label class="badge bg-primary" style="font-size:12px">Deactive</label>');
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
                            document.getElementById('topicOfMyComplaintProcess').innerHTML = 'Complaint No888: <span style="color: red;">' + item.serial_no + '</span>';


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



//these function to accept the officer from general user and assing new one








// Fetch data function
function fetchData(filter) {

    // Your fetch logic here
    // You can use the 'filter' value to send to the backend

    // Example using fetch API
    fetch('complaintCountFilterData', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({filter: filter})
    })
            .then(response => response.json())
            .then(data => {
                // Handle the response from the backend
                if (Array.isArray(data) && data.length > 0) {
                    const totalComplaints = data[0].total;
                    const getApprovedComplaints = data[0].getApproved;
                    const rejectedComplaints = data[0].rejected;
                    const reopenComplaints = data[0].reopen;
                    const progressComplaints = data[0].progress;
                    const completedComplaints = data[0].completed;
                    const queueComplaints = data[0].queue;


                    document.getElementById('totalComplaintNewDashboard').textContent = totalComplaints;
                    document.getElementById('completedComplaintNewDashboard').textContent = completedComplaints;
                    document.getElementById('queueComplaintNewDashboard').textContent = queueComplaints;
                    document.getElementById('progressComplaintNewDashboard').textContent = progressComplaints;
                    document.getElementById('rejectedComplaintNewDashboard').textContent = rejectedComplaints;
                    document.getElementById('reopenComplaintNewDashboard').textContent = reopenComplaints;
                    document.getElementById('getapprovedComplaintNewDashboard').textContent = getApprovedComplaints;




                } else {
                    console.log("Invalid response data format");
                }


            })
            .catch(error => {
                // Handle any errors
                console.error(error);
            });
}

// Event listener for filter selection
document.getElementById('filterAllComplaintsDashboard').addEventListener('click', function () {
    $(".info-card").removeClass("highlight-card");
    secondFilter = '';
    fetchData('all');
    status = '';
    hideFilter();
    dtable.ajax.reload();
    $('#changeTopicDataTable').text("All Complaints");
});

document.getElementById('filterTodayComplaintDashboard').addEventListener('click', function () {
    $(".info-card").removeClass("highlight-card");
    secondFilter = '';
    fetchData('today');
    status = 'today';
    hideFilter();
    dtable.ajax.reload();
    $('#changeTopicDataTable').text("Today Complaints");
});

document.getElementById('filterThisMonthComplaintDashboard').addEventListener('click', function () {
    $(".info-card").removeClass("highlight-card");
    secondFilter = '';
    fetchData('month');
    status = 'month';
    hideFilter();
    dtable.ajax.reload();
});

document.getElementById('filterThisYearComplaintDashboard').addEventListener('click', function () {
    $(".info-card").removeClass("highlight-card");
    secondFilter = '';
    fetchData('year');
    status = 'year';
    hideFilter();
    dtable.ajax.reload();
    $('#changeTopicDataTable').text("Year Complaints");
});






document.getElementById('SearchFilterCustomeDateComplaintDashboard').addEventListener('click', function () {
    // Handle custom date filter here, e.g., open modal and get date range values
    // Once you have the custom filter value, pass it to the fetchData function
    const fromDate = document.getElementById('FromDateAdminDashboardDashboard').value;
    const toDate = document.getElementById('ToDateAdminDashboardDashboard').value;
    const status = fromDate + "+" + toDate;

    fetchData(status);
    $('#verticalycentered_custom_date_periodDashboard').modal('hide');
});

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

 