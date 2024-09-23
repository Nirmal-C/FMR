/* 
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/JSP_Servlet/JavaScript.js to edit this template
 */







var status = '';
var secondFilter = '';


//thsese codes for own complaint of the relavent officer




 //these code is for own officer function
 
var statusAllComplaint = '';
var secondFilterOfficer = '';



$("#filterAllComplaints").click(function() {


 
  statusAllComplaint = '';
  dtableViewmyComplaints.ajax.reload();

  $('#changeTopicDataTableOfficer').text("All Complaints");
});



$("#filterCompletedComplaints").click(function () {
  

    
    statusAllComplaint = 'Completed';

    dtableViewmyComplaints.ajax.reload();
     $('#changeTopicDataTableOfficer').text("Completed Complaints");
});






$("#filterRejectedComplaint").click(function () {

    statusAllComplaint = 'Rejected';
    dtableViewmyComplaints.ajax.reload();

     $('#changeTopicDataTableOfficer').text("Rejected Complaints");
    
 
});


$("#filterProgressComplaint").click(function () {


    statusAllComplaint = 'Progress';
    dtableViewmyComplaints.ajax.reload();
   
     $('#changeTopicDataTableOfficer').text("Progress Complaints");
});


$("#filterApprovedComplaint").click(function () {

    
    statusAllComplaint = 'Approved';
    dtableViewmyComplaints.ajax.reload();
   
     $('#changeTopicDataTableOfficer').text("Aprrove Complaints");
});

$("#filterQueueComplaint").click(function () {


    statusAllComplaint = 'Queue';
    dtableViewmyComplaints.ajax.reload();
   
     $('#changeTopicDataTableOfficer').text("Queue Complaints");
});


$("#filterTodayComplaint").click(function () {

    statusAllComplaint = 'today';
    dtableViewmyComplaints.ajax.reload();
   
     $('#changeTopicDataTableOfficer').text("Today Complaints");
});


$("#filterThisMonthComplaint").click(function () {
    statusAllComplaint = 'month';
   
    dtableViewmyComplaints.ajax.reload();
  $('#changeTopicDataTableOfficer').text("This Month Complaints");

  
});

$("#filterThisYearComplaint").click(function () {
    statusAllComplaint = 'year';
    dtableViewmyComplaints.ajax.reload();
 $('#changeTopicDataTableOfficer').text("This Year Complaints");
  
});







$("#filterResetCustomeDateComplaint").click(function () {
    document.getElementById("FromDateAdminDashboard").value = '';
    document.getElementById("ToDateAdminDashboard").value = '';
});




$.fn.dataTable.ext.errMode = 'none';







var dtableViewmyComplaints = $('#viewAllComplaintFilterTrackingHirachyTable').DataTable({

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
        "url": "admin/table-data-allcomplaintTrackingTimeline",
        "contentType": "application/json",
        "type": "POST",
        "data": function (d) {
            d.data = statusAllComplaint;
              
           
            return JSON.stringify(d);
        },
        error: function (xhr, error, code) {
            console.log(xhr);
            console.log(code);
        }
    },
         "columns": [
                    {"data": "status_repeat", className: "text-wrap", visible: false},
                    {"data": "status_orginal", className: "text-wrap", visible: false},
                    {"data": "ID", className: "text-wrap", visible: false},
                    {"data": "complaint_id", visible: false},
                    {"data": "serial_number", className: "text-wrap"},
                    {data: 'officerID', className: 'text-wrap', visible: false},
                    {"data": "officerName", className: "text-wrap"},
                    {"data": "firstOfficer", className: "text-wrap", visible: false},
                    {"data": "CustomerId", className: "text-wrap", visible: false},
                    {"data": "CustomerName", className: "text-wrap"},
                    {"data": "CustomerEmail", className: "text-wrap", visible: false},
                    {"data": "CustomerNIC", className: "text-wrap", visible: false},
                    {"data": "date", className: "text-wrap"},
                    {"data": "time", className: "text-wrap"},
                    {"data": "complaint_age", className: "text-wrap"},
                    {"data": "StatusDetails", className: "text-wrap"},
                    {"data": "statusType", className: "text-wrap", visible: false},
                    {"data": "status", className: "text-wrap"},
                       {"data": "actionTaken", className: "text-wrap"},
                   
                ],
                "createdRow": function (row, data) {
                    let action_td = document.createElement('td');






        if (data['actionTaken'] === 'Completed') {



            $(row).find('td').eq(8).html('<label class="badge  bg-success" style="font-size:12px">Completed</label>');
        } else if (data['actionTaken'] === 'Incomplete') {


            $(row).find('td').eq(8).html('<label class="badge rounded-pill bg-danger" style="font-size:12px">Incomplete/label>');
        } else if (data['actionTaken'] === 'Queue') {


            $(row).find('td').eq(8).html('<label class="badge bg-info text-dark" style="font-size:12px">Queue</label>');


        } else if (data['actionTaken'] === 'Progress') {


            $(row).find('td').eq(8).html('<label class="badge bg-warning text-dark" style="font-size:12px;">Progress</label>');

        } else if (data['actionTaken'] === 'GetApproved') {


            $(row).find('td').eq(8).html('<label class="badge bg-primary" style="font-size:12px">GetApproved</label>');
        }
          else if (data['actionTaken'] === 'Rejected') {


            $(row).find('td').eq(8).html('<label class="badge bg-danger" style="font-size:12px">Rejected</label>');
        }


        if (data['status'] === 'active' && data['status_repeat'] === 'Reopen') {



            $(row).find('td').eq(7).html('<label class="badge bg-primary" style="font-size:12px; background-color:#84649c !important;">Active </label>  <i class="bi bi-repeat" style="color:black; font-size: 20px; font-weight:bold;">');


        } else if (data['status'] === 'Deactive' && data['status_repeat'] === 'Reopen') {


            $(row).find('td').eq(7).html('<label class="badge bg-primary" style="font-size:12px; background-color:#84649c !important;">Deactive </label>  <i class="bi bi-repeat" style="color:black; font-size: 20px;">');





        } else if (data['status'] === 'active') {


            $(row).find('td').eq(7).html('<label class="badge bg-primary" style="font-size:12px; background-color:#84649c !important;">Active</label>');



        } else if (data['status'] === 'Deactive') {


            $(row).find('td').eq(7).html('<label class="badge bg-primary" style="font-size:12px; background-color:#84649c !important;">Deactive</label>');
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

                        
                        
                                             
           $('#serialNumberPreview_all_trackingProcess').text(data.serial_number);
            $('#customerNmaePreview_all_trackingProcess').text(data.CustomerName);
            $('#customerNICPreview_all_trackingProcess').text(data.CustomerNIC);
            $('#customerEmailPreview_all_trackingProcess').text(data.CustomerEmail);
            $('#firstOfficerPreview_all_trackingProcess').text(data.firstOfficer);
            $('#complaintAgePreview_all_trackingProcess').text(data.complaint_age);
            $('#currentOfficerPreview_all_trackingProcess').text(data.officerName);
            $('#datePreview_all_trackingProcess').text(data.date);
            $('#timePreview_all_trackingProcess').text(data.time);
            $('#detailsPreview_all_trackingProcess').text(data.StatusDetails);
            $('#statusPreview_all_trackingProcess').text(data.status_orginal);
                                               

           fetch('admin/loadComplaintDetailsLog', {
                method: 'POST',
                body: new URLSearchParams({
                    serialNumber: serialNumber,
                })
            }).then((res) => res.text()).then(function (res) {
                if (res != null) {
                    var data = JSON.parse(res);




// Get the timeline container element
var timelineContainer = document.querySelector('.timelineAllComplaintExampleMyComplaintTrackingProcess');

// Clear the previous data in the timeline container
timelineContainer.innerHTML = '';

// Loop through the timeline data and create the timeline items dynamically
data.forEach(function (item
        ) {
  document.getElementById('topicOfAllComplaintTrackingProcess').innerHTML = 'Complaint No: <span style="color: red;">' + item.serial_no + '</span>';


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
                                            '<div class="tl-date text-muted mt-1"' + (item.status_type === '11' ? '   style=" color:red !important; font-size:17px; font-weight:900; " ' : '') + '>' + (item.status_type === '11' ? 'Comment - ' : 'Remarks - ') + '<span  style="color: #6c757d; font-size:16px; font-weight:400;">' + item.remarks + '</span></div>';


  // Append the dot and content to the timeline item
  tlItem.appendChild(tlDot);
  tlItem.appendChild(tlContent);

  // Append the timeline item to the timeline container
  timelineContainer.appendChild(tlItem);
});


  const modalAdminallComplaint = new bootstrap.Modal(document.getElementById('ExtralargeModalVieAllComplaintTracking'));
                    modalAdminallComplaint.show();
                  
                } else {
                    alert("data show is not success");
                }
            });

                        
                        
                        
                        
                        
                        
                        
                        
                        
                    });


    }
}



);

































































//this function to all activitieys

//this code is for all activities

            var status = '';

$("#filterAllComplaintsAllDetails").click(function() {



  status = '';
  dtableTracking.ajax.reload();

  $('#changeTopicDataTableAllDetails').text("All Complaints");
});



$("#filterCompletedComplaintsAllDetails").click(function () {
  

    
    status = 'Completed';

    dtableTracking.ajax.reload();
     $('#changeTopicDataTable').text("Completed Complaints");
});






$("#filterRejectedComplaintAllDetails").click(function () {

    status = 'Rejected';
    dtableTracking.ajax.reload();

     $('#changeTopicDataTable').text("Rejected Complaints");
    
 
});


$("#filterProgressComplaintAllDetails").click(function () {


    status = 'Progress';
    dtableTracking.ajax.reload();
   
     $('#changeTopicDataTable').text("Progress Complaints");
});


$("#filterApprovedComplaintAllDetails").click(function () {

    
    status = 'Approved';
    dtableTracking.ajax.reload();
   
     $('#changeTopicDataTable').text("Aprrove Complaints");
});

$("#filterQueueComplaintAllDetails").click(function () {


    status = 'Queue';
    dtableTracking.ajax.reload();
   
     $('#changeTopicDataTable').text("Queue Complaints");
});


$("#filterTodayComplaintAllDetails").click(function () {

    status = 'today';
    dtableTracking.ajax.reload();
   
     $('#changeTopicDataTable').text("Today Complaints");
});


$("#filterThisMonthComplaintAllDetails").click(function () {
    status = 'month';
   
    dtableTracking.ajax.reload();
  $('#changeTopicDataTable').text("This Month Complaints");

  
});

$("#filterThisYearComplaintAllDetails").click(function () {
    status = 'year';
    dtableTracking.ajax.reload();
 $('#changeTopicDataTable').text("This Year Complaints");
  
});







$("#filterResetCustomeDateComplaintAllDetails").click(function () {
    document.getElementById("FromDateAdminDashboard").value = '';
    document.getElementById("ToDateAdminDashboard").value = '';
});


$.fn.dataTable.ext.errMode = 'none';


            $.fn.dataTable.ext.errMode = 'none';




            var dtableTracking = $('#viewAllComplaintLogs').DataTable({

                "aLengthMenu": [[5, 10, 25, -1], [5, 10, 25, "All"]],
                "pageLength": 0,
                "ordering": true,
                "autoWidth": false,
                "processing": true,
                "serverSide": true,
                "order": [[0, "asc"]],
                "searchHighlight": true,
                "searchDelay": 350,
                "ajax": {
                    "url": "admin/table-data-allComplaintDataLogs",
                    "contentType": "application/json",
                    "type": "POST",
                    "data": function (d) {
                        d.data = status;
                        return JSON.stringify(d);
                    },
                    error: function (xhr, error, code) {
                        console.log(xhr);
                        console.log(code);
                    }
                },
        "columns": [
                    {"data": "status_repeat", className: "text-wrap", visible: false},
                    {"data": "status_orginal", className: "text-wrap", visible: false},
                    {"data": "ID", className: "text-wrap", visible: false},
                    {"data": "complaint_id", visible: false},
                    {"data": "serial_number", className: "text-wrap"},
                    {data: 'officerID', className: 'text-wrap', visible: false},
                    {"data": "officerName", className: "text-wrap"},
                    {"data": "firstOfficer", className: "text-wrap", visible: false},
                    {"data": "CustomerId", className: "text-wrap", visible: false},
                    {"data": "CustomerName", className: "text-wrap"},
                    {"data": "CustomerEmail", className: "text-wrap", visible: false},
                    {"data": "CustomerNIC", className: "text-wrap", visible: false},
                    {"data": "date", className: "text-wrap"},
                    {"data": "time", className: "text-wrap"},
                    {"data": "complaint_age", className: "text-wrap"},
                    {"data": "StatusDetails", className: "text-wrap"},
                    {"data": "statusType", className: "text-wrap", visible: false},
                    {"data": "status", className: "text-wrap"},
                       {"data": "actionTaken", className: "text-wrap"},
                   
                ],
                "createdRow": function (row, data) {
                    let action_td = document.createElement('td');






        if (data['actionTaken'] === 'Completed') {



            $(row).find('td').eq(8).html('<label class="badge  bg-success" style="font-size:12px">Completed</label>');
        } else if (data['actionTaken'] === 'Incomplete') {


            $(row).find('td').eq(8).html('<label class="badge rounded-pill bg-danger" style="font-size:12px">Incomplete/label>');
        } else if (data['actionTaken'] === 'Queue') {


            $(row).find('td').eq(8).html('<label class="badge bg-info text-dark" style="font-size:12px">Queue</label>');


        } else if (data['actionTaken'] === 'Progress') {


            $(row).find('td').eq(8).html('<label class="badge bg-warning text-dark" style="font-size:12px;">Progress</label>');

        } else if (data['actionTaken'] === 'GetApproved') {


            $(row).find('td').eq(8).html('<label class="badge bg-primary" style="font-size:12px">GetApproved</label>');
        }
          else if (data['actionTaken'] === 'Rejected') {


            $(row).find('td').eq(8).html('<label class="badge bg-danger" style="font-size:12px">Rejected</label>');
        }


        if (data['status'] === 'active' && data['status_repeat'] === 'Reopen') {



            $(row).find('td').eq(7).html('<label class="badge bg-primary" style="font-size:12px; background-color:#84649c !important;">Active </label>  <i class="bi bi-repeat" style="color:black; font-size: 20px; font-weight:bold;">');


        } else if (data['status'] === 'Deactive' && data['status_repeat'] === 'Reopen') {


            $(row).find('td').eq(7).html('<label class="badge bg-primary" style="font-size:12px; background-color:#84649c !important;">Deactive </label>  <i class="bi bi-repeat" style="color:black; font-size: 20px;">');





        } else if (data['status'] === 'active') {


            $(row).find('td').eq(7).html('<label class="badge bg-primary" style="font-size:12px; background-color:#84649c !important;">Active</label>');



        } else if (data['status'] === 'Deactive') {


            $(row).find('td').eq(7).html('<label class="badge bg-primary" style="font-size:12px; background-color:#84649c !important;">Deactive</label>');
        }



                    $(row).append(action_td);

                    $(row).on('mouseover', function () {
                        $(row).css({
                            'background-color': '#b5a2c4',
//                            'font-weight': 'bold'
                        });


                    });

                    $(row).on('mouseout', function () {
                        $(row).css({
                            'background-color': '',
//                            'font-weight': ''
                        });

                    });



                    $(row).on('click', function () {
                        var complaintId = data.complaint_id;
                        var officername = data.officerName;



                        var serialNumber = data.serial_number;
        

                     
           $('#serialNumberPreview_allDetails_trackingProcess').text(data.serial_number);
            $('#customerNmaePreview_allDetails_trackingProcess').text(data.CustomerName);
            $('#customerNICPreview_allDetails_trackingProcess').text(data.CustomerNIC);
            $('#customerEmailPreview_allDetails_trackingProcess').text(data.CustomerEmail);
            $('#firstOfficerPreview_allDetails_trackingProcess').text(data.firstOfficer);
            $('#complaintAgePreview_allDetails_trackingProcess').text(data.complaint_age);
            $('#currentOfficerPreview_allDetails_trackingProcess').text(data.officerName);
            $('#datePreview_allDetails_trackingProcess').text(data.date);
            $('#timePreview_allDetails_trackingProcess').text(data.time);
            $('#detailsPreview_allDetails_trackingProcess').text(data.StatusDetails);
            $('#statusPreview_allDetails_trackingProcess').text(data.status_orginal);
                                               

           fetch('admin/loadComplaintDetailsLog', {
                method: 'POST',
                body: new URLSearchParams({
                    serialNumber: serialNumber,
                })
            }).then((res) => res.text()).then(function (res) {
                if (res != null) {
                    var data = JSON.parse(res);




// Get the timeline container element
var timelineContainer = document.querySelector('.timelineAllDetailsComplaintExampleMyComplaintTrackingProcess');

// Clear the previous data in the timeline container
timelineContainer.innerHTML = '';

// Loop through the timeline data and create the timeline items dynamically
data.forEach(function (item
        ) {
  document.getElementById('topicOfAllComplaintDetailsTrackingProcess').innerHTML = 'Complaint No: <span style="color: red;">' + item.serial_no + '</span>';


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
                                            '<div class="tl-date text-muted mt-1"' + (item.status_type === '11' ? '   style=" color:red !important; font-size:17px; font-weight:900; " ' : '') + '>' + (item.status_type === '11' ? 'Comment - ' : 'Remarks - ') + '<span  style="color: #6c757d; font-size:16px; font-weight:400;">' + item.remarks + '</span></div>';


  // Append the dot and content to the timeline item
  tlItem.appendChild(tlDot);
  tlItem.appendChild(tlContent);

  // Append the timeline item to the timeline container
  timelineContainer.appendChild(tlItem);
});


       const modalAdminownComplaint = new bootstrap.Modal(document.getElementById('ExtralargeModalVieAllComplaintDetailsTracking'));
                    modalAdminownComplaint.show();
                  
                } else {
                    alert("data show is not success");
                }
            });


                    });
                }
            }
            );





















































































//thsese codes for own complaint of the relavent officer




 //these code is for own officer function
 
var statusOfficer = '';
var secondFilterOfficer = '';



$("#filterAllComplaintsOfficer").click(function() {


 
  statusOfficer = '';
  myComplaintTableTracking.ajax.reload();

  $('#changeTopicDataTableOfficer').text("All Complaints");
});



$("#filterCompletedComplaintsOfficer").click(function () {
  

    
    statusOfficer = 'Completed';

    myComplaintTableTracking.ajax.reload();
     $('#changeTopicDataTableOfficer').text("Completed Complaints");
});






$("#filterRejectedComplaintOfficer").click(function () {

    statusOfficer = 'Rejected';
    myComplaintTableTracking.ajax.reload();

     $('#changeTopicDataTableOfficer').text("Rejected Complaints");
    
 
});


$("#filterProgressComplaintOfficer").click(function () {


    statusOfficer = 'Progress';
    myComplaintTableTracking.ajax.reload();
   
     $('#changeTopicDataTableOfficer').text("Progress Complaints");
});


$("#filterApprovedComplaintOfficer").click(function () {

    
    statusOfficer = 'Approved';
    myComplaintTableTracking.ajax.reload();
   
     $('#changeTopicDataTableOfficer').text("Aprrove Complaints");
});

$("#filterQueueComplaintOfficer").click(function () {


    statusOfficer = 'Queue';
    myComplaintTableTracking.ajax.reload();
   
     $('#changeTopicDataTableOfficer').text("Queue Complaints");
});


$("#filterTodayComplaintOfficer").click(function () {

    statusOfficer = 'today';
    myComplaintTableTracking.ajax.reload();
   
     $('#changeTopicDataTableOfficer').text("Today Complaints");
});


$("#filterThisMonthComplaintOfficer").click(function () {
    statusOfficer = 'month';
   
    myComplaintTableTracking.ajax.reload();
  $('#changeTopicDataTableOfficer').text("This Month Complaints");

  
});

$("#filterThisYearComplaintOfficer").click(function () {
    statusOfficer = 'year';
    myComplaintTableTracking.ajax.reload();
 $('#changeTopicDataTableOfficer').text("This Year Complaints");
  
});







$("#filterResetCustomeDateComplaintOfficer").click(function () {
    document.getElementById("FromDateAdminDashboard").value = '';
    document.getElementById("ToDateAdminDashboard").value = '';
});




$.fn.dataTable.ext.errMode = 'none';





//this function to mycomplaint tracking 


            var myComplaintTableTracking = $('#viewComplaintTrackingHirachyTable').DataTable({

                "aLengthMenu": [[5, 10, 25, -1], [5, 10, 25, "All"]],
                "pageLength": 0,
                "ordering": true,
                "autoWidth": false,
                "processing": true,
                "serverSide": true,
                "order": [[0, "asc"]],
                "searchHighlight": true,
                "searchDelay": 350,
                "ajax": {
                    "url": "admin/table-hyrachy-trackingCallCenterData",
                    "contentType": "application/json",
                    "type": "POST",
                    "data": function (d) {
                        d.data = statusOfficer;
                        return JSON.stringify(d);
                    },
                    error: function (xhr, error, code) {
                        console.log(xhr);
                        console.log(code);
                    }
                },
                "columns": [
                    {"data": "status_repeat", className: "text-wrap", visible: false},
                    {"data": "status_orginal", className: "text-wrap", visible: false},
                    {"data": "ID", className: "text-wrap", visible: false},
                    {"data": "complaint_id", visible: false},
                    {"data": "serial_number", className: "text-wrap"},
                    {data: 'officerID', className: 'text-wrap', visible: false},
                    {"data": "officerName", className: "text-wrap"},
                    {"data": "firstOfficer", className: "text-wrap", visible: false},
                    {"data": "CustomerId", className: "text-wrap", visible: false},
                    {"data": "CustomerName", className: "text-wrap"},
                    {"data": "CustomerEmail", className: "text-wrap", visible: false},
                    {"data": "CustomerNIC", className: "text-wrap", visible: false},
                    {"data": "date", className: "text-wrap"},
                    {"data": "time", className: "text-wrap"},
                    {"data": "complaint_age", className: "text-wrap"},
                    {"data": "StatusDetails", className: "text-wrap"},
                    {"data": "statusType", className: "text-wrap", visible: false},
                    {"data": "status", className: "text-wrap"},
                    {"data": "actionTaken", className: "text-wrap"},
                ],
                "createdRow": function (row, data) {
                    let action_td = document.createElement('td');






        if (data['actionTaken'] === 'Completed') {



            $(row).find('td').eq(8).html('<label class="badge  bg-success" style="font-size:12px">Completed</label>');
        } else if (data['actionTaken'] === 'Incomplete') {


            $(row).find('td').eq(8).html('<label class="badge rounded-pill bg-danger" style="font-size:12px">Incomplete/label>');
        } else if (data['actionTaken'] === 'Queue') {


            $(row).find('td').eq(8).html('<label class="badge bg-info text-dark" style="font-size:12px">Queue</label>');


        } else if (data['actionTaken'] === 'Progress') {


            $(row).find('td').eq(8).html('<label class="badge bg-warning text-dark" style="font-size:12px;">Progress</label>');

        } else if (data['actionTaken'] === 'GetApproved') {


            $(row).find('td').eq(8).html('<label class="badge bg-primary" style="font-size:12px">GetApproved</label>');
        }
          else if (data['actionTaken'] === 'Rejected') {


            $(row).find('td').eq(8).html('<label class="badge bg-danger" style="font-size:12px">Rejected</label>');
        }


        if (data['status'] === 'active' && data['status_repeat'] === 'Reopen') {



            $(row).find('td').eq(7).html('<label class="badge bg-primary" style="font-size:12px; background-color:#84649c !important;">Active </label>  <i class="bi bi-repeat" style="color:black; font-size: 20px; font-weight:bold;">');


        } else if (data['status'] === 'Deactive' && data['status_repeat'] === 'Reopen') {


            $(row).find('td').eq(7).html('<label class="badge bg-primary" style="font-size:12px; background-color:#84649c !important;">Deactive </label>  <i class="bi bi-repeat" style="color:black; font-size: 20px;">');





        } else if (data['status'] === 'active') {


            $(row).find('td').eq(7).html('<label class="badge bg-primary" style="font-size:12px; background-color:#84649c !important;">Active</label>');



        } else if (data['status'] === 'Deactive') {


            $(row).find('td').eq(7).html('<label class="badge bg-primary" style="font-size:12px; background-color:#84649c !important;">Deactive</label>');
        }















                    $(row).append(action_td);

                    $(row).on('mouseover', function () {
                        $(row).css({
                            'background-color': '#b5a2c4',
                          
                        });


                    });

                    $(row).on('mouseout', function () {
                        $(row).css({
                            'background-color': '',
                       
                        });

                    });



                    $(row).on('click', function () {
                        var complaintId = data.complaint_id;
                        var officername = data.officerName;



                        var serialNumber = data.serial_number;
        
     
                     
           $('#serialNumberPreview_my_trackingProcess').text(data.serial_number);
            $('#customerNmaePreview_my_trackingProcess').text(data.CustomerName);
            $('#customerNICPreview_my_trackingProcess').text(data.CustomerNIC);
            $('#customerEmailPreview_my_trackingProcess').text(data.CustomerEmail);
            $('#firstOfficerPreview_my_trackingProcess').text(data.firstOfficer);
            $('#complaintAgePreview_my_trackingProcess').text(data.complaint_age);
            $('#currentOfficerPreview_my_trackingProcess').text(data.officerName);
            $('#datePreview_my_trackingProcess').text(data.date);
            $('#timePreview_my_trackingProcess').text(data.time);
            $('#detailsPreview_my_trackingProcess').text(data.StatusDetails);
            $('#statusPreview_my_trackingProcess').text(data.status_orginal);
                                               

           fetch('admin/loadComplaintDetailsLog', {
                method: 'POST',
                body: new URLSearchParams({
                    serialNumber: serialNumber,
                })
            }).then((res) => res.text()).then(function (res) {
                if (res != null) {
                    var data = JSON.parse(res);




// Get the timeline container element
var timelineContainer = document.querySelector('.timelineMyComplaintExampleMyComplaintTrackingProcess');

// Clear the previous data in the timeline container
timelineContainer.innerHTML = '';

// Loop through the timeline data and create the timeline items dynamically
data.forEach(function (item
        ) {
  document.getElementById('topicOfMyComplaintTrackingProcess').innerHTML = 'Complaint No: <span style="color: red;">' + item.serial_no + '</span>';


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
                                            '<div class="tl-date text-muted mt-1"' + (item.status_type === '11' ? '   style=" color:red !important; font-size:17px; font-weight:900; " ' : '') + '>' + (item.status_type === '11' ? 'Comment - ' : 'Remarks - ') + '<span  style="color: #6c757d; font-size:16px; font-weight:400;">' + item.remarks + '</span></div>';


  // Append the dot and content to the timeline item
  tlItem.appendChild(tlDot);
  tlItem.appendChild(tlContent);

  // Append the timeline item to the timeline container
  timelineContainer.appendChild(tlItem);
});


  const modalAdminownComplaint = new bootstrap.Modal(document.getElementById('ExtralargeModalViewMyComplaintTracking'));
                    modalAdminownComplaint.show();
                  
                } else {
                    alert("data show is not success");
                }
            });


                    });
                }





            }
            );