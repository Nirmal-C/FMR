
//this code is to get customer data and save the data to the database
//document.getElementByID("customerInsertDataId").addEventListener('click', function (evt)
//
//{
//  
//  alert("kasun");  
//});
//

//
//$(document).on('click', '#customerInsertDataId', function ()
//{
//   alert("sdsdfsdf");
//    let fd = new FormData();
//    fd.append("customerName", document.getElementById('customerName').value);
//    fd.append("customerEmail", document.getElementById('customerEmail').value);
//    fd.append("customerAddress", document.getElementById('customerAddress').value);
//    fd.append("customerLandLine", document.getElementById('customerLandLine').value);
//    fd.append("customerMobile", document.getElementById('customerMobile').value);
//    fd.append("customerOtherInfor", document.getElementById('customerOtherInfor').value);
//
//
//    fetch('customer_add_details', {
//        method: 'POST',
//        body: fd
//    }).then(function (res) {
//        console.log(res);
//        return res.next;
//
//    });
//
//}
//);








//document.getElementById('kasun_btn').addEventListener('click', function (evt) {
//    alert("sfsdf");
//    });































document.getElementById('complaint_submit').addEventListener('click', function (evt) {
    fetch('complaint_add_details', {
        method: 'POST',
        body: new URLSearchParams({
            complaintType: document.getElementById('complaint_type').value,
            productType: document.getElementById('product_type').value,
            complaintCategory: document.getElementById('complaint_category').value,
            reachingMode: document.getElementById('complaint_reaching_mode').value,
            actionTaken: document.getElementById('action_taken').value,
            compaintFieldDate: document.getElementById('complaint_field_date').value,
            complitionTime: document.getElementById('job_complition_time').value,
            agreementNumber: document.getElementById('agreement_number').value,
            vehicleNumber: document.getElementById('vehicle_number').value,
            senario: document.getElementById('senario').value,
            remarks: document.getElementById('remarks').value
//             fileUpload: document.getElementById('formFile').value
        })
    }).then((res) => res.text()).then(function (res) {
        if (res === 'ok') {
            alert("complaint added");

        } else
        {
            alert("no campaint added");
        }
    });
});






//assign the customer name to the complaint details form

document.getElementById('customerNameSend').addEventListener('click', function (evt) {


    document.getElementById('customer_id_kasun').value = document.getElementById('complaint_type').value;

});


//$(document).on('click','#button123',function ()) {
//
//    alert("ok");
//});

//
//document.getElementById('button123').addEventListener('click', function (evt) {
//
//
//    alert("ok");
//
//});



//document.getElementById('customer_name123').addEventListener('click', function (evt) {
//    fetch('complaint10', {
//        method: 'POST',
//        body: new URLSearchParams({
//            customerName: document.getElementById('customer_name123').value
//
//        })
//    }).then((res) => res.text()).then(function (res) {
//        if (res === 'ok') {
//            alert("kasun");
//
//        } else
//        {
//            alert("no kasun");
//        }
//    });
//});
   
   
//   
//           document.getElementById('customer_name123').addEventListener('click', function (evt) {
//            fetch('complaint10', {
//                method: 'POST',
//                body: new URLSearchParams({
//                    customerId: document.getElementById('customer_name123').value
//
//                })
//            }).then((res) => res.text()).then(function (res) {
//                if (res === 'ok') {
////                    alert("kasun");
//
//                } else
//                {
////                    alert("no kasun");
//                }
//            });
//        });




