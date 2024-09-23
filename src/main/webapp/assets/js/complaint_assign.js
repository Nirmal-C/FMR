/* 
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Other/javascript.js to edit this template
 */


//document.getElementById('OfficerSearchFieldOtherTab12').addEventListener('click', function (evt) {
//    alert("rrty");
//});
//this is for officer check

var officerDetailsLoadOtherTab12 = new SlimSelect({
    select: '#officerSearchFieldOtherTab12',
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
    $('#officerSearchFieldOtherTab12').data('select', officerDetailsLoadOtherTab12);

});



$('#officerSearchFieldOtherTab12').change(function () {

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
//                        $('#OfficeridForSearch').val(item.officerID);


                        document.getElementById("officerNameDisplayOtherTab12").textContent = "Name:" + item.officerName;
                        document.getElementById("officerIdDisplayOtherTab12").textContent = "ID: " + item.officerID;
                        document.getElementById("officerBranchDisplayOtherTab12").textContent = "Branch: " + item.officerBranch;
                        document.getElementById("officerDepartmentDisplayOtherTab12").textContent = "Department: " + item.officerdepartment;


                        officerDetailsShowAfterSearchOtherTab12.style.display = 'block';

//                        searchOffcerDetails.style.display = 'none';

                        clearOfficerDataOtherTab12.style.display = 'block';
                        assignOfficerToComplaint.style.display = 'block';
                    });
                }
            })
            .catch((error) => console.error(error));
});




$(document).on('click', '#clearOfficerDataOtherTab12', function () {

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
                        select: '#officerSearchFieldOtherTab12'
                    });

                    slimselectOfficerSearchFieldOtherTab.set([]);
                    officerDetailsShowAfterSearchOtherTab12.style.display = 'none';

                    var officerDetailsLoadOtherTab123 = new SlimSelect({
                        select: '#officerSearchFieldOtherTab12',
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
                        $('#officerSearchFieldOtherTab12').data('select', officerDetailsLoadOtherTab123);

                    });



                    $('#officerSearchFieldOtherTab12').change(function () {

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

                                            document.getElementById("officerNameDisplayOtherTab12").textContent = "Name:" + item.officerName;
                                            document.getElementById("officerIdDisplayOtherTab12").textContent = "ID: " + item.officerID;
                                            document.getElementById("officerBranchDisplayOtherTab12").textContent = "Branch: " + item.officerBranch;
                                            document.getElementById("officerDepartmentDisplayOtherTab12").textContent = "Department: " + item.officerdepartment;
                                            officerDetailsShowAfterSearchOtherTab12.style.display = 'block';
                                            assignOfficerToComplaint.style.display = 'block';
                                        });
                                    }
                                })
                                .catch((error) => console.error(error));
                    });


                    swal("Officer data has been cleared!", {// Removed this line
                        icon: "success",
                    });
                } else {
                    swal("Officer data was not cleared.");  // Removed this line
                }
            });
});





$(document).on('click', '#clearMsgToOfficer', function () {

    swal.fire({
        title: "Clearing Text",
        text: "Are you sure you want to clear the text?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, Clear it!'
    }).then((result) => {
        if (result.isConfirmed) {
            document.getElementById("msgToAssingNewOfficer").value = "";
            swal.fire("Text has been cleared!", {
                icon: "success",
            });
        } else {
            swal.fire("Text was not cleared.");
        }
    });


});

$(document).on('click', '#clearMsgToCustomer', function () {

    swal.fire({
        title: "Clearing Text",
        text: "Are you sure you want to clear the text?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, Clear it!'
    }).then((result) => {
        if (result.isConfirmed) {
            document.getElementById("msgToCustomerUpdate").value = "";
            swal.fire("Text has been cleared!", {
                icon: "success",
            });
        } else {
            swal.fire("Text was not cleared.");
        }
    });


});




$(document).on('click', '#clearupdateRemarksBtn', function () {

    swal.fire({
        title: "Clearing Text",
        text: "Are you sure you want to clear the text?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, Clear it!'
    }).then((result) => {
        if (result.isConfirmed) {
            document.getElementById("updateRemarksTxt").value = "";


            swal.fire("Text has been cleared!", {
                icon: "success",
            });
        } else {
            swal.fire("Text was not cleared.");
        }
    });


});