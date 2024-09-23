/* 
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Other/javascript.js to edit this template
 */










document.getElementById('loginbtn').addEventListener('click', function (evt) {
    fetch('userLogin', {
        method: 'POST',
        body: new URLSearchParams({
            username: document.getElementById('loginUsername').value,
            password: document.getElementById('loginPassword').value
        })
    })
            .then((res) => res.text())
            .then(function (res) {
                try {
                    const parsedData = JSON.parse(res);
                    const status = parsedData.status;
                    const uName = parsedData.uName;
                    const uType = parsedData.uType;
                    const uID = parsedData.uID;

                    if (status === "ok") {

                        window.location.href = 'dash';


                    } else {
                        Swal.fire({
                            icon: 'error',
                            title: 'Wrong User ID & Password',
                        });
                    }
                } catch (error) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: 'Wrong User ID & Password.',
                    });
                }
            });
});





document.getElementById('kasunaniii').addEventListener('click', function (evt) {


    document.getElementById("nimaliya").textContent = "uerName";

});










