


//these functins to change user logs in userlog page in admin

            var status = '';
//this function is to generate a filter lable

            // Get references to the filter items
            const filterAllUserlogsLabel = document.getElementById('filterAllUserlogs');

            const filterTodayUserlogs = document.getElementById('filterTodayUserlogs');
            const filterThisMonthUserlogs = document.getElementById('filterThisMonthUserlogs');
            const filterThisYearUserlogs = document.getElementById('filterThisYearUserlogs');

            // Get reference to the filter label
            const filterLabel = document.getElementById('changeTopicDataTable');




            // Add event listeners to the filter items
            filterAllUserlogsLabel.addEventListener('click', function () {

                filterLabel.textContent = 'All';
                status = '';
                dtable.ajax.reload();
            });



            filterTodayUserlogs.addEventListener('click', function () {
               
                filterLabel.textContent = 'Today';
                status = 'today';
                dtable.ajax.reload();
            });

            filterThisMonthUserlogs.addEventListener('click', function () {
                filterLabel.textContent = 'This Month';
                status = 'month';
                dtable.ajax.reload();
            });

            filterThisYearUserlogs.addEventListener('click', function () {
                filterLabel.textContent = 'This Year';
                status = 'year';
                dtable.ajax.reload();
            });






            $.fn.dataTable.ext.errMode = 'none';




            var dtable = $('#viewAllUserlogsTable').DataTable({

                "aLengthMenu": [[5, 10, 15, 25, -1], [5, 10, 15, 25, "All"]],
                "pageLength": 0,
                "ordering": true,
                "autoWidth": false,
                "processing": true,
                "serverSide": true,
                "order": [[0, "desc"]],
                "searchHighlight": true,
                "searchDelay": 350,
                "language": {
                    'loadingRecords': '&nbsp;',
                    'processing': '<div class="loader2"></div>'
                },
                "ajax": {
                    "url": "table-data-allUserlogsData",
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
                    {"data": "id", className: "text-wrap"},
                    {"data": "name", className: "text-wrap"},
                    {"data": "path", className: "text-wrap"},
                    {"data": "data", className: "text-wrap"},
                    {"data": "time", className: "text-wrap"},
                    {"data": "status", className: "text-wrap"},
                    {"data": "ip", className: "text-wrap"},
                ],
    "createdRow": function (row, data) {
    
        
        
        if (data['status'] === 'active') {

            $(row).find('td').eq(6).html('<label class="badge bg-primary" style="font-size:12px; background-color:#84649c !important;">Active</label>');
        } else  {
            $(row).find('td').eq(6).html('<label class="badge bg-primary" style="font-size:12px; background-color:#84649c !important;">Active</label>');
        }
        


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




    }
            }
            );





















 //these code is for own officer function
 
var statusCommomActivity = '';




$("#filterAllComplaintsOfficer").click(function() {


 
  statusCommomActivity = '';
  dtableViewOfficer.ajax.reload();

  $('#changeTopicDataTableOfficer').text("All Activity");
});









$("#filterTodayComplaintOfficer").click(function () {

    statusCommomActivity = 'today';
    dtableuserActivity12.ajax.reload();
   
     $('#changeTopicDataTableOfficer').text("Today Activity");
});


$("#filterThisMonthComplaintOfficer").click(function () {
    statusCommomActivity = 'month';
   
    dtableuserActivity12.ajax.reload();
  $('#changeTopicDataTableOfficer').text("This Month Activity");

  
});

$("#filterThisYearComplaintOfficer").click(function () {
    statusCommomActivity = 'year';
    dtableuserActivity12.ajax.reload();
 $('#changeTopicDataTableOfficer').text("This Year Activity");
  
});







$("#filterResetCustomeDateComplaintOfficer").click(function () {
    document.getElementById("FromDateAdminDashboard").value = '';
    document.getElementById("ToDateAdminDashboard").value = '';
});







            $.fn.dataTable.ext.errMode = 'none';


            var dtableuserActivity12 = $('#viewUserActivityTable').DataTable({

                "aLengthMenu": [[5,10, 15, 25, -1], [5,10, 15, 25, "All"]],
                "pageLength": 0,
                "ordering": true,
                "autoWidth": false,
                "processing": true,
                "serverSide": true,
                "order": [[0, "desc"]],
                "searchHighlight": true,
                "searchDelay": 350,
//                "language": {
//                    'loadingRecords': '&nbsp;',
//                    'processing': '<div class="loader2"></div>'
//                },
                "ajax": {
                    "url": "table-data-allUserCommonActivityTable",
                    "contentType": "application/json",
                    "type": "POST",
                    "data": function (d) {
                        d.data = statusCommomActivity;
                        return JSON.stringify(d);
                    },
                    error: function (xhr, error, code) {
                        console.log(xhr);
                        console.log(code);
                    }
                },
                "columns": [
                    {"data": "id", className: "text-wrap", visible: false},
                    {"data": "officerName", className: "text-wrap"},
                    {"data": "officerID", className: "text-wrap"},
                    {"data": "time", className: "text-wrap", visible: false},
                    {"data": "date", className: "text-wrap", visible: false},
                    {"data": "datetime", className: "text-wrap"},
                    {"data": "activity", className: "text-wrap"},
                                        {"data": "details", className: "text-wrap"},
                    {"data": "status", className: "text-wrap", visible: false}
                ],
                
               "createdRow": function (row, data) {
       


  

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


    }     

            }
            );





