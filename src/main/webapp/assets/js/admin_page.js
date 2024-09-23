/* 
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Other/javascript.js to edit this template
 */

/*
 * 
 * this function to assing user name and user type from the session
 */


document.addEventListener('DOMContentLoaded', function () {
    var apiUrl = 'fetchData';

    fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({})
    })
            .then(function (response) {
                if (response.ok) {
                    return response.text();
                } else {
                    throw new Error('Error: ' + response.status);
                }
            })
            .then(function (responseData) {
                const parsedData = JSON.parse(responseData);

                // Extracting the "utype" value
                const uShortName = parsedData.uName;
                const uFullName = parsedData.uName;
                const uType = parsedData.uType;
                const image = parsedData.image;


                var formattedName = formatName(uShortName);
                function formatName(name) {
                    var parts = name.split(' ');
                    if (parts.length > 1) {
                        var firstName = parts[0].charAt(0).toUpperCase();
                        var lastName = parts.slice(1).join(' ');
                        return firstName + '. ' + lastName;
                    }
                    return name;
                }


                // Handle the fetched data here
                document.getElementById('getUserNameShortfromSession').textContent = formattedName;
                document.getElementById('getUserNameFullfromSession').textContent = uFullName;
                document.getElementById('getUserTypefromSession').textContent = uType;
                $('#getUserImagefromSession').attr('src',"loadUsers?file="+image );
            })
            .catch(function (error) {
                console.error(error);
            });
});






/*
 * this code is for logout 
 */

document.getElementById('logOutbtn').addEventListener('click', function (evt) {
   

    $.ajax({
        type: 'POST',
        url: 'logout', // Specify the URL mapping for your LogoutController
        success: function (data) {
            // Handle the success response, if needed
            window.location.href = '/CCMPortal/login'; // Redirect to the login page after logout
        },
        error: function () {
            alert("not succ");
            // Handle any errors, if needed
        }
    });

});


















var officerDetailsLoadcheck = new SlimSelect({
    select: '.OfficerSearchFieldMy',
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
    $('.OfficerSearchFieldMy').data('select', officerDetailsLoadcheck);
   
    

});



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
    
    
    
    
});













/*
 * this fuction to open the profile of the user
 */

$(document).on('click', '#userProfileDetails', function () {
    var url = "userProfileController"; // Replace with your desired URL

    // Make an AJAX request to the controller
    $.ajax({
        url: url,
        method: "GET",
        success: function (response) {
            // Redirect to the profile page
            window.location.href = "userProfileController";
        },
        error: function (xhr, status, error) {
            // Handle errors, if any
            console.error(error);
        }
    });
});











/*
 *        this code for button of add complaint type in admin page
 */



// Attach a click event listener to the '#btnAddComplaint' element using event delegation
$(document).on('click', '#btnAddComplaint', function () {

// Set the 'display' property of the 'addNewComplaintType' element to 'inline'
    $('#addNewComplaintType').css('display', 'inline');
    // Set the 'display' property of the 'complaint_category_add_complaint' element to 'none'
    $('#complaint_type_add_complaint').css('display', 'none');
    $('#verticalycentered_complaint_type_add').show();
});
/*
 * this code for button of add new compaint type inside the complaint add panel
 */

$(document).on('click', '#verticalycentered_complaint_type_add', function () {

    $('#addNewComplaintType').hide();
    $('#complaint_type_add_complaint').css({
        display: 'inline',
        visibility: 'visible'
    });
    $('#verticalycentered_complaint_type_add').hide();
});




//
////load Compalint type to admin page
//$('#addComplaintloadTableData').DataTable({
//
//    "aLengthMenu": [[2, 5, 10, 15], [2, 5, 10, 15]],
//    "pageLength": 3,
//    "serverSide": true,
//    "ajax": {
//        "url": "table-data-complaintType",
//        "contentType": "application/json",
//        "type": "POST",
//        "data": function (d) {
//            return JSON.stringify(d);
//        },
//        error: function (xhr, error, code) {
//            console.log(xhr);
//            console.log(code);
//        }
//    },
//    "columns": [
//        {"data": "id", visible: false},
////                {"data": "id"},
//        {"data": "type", className: "text-wrap"},
//        {"data": "status", className: "text-wrap"},
//    ],
//    "createdRow": function (row, data) {
//        let action_td = document.createElement('td');
//        if (data['status'] === 'deactivated') {
//            $(action_td).append('<a href="javascript:void(0)" class="rerec text-wrap"> <i class="bi bi-arrow-clockwise" style="font-size:20px; color:blue;"></i></a>');
////                    $(row).find('td').eq(2).addClass('my-deactive-classLable');
//
//            $(row).find('td').eq(1).html('<label class="badge rounded-pill bg-danger" style="font-size:15px">Deactive</label>');
//        } else {
//            $(action_td).append('<a href="javascript:void(0)" class="editrec text-wrap"><i class="bi bi-pencil-square" style="font-size:20px; color:green"></i></a><a href="javascript:void(0)" class="editrec"><i class="bi bi-trash" style="font-size:20px; margin-left:10px; color:red"></i></a>');
////             $(row).find('td').eq(2).addClass('my-deactive-classLable');
//            $(row).find('td').eq(1).html('<label class="badge rounded-pill bg-success" style="font-size:15px">Active</label>');
//        }

//        $(row).append(action_td);
//    }
//
//});
/*
 *        this code for button of add product type in admin page
 */


$(document).ready(function () {



    var tableUser = $('#addComplaintloadTableData').DataTable({
        "aLengthMenu": [[5, 10, 25, -1], [5, 10, 25, "All"]],
        "pageLength": 10, // Update the desired number of records per page
        "ordering": true,
        "autoWidth": true,
        "processing": true,
        "serverSide": true,
        "order": [[0, "desc"]],
        "searchHighlight": true,
        "searchDelay": 350,
        "responsive": true,
        "ajax": {
            "url": "table-data-complaintType",
            "contentType": "application/json",
            "type": "POST",
            "data": function (d) {
                return JSON.stringify(d);
            },
            "dataSrc": function (response) {
                return response.data; // Assuming your server-side script returns data property with the actual records
            },
            "error": function (xhr, error, code) {
                console.log(xhr);
                console.log(code);
            }
        },
        "columns": [
            {"data": "id", visible: false},
            {"data": "type", className: "text-wrap"},
            {"data": "status", className: "text-wrap"},
        ],
        "createdRow": function (row, data) {
            let action_td = document.createElement('td');
            if (data['status'] === 'deactivated') {
                $(action_td).append('<a href="javascript:void(0)" class="rerec text-wrap" id="reactiveComplaintType"> <i class="bi bi-arrow-clockwise" style="font-size:20px; color:blue;"></i></a>');
                $(row).find('td').eq(1).html('<label class="badge rounded-pill bg-danger" style="font-size:15px">Deactive</label>');
            } else {
                $(action_td).append('<a id="deactivateComplaintType" href="javascript:void(0)" class="editrec text-wrap"><i class="bi bi-sign-stop" style="font-size:20px; color:orange"></i></a><a id="deleteComplaintType" href="javascript:void(0)" class="editrec"><i class="bi bi-trash" style="font-size:20px; margin-left:10px; color:red"></i></a>');

                $(row).find('td').eq(1).html('<label class="badge rounded-pill bg-success" style="font-size:15px">Active</label>');
            }
            $(row).append(action_td);
        }
    });





    $('#addComplaintloadTableData').on('click', '#deactivateComplaintType', function () {
        var data = tableUser.row($(this).closest('tr')).data();
        var id = data.id;



        Swal.fire({
            title: 'Are you sure?',
            text: "This User Will be Deactivated!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, Proceed!',
            showLoaderOnConfirm: true,
            preConfirm: () => {
                return fetch('admin/deactivate-complaintType', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        id: id
                    })
                }).then(response => {
                    if (!response.ok) {
                        throw new Error(response.statusText);
                    }
                    return response.json();
                }).catch(error => {
                    Swal.showValidationMessage('Request failed:' + error);
                });
            },
            allowOutsideClick: () => !Swal.isLoading()
        }).then((result) => {
            if (result.value) {
                if (result.value.status === 'error') {
                    Swal.fire('Error!', 'Failed to deactivate user', 'error');
                } else {
                    Swal.fire('Successful!', 'User has been deactivated!', 'success');
                    tableUser.ajax.reload();
                }
            }
        });
    });




    $('#addComplaintloadTableData').on('click', '#reactiveComplaintType', function () {
        var data = tableUser.row($(this).closest('tr')).data();
        var id = data.id;

        Swal.fire({
            title: 'Are you sure?',
            text: "This User Will be Activated!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, Proceed!',
            showLoaderOnConfirm: true,
            preConfirm: () => {
                return fetch('admin/reactivate-complaintType', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        id: id
                    })
                }).then(response => {
                    if (!response.ok) {
                        throw new Error(response.statusText);
                    }
                    return response.json();
                }).catch(error => {
                    Swal.showValidationMessage('Request failed:' + error);
                });
            },
            allowOutsideClick: () => !Swal.isLoading()
        }).then((result) => {
            if (result.value) {
                if (result.value.status === 'error') {
                    Swal.fire('Error!', 'Failed to activate user', 'error');
                } else {
                    Swal.fire('Successful!', 'User has been activated!', 'success');
                    tableUser.ajax.reload();
                }
            }
        });
    });



    $('#addComplaintloadTableData').on('click', '#deleteComplaintType', function () {
        var data = tableUser.row($(this).closest('tr')).data();
        var id = data.id;

        Swal.fire({
            title: 'Are you sure?',
            text: "This Complaint Type Will be Deleted!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, Proceed!',
            showLoaderOnConfirm: true,
            preConfirm: () => {
                return fetch('admin/delete-complaintType', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        id: id
                    })
                }).then(response => {
                    if (!response.ok) {
                        throw new Error(response.statusText);
                    }
                    return response.json();
                }).catch(error => {
                    Swal.showValidationMessage('Request failed:' + error);
                });
            },
            allowOutsideClick: () => !Swal.isLoading()
        }).then((result) => {
            if (result.value) {
                if (result.value.status === 'error') {
                    Swal.fire('Error!', 'Failed to activate user', 'error');
                } else {
                    Swal.fire('Successful!', 'User has been activated!', 'success');
                    tableUser.ajax.reload();
                }
            }

        });
    });
    $('#addComplaintTypetoDataTable').on('click', function () {
        var inputComplaintType = document.getElementById('inputComplaintTypetoDatabase').value;

        Swal.fire({
            title: 'Are you sure?',
            text: 'This Complaint Type Will be Added!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, Proceed!',
            showLoaderOnConfirm: true,
            preConfirm: () => {
                return fetch('admin/insert-complaintType', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        input: inputComplaintType
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
            if (result.value) {
                if (result.value.status === 'error') {
                    Swal.fire('Error!', 'Failed to insert data', 'error');
                } else {
                    Swal.fire('Successful!', 'a complaint type has been added!', 'success');
                    document.getElementById('inputComplaintTypetoDatabase').value = "";
                    tableUser.ajax.reload();
                }
            }
        });
    });


});





























// Attach a click event listener to the '#btnAddComplaint' element using event delegation
$(document).on('click', '#btnProductType', function () {

// Set the 'display' property of the 'addNewComplaintType' element to 'inline'
    $('#addNewProductType').css('display', 'inline');
    // Set the 'display' property of the 'complaint_category_add_complaint' element to 'none'
    $('#product_type_add_complaint').css('display', 'none');
    $('#verticalycentered_product_type_add').show();
});
/*
 * this code for button of add new compaint type inside the complaint add panel
 */

$(document).on('click', '#verticalycentered_product_type_add', function () {

    $('#addNewProductType').hide();
    $('#product_type_add_complaint').css({
        display: 'inline',
        visibility: 'visible'
    });
    $('#verticalycentered_product_type_add').hide();
});




/*
 *        this code for button of add product type in admin page
 */


$(document).ready(function () {



    var tableProductType = $('#tblAddProductType').DataTable({
        "aLengthMenu": [[5, 10, 25, -1], [5, 10, 25, "All"]],
        "pageLength": 10, // Update the desired number of records per page
        "ordering": true,
        "autoWidth": true,
        "processing": true,
        "serverSide": true,
        "order": [[0, "desc"]],
        "searchHighlight": true,
        "searchDelay": 350,
        "responsive": true,
        "ajax": {
            "url": "table-dataAddProduct",
            "contentType": "application/json",
            "type": "POST",
            "data": function (d) {
                return JSON.stringify(d);
            },
            "dataSrc": function (response) {
                return response.data; // Assuming your server-side script returns data property with the actual records
            },
            "error": function (xhr, error, code) {
                console.log(xhr);
                console.log(code);
            }
        },
        "columns": [
            {"data": "id", visible: false},
            {"data": "type", className: "text-wrap"},
            {"data": "status", className: "text-wrap"},
        ],
        "createdRow": function (row, data) {
            let action_td = document.createElement('td');
            if (data['status'] === 'deactivated') {
                $(action_td).append('<a href="javascript:void(0)" class="rerec text-wrap" id="reactiveProductType"> <i class="bi bi-arrow-clockwise" style="font-size:20px; color:blue;"></i></a>');
                $(row).find('td').eq(1).html('<label class="badge rounded-pill bg-danger" style="font-size:15px">Deactive</label>');
            } else {
                $(action_td).append('<a id="deactivateProductType" href="javascript:void(0)" class="editrec text-wrap"><i class="bi bi-sign-stop" style="font-size:20px; color:orange"></i></a><a id="deleteProductType" href="javascript:void(0)" class="editrec"><i class="bi bi-trash" style="font-size:20px; margin-left:10px; color:red"></i></a>');

                $(row).find('td').eq(1).html('<label class="badge rounded-pill bg-success" style="font-size:15px">Active</label>');
            }
            $(row).append(action_td);
        }
    });





    $('#tblAddProductType').on('click', '#deactivateProductType', function () {
        var data = tableProductType.row($(this).closest('tr')).data();
        var id = data.id;



        Swal.fire({
            title: 'Are you sure?',
            text: "This User Will be Deactivated!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, Proceed!',
            showLoaderOnConfirm: true,
            preConfirm: () => {
                return fetch('admin/deactivate-ProductType', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        id: id
                    })
                }).then(response => {
                    if (!response.ok) {
                        throw new Error(response.statusText);
                    }
                    return response.json();
                }).catch(error => {
                    Swal.showValidationMessage('Request failed:' + error);
                });
            },
            allowOutsideClick: () => !Swal.isLoading()
        }).then((result) => {
            if (result.value) {
                if (result.value.status === 'error') {
                    Swal.fire('Error!', 'Failed to deactivate ProductType', 'error');
                } else {
                    Swal.fire('Successful!', 'ProductType has been deactivated!', 'success');
                    tableProductType.ajax.reload();
                }
            }
        });
    });




    $('#tblAddProductType').on('click', '#reactiveProductType', function () {
        var data = tableProductType.row($(this).closest('tr')).data();
        var id = data.id;

        Swal.fire({
            title: 'Are you sure?',
            text: "This ProductType Will be Activated!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, Proceed!',
            showLoaderOnConfirm: true,
            preConfirm: () => {
                return fetch('admin/reactivate-ProductType', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        id: id
                    })
                }).then(response => {
                    if (!response.ok) {
                        throw new Error(response.statusText);
                    }
                    return response.json();
                }).catch(error => {
                    Swal.showValidationMessage('Request failed:' + error);
                });
            },
            allowOutsideClick: () => !Swal.isLoading()
        }).then((result) => {
            if (result.value) {
                if (result.value.status === 'error') {
                    Swal.fire('Error!', 'Failed to activate ProductType', 'error');
                } else {
                    Swal.fire('Successful!', 'ProductType has been activated!', 'success');
                    tableProductType.ajax.reload();
                }
            }
        });
    });



    $('#tblAddProductType').on('click', '#deleteProductType', function () {
        var data = tableProductType.row($(this).closest('tr')).data();
        var id = data.id;

        Swal.fire({
            title: 'Are you sure?',
            text: "This Product Type Will be Deleted!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, Proceed!',
            showLoaderOnConfirm: true,
            preConfirm: () => {
                return fetch('admin/delete-ProductType', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        id: id
                    })
                }).then(response => {
                    if (!response.ok) {
                        throw new Error(response.statusText);
                    }
                    return response.json();
                }).catch(error => {
                    Swal.showValidationMessage('Request failed:' + error);
                });
            },
            allowOutsideClick: () => !Swal.isLoading()
        }).then((result) => {
            if (result.value) {
                if (result.value.status === 'error') {
                    Swal.fire('Error!', 'Failed to activate Product Type', 'error');
                } else {
                    Swal.fire('Successful!', 'Product Type has been activated!', 'success');
                    tableProductType.ajax.reload();
                }
            }

        });
    });



    $('#addProductTypeNewItem').on('click', function () {
        var inputProductType = document.getElementById('inputProductTypetoDatabase').value;


        Swal.fire({
            title: 'Are you sure?',
            text: 'This Product Type Will be Added!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, Proceed!',
            showLoaderOnConfirm: true,
            preConfirm: () => {
                return fetch('admin/insert-ProductType', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        input: inputProductType
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
            if (result.value) {
                if (result.value.status === 'error') {
                    Swal.fire('Error!', 'Failed to insert data', 'error');
                } else {
                    Swal.fire('Successful!', 'a Product Type has been added!', 'success');
                    document.getElementById('inputProductTypetoDatabase').value = "";
                    tableProductType.ajax.reload();
                }
            }
        });
    });


});























/*
 *        this code for button of add Compalint  Category in admin page
 */



// Attach a click event listener to the '#btnAddComplaint' element using event delegation
$(document).on('click', '#btnComplaintCategory', function () {


// Set the 'display' property of the 'addNewComplaintType' element to 'inline'
    $('#addNewComplaintCategory').css('display', 'inline');
    // Set the 'display' property of the 'complaint_category_add_complaint' element to 'none'
    $('#complaint_category_add_complaint').css('display', 'none');
    $('#verticalycentered_complaint_category_add').show();
});
/*
 * this code for button of add new compaint type inside the complaint add panel
 */

$(document).on('click', '#verticalycentered_complaint_category_add', function () {
    $('#addNewComplaintCategory').hide();
    $('#complaint_category_add_complaint').css({
        display: 'inline',
        visibility: 'visible'
    });
    $('#verticalycentered_complaint_category_add').hide();
});


/*
 *        this code for button of add Complaint category in admin page
 */


$(document).ready(function () {



    var tableComplaintCategory = $('#addComplaintCategoryTableData').DataTable({
        "aLengthMenu": [[5, 10, 25, -1], [5, 10, 25, "All"]],
        "pageLength": 10, // Update the desired number of records per page
        "ordering": true,
        "autoWidth": true,
        "processing": true,
        "serverSide": true,
        "order": [[0, "desc"]],
        "searchHighlight": true,
        "searchDelay": 350,
        "responsive": true,
        "ajax": {
            "url": "table-dataAddComplaintCategory",
            "contentType": "application/json",
            "type": "POST",
            "data": function (d) {
                return JSON.stringify(d);
            },
            "dataSrc": function (response) {
                return response.data; // Assuming your server-side script returns data property with the actual records
            },
            "error": function (xhr, error, code) {
                console.log(xhr);
                console.log(code);
            }
        },
        "columns": [
            {"data": "id", visible: false},
            {"data": "type", className: "text-wrap"},
            {"data": "status", className: "text-wrap"},
        ],
        "createdRow": function (row, data) {
            let action_td = document.createElement('td');
            if (data['status'] === 'deactivated') {
                $(action_td).append('<a href="javascript:void(0)" class="rerec text-wrap" id="reactiveComplaintCategory"> <i class="bi bi-arrow-clockwise" style="font-size:20px; color:blue;"></i></a>');
                $(row).find('td').eq(1).html('<label class="badge rounded-pill bg-danger" style="font-size:15px">Deactive</label>');
            } else {
                $(action_td).append('<a id="deactivateComplaintCategory" href="javascript:void(0)" class="editrec text-wrap"><i class="bi bi-sign-stop" style="font-size:20px; color:orange"></i></a><a id="deleteComplaintCategory" href="javascript:void(0)" class="editrec"><i class="bi bi-trash" style="font-size:20px; margin-left:10px; color:red"></i></a>');

                $(row).find('td').eq(1).html('<label class="badge rounded-pill bg-success" style="font-size:15px">Active</label>');
            }
            $(row).append(action_td);
        }
    });





    $('#addComplaintCategoryTableData').on('click', '#deactivateComplaintCategory', function () {
        var data = tableComplaintCategory.row($(this).closest('tr')).data();
        var id = data.id;



        Swal.fire({
            title: 'Are you sure?',
            text: "This User Will be Deactivated!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, Proceed!',
            showLoaderOnConfirm: true,
            preConfirm: () => {
                return fetch('admin/deactivate-ComplaintCategory', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        id: id
                    })
                }).then(response => {
                    if (!response.ok) {
                        throw new Error(response.statusText);
                    }
                    return response.json();
                }).catch(error => {
                    Swal.showValidationMessage('Request failed:' + error);
                });
            },
            allowOutsideClick: () => !Swal.isLoading()
        }).then((result) => {
            if (result.value) {
                if (result.value.status === 'error') {
                    Swal.fire('Error!', 'Failed to deactivate ProductType', 'error');
                } else {
                    Swal.fire('Successful!', 'ProductType has been deactivated!', 'success');
                    tableComplaintCategory.ajax.reload();
                }
            }
        });
    });




    $('#addComplaintCategoryTableData').on('click', '#reactiveComplaintCategory', function () {
        var data = tableComplaintCategory.row($(this).closest('tr')).data();
        var id = data.id;

        Swal.fire({
            title: 'Are you sure?',
            text: "This ProductType Will be Activated!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, Proceed!',
            showLoaderOnConfirm: true,
            preConfirm: () => {
                return fetch('admin/reactivate-ComplaintCategory', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        id: id
                    })
                }).then(response => {
                    if (!response.ok) {
                        throw new Error(response.statusText);
                    }
                    return response.json();
                }).catch(error => {
                    Swal.showValidationMessage('Request failed:' + error);
                });
            },
            allowOutsideClick: () => !Swal.isLoading()
        }).then((result) => {
            if (result.value) {
                if (result.value.status === 'error') {
                    Swal.fire('Error!', 'Failed to activate ProductType', 'error');
                } else {
                    Swal.fire('Successful!', 'ProductType has been activated!', 'success');
                    tableComplaintCategory.ajax.reload();
                }
            }
        });
    });





    $('#addComplaintCategoryTableData').on('click', '#deleteComplaintCategory', function () {
        var data = tableComplaintCategory.row($(this).closest('tr')).data();
        var id = data.id;

        Swal.fire({
            title: 'Are you sure?',
            text: "This Product Type Will be Deleted!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, Proceed!',
            showLoaderOnConfirm: true,
            preConfirm: () => {
                return fetch('admin/delete-ComplaintCategory', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        id: id
                    })
                }).then(response => {
                    if (!response.ok) {
                        throw new Error(response.statusText);
                    }
                    return response.json();
                }).catch(error => {
                    Swal.showValidationMessage('Request failed:' + error);
                });
            },
            allowOutsideClick: () => !Swal.isLoading()
        }).then((result) => {
            if (result.value) {
                if (result.value.status === 'error') {
                    Swal.fire('Error!', 'Failed to activate Product Type', 'error');
                } else {
                    Swal.fire('Successful!', 'Product Type has been activated!', 'success');
                    tableComplaintCategory.ajax.reload();
                }
            }

        });
    });


    $('#addComplaintCategoryNewItem').on('click', function () {
    

        var inputComplaintCategorytext = $('#inputComplaintCategory').val();
    


        Swal.fire({
            title: 'Are you sure?',
            text: 'This Product Type Will be Added!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, Proceed!',
            showLoaderOnConfirm: true,
            preConfirm: () => {
                return fetch('admin/insert-ComplaintCategory', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        input: inputComplaintCategorytext
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
            if (result.value) {
                if (result.value.status === 'error') {
                    Swal.fire('Error!', 'Failed to insert data', 'error');
                } else {
                    Swal.fire('Successful!', 'A Product Type has been added!', 'success');
                    document.getElementById('inputProductTypetoDatabase').value = "";
                    tableComplaintCategory.ajax.reload();
                }
            }
        });

    });








});















































/*
 *        this code for button of add reaching mode in admin page
 */



// Attach a click event listener to the '#btnAddComplaint' element using event delegation
$(document).on('click', '#btnReachingMode', function () {


// Set the 'display' property of the 'addNewComplaintType' element to 'inline'
    $('#addNewReachingMode').css('display', 'inline');
    // Set the 'display' property of the 'complaint_category_add_complaint' element to 'none'
    $('#reaching_mode_add_complaint').css('display', 'none');
    $('#verticalycentered_reaching_mode_add').show();
});
/*
 * this code for button of add new compaint type inside the complaint add panel
 */

$(document).on('click', '#verticalycentered_reaching_mode_add', function () {

    $('#addNewReachingMode').hide();
    $('#reaching_mode_add_complaint').css({
        display: 'inline',
        visibility: 'visible'
    });
    $('#verticalycentered_reaching_mode_add').hide();
});







/*
 *        this code for button of add reaching mode in admin page
 */


$(document).ready(function () {



    var tableReachingMode = $('#addReachingModeTableData').DataTable({
        "aLengthMenu": [[5, 10, 25, -1], [5, 10, 25, "All"]],
        "pageLength": 10, // Update the desired number of records per page
        "ordering": true,
        "autoWidth": true,
        "processing": true,
        "serverSide": true,
        "order": [[0, "desc"]],
        "searchHighlight": true,
        "searchDelay": 350,
        "responsive": true,
        "ajax": {
            "url": "table-data-reachingMode",
            "contentType": "application/json",
            "type": "POST",
            "data": function (d) {
                return JSON.stringify(d);
            },
            "dataSrc": function (response) {
                return response.data; // Assuming your server-side script returns data property with the actual records
            },
            "error": function (xhr, error, code) {
                console.log(xhr);
                console.log(code);
            }
        },
        "columns": [
            {"data": "id", visible: false},
            {"data": "type", className: "text-wrap"},
            {"data": "status", className: "text-wrap"},
        ],
        "createdRow": function (row, data) {
            let action_td = document.createElement('td');
            if (data['status'] === 'deactivated') {
                $(action_td).append('<a href="javascript:void(0)" class="rerec text-wrap" id="reactiveReachingMode"> <i class="bi bi-arrow-clockwise" style="font-size:20px; color:blue;"></i></a>');
                $(row).find('td').eq(1).html('<label class="badge rounded-pill bg-danger" style="font-size:15px">Deactive</label>');
            } else {
                $(action_td).append('<a id="deactivateReachingMode" href="javascript:void(0)" class="editrec text-wrap"><i class="bi bi-sign-stop" style="font-size:20px; color:orange"></i></a><a id="deleteReachingMode" href="javascript:void(0)" class="editrec"><i class="bi bi-trash" style="font-size:20px; margin-left:10px; color:red"></i></a>');

                $(row).find('td').eq(1).html('<label class="badge rounded-pill bg-success" style="font-size:15px">Active</label>');
            }
            $(row).append(action_td);
        }
    });





    $('#addReachingModeTableData').on('click', '#deactivateReachingMode', function () {
        var data = tableReachingMode.row($(this).closest('tr')).data();
        var id = data.id;



        Swal.fire({
            title: 'Are you sure?',
            text: "This User Will be Deactivated!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, Proceed!',
            showLoaderOnConfirm: true,
            preConfirm: () => {
                return fetch('admin/deactivate-ReachingMode ', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        id: id
                    })
                }).then(response => {
                    if (!response.ok) {
                        throw new Error(response.statusText);
                    }
                    return response.json();
                }).catch(error => {
                    Swal.showValidationMessage('Request failed:' + error);
                });
            },
            allowOutsideClick: () => !Swal.isLoading()
        }).then((result) => {
            if (result.value) {
                if (result.value.status === 'error') {
                    Swal.fire('Error!', 'Failed to deactivate ProductType', 'error');
                } else {
                    Swal.fire('Successful!', 'ProductType has been deactivated!', 'success');
                    tableReachingMode.ajax.reload();
                }
            }
        });
    });




    $('#addReachingModeTableData').on('click', '#reactiveReachingMode', function () {
        var data = tableReachingMode.row($(this).closest('tr')).data();
        var id = data.id;

        Swal.fire({
            title: 'Are you sure?',
            text: "This ProductType Will be Activated!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, Proceed!',
            showLoaderOnConfirm: true,
            preConfirm: () => {
                return fetch('admin/reactivate-ReachingMode', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        id: id
                    })
                }).then(response => {
                    if (!response.ok) {
                        throw new Error(response.statusText);
                    }
                    return response.json();
                }).catch(error => {
                    Swal.showValidationMessage('Request failed:' + error);
                });
            },
            allowOutsideClick: () => !Swal.isLoading()
        }).then((result) => {
            if (result.value) {
                if (result.value.status === 'error') {
                    Swal.fire('Error!', 'Failed to activate ProductType', 'error');
                } else {
                    Swal.fire('Successful!', 'ProductType has been activated!', 'success');
                    tableReachingMode.ajax.reload();
                }
            }
        });
    });



    $('#addReachingModeTableData').on('click', '#deleteReachingMode', function () {
        var data = tableReachingMode.row($(this).closest('tr')).data();
        var id = data.id;

        Swal.fire({
            title: 'Are you sure?',
            text: "This Product Type Will be Deleted!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, Proceed!',
            showLoaderOnConfirm: true,
            preConfirm: () => {
                return fetch('admin/delete-ReachingMode', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        id: id
                    })
                }).then(response => {
                    if (!response.ok) {
                        throw new Error(response.statusText);
                    }
                    return response.json();
                }).catch(error => {
                    Swal.showValidationMessage('Request failed:' + error);
                });
            },
            allowOutsideClick: () => !Swal.isLoading()
        }).then((result) => {
            if (result.value) {
                if (result.value.status === 'error') {
                    Swal.fire('Error!', 'Failed to activate Product Type', 'error');
                } else {
                    Swal.fire('Successful!', 'Product Type has been activated!', 'success');
                    tableReachingMode.ajax.reload();
                }
            }

        });
    });

 

    $('#addReachingModeNewItem').on('click', function () {
        var inputReachingMode = document.getElementById('inputReachingModetext').value;


        Swal.fire({
            title: 'Are you sure?',
            text: 'This Product Type Will be Added!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, Proceed!',
            showLoaderOnConfirm: true,
            preConfirm: () => {
                return fetch('admin/insert-ReachingMode', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        input: inputReachingMode
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
            if (result.value) {
                if (result.value.status === 'error') {
                    Swal.fire('Error!', 'Failed to insert data', 'error');
                } else {
                    Swal.fire('Successful!', 'a Product Type has been added!', 'success');
                    document.getElementById('inputProductTypetoDatabase').value = "";
                    tableReachingMode.ajax.reload();
                }
            }
        });
    });


});























// Attach a click event listener to the '#btnAddComplaint' element using event delegation
$(document).on('click', '#btnAddBranch', function () {

// Set the 'display' property of the 'addNewComplaintType' element to 'inline'
    $('#addNewBranch').css('display', 'inline');
    // Set the 'display' property of the 'complaint_category_add_complaint' element to 'none'
    $('#Branch_add_complaint').css('display', 'none');
    $('#verticalycentered_Branch_add').show();
});
/*
 * this code for button of add new compaint type inside the complaint add panel
 */

$(document).on('click', '#verticalycentered_Branch_add', function () {

    $('#addNewBranch').hide();
    $('#Branch_add_complaint').css({
        display: 'inline',
        visibility: 'visible'
    });
    $('#verticalycentered_Branch_add').hide();
});


/*
 *        this code for button of add reaching mode in admin page
 */


$(document).ready(function () {



    var tableBranch = $('#addBranchTableData').DataTable({
        "aLengthMenu": [[5, 10, 25, -1], [5, 10, 25, "All"]],
        "pageLength": 10, // Update the desired number of records per page
        "ordering": true,
        "autoWidth": true,
        "processing": true,
        "serverSide": true,
        "order": [[0, "desc"]],
        "searchHighlight": true,
        "searchDelay": 350,
        "responsive": true,
        "ajax": {
            "url": "table-data-Branch",
            "contentType": "application/json",
            "type": "POST",
            "data": function (d) {
                return JSON.stringify(d);
            },
            "dataSrc": function (response) {
                return response.data; // Assuming your server-side script returns data property with the actual records
            },
            "error": function (xhr, error, code) {
                console.log(xhr);
                console.log(code);
            }
        },
        "columns": [
            {"data": "id", visible: false},
            {"data": "type", className: "text-wrap"},
            {"data": "status", className: "text-wrap"},
        ],
        "createdRow": function (row, data) {
            let action_td = document.createElement('td');
            if (data['status'] === 'deactivated') {
                $(action_td).append('<a href="javascript:void(0)" class="rerec text-wrap" id="reactiveBranch"> <i class="bi bi-arrow-clockwise" style="font-size:20px; color:blue;"></i></a>');
                $(row).find('td').eq(1).html('<label class="badge rounded-pill bg-danger" style="font-size:15px">Deactive</label>');
            } else {
                $(action_td).append('<a id="deactivateBranch" href="javascript:void(0)" class="editrec text-wrap"><i class="bi bi-sign-stop" style="font-size:20px; color:orange"></i></a><a id="deleteBranch" href="javascript:void(0)" class="editrec"><i class="bi bi-trash" style="font-size:20px; margin-left:10px; color:red"></i></a>');

                $(row).find('td').eq(1).html('<label class="badge rounded-pill bg-success" style="font-size:15px">Active</label>');
            }
            $(row).append(action_td);
        }
    });





    $('#addBranchTableData').on('click', '#deactivateBranch', function () {
        var data = tableBranch.row($(this).closest('tr')).data();
        var id = data.id;



        Swal.fire({
            title: 'Are you sure?',
            text: "This Branch Will be Deactivated!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, Proceed!',
            showLoaderOnConfirm: true,
            preConfirm: () => {
                return fetch('admin/deactivate-Branch ', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        id: id
                    })
                }).then(response => {
                    if (!response.ok) {
                        throw new Error(response.statusText);
                    }
                    return response.json();
                }).catch(error => {
                    Swal.showValidationMessage('Request failed:' + error);
                });
            },
            allowOutsideClick: () => !Swal.isLoading()
        }).then((result) => {
            if (result.value) {
                if (result.value.status === 'error') {
                    Swal.fire('Error!', 'Failed to deactivate Branch', 'error');
                } else {
                    Swal.fire('Successful!', 'Branch has been deactivated!', 'success');
                    tableBranch.ajax.reload();
                }
            }
        });
    });




    $('#addBranchTableData').on('click', '#reactiveBranch', function () {
        var data = tableBranch.row($(this).closest('tr')).data();
        var id = data.id;

        Swal.fire({
            title: 'Are you sure?',
            text: "This Branch Will be Activated!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, Proceed!',
            showLoaderOnConfirm: true,
            preConfirm: () => {
                return fetch('admin/reactivate-Branch', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        id: id
                    })
                }).then(response => {
                    if (!response.ok) {
                        throw new Error(response.statusText);
                    }
                    return response.json();
                }).catch(error => {
                    Swal.showValidationMessage('Request failed:' + error);
                });
            },
            allowOutsideClick: () => !Swal.isLoading()
        }).then((result) => {
            if (result.value) {
                if (result.value.status === 'error') {
                    Swal.fire('Error!', 'Failed to activate Branch', 'error');
                } else {
                    Swal.fire('Successful!', 'Branch has been activated!', 'success');
                    tableBranch.ajax.reload();
                }
            }
        });
    });



    $('#addBranchTableData').on('click', '#deleteBranch', function () {
        var data = tableBranch.row($(this).closest('tr')).data();
        var id = data.id;

        Swal.fire({
            title: 'Are you sure?',
            text: "This Branch Will be Deleted!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, Proceed!',
            showLoaderOnConfirm: true,
            preConfirm: () => {
                return fetch('admin/delete-Branch', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        id: id
                    })
                }).then(response => {
                    if (!response.ok) {
                        throw new Error(response.statusText);
                    }
                    return response.json();
                }).catch(error => {
                    Swal.showValidationMessage('Request failed:' + error);
                });
            },
            allowOutsideClick: () => !Swal.isLoading()
        }).then((result) => {
            if (result.value) {
                if (result.value.status === 'error') {
                    Swal.fire('Error!', 'Failed to activate Branch', 'error');
                } else {
                    Swal.fire('Successful!', 'Branch has been activated!', 'success');
                    tableBranch.ajax.reload();
                }
            }

        });
    });

  

    $('#addbranchToDatabaseBtn').on('click', function () {
        var inputBranch = document.getElementById('addbranchtext').value;


        Swal.fire({
            title: 'Are you sure?',
            text: 'This Branch Will be Added!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, Proceed!',
            showLoaderOnConfirm: true,
            preConfirm: () => {
                return fetch('admin/insert-Branch', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        input: inputBranch
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
            if (result.value) {
                if (result.value.status === 'error') {
                    Swal.fire('Error!', 'Failed to insert data', 'error');
                } else {
                    Swal.fire('Successful!', 'Branch has been added!', 'success');
                    document.getElementById('addbranchtext').value = "";
                    tableBranch.ajax.reload();
                }
            }
        });
    });


});



































// Attach a click event listener to the '#btnAddComplaint' element using event delegation
$(document).on('click', '#btnAddDepartment', function () {

// Set the 'display' property of the 'addNewComplaintType' element to 'inline'
    $('#addNewDepartment').css('display', 'inline');
    // Set the 'display' property of the 'complaint_category_add_complaint' element to 'none'
    $('#Department_add_complaint').css('display', 'none');
    $('#verticalycentered_Department_add').show();
});
/*
 * this code for button of add new compaint type inside the complaint add panel
 */

$(document).on('click', '#verticalycentered_Department_add', function () {

    $('#addNewDepartment').hide();
    $('#Department_add_complaint').css({
        display: 'inline',
        visibility: 'visible'
    });
    $('#verticalycentered_Department_add').hide();
});


/*
 *        this code for button of add reaching mode in admin page
 */


$(document).ready(function () {



    var tableDepartment = $('#addDepartmentTableData').DataTable({
        "aLengthMenu": [[5, 10, 25, -1], [5, 10, 25, "All"]],
        "pageLength": 10, // Update the desired number of records per page
        "ordering": true,
        "autoWidth": true,
        "processing": true,
        "serverSide": true,
        "order": [[0, "desc"]],
        "searchHighlight": true,
        "searchDelay": 350,
        "responsive": true,
        "ajax": {
            "url": "table-data-Department",
            "contentType": "application/json",
            "type": "POST",
            "data": function (d) {
                return JSON.stringify(d);
            },
            "dataSrc": function (response) {
                return response.data; // Assuming your server-side script returns data property with the actual records
            },
            "error": function (xhr, error, code) {
                console.log(xhr);
                console.log(code);
            }
        },
        "columns": [
            {"data": "id", visible: false},
            {"data": "type", className: "text-wrap"},
            {"data": "status", className: "text-wrap"},
        ],
        "createdRow": function (row, data) {
            let action_td = document.createElement('td');
            if (data['status'] === 'deactivated') {
                $(action_td).append('<a href="javascript:void(0)" class="rerec text-wrap" id="reactiveDepartment"> <i class="bi bi-arrow-clockwise" style="font-size:20px; color:blue;"></i></a>');
                $(row).find('td').eq(1).html('<label class="badge rounded-pill bg-danger" style="font-size:15px">Deactive</label>');
            } else {
                $(action_td).append('<a id="deactivateDepartment" href="javascript:void(0)" class="editrec text-wrap"><i class="bi bi-sign-stop" style="font-size:20px; color:orange"></i></a><a id="deleteDepartment" href="javascript:void(0)" class="editrec"><i class="bi bi-trash" style="font-size:20px; margin-left:10px; color:red"></i></a>');

                $(row).find('td').eq(1).html('<label class="badge rounded-pill bg-success" style="font-size:15px">Active</label>');
            }
            $(row).append(action_td);
        }
    });





    $('#addDepartmentTableData').on('click', '#deactivateDepartment', function () {
        var data = tableDepartment.row($(this).closest('tr')).data();
        var id = data.id;



        Swal.fire({
            title: 'Are you sure?',
            text: "This Department Will be Deactivated!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, Proceed!',
            showLoaderOnConfirm: true,
            preConfirm: () => {
                return fetch('admin/deactivate-Department ', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        id: id
                    })
                }).then(response => {
                    if (!response.ok) {
                        throw new Error(response.statusText);
                    }
                    return response.json();
                }).catch(error => {
                    Swal.showValidationMessage('Request failed:' + error);
                });
            },
            allowOutsideClick: () => !Swal.isLoading()
        }).then((result) => {
            if (result.value) {
                if (result.value.status === 'error') {
                    Swal.fire('Error!', 'Failed to deactivate Department', 'error');
                } else {
                    Swal.fire('Successful!', 'Department has been deactivated!', 'success');
                    tableDepartment.ajax.reload();
                }
            }
        });
    });




    $('#addDepartmentTableData').on('click', '#reactiveDepartment', function () {
        var data = tableDepartment.row($(this).closest('tr')).data();
        var id = data.id;

        Swal.fire({
            title: 'Are you sure?',
            text: "This Department Will be Activated!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, Proceed!',
            showLoaderOnConfirm: true,
            preConfirm: () => {
                return fetch('admin/reactivate-Department', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        id: id
                    })
                }).then(response => {
                    if (!response.ok) {
                        throw new Error(response.statusText);
                    }
                    return response.json();
                }).catch(error => {
                    Swal.showValidationMessage('Request failed:' + error);
                });
            },
            allowOutsideClick: () => !Swal.isLoading()
        }).then((result) => {
            if (result.value) {
                if (result.value.status === 'error') {
                    Swal.fire('Error!', 'Failed to activate Department', 'error');
                } else {
                    Swal.fire('Successful!', 'Department has been activated!', 'success');
                    tableDepartment.ajax.reload();
                }
            }
        });
    });



    $('#addDepartmentTableData').on('click', '#deleteDepartment', function () {
        var data = tableDepartment.row($(this).closest('tr')).data();
        var id = data.id;

        Swal.fire({
            title: 'Are you sure?',
            text: "This Department Type Will be Deleted!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, Proceed!',
            showLoaderOnConfirm: true,
            preConfirm: () => {
                return fetch('admin/delete-Department', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        id: id
                    })
                }).then(response => {
                    if (!response.ok) {
                        throw new Error(response.statusText);
                    }
                    return response.json();
                }).catch(error => {
                    Swal.showValidationMessage('Request failed:' + error);
                });
            },
            allowOutsideClick: () => !Swal.isLoading()
        }).then((result) => {
            if (result.value) {
                if (result.value.status === 'error') {
                    Swal.fire('Error!', 'Failed to activate Department', 'error');
                } else {
                    Swal.fire('Successful!', 'Department has been activated!', 'success');
                    tableDepartment.ajax.reload();
                }
            }

        });
    });

 

    $('#addDepartmentNewItem').on('click', function () {
        var inputDepartment = document.getElementById('inputDepartmenttext').value;


        Swal.fire({
            title: 'Are you sure?',
            text: 'This Product Type Will be Added!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, Proceed!',
            showLoaderOnConfirm: true,
            preConfirm: () => {
                return fetch('admin/insert-Department', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        input: inputDepartment
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
            if (result.value) {
                if (result.value.status === 'error') {
                    Swal.fire('Error!', 'Failed to insert data', 'error');
                } else {
                    Swal.fire('Successful!', 'a Department Type has been added!', 'success');
                    document.getElementById('inputDepartmenttext').value = "";
                    tableDepartment.ajax.reload();
                }
            }
        });
    });


});



































// Attach a click event listener to the '#btnAddComplaint' element using event delegation
$(document).on('click', '#btnAddUserType', function () {

// Set the 'display' property of the 'addNewComplaintType' element to 'inline'
    $('#addNewUserType').css('display', 'inline');
    // Set the 'display' property of the 'complaint_category_add_complaint' element to 'none'
    $('#UserType_add_complaint').css('display', 'none');
    $('#verticalycentered_UserType_add').show();
});
/*
 * this code for button of add new compaint type inside the complaint add panel
 */

$(document).on('click', '#verticalycentered_UserType_add', function () {

    $('#addNewUserType').hide();
    $('#UserType_add_complaint').css({
        display: 'inline',
        visibility: 'visible'
    });
    $('#verticalycentered_UserType_add').hide();
});



/*
 *        this code for button of add reaching mode in admin page
 */


$(document).ready(function () {



    var tableUserType = $('#addUserTypeTableData').DataTable({
        "aLengthMenu": [[5, 10, 25, -1], [5, 10, 25, "All"]],
        "pageLength": 10, // Update the desired number of records per page
        "ordering": true,
        "autoWidth": true,
        "processing": true,
        "serverSide": true,
        "order": [[0, "desc"]],
        "searchHighlight": true,
        "searchDelay": 350,
        "responsive": true,
        "ajax": {
            "url": "table-data-UserType",
            "contentType": "application/json",
            "type": "POST",
            "data": function (d) {
                return JSON.stringify(d);
            },
            "dataSrc": function (response) {
                return response.data; // Assuming your server-side script returns data property with the actual records
            },
            "error": function (xhr, error, code) {
                console.log(xhr);
                console.log(code);
            }
        },
        "columns": [
            {"data": "id", visible: false},
            {"data": "usertype", className: "text-wrap"},
            {"data": "detail", className: "text-wrap"},
            {"data": "status", className: "text-wrap"},
        ],
        "createdRow": function (row, data) {
            let action_td = document.createElement('td');
            if (data['status'] === 'deactivated') {
                $(action_td).append('<a href="javascript:void(0)" class="rerec text-wrap" id="reactiveUserType"> <i class="bi bi-arrow-clockwise" style="font-size:20px; color:blue;"></i></a>');
                $(row).find('td').eq(2).html('<label class="badge rounded-pill bg-danger" style="font-size:15px">Deactive</label>');
            } else {
                $(action_td).append('<a id="deactivateUserType" href="javascript:void(0)" class="editrec text-wrap"><i class="bi bi-sign-stop" style="font-size:20px; color:orange"></i></a><a id="deleteUserType" href="javascript:void(0)" class="editrec"><i class="bi bi-trash" style="font-size:20px; margin-left:10px; color:red"></i></a>');

                $(row).find('td').eq(2).html('<label class="badge rounded-pill bg-success" style="font-size:15px">Active</label>');
            }
            $(row).append(action_td);
        }
    });





    $('#addUserTypeTableData').on('click', '#deactivateUserType', function () {
        var data = tableUserType.row($(this).closest('tr')).data();
        var id = data.id;



        Swal.fire({
            title: 'Are you sure?',
            text: "This User Will be Deactivated!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, Proceed!',
            showLoaderOnConfirm: true,
            preConfirm: () => {
                return fetch('admin/deactivate-UserType ', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        id: id
                    })
                }).then(response => {
                    if (!response.ok) {
                        throw new Error(response.statusText);
                    }
                    return response.json();
                }).catch(error => {
                    Swal.showValidationMessage('Request failed:' + error);
                });
            },
            allowOutsideClick: () => !Swal.isLoading()
        }).then((result) => {
            if (result.value) {
                if (result.value.status === 'error') {
                    Swal.fire('Error!', 'Failed to deactivate UserType', 'error');
                } else {
                    Swal.fire('Successful!', 'ProductType has been UserType!', 'success');
                    tableUserType.ajax.reload();
                }
            }
        });
    });




    $('#addUserTypeTableData').on('click', '#reactiveUserType', function () {
        var data = tableUserType.row($(this).closest('tr')).data();
        var id = data.id;

        Swal.fire({
            title: 'Are you sure?',
            text: "This UserType Will be Activated!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, Proceed!',
            showLoaderOnConfirm: true,
            preConfirm: () => {
                return fetch('admin/reactivate-UserType', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        id: id
                    })
                }).then(response => {
                    if (!response.ok) {
                        throw new Error(response.statusText);
                    }
                    return response.json();
                }).catch(error => {
                    Swal.showValidationMessage('Request failed:' + error);
                });
            },
            allowOutsideClick: () => !Swal.isLoading()
        }).then((result) => {
            if (result.value) {
                if (result.value.status === 'error') {
                    Swal.fire('Error!', 'Failed to activate UserType', 'error');
                } else {
                    Swal.fire('Successful!', 'UserType has been activated!', 'success');
                    tableUserType.ajax.reload();
                }
            }
        });
    });



    $('#addUserTypeTableData').on('click', '#deleteUserType', function () {
        var data = tableUserType.row($(this).closest('tr')).data();
        var id = data.id;
      
        Swal.fire({
            title: 'Are you sure?',
            text: "This UserType Will be Deleted!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, Proceed!',
            showLoaderOnConfirm: true,
            preConfirm: () => {
                return fetch('admin/delete-UserType', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        id: id
                    })
                }).then(response => {
                    if (!response.ok) {
                        throw new Error(response.statusText);
                    }
                    return response.json();
                }).catch(error => {
                    Swal.showValidationMessage('Request failed:' + error);
                });
            },
            allowOutsideClick: () => !Swal.isLoading()
        }).then((result) => {
            if (result.value) {
                if (result.value.status === 'error') {
                    Swal.fire('Error!', 'Failed to activate UserType', 'error');
                } else {
                    Swal.fire('Successful!', 'UserType has been activated!', 'success');
                    tableUserType.ajax.reload();
                }
            }

        });
    });




    $('#addUserTypeNewItem').on('click', function () {
        var inputUserType = document.getElementById('inputUserTypetext').value;
       var inputUserTypeDetails = document.getElementById('inputUserTypeDetailstext').value;
 


        Swal.fire({
            title: 'Are you sure?',
            text: 'This User Type Will be Added!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, Proceed!',
            showLoaderOnConfirm: true,
            preConfirm: () => {
                return fetch('admin/insert-UserType', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        input1: inputUserType,
                         input2: inputUserTypeDetails
                        
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
            if (result.value) {
                if (result.value.status === 'error') {
                    Swal.fire('Error!', 'Failed to insert data', 'error');
                } else {
                    Swal.fire('Successful!', 'a User Type has been added!', 'success');
                    document.getElementById('inputUserTypetext').value = "";
                     document.getElementById('inputUserTypeDetailstext').value = "";
                    tableUserType.ajax.reload();
                }
            }
        });
    });



});
















var status = '';

$("#filterAllComplaints").click(function () {
    status = '';
    dtable.ajax.reload();
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
    dtable.ajax.reload();
});

$("#filterThisMonthComplaint").click(function () {
    status = 'month';
    dtable.ajax.reload();
});


$("#filterThisYearComplaint").click(function () {
    status = 'year';
    dtable.ajax.reload();
});


$.fn.dataTable.ext.errMode = 'none';




var dtable = $('#viewAllComplaintasTable').DataTable({

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
        "url": "table-data-allComplaintData",
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
    ],
    "createdRow": function (row, data) {
        let action_td = document.createElement('td');


        if (data['actionTaken'] === 'Completed') {
            $(action_td).append('<a href="javascript:void(0)" class="rerec"> <i class="bi bi-arrow-clockwise" style="font-size:20px; color:blue;"></i></a>').hide();


            $(row).find('td').eq(4).html('<label class="badge rounded-pill bg-success" style="font-size:15px">Completed</label>');
        } else {
            $(action_td).append('<a href="javascript:void(0)" class="editrec"><i class="bi bi-pencil-square" style="font-size:20px; color:green"></i></a><a href="javascript:void(0)" id="editrecrdddd"><i class="bi bi-trash" style="font-size:20px; margin-left:10px; color:red"></i></a>').hide();

            $(row).find('td').eq(4).html('<label class="badge rounded-pill bg-danger" style="font-size:15px">Incompleted</label>');
        }

        if (data['status'] === 'active') {
            $(action_td).append('<a href="javascript:void(0)" class="rerec"> <i class="bi bi-arrow-clockwise" style="font-size:20px; color:blue;"></i></a>').hide();


            $(row).find('td').eq(5).html('<label class="badge bg-primary" style="font-size:15px">Active</label>');


        } else {
            $(action_td).append('<a href="javascript:void(0)" class="editrec"><i class="bi bi-pencil-square" style="font-size:20px; color:green"></i></a><a href="javascript:void(0)" id="editrecrdddd"><i class="bi bi-trash" style="font-size:20px; margin-left:10px; color:red"></i></a>').hide();

            $(row).find('td').eq(5).html('<label class="badge bg-primary" style="font-size:15px">Deactive</label>');
        }



        $(row).append(action_td);

        $(row).on('mouseover', function () {
            $(row).css({
                'background-color': '#b5a2c4',
                'font-weight': 'bold'
            });


        });

        $(row).on('mouseout', function () {
            $(row).css({
                'background-color': '',
                'font-weight': ''
            });

        });



        $(row).on('click', function () {
            var complaintId = data.complaint_id;
            var officername = data.officerName;



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


                    $('#customerNameComplaintPreview').val(nameValue);
                    $('#customerIdComplaintPreview').val(nic);
                    $('#customerDatabaseIdComplaintPreview').val(customer_id);
                    $('#customerEmailComplaintPreview').val(customerEmail);
                    $('#customerLandLineComplaintPreview').val(customerLandLine);
                    $('#customerMobileComplaintPreview').val(customerMobile);
                    $('#customerAddressComplaintPreview').val(customerAddress);
                    $('#customerOtherInforComplaintPreview').val(customerOtherInfor);



                    $('#selectDepartmentComplaintPreview').val(department);
                    $('#selectOfficerIdComplaintPreview').val(officer_id);
                    $('#selectBranchComplaintPreview').val(branch);
                    $('#selectOfficerComplaintPreview').val(officerName);



                    $('#complaint_typeComplaintPreview').val(complaintType);
                    $('#complaintIdComplaintPreview').val(complaint_id);
                    $('#product_typeComplaintPreview').val(productType);
                    $('#complaint_categoryComplaintPreview').val(complaintCateogry);
                    $('#reaching_modeComplaintPreview').val(reaching_mode);
                    $('#action_takenComplaintPreview').val(actionTaken);
                    $('#complaint_field_dateComplaintPreview').val(compaintFieldDate);
                    $('#job_complition_dateComplaintPreview').val(jobComplitionDate);
                    $('#job_complition_timeComplaintPreview').val(complitionTime);
                    $('#agreement_numberComplaintPreview').val(agreementNumber);
                    $('#vehicle_numberComplaintPreview').val(vehicleNumber);
                    $('#senarioComplaintPreview').val(senario);
                    $('#remarksComplaintPreview').val(remarks);

                    const modal = new bootstrap.Modal(document.getElementById('ExtralargeModalViewComplaint'));
                    modal.show();
                } else {

                    alert("data show is not success");
                }
            });

        });
    }
}
);













//
//
////this code is getting data for my viwe complaint using session id
//
//$('#viewMyComplaintasTable').DataTable({
//  "aLengthMenu": [[2, 5, 10, 15], [2, 5, 10, 15]],
//  "pageLength": 4,
//  "serverSide": true,
//  "ajax": {
//    "url": "table-data-MyComplaintData",
//    "contentType": "application/json",
//    "type": "POST",
//    "data": function (d) {
//      // Add the session ID to the data
//      d.sessionId = getSessionId(); // Replace 'getSessionId()' with the actual function to retrieve the session ID
//      return JSON.stringify(d);
//    },
//    "error": function (xhr, error, code) {
//      console.log(xhr);
//      console.log(code);
//    }
//  },
//  "columns": [
//          {"data": "complaint_id"},
//        {"data": "complaintType", className: "text-wrap", visible: false},
//          { data: 'officerName', className: 'text-wrap' },
//        {"data": "complaintCategory", className: "text-wrap", visible: false},
//        {"data": "ReachingMode", className: "text-wrap", visible: false},
//        {"data": "compaintFieldDate", className: "text-wrap", visible: false},
//        {"data": "jobComplitionDate", className: "text-wrap"},
//        {"data": "complitionTime", className: "text-wrap", visible: false},
//        {"data": "agreementNumber", className: "text-wrap", visible: false},
//        {"data": "vehicleNumber", className: "text-wrap", visible: false},
//        {"data": "senario", className: "text-wrap", visible: false},
//        {"data": "remarks", className: "text-wrap", visible: false},
//        {"data": "actionTaken", className: "text-wrap"},
//        {"data": "fileUpload", className: "text-wrap", visible: false},
//        {"data": "customer_id", className: "text-wrap", visible: false},
//        {"data": "relaventOfficerId", className: "text-wrap", visible: false},
//        {"data": "productType", className: "text-wrap", visible: false},
//        {"data": "status", className: "text-wrap"},
//  ],
//  "createdRow": function (row, data) {
//          let action_td = document.createElement('td');
//                if (data['status'] === 'deactivated') {
//        $(action_td).append('<a href="javascript:void(0)" class="rerec"> <i class="bi bi-arrow-clockwise" style="font-size:20px; color:blue;"></i></a>').hide();
//
//
//                $(row).find('td').eq(4).html('<label class="badge rounded-pill bg-danger" style="font-size:15px">Deactive</label>');
//        } else {
//        $(action_td).append('<a href="javascript:void(0)" class="editrec"><i class="bi bi-pencil-square" style="font-size:20px; color:green"></i></a><a href="javascript:void(0)" id="editrecrdddd"><i class="bi bi-trash" style="font-size:20px; margin-left:10px; color:red"></i></a>').hide();
//
//                $(row).find('td').eq(4).html('<label class="badge rounded-pill bg-success" style="font-size:15px">Active</label>');
//        }
//
//        $(row).append(action_td);
//
//                $(row).on('mouseover', function () {
//        $(row).css('background-color', 'yellow');
//
//        });
//
//                $(row).on('mouseout', function () {
//        $(row).css('background-color', '');
//
//        });
//              
//                $(row).on('click', function () {
//        var complaintId = data.complaint_id;
//                var officername = data.officerName;
//
//
//              
//
//
//                fetch('showComplaintDatainModel', {
//                method: 'POST',
//                        body: new URLSearchParams({
//                        id: complaintId,
//                        })
//                }).then((res) => res.text()).then(function (res) {
//        if (res != null) {
//        var data = JSON.parse(res);
//                var nameValue = data[0].customerName;
//                var nic = data[0].nic;
//                var customer_id = data[0].customer_id;
//                var customerEmail = data[0].customerEmail;
//                var customerLandLine = data[0].customerLandLine;
//                var customerMobile = data[0].customerMobile;
//                var customerAddress = data[0].customerAddress;
//                var customerOtherInfor = data[0].customerOtherInfor;
//                
//                
//                var officerName = data[0].officerName;
//                var officer_id = data[0].officer_id;
//                var department = data[0].department;
//                var branch = data[0].branch;
//                
//                
//                var complaintType = data[0].complaintType;
//                var complaint_id = data[0].complaint_id;
//                var productType = data[0].productType;
//                var complaintCateogry = data[0].complaintCateogry;
//                var actionTaken = data[0].actionTaken;
//                var compaintFieldDate = data[0].compaintFieldDate;
//                var jobComplitionDate = data[0].jobComplitionDate;
//                var complitionTime = data[0].complitionTime;             
//                var agreementNumber = data[0].agreementNumber;
//                var vehicleNumber = data[0].vehicleNumber;
//                var senario = data[0].senario;
//                var remarks = data[0].remarks;
//                
//                var reaching_mode = data[0].reaching_mode;
//                
//                
//                $('#customerNameComplaintPreview').val(nameValue);
//                $('#customerIdComplaintPreview').val(nic);
//                $('#customerDatabaseIdComplaintPreview').val(customer_id);
//                $('#customerEmailComplaintPreview').val(customerEmail);
//                $('#customerLandLineComplaintPreview').val(customerLandLine);
//                $('#customerMobileComplaintPreview').val(customerMobile);
//                $('#customerAddressComplaintPreview').val(customerAddress);
//                $('#customerOtherInforComplaintPreview').val(customerOtherInfor);
//                     
//                      
//
//                $('#selectDepartmentComplaintPreview').val(department);
//                $('#selectOfficerIdComplaintPreview').val(officer_id);
//                $('#selectBranchComplaintPreview').val(branch);
//                $('#selectOfficerComplaintPreview').val(officerName);
//                
//         
//                
//                $('#complaint_typeComplaintPreview').val(complaintType);
//                 $('#complaintIdComplaintPreview').val(complaint_id);
//                $('#product_typeComplaintPreview').val(productType);
//                $('#complaint_categoryComplaintPreview').val(complaintCateogry);
//                $('#reaching_modeComplaintPreview').val(reaching_mode);
//                $('#action_takenComplaintPreview').val(actionTaken);
//                $('#complaint_field_dateComplaintPreview').val(compaintFieldDate);
//                $('#job_complition_dateComplaintPreview').val(jobComplitionDate);
//                $('#job_complition_timeComplaintPreview').val(complitionTime);
//                 $('#agreement_numberComplaintPreview').val(agreementNumber);
//                $('#vehicle_numberComplaintPreview').val(vehicleNumber);
//                $('#senarioComplaintPreview').val(senario);
//                $('#remarksComplaintPreview').val(remarks);
//                
//                const modal = new bootstrap.Modal(document.getElementById('ExtralargeModalMyViewComplaint'));
//                modal.show();
//        } else {
//
//        alert("data show is not success");
//        }
//        });
//           
//        });
// 
//  
//  
//  
//  
//  
//  }
//});



//
$("#filterMyAllComplaints").click(function () {
    status = '';
    myComplaintTable.ajax.reload();
});

$("#filterMyCompletedComplaint").click(function () {
    status = 'Completed';
    myComplaintTable.ajax.reload();
});

$("#filterMyNotCompletedComplaint").click(function () {
    status = 'Incomplete';
    myComplaintTable.ajax.reload();
});

$("#filterMyTodayComplaint").click(function () {
    status = 'today';
    myComplaintTable.ajax.reload();
});

$("#filterMyThisMonthComplaint").click(function () {
    status = 'month';
    myComplaintTable.ajax.reload();
});


$("#filterMyThisYearComplaint").click(function () {
    status = 'year';
    myComplaintTable.ajax.reload();
});


$.fn.dataTable.ext.errMode = 'none';





var myComplaintTable = $('#viewMyComplaintasTable').DataTable({

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
        "url": "table-data-MyComplaintData",
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
    ],
    "createdRow": function (row, data) {
        let action_td = document.createElement('td');


        if (data['actionTaken'] === 'Completed') {
            $(action_td).append('<a href="javascript:void(0)" class="rerec"> <i class="bi bi-arrow-clockwise" style="font-size:20px; color:blue;"></i></a>').hide();


            $(row).find('td').eq(4).html('<label class="badge rounded-pill bg-success" style="font-size:15px">Completed</label>');
        } else {
            $(action_td).append('<a href="javascript:void(0)" class="editrec"><i class="bi bi-pencil-square" style="font-size:20px; color:green"></i></a><a href="javascript:void(0)" id="editrecrdddd"><i class="bi bi-trash" style="font-size:20px; margin-left:10px; color:red"></i></a>').hide();

            $(row).find('td').eq(4).html('<label class="badge rounded-pill bg-danger" style="font-size:15px">Incompleted</label>');
        }

        if (data['status'] === 'active') {
            $(action_td).append('<a href="javascript:void(0)" class="rerec"> <i class="bi bi-arrow-clockwise" style="font-size:20px; color:blue;"></i></a>').hide();


            $(row).find('td').eq(5).html('<label class="badge bg-primary" style="font-size:15px">Active</label>');


        } else {
            $(action_td).append('<a href="javascript:void(0)" class="editrec"><i class="bi bi-pencil-square" style="font-size:20px; color:green"></i></a><a href="javascript:void(0)" id="editrecrdddd"><i class="bi bi-trash" style="font-size:20px; margin-left:10px; color:red"></i></a>').hide();

            $(row).find('td').eq(5).html('<label class="badge bg-primary" style="font-size:15px">Deactive</label>');
        }

        $(row).append(action_td);

        $(row).on('mouseover', function () {
            $(row).css({
                'background-color': '#b5a2c4',
                'font-weight': 'bold'
            });


        });

        $(row).on('mouseout', function () {
            $(row).css({
                'background-color': '',
                'font-weight': ''
            });

        });

        $(row).on('click', function () {
            var complaintId = data.complaint_id;
            var officername = data.officerName;



            fetch('showMyComplaintDatainModel', {
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


                    $('#customerNameComplaintMyComplaintPreview').val(nameValue);
                    $('#customerIdComplaintMyComplaintPreview').val(nic);
                    $('#customerDatabaseIdComplaintMyComplaintPreview').val(customer_id);
                    $('#customerEmailComplaintMyComplaintPreview').val(customerEmail);
                    $('#customerLandLineComplaintMyComplaintPreview').val(customerLandLine);
                    $('#customerMobileComplaintMyComplaintPreview').val(customerMobile);
                    $('#customerAddressComplaintMyComplaintPreview').val(customerAddress);
                    $('#customerOtherInforComplaintMyComplaintPreview').val(customerOtherInfor);



                    $('#selectDepartmentComplaintMyComplaintPreview').val(department);
                    $('#selectOfficerIdComplaintMyComplaintPreview').val(officer_id);
                    $('#selectBranchComplaintMyComplaintPreview').val(branch);
                    $('#selectOfficerComplaintMyComplaintPreview').val(officerName);



                    $('#complaint_typeComplaintMyComplaintPreview').val(complaintType);
                    $('#complaintIdComplaintMyComplaintPreview').val(complaint_id);
                    $('#product_typeComplaintMyComplaintPreview').val(productType);
                    $('#complaint_categoryComplaintMyComplaintPreview').val(complaintCateogry);
                    $('#reaching_modeComplaintMyComplaintPreview').val(reaching_mode);
                    $('#action_takenComplaintMyComplaintPreview').val(actionTaken);
                    $('#complaint_field_dateComplaintMyComplaintPreview').val(compaintFieldDate);
                    $('#job_complition_dateComplaintMyComplaintPreview').val(jobComplitionDate);
                    $('#job_complition_timeComplaintMyComplaintPreview').val(complitionTime);
                    $('#agreement_numberComplaintMyComplaintPreview').val(agreementNumber);
                    $('#vehicle_numberComplaintMyComplaintPreview').val(vehicleNumber);
                    $('#senarioComplaintMyComplaintPreview').val(senario);
                    $('#remarksComplaintMyComplaintPreview').val(remarks);

                    const modal = new bootstrap.Modal(document.getElementById('ExtralargeModalMyViewComplaint'));
                    modal.show();
                } else {

                    alert("data show is not success");
                }
            });

        });
    }
}
);







//this code is to load data in call center my complaint page
$("#filterMyAllComplaints").click(function () {
    status = '';
    myComplaintCallCenterTable.ajax.reload();
});

$("#filterMyCompletedComplaint").click(function () {
    status = 'Completed';
    myComplaintCallCenterTable.ajax.reload();
});

$("#filterMyNotCompletedComplaint").click(function () {
    status = 'Incomplete';
    myComplaintCallCenterTable.ajax.reload();
});

$("#filterMyTodayComplaint").click(function () {
    status = 'today';
    myComplaintCallCenterTable.ajax.reload();
});

$("#filterMyThisMonthComplaint").click(function () {
    status = 'month';
    myComplaintCallCenterTable.ajax.reload();
});


$("#filterMyThisYearComplaint").click(function () {
    status = 'year';
    myComplaintCallCenterTable.ajax.reload();
});


$.fn.dataTable.ext.errMode = 'none';





var myComplaintCallCenterTable = $('#viewMyComplaintasCallCenterTable').DataTable({

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
        "url": "table-data-MyComplaintCallCenterData",
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
    ],
    "createdRow": function (row, data) {
        let action_td = document.createElement('td');


        if (data['actionTaken'] === 'Completed') {
            $(action_td).append('<a href="javascript:void(0)" class="rerec"> <i class="bi bi-arrow-clockwise" style="font-size:20px; color:blue;"></i></a>').hide();


            $(row).find('td').eq(4).html('<label class="badge rounded-pill bg-success" style="font-size:15px">Completed</label>');
        } else {
            $(action_td).append('<a href="javascript:void(0)" class="editrec"><i class="bi bi-pencil-square" style="font-size:20px; color:green"></i></a><a href="javascript:void(0)" id="editrecrdddd"><i class="bi bi-trash" style="font-size:20px; margin-left:10px; color:red"></i></a>').hide();

            $(row).find('td').eq(4).html('<label class="badge rounded-pill bg-danger" style="font-size:15px">Incompleted</label>');
        }

        if (data['status'] === 'active') {
            $(action_td).append('<a href="javascript:void(0)" class="rerec"> <i class="bi bi-arrow-clockwise" style="font-size:20px; color:blue;"></i></a>').hide();


            $(row).find('td').eq(5).html('<label class="badge bg-primary" style="font-size:15px">Active</label>');


        } else {
            $(action_td).append('<a href="javascript:void(0)" class="editrec"><i class="bi bi-pencil-square" style="font-size:20px; color:green"></i></a><a href="javascript:void(0)" id="editrecrdddd"><i class="bi bi-trash" style="font-size:20px; margin-left:10px; color:red"></i></a>').hide();

            $(row).find('td').eq(5).html('<label class="badge bg-primary" style="font-size:15px">Deactive</label>');
        }

        $(row).append(action_td);

        $(row).on('mouseover', function () {
            $(row).css({
                'background-color': '#b5a2c4',
                'font-weight': 'bold'
            });


        });

        $(row).on('mouseout', function () {
            $(row).css({
                'background-color': '',
                'font-weight': ''
            });

        });

        $(row).on('click', function () {
            var complaintId = data.complaint_id;
            var officername = data.officerName;



            fetch('showMyComplaintDatainModel', {
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


                    $('#customerNameComplaintMyComplaintPreview').val(nameValue);
                    $('#customerIdComplaintMyComplaintPreview').val(nic);
                    $('#customerDatabaseIdComplaintMyComplaintPreview').val(customer_id);
                    $('#customerEmailComplaintMyComplaintPreview').val(customerEmail);
                    $('#customerLandLineComplaintMyComplaintPreview').val(customerLandLine);
                    $('#customerMobileComplaintMyComplaintPreview').val(customerMobile);
                    $('#customerAddressComplaintMyComplaintPreview').val(customerAddress);
                    $('#customerOtherInforComplaintMyComplaintPreview').val(customerOtherInfor);



                    $('#selectDepartmentComplaintMyComplaintPreview').val(department);
                    $('#selectOfficerIdComplaintMyComplaintPreview').val(officer_id);
                    $('#selectBranchComplaintMyComplaintPreview').val(branch);
                    $('#selectOfficerComplaintMyComplaintPreview').val(officerName);



                    $('#complaint_typeComplaintMyComplaintPreview').val(complaintType);
                    $('#complaintIdComplaintMyComplaintPreview').val(complaint_id);
                    $('#product_typeComplaintMyComplaintPreview').val(productType);
                    $('#complaint_categoryComplaintMyComplaintPreview').val(complaintCateogry);
                    $('#reaching_modeComplaintMyComplaintPreview').val(reaching_mode);
                    $('#action_takenComplaintMyComplaintPreview').val(actionTaken);
                    $('#complaint_field_dateComplaintMyComplaintPreview').val(compaintFieldDate);
                    $('#job_complition_dateComplaintMyComplaintPreview').val(jobComplitionDate);
                    $('#job_complition_timeComplaintMyComplaintPreview').val(complitionTime);
                    $('#agreement_numberComplaintMyComplaintPreview').val(agreementNumber);
                    $('#vehicle_numberComplaintMyComplaintPreview').val(vehicleNumber);
                    $('#senarioComplaintMyComplaintPreview').val(senario);
                    $('#remarksComplaintMyComplaintPreview').val(remarks);

                    const modal = new bootstrap.Modal(document.getElementById('ExtralargeModalMyViewComplaint'));
                    modal.show();
                } else {

                    alert("data show is not success");
                }
            });

        });
    }
}
);






























































































//this is for officer check

var officerDetailsLoadOtherTabAdminEditUser = new SlimSelect({
    select: '#OfficerSearchFieldAdminEditUser',
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
    $('#OfficerSearchFieldAdminEditUser').data('select', officerDetailsTabAdminEditUser);

});













$('#OfficerSearchFieldAdminEditUser').change(function () {

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
                        $('#OfficeridForSearchAdminEditUser').val(item.officerID);
                        $('#selectOfficerIdPreviewAdminEditUser').val(item.officerID);

                        $('#selectDepartmentAdminEditUser').val(item.id);

                        document.getElementById("officerNameDisplayAdminEditUser").textContent = item.officerName;
                        document.getElementById("officerIdDisplayAdminEditUser").textContent = "ID: " + item.officerID;
                        document.getElementById("officerBranchDisplayAdminEditUser").textContent = "Branch: " + item.officerBranch;
                        document.getElementById("officerDepartmentDisplayAdminEditUser").textContent = "Department: " + item.officerdepartment;
                        document.getElementById("OfficeremailForEmailAdminEditUser").textContent = item.officerBranch;
                        $('#OfficeremailForEmail').val(item.officeremail);

                        searchOffcerDetailsAdminEditUser.style.display = 'none';

                        officerDetailsShowAfterSearchAdminEditUser.style.display = 'block';

    
$('#OfficeridForSearchAdminEditUser').val(item.officerID);
$('#OfficeremailForEmailAdminEditUser').val(item.officeremail);
$('#OfficernameForAdminEditUser').val(item.officerName);
$('#OfficerbranchAdminEditUser').val(item.officerBranch);
$('#OfficerdepartmentAdminEditUser').val(item.officerdepartment);
$('#OfficerpasswordAdminEditUser').val(item.officerPassword);
$('#OfficerimageAdminEditUser').val(item.officerImage);

 
//$('#OfficerdashboardAdminEditUser').val(?);
//$('#OfficereusertypeAdminEditUser').val(?);

                    });
                }
            })
            .catch((error) => console.error(error));
});


//select data for a department of an officer whom assinged the complaint
document.getElementById("PageAcess_lableAdminEditUser").style.visibility = "hidden";
document.getElementById("selectPageAcessAdminEditUser").style.visibility = "hidden";
document.getElementById("officer_lableAdminEditUser").style.visibility = "hidden";
document.getElementById("selectOfficerAdminEditUser").style.visibility = "hidden";




let UserType_loadAdminEditUser = new SlimSelect({
    select: '#selectUserTypeAdminEditUser',
    ajax: function (search, callback) {
        fetch('search-userType?search=' + search).then((resp) => resp.json()).then((resp) => {
            callback(resp);


        });
    }

});



$('#selectUserTypeAdminEditUser').change(function () {
    if ($(this).val() === '') {
        return;
    }
    
    
    

$('#OfficereusertypeAdminEditUser').val($(this).val());

    document.getElementById("PageAcess_lableAdminEditUser").style.visibility = "visible";
    document.getElementById("selectPageAcessAdminEditUser").style.visibility = "visible";
    document.getElementById("officer_lableAdminEditUser").style.visibility = "hidden";
    document.getElementById("selectOfficerAdminEditUser").style.visibility = "hidden";

    searchOfficerPageAcessDetailsAdminEditUser.style.display = 'block';




    var officerUserTypeAdminEditUser = $('#selectUserTypeAdminEditUser option:selected').text();

    let PageAcess_loadAdminEditUser = new SlimSelect({
        select: '#selectPageAcessAdminEditUser',
        ajax: function (search, callback) {
            var url = 'search-accessDashboard?search=' + search;
            fetch(url).then((resp) => resp.json()).then((resp) => {
                callback(resp);
            });
        }
    });
});





$('#selectPageAcessAdminEditUser').change(function () {
    if ($(this).val() === '') {
        return;
    }

    $('#OfficerdashboardAdminEditUser').val($(this).text());

    var selectPageAcessAdminEditUser = $('#selectPageAcessAdminEditUser option:selected').text();
   
   

});



//clear the officer  details from new complaint page 

$(document).on('click', '#clearOfficerDetailsAdminEditUser', function () {

    swal.fire({
        title: "Are you sure?",
        text: "This action will clear all customer data!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, Clear it!'
    })
            .then((result) => {
                if (result.isConfirmed) {


                    //this is to clear slimselect 
                    var slimselectUserTypeAdminEditUser = new SlimSelect({
                        select: '#selectUserTypeAdminEditUser'
                    });

                    slimselectUserTypeAdminEditUser.set([]);




                    let UserType_load1AdminEditUser = new SlimSelect({
                        select: '#selectUserTypeAdminEditUser',
                        ajax: function (search, callback) {
                            fetch('search-userType?search=' + search).then((resp) => resp.json()).then((resp) => {
                                callback(resp);


                            });
                        }

                    });



                    var slimselectPageAcessAdminEditUser = new SlimSelect({
                        select: '#selectPageAcessAdminEditUser'
                    });
                    slimselectPageAcessAdminEditUser.set([]);


                    var slimselectOfficerAdminEditUser = new SlimSelect({
                        select: '#selectOfficerAdminEditUser'
                    });
                    slimselectOfficerAdminEditUser.set([]);



                    searchOfficerPageAcessDetailsAdminEditUser.style.display = 'none';

                    searchOfficerOfficerDetailsAdminEditUser.style.display = 'none';





                    officerDetailsShowAfterSearchAdminEditUser.style.display = 'none';
                    searchOffcerDetailsAdminEditUser.style.display = 'block';


                    swal("Customer data has been cleared!", {
                        icon: "success",
                    });
                } else {
                    swal("Customer data was not cleared.");
                }
            });
});




// check if all fields have a value before get a preview

$(document).on('click', '#createUserAdminEditUser', function () {
    
    
  
    

    var userEmpNo = $('#OfficeridForSearchAdminEditUser').val();
    
     var userEmail = $('#OfficeremailForEmailAdminEditUser').val();
    var userName = $('#OfficernameForAdminEditUser').val();
    var userType = $('#OfficereusertypeAdminEditUser').val();
        var userBranch = $('#OfficerbranchAdminEditUser').val();
    var userDepartment = $('#OfficerdepartmentAdminEditUser').val();
    var password = $('#OfficerpasswordAdminEditUser').val();
            var image = $('#OfficerimageAdminEditUser').val();
    var dashboard = $('#OfficerdashboardAdminEditUser').val();
 
    
    if (userType !== "" && userName !== "" && dashboard !== "") {
     
     
     
     
     
         fetch('add_user_to_database', {
        method: 'POST',
        body: new URLSearchParams({
            userEmpNo: userEmpNo,
            userEmail: userEmail,
            userName: userName,
            userType: userType,
            userBranch: userBranch,
            userDepartment: userDepartment,
            image:image,
            password: password,
            dashboard: dashboard,
  

        })
    }).then((res) => res.text()).then(function (res) {
        if (res === 'ok') {



//                           clear all complaint data
//                    this is to clear slimselect of complaint type
            var slimselectPageAcessAdminEditUser= new SlimSelect({
                select: '#selectPageAcessAdminEditUser'
            })
            var slimselectOfficerAdminEditUser= new SlimSelect({
                select: '#selectOfficerAdminEditUser'
            })
    

            slimselectPageAcessAdminEditUser.set([]);
            slimselectOfficerAdminEditUser.set([]);
        

           
//                         //this is to clear slimselect of complaint type
            var slimOfficerSearchFieldAdminEditUser= new SlimSelect({
                select: '#OfficerSearchFieldAdminEditUser'
            })

            slimOfficerSearchFieldAdminEditUser.set([])

      



            officerDetailsShowAfterSearchAdminEditUser.style.display = 'none';
            searchOffcerDetailsAdminEditUser.style.display = 'block';
       





            Swal.fire({

                icon: 'success',
                title: 'Complaint added',
            });

        } else {
            Swal.fire({
                icon: 'error',
                title: 'No complaint added',
            });
        }
    });
     
     
     
     
     
     $(document).on('click', '#backUserAdminEditUser', function () {
               $('#adduserDisplaybtnclick').show();
     });
     
     
     
     
     
     
     
     
     
     
     
     
     
     
     
     
     
     
     
       
    } else {
        // One or more dropdowns are not selected, show an error message
        Swal.fire({
            icon: 'error',
            title: 'Please select all three dropdowns',
            showConfirmButton: false,
            timer: 2000
        });
    }
});





















