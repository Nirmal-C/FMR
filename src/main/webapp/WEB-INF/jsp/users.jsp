

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>Fintrex - FMR</title>
        <%@include file="jspf/header.jspf" %>
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">

    </head>
    <body>

        <style>


            .card-registration .select-input.form-control[readonly]:not([disabled]) {
                font-size: 1rem;
                line-height: 2.15;
                padding-left: .75em;
                padding-right: .75em;
            }
            .card-registration .select-arrow {
                top: 13px;
            }
            .card{
                width: 90em;
                justify-content: center;
                margin: auto;

            }
            .pagetitle h3 {
                font-size: 28px;
                margin-bottom: 0;
                font-weight: 600;
                color: #31d422;
            }
        </style>
        <div class="tab-pane fade show active profile-overview" id="profile-overview">

            <div class="page-wrapper">
                <div class="page-body">

                    <div class="row" id="tableSection">
                        <div class="pagetitle" style=" padding-left: 5rem; "><h3>Admin Dashboard</h3>
                            <nav>
                                <ol class="breadcrumb">
                                    <li class="breadcrumb-item">
                                        <a href="IT-Dashbaord">Home</a>
                                    </li>
                                    <li class="breadcrumb-item">
                                        <a >Users</a> 
                                    </li>

                                </ol>
                            </nav>
                        </div>

                        <div class="card">
                            <div class="card-header">
                                <h4>Users</h4>
                                <div class="card-header-right">
                                    <ul class="list-unstyled card-option">
                                        <li><i class="feather icon-maximize full-card"></i></li>
                                    </ul>
                                </div>
                            </div>
                            <div class="card-block p-b-0">
                                <div class="table-responsive">
                                    <table class="table table-hover table-bordered m-b-0" id="tbll">
                                        <thead>
                                            <tr>
                                                <th>Id</th>
                                                <th>Username</th>
                                                <th>Name</th>
                                                <th>Ent On</th>  
                                                <th>Ent By</th>
                                                <th>User Type</th> 
                                                <th>Branch</th>  
                                                <th>Mod On</th>  
                                                <th>Mod By</th>  
                                                <th style="width:1px;">Status</th>
                                                <th style="width:1px;">Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>

                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <div class="card-footer">
                                <div class="text-right">
                                    <button id="addUserBtn" class="btn btn-sm waves-effect waves-light btn-danger"><i class="icon feather icon-plus"></i>Add User</button>
                                </div>
                            </div>
                        </div>

                    </div>

                    <div class="" id="formSection" style="display: none">

                        <div class="card" style="width: 80%;">
                            <div class="card-block p-b-0">
                                <div class="card-header">

                                    <div class="card-header-right">
                                        <ul class="list-unstyled card-option">
                                            <li><i class="feather icon-x cls-card"></i></li>
                                        </ul>
                                    </div>
                                </div>



                                <div class="form-group">
                                    <label for="name">Name<span class="text-danger">*</span></label>
                                    <input id="name" type="text" name="name" class="form-control"  required autocomplete="off">
                                </div>

                                <div class="form-group">
                                    <label for="username">Username<span class="text-danger">*</span></label>
                                    <input id="username"  type="text" name="username" class="form-control" required autocomplete="off">
                                </div>

                                <div class="form-group">
                                    <label for="usertype">User Type<span class="text-danger">*</span></label>
                                    <select id="usertype" name="usertype" class="" required autocomplete="off">
                                    </select>
                                </div>

                                <div class="form-group">
                                    <label for="branch">Department<span class="text-danger">*</span></label>
                                    <select id="branch" name="branch" class="" required autocomplete="off">
                                    </select>
                                </div>

                                <div class="card-footer d-flex justify-content-end">
                                    <button id="saveBtn" class="btn btn-sm waves-effect waves-light btn-primary"><i class="icon feather icon-save"></i>Save</button>
                                </div>
                            </div>
                        </div>


                    </div>
                </div>
            </div>
        </div>


        <%@include file="jspf/scripts.jspf" %>
        <script type="text/javascript" src="files/js/slimselect.js"></script>
        <script type="text/javascript" src="files/js/datatables.min.js"></script>
        <script type="text/javascript" src="files/js/sweetalert2.js"></script>
        <script type="text/javascript" src="files/js/func.js"></script>
        <script type="text/javascript" src="files/js/autoNumeric.js"></script>
        <script type="text/javascript" src="files/js/dataTables.responsive.min.js"></script>
        <script type="text/javascript" src="files/js/jquery.highlight.js"></script>
        <script type="text/javascript" src="files/js/dataTables.searchHighlight.min.js"></script>
        <script>

            var dptmnt = new SlimSelect({
                select: '#branch',
                placeholder: "Branch",
                ajax: function (search, callback) {
                    fetch('fmr/search-branch', {
                        method: 'POST',
                        body: new URLSearchParams({search: search || ''})
                    }).then(res => res.json()).then((data) => {
                        callback(data);
                    });
                },
                allowDeselect: true,
                deselectLabel: '<span class="red">✖</span>'
            });
            var typeu = new SlimSelect({
                select: '#usertype',
                placeholder: "User Type",
                ajax: function (search, callback) {
                    fetch('admin/search-usertype', {
                        method: 'POST',
                        body: new URLSearchParams({search: search || ''})
                    }).then(res => res.json()).then((data) => {
                        callback(data);
                    });
                },
                allowDeselect: true,
                deselectLabel: '<span class="red">✖</span>'
            });


            $.fn.dataTable.ext.errMode = 'none';

            var dtable = $('#tbll').DataTable({
                "aLengthMenu": [[5, 10, 25, -1], [5, 10, 25, "All"]],
                "pageLength": 5,
                "ordering": true,
                "autoWidth": false,
                "processing": true,
                "serverSide": true,
                "order": [[0, "desc"]],
                "searchHighlight": true,
                "searchDelay": 350,
                "ajax": {
                    "url": "admin/users",
                    "contentType": "application/json",
                    "type": "POST",
                    "data": function (d) {
                        return JSON.stringify(d);
                    },
                    error: function (xhr, error, code) {
                        console.log(xhr);
                        console.log(code);
                    }
                },
                "columns": [
                    {"data": "id", className: "text-right", "visible": false},
                    {"data": "username"},
                    {"data": "name"},
                    {"data": "ent_on"},
                    {"data": "ent_by"},
                    {"data": "user_type"}, // Ensure this matches the alias in the SQL query
                    {"data": "branch"},
                    {"data": "mod_on"},
                    {"data": "mod_by"},
                    {"data": "status"}
                ],
                "language": {
                    'loadingRecords': '&nbsp;',
                    'processing': '<div class="loader2"></div>'
                },
                "createdRow": function (row, data) {
                    let action_td = document.createElement('td');
                    $(action_td).addClass('text-center');
                    if (data['status'] === 'deactivate') {
                        $(action_td).append('<a href="javascript:void(0)" class="rerec"><i class="feather icon-refresh-cw f-w-600 f-16 text-c-blue"></i></a>');
                    } else {
                        $(action_td).append('<a href="javascript:void(0)" class="editrec"><i class="icon feather icon-edit f-w-600 f-16 m-r-10 text-c-green"></i></a><a href="javascript:void(0)" class="delrec"><i class="feather icon-trash-2 f-w-600 f-16 text-danger"></i></a>');
                    }
                    $(row).append(action_td);

                    setTableStatus($(row).find('td').eq(8));
                    $(row).data('id', data['id']);
                }
            });


            function setTableStatus(td) {
                var htmlContent = $(td).html();
                if (htmlContent && htmlContent.trim().startsWith('active')) {
                    $(td).html('<label class="label label-success" style="white-space: nowrap">Active</label>');
                } else if (htmlContent === 'deactivate') {
                    $(td).html('<label class="label label-danger" style="white-space: nowrap">Deactivate</label>');
                }
            }


            $('#addUserBtn').click(function () {
                $('#saveBtn').data('mode', 'save');
                $('#saveBtn').html('<i class="icon feather icon-save"></i>Save');
                clearForm();
                $('#tableSection').hide();
                $('#formSection').fadeIn();
            });
            $('.cls-card').click(function () {
                $('#formSection').hide();
                $('#tableSection').fadeIn();
            });
            function clearForm() {
                $('#formSection').find('input[type!=search]').val('');
                $('#formSection').find('select').each(function () {
                    if ($(this).data('select')) {
                        if ($(this).data('select').ajax) {
                            $(this).data('select').data.data = [];
                        }
                        $(this).data('select').set('');
                    }
                });
            }





            $(document).on('click', '.editrec', function () {
                loadDiv($('#tableSection'));
                let id = $(this).parents('tr').data('id');
                fetch('admin/user/' + id).then(resp => resp.json())
                        .then((data) => {
                            clearForm();
                            $('#name').val(data.name);
                            $('#username').val(data.username);
                            $('#saveBtn').data('mode', 'update');
                            $('#saveBtn').html('<i class="icon feather icon-save"></i>Update');
                            $('#saveBtn').data('id', id);
                            $('#formSection').fadeIn();
                            $('#tableSection').hide();

                            finishLoadDiv($('#tableSection'));
                        });
            });

            $('#saveBtn').click(function () {
                if ($('#name').val().trim() === '') {
                    Swal.fire("Empty Name!", "Please Enter a Valid Name!", "warning");
                    return;
                }
                if ($('#username').val().trim() === '') {
                    Swal.fire("Empty Username!", "Please Enter a Valid Username!", "warning");
                    return;
                }
                if ($('#usertype').val() === null) {
                    Swal.fire("UserType not Selected!", "Please Select a UserType!", "warning");
                    return;
                }

                if ($('#branch').val() === null) {
                    Swal.fire("Department not Selected!", "Please Select a Department!", "warning");
                    return;
                }


                let mode = $('#saveBtn').data('mode');

                const formData = new FormData();
                if (mode === 'update') {
                    formData.append('id', $('#saveBtn').data('id'));
                }
                formData.append('name', $('#name').val().trim());
                formData.append('username', $('#username').val().trim());
                formData.append('usertype', $('#usertype').val());
                formData.append('branch', $('#branch').val());

                Swal.fire({
                    title: 'Are you sure?',
                    text: "User Will be " + (mode === 'update' ? 'Updated' : 'Saved') + " !",
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Yes, Continue!',
                    showLoaderOnConfirm: true,
                    searchHighlight: true,
                    preConfirm: () => {
                        return fetch('admin/' + $('#saveBtn').data('mode') + '-user', {
                            method: 'POST',
                            body: formData
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
                        if (result.value.status !== 200) {
                            Swal.fire('Error!', result.value.msg, 'error');
                        } else {
                            Swal.fire('Successfull!', 'User has been updated.', 'success');
                            dtable.ajax.reload();
                            $('#formSection').hide();
                            $('#tableSection').fadeIn();
                        }
                    }
                });
            });

            $(document).on('click', '.delrec', function () {
                let id = $(this).parents('tr').data('id');
                console.log(id);
                Swal.fire({
                    title: 'Are you sure?',
                    text: "This User Will be Deleted!",
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Yes, Proceed!',
                    showLoaderOnConfirm: true,
                    preConfirm: () => {
                        return fetch('admin/deactivate-user', {
                            method: 'POST',
                            body: new URLSearchParams({
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
                        if (result.value.status !== 200) {
                            Swal.fire('Error!', result.value.msg, 'error');
                        } else {
                            Swal.fire('Successfull!', 'User has been Deactivated !', 'success');
                            dtable.ajax.reload();
                            $('#formSection').hide();
                            $('#tableSection').fadeIn();
                        }
                    }
                });
            });

            $(document).on('click', '.rerec', function () {
                let id = $(this).parents('tr').data('id');
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
                        return fetch('admin/reactivate-user', {
                            method: 'POST',
                            body: new URLSearchParams({
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
                        if (result.value.status !== 200) {
                            Swal.fire('Error!', result.value.msg, 'error');
                        } else {
                            Swal.fire('Successfull!', 'User has been Activated !', 'success');
                            dtable.ajax.reload();
                            $('#formSection').hide();
                            $('#tableSection').fadeIn();
                        }
                    }
                });
            });

            $.fn.dataTable.Debounce = function (table) {
                var tableId = table.settings()[0].sTableId;
                $('.dataTables_filter input[aria-controls="' + tableId + '"]')
                        .unbind()
                        .bind('input', (delay(function (e) {
                            table.search($(this).val()).draw();
                            return;
                        }, 500)));
            };

            function delay(callback, ms) {
                var timer = 0;
                return function () {
                    var context = this, args = arguments;
                    clearTimeout(timer);
                    timer = setTimeout(function () {
                        callback.apply(context, args);
                    }, ms || 0);
                };
            }

            var debounce = new $.fn.dataTable.Debounce(dtable);

        </script>



    </body>
</html>


















