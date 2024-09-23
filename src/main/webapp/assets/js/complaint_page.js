/* 
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/JSP_Servlet/JavaScript.js to edit this template
 */












//this code is to hide the customer 


$(document).on('click', '#insertOfficerButton', function () {
    const modal = new bootstrap.Modal(document.getElementById('AssignOfficerBTN'));
    modal.show();
});





//$(document).on('click', '#newPreviewFullComplaintBTN', function () {
//
//    const modal = new bootstrap.Modal(document.getElementById('newPreviewFullComplaintDetails'));
//    modal.show();
//});




// check if all fields have a value before get a preview

$(document).on('click', '#saveUpdateCustomerDataAndToPreview123', function () {



    if ($('#customerName').val() !== '' && $('#customerId').val() !== '' && $('#customerEmail').val() !== '' && $('#customerLandLine').val() !== '' && $('#customerMobile').val() !== '' && $('#customerAddress').val() !== '' && $('#customerOtherInfor').val() !== '') {
        $('#customer_name_preview').val($('#customerName').val());
        $('#customer_nic_preview ').val($('#customerId').val());
        $('#customer_email_preview ').val($('#customerEmail').val());
        $('#customer_mobile_preview').val($('#customerLandLine').val());
        $('#customer_landline_preview').val($('#customerMobile').val());
        $('#customer_address_preview').val($('#customerAddress').val());
        $('#customer_other_preview').val($('#customerOtherInfor').val());
        Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Customer Details have been saved',
            showConfirmButton: false,
            timer: 2000
        });
        
  
        
    } else {
        Swal.fire({
            position: 'center',
            icon: 'error',
            title: 'Please fill all the fields',
            showConfirmButton: false,
            timer: 2000
        });
    }


});







































//these code for complaint page preview function

function showHideCustomerDetails() {
    var x = document.getElementById("customerOtherDetailsPreview");
    var expandOfficerPreviewBTN = document.getElementById('expandCustomerPreviewBTN');

    if (x.style.display === "none") {
        x.style.display = "block";
        expandOfficerPreviewBTN.innerText = '\u2191 Less';
        expandOfficerPreviewBTN.style.color = "red";
    } else {
        x.style.display = "none";
        expandOfficerPreviewBTN.innerText = '\u2193 More';
        expandOfficerPreviewBTN.style.color = "white";
    }
}




//
function showHideOfficerDetails() {
    var x = document.getElementById("OfficerOtherDetailsPreview");
    var expandOfficerPreviewBTN = document.getElementById('expandOfficerPreviewBTN');

    if (x.style.display === "none") {
        x.style.display = "block";
        expandOfficerPreviewBTN.innerText = '\u2191 Less';
        expandOfficerPreviewBTN.style.color = "red";
    } else {
        x.style.display = "none";
        expandOfficerPreviewBTN.innerText = '\u2193 More';
        expandOfficerPreviewBTN.style.color = "white";
    }
}



//

function showHideCompalintDetails() {
    var x = document.getElementById("complaintOtherDetailsPreview");
    var expandOfficerPreviewBTN = document.getElementById('expandCompalintPreviewBTN');

    if (x.style.display === "none") {
        x.style.display = "block";
        expandOfficerPreviewBTN.innerText = '\u2191 Less';
        expandOfficerPreviewBTN.style.color = "red";
    } else {
        x.style.display = "none";
        expandOfficerPreviewBTN.innerText = '\u2193 More';
        expandOfficerPreviewBTN.style.color = "white";
    }
}



/*
 * this code is for preview of myCompaint page in view compalant page
 * 
 */



//these code for complaint page preview function

function showHideCustomerDetailsMyComplaint() {
    var x = document.getElementById("customerOtherDetailsPreviewMyComplaint");
    var expandOfficerPreviewBTNMyComplaint = document.getElementById('expandCustomerPreviewBTNMyComplaint');

    if (x.style.display === "none") {
        x.style.display = "block";
        expandOfficerPreviewBTNMyComplaint.innerText = '\u2191 Less';
        expandOfficerPreviewBTNMyComplaint.style.color = "red";
    } else {
        x.style.display = "none";
        expandOfficerPreviewBTNMyComplaint.innerText = '\u2193 More';
        expandOfficerPreviewBTNMyComplaint.style.color = "white";
    }
}




//
function showHideOfficerDetailsMyComplaint() {
    var x = document.getElementById("OfficerOtherDetailsPreviewMyComplaint");
    var expandOfficerPreviewBTNMyComplaint = document.getElementById('expandOfficerPreviewBTNMyComplaint');

    if (x.style.display === "none") {
        x.style.display = "block";
        expandOfficerPreviewBTNMyComplaint.innerText = '\u2191 Less';
        expandOfficerPreviewBTNMyComplaint.style.color = "red";
    } else {
        x.style.display = "none";
        expandOfficerPreviewBTNMyComplaint.innerText = '\u2193 More';
        expandOfficerPreviewBTNMyComplaint.style.color = "white";
    }
}



//

function showHideCompalintDetailsMyComplaint() {
    var x = document.getElementById("complaintOtherDetailsPreviewMyComplaint");
    var expandOfficerPreviewBTNMyComplaint = document.getElementById('expandCompalintPreviewBTNMyComplaint');

    if (x.style.display === "none") {
        x.style.display = "block";
        expandOfficerPreviewBTNMyComplaint.innerText = '\u2191 Less';
        expandOfficerPreviewBTNMyComplaint.style.color = "red";
    } else {
        x.style.display = "none";
        expandOfficerPreviewBTNMyComplaint.innerText = '\u2193 More';
        expandOfficerPreviewBTNMyComplaint.style.color = "white";
    }
}
























// check if all fields have a value before get a preview

$(document).on('click', '#saveUpdateCustomerDataAndToPreview123', function () {



    if ($('#customerName').val() !== '' && $('#customerId').val() !== '' && $('#customerEmail').val() !== '' && $('#customerLandLine').val() !== '' && $('#customerMobile').val() !== '' && $('#customerAddress').val() !== '' && $('#customerOtherInfor').val() !== '') {
        $('#customerNamePreview').val($('#customerName').val());
        $('#customerIdPreview').val($('#customerId').val());
        $('#customerEmailPreview').val($('#customerEmail').val());
        $('#customerLandLinePreview').val($('#customerLandLine').val());
        $('#customerMobilePreview').val($('#customerMobile').val());
        $('#customerAddressPreview').val($('#customerAddress').val());
        $('#customerOtherInforPreview').val($('#customerOtherInfor').val());
        Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Customer Details have been saved',
            showConfirmButton: false,
            timer: 2000
        });
    } else {
        Swal.fire({
            position: 'center',
            icon: 'error',
            title: 'Please fill all the fields',
            showConfirmButton: false,
            timer: 2000
        });
    }


});




$(document).on('click', '#saveOfficerDataToPreview', function () {
    var officer = $('#OfficerSearchField').val();
    var selectedOfficer = $('#OfficerSearchField option:selected').text();

    if (selectedOfficer !== "") {
        $('#officer_name_preview').text(selectedOfficer);
        $('#officer_id_preview').text($('#officer_id_new').text());
        $('#officer_mobile_preview').text($('#officer_mobile_new').text());
        $('#officer_email_preview').text($('#officer_email_new').text());
        $('#officer_branch_preview').text($('#officer_branch_new').text());
        $('#officer_department_preview').text($('#officer_department_new').text());

        Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Officer details have been saved',
            showConfirmButton: false,
            timer: 2000
        });
    } else {
        Swal.fire({
            icon: 'error',
            title: 'Please select an officer',
            showConfirmButton: false,
            timer: 2000
        });
    }
});




$(document).on('click', '#newPreviewFullComplaintBTN', function () {
    
   
 
    // Get data from customer data inputs
    var customerName = $('#customer_name_preview').text();
        var customerId = $('#customer_nic_preview').text();
    var customerEmail = $('#customer_email_preview').text();
    var customerLandLine = $('#customer_landline_preview').text();
    var customerMobile = $('#customer_mobile_preview').text();
    var customerAddress = $('#customer_address_preview').text();
    var other = $('#customer_other_preview').text();
    
               $('#customer_name_previewOrginal').text(customerName);
                $('#customer_nic_previewOrginal').text(customerId);
                 $('#customer_email_previewOrginal').text(customerEmail);
                  $('#customer_landline_previewOrginal').text(customerLandLine);
                   $('#customer_mobile_previewOrginal').text(customerMobile);
                    $('#customer_address_previewOrginal').text(customerAddress);
                     $('#customer_other_previewOrginal').text(other);
                  
                      
//                        $('#customer_nic_preview').text(item.nic);
//                        $('#customer_code_preview').text(item.id);
//                        $('#customer_email_preview').text(item.customerEmail);
//                        $('#customer_landline_preview').text(item.customerLandLine);
//                        $('#customer_mobile_preview').text(item.customerMobile);
//                        $('#customer_address_preview').text(item.customerAddress);
//                        $('#customer_other_preview').text(item.customerOtherInfor);
//    
    



    // Get data from officer input
    var officerName = $('#officer_name_preview').text();
    var officerId = $('#officer_id_preview').text();
    var officerMobile = $('#officer_mobile_preview').text();
    var officerBranch = $('#officer_branch_preview').text();
    var officerDepartment = $('#officer_department_preview').text();


               $('#officer_name_previewOrginal').text(officerName);
                $('#officer_id_previewOrginal').text(officerId);
                 $('#officer_mobile_previewOrginal').text(officerMobile);
                  $('#officer_branch_previewOrginal').text(officerBranch);
                  $('#officer_branch_previewOrginal').text(officerBranch);
                   $('#officer_department_previewOrginal').text(officerDepartment);
     








    // Get data from complaint input
    var complaintType = $('#complaint_type option:selected').text();
    var productType = $('.product_type option:selected').text();
    var complaintCategory = $('#complaint_category option:selected').text();
    var reachingMode = $('#reaching_mode option:selected').text();
    var agreementNumber = $('#agreement_number').val();
    var vehicleNumber = $('#vehicle_number').val();
    var scenario = $('#senario').val();
    var remarks = $('#remarks').val();

    if (
        customerName !== "" 
//        &&
//        customerId !== "" &&
//        customerEmail !== "" &&
//        customerLandLine !== "" &&
//        customerMobile !== "" &&
//        customerAddress !== "" &&
//        officerName !== "" &&
//        officerId !== "" &&
//        officerMobile !== "" &&
//        officerBranch !== "" &&
//        officerDepartment !== "" &&
//        complaintType !== "" &&
//        productType !== "" &&
//        complaintCategory !== "" &&
//        reachingMode !== "" &&
//        agreementNumber !== "" &&
//        vehicleNumber !== "" &&
//        scenario !== "" &&
//        remarks !== ""
    ) {



$('#complaintTypePreview_newOrginal').text($('#complaint_type option:selected').text());
$('#productTypePreview_newOrginal').text($('.product_type option:selected').text());
$('#complaintCategoryPreview_newOrginal').text($('#complaint_category option:selected').text());
$('#reachingModePreview_newOrginal').text($('#reaching_mode option:selected').text());
$('#agreementNoPreview_newOrginal').text($('#agreement_number').val());
$('#vehicleNoPreview_newOrginal').text($('#vehicle_number').val());
$('#senarioPreview_newOrginal').text($('#senario').val());
$('#remarksPreview_newOrginal').text($('#remarks').val());



        // Open the modal when preview button is clicked
        const modal = new bootstrap.Modal(document.getElementById('newPreviewFullComplaintDetails'));
        modal.show();
    } else {
        Swal.fire({
            position: 'center',
            icon: 'error',
            title: 'Please fill all the fields',
            showConfirmButton: false,
            timer: 2000
        });
    }
});




















// check if all fields have a value before get a preview

$(document).on('click', '#saveComplaintDataToPreview', function () {







//get data from customer data inputs
    var customerName = $('#customerName').val();
    var customerId = $('#customerId').val();
    var customerEmail = $('#customerEmail').val();
    var customerLandLine = $('#customerLandLine').val();
    var customerMobile = $('#customerMobile').val();
    var customerAddress = $('#customerAddress').val();






//get data from officer input
    var department = $('#selectDepartment option:selected').text();
    var branch = $('#selectBranch option:selected').text();
    var officer = $('#selectOfficer option:selected').text();



//get data from complaint input
    var complaint_type = $('#complaint_type option:selected').text();
    var product_type = $('.product_type option:selected').text();
    var complaint_category = $('#complaint_category option:selected').text();
    var reaching_mode = $('#reaching_mode option:selected').text();
    var action_taken = $('#action_taken option:selected').text();
    var complaint_field_date = $('#complaint_field_date').val();
    var job_complition_date = $('#job_complition_date').val();
    var job_complition_time = $('#job_complition_time').val();
    var agreement_number = $('#agreement_number').val();
    var vehicle_number = $('#vehicle_number').val();
    var senario = $('#senario').val();
    var remarks = $('#remarks').val();


    if (customerName !== "" && customerId !== "" && customerEmail !== "" && customerLandLine !== "" && customerMobile !== "" && customerAddress !== "" && department !== "" && branch !== "" && officer !== "" && complaint_category !== "" && complaint_type !== "" && product_type !== "" && reaching_mode !== "" && action_taken !== "" && complaint_field_date !== "" && job_complition_time !== "" && job_complition_date !== "" && agreement_number !== "" && vehicle_number !== "" && senario !== "" && remarks !== "")
    {


        $('#complaint_typePreview').val($('#complaint_type option:selected').text());
        $('#product_typePreview').val($('.product_type option:selected').text());
        $('#complaint_categoryPreview').val($('#complaint_category option:selected').text());
        $('#reaching_modePreview').val($('#reaching_mode option:selected').text());
        $('#action_takenPreview').val($('#action_taken option:selected').text());
        $('#complaint_field_datePreview').val($('#complaint_field_date').val());
        $('#job_complition_datePreview').val($('#job_complition_date').val());
        $('#job_complition_timePreview').val($('#job_complition_time').val());
        $('#agreement_numberPreview').val($('#agreement_number').val());
        $('#vehicle_numberPreview').val($('#vehicle_number').val());
        $('#senarioPreview').val($('#senario').val());
        $('#remarksPreview').val($('#remarks').val());



        //Open the modal when preview button is clicked

        const modal = new bootstrap.Modal(document.getElementById('ExtralargeModal'));
        modal.show();

    } else {
        Swal.fire({
            position: 'center',
            icon: 'error',
            title: 'Please fill all the fields',
            showConfirmButton: false,
            timer: 2000
        });
    }
});




//clear the customer details from new complaint page 

$(document).on('click', '#clearCustomerDataAgainchangeit', function () {

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

                    //this is to clear slimselect of complaint type
                    var slimSearchCustomer = new SlimSelect({
                        select: '#customerSearchField'
                    });

                    slimSearchCustomer.set([]);

                    $('#customerName').val('');
                    $('#customerId').val('');
                    $('#customerEmail').val('');
                    $('#customerLandLine').val('');
                    $('#customerMobile').val('');
                    $('#customerAddress').val('');
                    swal("Customer data has been cleared!", {
                        icon: "success",
                    });
                } else {
                    swal("Customer data was not cleared.");
                }
            });
});





//clear the complaint  details from new complaint page 

$(document).on('click', '#clearBtnComplaint', function () {

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




                    //this is to clear slimselect of complaint type
                    var slimcomplaint_type = new SlimSelect({
                        select: '#complaint_type'
                    });
                    var slimproduct_type = new SlimSelect({
                        select: '.product_type'
                    });
                    var complaint_category = new SlimSelect({
                        select: '#complaint_category'
                    });
                    var reaching_mode = new SlimSelect({
                        select: '#reaching_mode'
                    });


                    slimcomplaint_type.set([]);
                    slimproduct_type.set([]);
                    complaint_category.set([]);
                    reaching_mode.set([]);


                    $('#complaint_field_date').val('');
                    $('#job_complition_date').val('');
                    $('#job_complition_time').val('');
                    $('#job_complition_time').val('');
                    $('#agreement_number').val('');
                    $('#agreement_number').val('');
                    $('#vehicle_number').val('');
                    $('#senario').val('');
                    $('#remarks').val('');


                    swal("Customer data has been cleared!", {
                        icon: "success",
                    });
                } else {
                    swal("Customer data was not cleared.");
                }
            });
});




//clear the officer  details from new complaint page 

$(document).on('click', '#clearOfficerDetails', function () {

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
                    var slimselectDepartment = new SlimSelect({
                        select: '#selectDepartment'
                    });

                    slimselectDepartment.set([]);




                    let department_load1 = new SlimSelect({
                        select: '#selectDepartment',
                        ajax: function (search, callback) {
                            fetch('search-department?search=' + search).then((resp) => resp.json()).then((resp) => {
                                callback(resp);


                            });
                        }

                    });



                    var slimselectBranch = new SlimSelect({
                        select: '#selectBranch'
                    });
                    slimselectBranch.set([]);


                    var slimselectOfficer = new SlimSelect({
                        select: '#selectOfficer'
                    });
                    slimselectOfficer.set([]);



                    searchOfficerBranchDetails.style.display = 'none';

                    searchOfficerOfficerDetails.style.display = 'none';





                    officerDetailsShowAfterSearch.style.display = 'none';
                    searchOffcerDetails.style.display = 'block';


                    swal("Customer data has been cleared!", {
                        icon: "success",
                    });
                } else {
                    swal("Customer data was not cleared.");
                }
            });
});





//this code save all data a complaint into database




document.getElementById('SubmitComplaintAllDetailsToDatabase').addEventListener('click', function (evt) {
    
    
    
       // Get data from customer data inputs
    var customerName = $('#customer_name_previewOrginal').text();
    var  customerId = $('#customer_code_previewOrginal').text();
    var customerEmail = $('#customer_email_previewOrginal').text();
    var customerLandLine = $('#customer_landline_previewOrginal').text();
    var customerMobile = $('#customer_mobile_previewOrginal').text();
    var customerAddress = $('#customer_address_previewOrginal').text();
    var other = $('#customer_other_previewOrginal').text();

    // Get data from officer input
    var officerName = $('#officer_name_previewOrginal').text();
    var officerId = $('#officer_id_previewOrginal').text();  
    var officerMobile = $('#officer_mobile_previewOrginal').text();
    var officerEmail = $('#officer_email_previewOrginal').text();
    var officerDepartment = $('#officer_branch_previewOrginal').text();

    // Get data from complaint input
    var complaintType = $('#complaint_type option:selected').val();
    var productType = $('.product_type option:selected').val();
    var complaintCategory = $('#complaint_category option:selected').val();
    var reachingMode = $('#reaching_mode option:selected').val();
    var agreementNumber = $('#agreement_numberOrginal').val();
    var vehicleNumber = $('#vehicle_numberOrginal').val();
    var scenario = $('#senarioOrginal').val();
    var remarks = $('#remarksOrginal').val();
    
    
    


    fetch('add_complaint_details', {
        method: 'POST',
        body: new URLSearchParams({
            OfficeremailForEmail: officerEmail,
            customer_email: customerEmail,
            customer_id: customerId,
            relaventOfficerId: officerId,
            complaintType: complaintType,
            productType: productType,
            complaintCategory: complaintCategory,
            reachingMode: reachingMode,            
            agreementNumber: agreementNumber,
            vehicleNumber: vehicleNumber,
            senario: scenario,
            remarks: remarks




//             fileUpload: document.getElementById('formFile').value
        })
    }).then((res) => res.text()).then(function (res) {
        if (res === 'ok') {



//                           clear all complaint data
//                    this is to clear slimselect of complaint type
            var slimcomplaint_type = new SlimSelect({
                select: '#complaint_type'
            })
            var slimproduct_type = new SlimSelect({
                select: '.product_type'
            })
            var complaint_category = new SlimSelect({
                select: '#complaint_category'
            })
            var reaching_mode = new SlimSelect({
                select: '#reaching_mode'
            })


            slimcomplaint_type.set([]);
            slimproduct_type.set([]);
            complaint_category.set([]);
            reaching_mode.set([]);

            $('#agreement_number').val('');
            $('#agreement_number').val('');
            $('#vehicle_number').val('');
            $('#senario').val('');
            $('#remarks').val('');
//                    
//                    
//                    
//                    
// //clear custoemr details
// 
//                
//                         //this is to clear slimselect of complaint type
            var slimSearchCustomer123 = new SlimSelect({
                select: '#customerSearchField'
            })

            slimSearchCustomer123.set([])

            $('#customerName').val('');
            $('#customerId').val('');
            $('#customerEmail').val('');
            $('#customerLandLine').val('');
            $('#customerMobile').val('');
            $('#customerAddress').val('');




            $("#ExtralargeModal").modal('hide');



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
});


//
//document.getElementById('SubmitComplaintDatabase').addEventListener('click', function (evt) {
//    alert("jjjjjjjj");
//    fetch('matanidimatai', {
//        method: 'POST',
//        body: new URLSearchParams({
//   
////             fileUpload: document.getElementById('formFile').value
//        })
//    }).then((res) => res.text()).then(function (res) {
//        if (res === 'ok') {
//            Swal.fire({
//              icon: 'success',
//              title: 'Complaint added',
//            });
//
//        } else {
//            Swal.fire({
//              icon: 'error',
//              title: 'No complaint added',
//            });
//        }
//    });
//});










































//other tab in new complaint page

var customerLoadOtherTab = new SlimSelect({
    select: '#customerSearchFieldOtherTab',
    placeholder: "User List",
    ajax: function (search, callback) {
        fetch('search-customer', {
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
    $('#customerSearchFieldOtherTab').data('select', customerLoad);
});




$('#customerSearchFieldOtherTab').change(function () {
    const searchFieldValue = $(this).val();
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

                        clearCustomerDataOtherTab.style.display = 'inline-block';

                        document.getElementById("customerNameDisplayOtherTab").textContent = "Name: " + item.customerName;
                        document.getElementById("customerEmailDisplayOtherTab").textContent = "Email: " + item.customerEmail;
                        document.getElementById("customerMobileDisplayOtherTab").textContent = "Mobile: " + item.customerMobile;
                        document.getElementById("customerNicDisplayOtherTab").textContent = "NIC: " + item.nic;

                    });
                }
            })
            .catch((error) => console.error(error));
});



//clear the customer  details from othrt tab of complaint page 

//$(document).on('click', '#clearCustomerDataOtherTab', function () {
//
//    swal.fire({
//        title: "Are you sure?",
//        text: "This action will clear all Customer data!",
//        icon: "warning",
//        showCancelButton: true,
//        confirmButtonColor: '#3085d6',
//        cancelButtonColor: '#d33',
//        confirmButtonText: 'Yes, Clear it!'
//    })
//            .then((result) => {
//                if (result.isConfirmed) {
//
//
//                    //this is to clear slimselect 
//                    var slimselectCustomerSearchFieldOtherTab = new SlimSelect({
//                        select: '#customerSearchFieldOtherTab'
//                    });
//
//                    slimselectCustomerSearchFieldOtherTab.set([]);
//
//                    $('#customerSearchFieldOtherTab').data('select', customerLoad);
//
//                    customerDetailsShowAfterSearchOtherTab.style.display = 'none';
//
//
//                    swal("Officer data has been cleared!", {
//                        icon: "success",
//                    });
//                } else {
//                    swal("Offficer data was not cleared.");
//                }
//            });
//});

//clear the officer  details from othrt tab of complaint page 

$(document).on('click', '#clearCustomerDataOtherTab', function () {

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
                    var slimselectCustomerSearchFieldOtherTab = new SlimSelect({
                        select: '#customerSearchFieldOtherTab'
                    });

                    slimselectCustomerSearchFieldOtherTab.set([]);


                    customerDetailsShowAfterSearchOtherTab.style.display = 'none';


                    var customerDetailsLoadOtherTab123 = new SlimSelect({
                        select: '#customerSearchFieldOtherTab',
                        placeholder: "Customer List",
                        ajax: function (search, callback) {
                            fetch('search-customer', {
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
                        $('#customerSearchFieldOtherTab').data('select', customerDetailsLoadOtherTab123);

                    });



                    $('#customerSearchFieldOtherTab').change(function () {

                        const searchFieldValue = $(this).val();

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

                                            document.getElementById("customerNameDisplayOtherTab").textContent = "Name: " + item.customerName;
                                            document.getElementById("customerEmailDisplayOtherTab").textContent = "Email: " + item.customerEmail;
                                            document.getElementById("customerMobileDisplayOtherTab").textContent = "Mobile: " + item.customerMobile;
                                            document.getElementById("customerNicDisplayOtherTab").textContent = "NIC: " + item.nic;
                                            customerDetailsShowAfterSearchOtherTab.style.display = 'block';
                                        });
                                    }
                                })
                                .catch((error) => console.error(error));
                    });


                    swal("Customer data has been cleared!", {
                        icon: "success",
                    });
                } else {
                    swal("Customer data was not cleared.");
                }
            });
});












//this is for officer check

var officerDetailsLoadOtherTab = new SlimSelect({
    select: '#OfficerSearchFieldOtherTab',
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
    $('#OfficerSearchFieldOtherTab').data('select', officerDetailsLoadOtherTab);

});





$('#OfficerSearchFieldOtherTab').change(function () {
    const searchFieldValue = $(this).val();

    if (!searchFieldValue) {
        return;
    }

    fetch('filed_officer_details', {
        method: 'POST',
        body: new URLSearchParams({
            id: searchFieldValue,
        }),
    })
            .then((res) => res.json())
            .then((data) => {
                if (data === 'ok') {
                    // Handle success case
                } else {
                    const item = data[0];
                    document.getElementById('officerNameDisplayOtherTab').textContent = 'Name: ' + item.officerName;
                    document.getElementById('officerIdDisplayOtherTab').textContent = 'ID: ' + item.officerID;
                    document.getElementById('officerBranchDisplayOtherTab').textContent = 'Branch: ' + item.officerBranch;
                    document.getElementById('officerDepartmentDisplayOtherTab').textContent = 'Department: ' + item.officerdepartment;

                    fetch('/loadFile?file=' + item.officerImage)
                            .then((response) => {
                                if (response.ok) {
                                    return response.blob();
                                } else {
                                    throw new Error('File not found');
                                }
                            })
                            .then((blob) => {
                                const url = window.URL.createObjectURL(blob);
                                const imageElement = document.getElementById('officerProfileImageLoad');
                                imageElement.src = url;
                                imageElement.alt = 'Officer Profile Image';
                            })
                            .catch((error) => console.error(error));

                    officerDetailsShowAfterSearchOtherTab.style.display = 'block';
                    clearOfficerDataOtherTab.style.display = 'block';
                }
            })
            .catch((error) => console.error(error));
});









//clear the officer  details from othrt tab of complaint page 

$(document).on('click', '#clearOfficerDataOtherTab', function () {

    swal.fire({
        title: "Are you sure?",
        text: "This action will clear all Officer data!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, Clear it!'
    })
            .then((result) => {
                if (result.isConfirmed) {


                    //this is to clear slimselect 
                    var slimselectOfficerSearchFieldOtherTab = new SlimSelect({
                        select: '#OfficerSearchFieldOtherTab'
                    });

                    slimselectOfficerSearchFieldOtherTab.set([]);
                    officerDetailsShowAfterSearchOtherTab.style.display = 'none';

                    var officerDetailsLoadOtherTab123 = new SlimSelect({
                        select: '#OfficerSearchFieldOtherTab',
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
                        $('#OfficerSearchFieldOtherTab').data('select', officerDetailsLoadOtherTab123);

                    });



                    $('#OfficerSearchFieldOtherTab').change(function () {

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

                                            document.getElementById("officerNameDisplayOtherTab").textContent = "Name:" + item.officerName;
                                            document.getElementById("officerIdDisplayOtherTab").textContent = "ID: " + item.officerID;
                                            document.getElementById("officerBranchDisplayOtherTab").textContent = "Branch: " + item.officerBranch;
                                            document.getElementById("officerDepartmentDisplayOtherTab").textContent = "Department: " + item.officerdepartment;
                                            officerDetailsShowAfterSearchOtherTab.style.display = 'block';
                                        });
                                    }
                                })
                                .catch((error) => console.error(error));
                    });


                    swal("Officer data has been cleared!", {
                        icon: "success",
                    });
                } else {
                    swal("Offficer data was not cleared.");
                }
            });
});







