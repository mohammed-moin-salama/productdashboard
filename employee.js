tableemp()

function tableemp() {
    $('#Employee').DataTable({
        lengthMenu: [5, 10, 15, 20, 25, 30, 35, 40, 45, 100],
        scrollX: 1000,
        data: employee,
        columns: [{
            title: 'id',
            data: 'id'
        }, {
            title: 'first-name',
            data: 'first_name'
        }, {
            title: 'last-name.',
            data: 'last_name'
        }, {
            title: 'email',
            data: 'email'
        }, {
            title: 'gender',
            data: 'gender'
        }, {
            title: 'Prosss',
            data: 'id',
            render: function(data, type, row) {
                return `
                            <div class="d-flex contant text-center justify-content-center">
                            <div class="d-flex flex-column "> <button href="# " class="btn view-btn " onclick="viewEmp(${data})" data-bs-toggle="tooltip" data-bs-placement="top" title="View"><i class="bx bx-show h5 "></i></button>
                            </div>
                            <div class="d-flex flex-column "> <button href="# " class="btn edit-btn" onclick=" editEmp(${data})" data-bs-toggle="tooltip" data-bs-placement="top" title="Edit"><i class="bx bx-edit h5"></i></button>
                            </div>
                            <div class="d-flex flex-column "> <button href="# " class="btn delete-btn " onclick="deleteEmp(${data})"data-bs-toggle="tooltip" data-bs-placement="top" title="Delete"><i class="bx bx-trash h5"></i></button>

                            </div></div>
                        `;
            },
        }],
    });
}


var modalEmpTitle = document.getElementById('modalEmpTitle');
var employeeModal = document.getElementById('employeeModal');
var tableempcontent1 = document.getElementById('tableempcontent');
var form1 = document.form1;
var img1 = document.getElementById('img1');
var add = document.getElementById('add');
var saveitem = document.getElementById('saveitem');

function setValues_ForEmp(element) {
    img1.src = element[0].img;
    form1.elements.in[0].value = element[0].first_name;
    form1.elements.in[1].value = element[0].last_name;
    form1.elements.in[2].value = element[0].email;
    form1.elements.in[3].value = element[0].gender;
    form1.elements.in[4].value = element[0].street;
    form1.elements.in[5].value = element[0].hire_date;
    form1.elements.in[6].value = element[0].age;
    form1.elements.in[7].value = img1.src;

}

function showEmpMenu() {
    var myModal = new bootstrap.Modal(employeeModal, {
        keyboard: true
    })
    myModal.show(true)
}

function viewEmp(id) {
    saveitem.classList.add('d-none');
    form1.parentElement.previousElementSibling.classList.remove('d-none')
    for (let index = 0; index < form1.elements.in.length; index++) {
        form1.elements.in[index].setAttribute('readonly', '')
    }
    modalEmpTitle.textContent = "View Product";
    var element = employee.filter(function(Element) {
        return Element.id == id
    })

    setValues_ForEmp(element)
    showEmpMenu();

}

function displayEmpagain() {
    tableempcontent1.innerHTML = '';
    tableempcontent1.innerHTML = `<table id="Employee" class="table table-hover table-borderless " width="100%"></table>`
    tableemp()
}

function deleteEmp(id) {

    for (let index = 0; index < employee.length; index++) {
        if (employee[index].id == id) {
            const swalWithBootstrapButtons = Swal.mixin({
                customClass: {
                    confirmButton: 'btn btn-success',
                    cancelButton: 'btn btn-danger'
                },
                buttonsStyling: false
            })
            swalWithBootstrapButtons.fire({
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                icon: 'warning',
                showCancelButton: true,
                cancelButtonText: 'No, cancel!',
                confirmButtonText: 'Yes, delete it!',
                reverseButtons: true
            }).then((result) => {
                if (result.isConfirmed) {
                    employee.splice(index, 1)
                    displayEmpagain()
                    swalWithBootstrapButtons.fire('Deleted!', 'Your file has been deleted.', 'success')
                } else if (result.dismiss === Swal.DismissReason.cancel) {
                    swalWithBootstrapButtons.fire('Cancelled', 'Opertion not Complite', 'error')
                }
            })

        }
    }
}

function addemp() {
    saveitem.removeAttribute('data-prossing')
    saveitem.setAttribute('data-prossing', "add")

    modalEmpTitle.textContent = "Add";
    showEmpMenu();
    for (let index = 0; index < form1.elements.in.length; index++) {
        form1.elements.in[index].removeAttribute('readonly')
        form1.elements.in[index].value = ''
        img1.src = ''
        form1.parentElement.previousElementSibling.classList.add('d-none')
    };

}


function AddEmp_01() {
    for (let index = 0; index < employee.length; index++) {
        var id = Math.floor((Math.random() * 1000) + 1);
        if (id != employee[index].id) {

            break;
        }
    }
    var i = 0;
    for (let index = 0; index < form1.elements.in.length; index++) {
        if (form1.elements.in[index].value > 0) {
            i = 1;
        }
    }
    if (i == 1) {

        employee.push({
            "id": id,
            "first_name": form1.elements.in[0].value,
            "last_name": form1.elements.in[1].value,
            "Image": form1.elements.in[7].value,
            "email": form1.elements.in[2].value,
            "gender": form1.elements.in[3].value,
            "street": form1.elements.in[4].value,
            "age": form1.elements.in[6].value,
            "hire_date": form1.elements.in[5].value

        });
        displayEmpagain()
    }
}

form1.addEventListener('submit', function(event) {
    event.preventDefault()
    event.stopPropagation()

    form1.classList.add('was-validated')
    if (form1.checkValidity()) {
        Swal.fire({
            title: 'Do you want to save the changes?',
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: 'Save',
            denyButtonText: `Don't save`,
        }).then((result) => {
            if (result.isConfirmed) {
                if (saveitem.getAttribute('data-prossing') == 'add') {
                    AddEmp_01();
                    Swal.fire('Added!', '', 'success')
                    $(employeeModal).modal('toggle');
                } else {
                    editingEmp();
                    Swal.fire('Changes are saved!', '', 'success')
                }
            } else if (result.isDenied) {
                Swal.fire('Opertion not Complite', '', 'error')
            }
        })
    }

}, false)



function editingEmp() {
    var id = saveitem.getAttribute('data-id');
    var element = employee.filter(function(Element) {
        return Element.id == id
    })
    var a = employee.indexOf(element[0])

    employee[a].first_name = form1.elements.in[0].value;
    employee[a].last_name = form1.elements.in[1].value;
    employee[a].email = form1.elements.in[2].value;
    employee[a].street = form1.elements.in[4].value;
    employee[a].age = form1.elements.in[6].value;
    employee[a].hire_date = form1.elements.in[5].value;
    employee[a].gender = form1.elements.in[3].value;
    employee[a].Image = form1.elements.in[7].value;
    displayEmpagain()

}

function editEmp(id) {
    saveitem.removeAttribute('data-prossing')
    saveitem.setAttribute('data-prossing', "edit")
    saveitem.setAttribute('data-id', id)

    saveitem.classList.remove('d-none')
    modalEmpTitle.textContent = "Edit";
    var element = employee.filter(function(Element) {
        return Element.id == id
    })
    for (let index = 0; index < form1.elements.in.length; index++) {
        form1.elements.in[index].removeAttribute('readonly')
    }
    setValues_ForEmp(element)


    showEmpMenu()
}