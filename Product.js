table()
function table() {
        $('#product').DataTable({
            lengthMenu: [5, 10, 15, 20, 25, 30, 35, 40, 45, 100],
            scrollX: 1000,
            data: data,
            columns: [{
                title: 'id',
                data: 'id'
            }, {
                title: 'Title',
                data: 'Title'
            }, {
                title: 'price.',
                data: 'price'
            }, {
                title: 'Prosss',
                data: 'id',
                render: function(data, type, row) {
                    return `<div class="d-flex contant text-center justify-content-center">
                        <div class="d-flex flex-column "> <button href="# " class="btn view-btn " onclick="view(${data})" data-bs-toggle="tooltip" data-bs-placement="top" title="View"><i class="bx bx-show h5 "></i></button>
                        </div>
                        <div class="d-flex flex-column "> <button href="# " class="btn edit-btn " onclick="edit(${data})" data-bs-toggle="tooltip" data-bs-placement="top" title="Edit"><i class="bx bx-edit h5"></i></button>
                        </div>
                        <div class="d-flex flex-column "> <button href="# " class="btn delete-btn " onclick="deleteitem(${data})"data-bs-toggle="tooltip" data-bs-placement="top" title="Delete"><i class="bx bx-trash h5"></i></button>

                        </div></div>`;
                },
            }],
        });
    }
//var addproduct = document.getElementById('addproduct');
//var productTable = document.getElementById('productTable');


var modelProtitle = document.getElementById('modelProtitle');
var Prodmodal = document.getElementById('Prodmodal');
var tableprodcontent = document.getElementById('table-prod-content');
var form = document.form;
var imgprod = document.getElementById('imgprod');
var saveProduct = document.getElementById('saveProduct');


function setvalues(element) {
    imgprod.src = element[0].Image;
    form.elements.inproduct[1].value = element[0].Descritpion;
    form.elements.inproduct[2].value = element[0].price;
    form.elements.inproduct[0].value = element[0].Title;
    form.elements.inproduct[3].value = imgprod.src;

}

function showMenu() {

    var myModal = new bootstrap.Modal(Prodmodal, {
        keyboard: true
    })
    myModal.show(true)
}

function view(id) {

    saveProduct.classList.add('d-none');

    form.parentElement.previousElementSibling.classList.remove('d-none')

    for (let index = 0; index < form.elements.inproduct.length; index++) {
        form.elements.inproduct[index].setAttribute('readonly', '')

    }
    modelProtitle.textContent = "View Product";
    var element = data.filter(function(Element) {
        return Element.id == id
    })
    setvalues(element)

    showMenu();

}

function displayproagain() {
    tableprodcontent.innerHTML = '';
    tableprodcontent.innerHTML = `<table id="product" class="table table-hover table-borderless" width="100%"></table>`
    table()
}

function deleteitem(id) {

    for (let index = 0; index < data.length; index++) {
        if (data[index].id == id) {
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
                    data.splice(index, 1)
                    displayproagain()
                    swalWithBootstrapButtons.fire('Deleted!', 'Your file has been deleted.', 'success')
                } else if (result.dismiss === Swal.DismissReason.cancel) {
                    swalWithBootstrapButtons.fire('Cancelled', 'Opertion not Complite', 'error')
                }
            })

        }
    }
}




function addItem() {
    saveProduct.removeAttribute('data-prossing')
    saveProduct.setAttribute('data-prossing', "add")
    saveProduct.classList.remove('d-none');


    modelProtitle.textContent = "Add";
    showMenu();
    for (let index = 0; index < form.elements.inproduct.length; index++) {
        form.elements.inproduct[index].removeAttribute('readonly')
        form.elements.inproduct[index].value = ''
        imgprod.src = ''
        form.parentElement.previousElementSibling.classList.add('d-none')
    };

}

function addpro() {
    for (let index = 0; index < data.length; index++) {
        var identity = Math.floor((Math.random() * 1000) + 1);
        if (identity != data[index].id) {
            break;
        }
    }
    var i = 0;
    for (let index = 0; index < form.elements.inproduct.length; index++) {
        if (form.elements.inproduct[index].value.length > 0) {
            i = 1;
        }
    }

    if (i == 1) {
        data.push({
            "id": identity,
            "Descritpion": form.elements.inproduct[1].value,
            "Title": form.elements.inproduct[0].value,
            "Image": form.elements.inproduct[3].value,
            "price": form.elements.inproduct[2].value
        });
        saveProduct.classList.remove('d-none');
        saveProduct.classList.remove('d-block');
        displayproagain()
    }
}





function edit(id) {
    saveProduct.removeAttribute('data-prossing')
    saveProduct.setAttribute('data-prossing', "edit")
    saveProduct.setAttribute('data-id', id)
    saveProduct.classList.remove('d-none');


    modelProtitle.textContent = "Edit";
    var element = data.filter(function(Element) {
        return Element.id == id
    })
    for (let index = 0; index < form.elements.inproduct.length; index++) {
        form.elements.inproduct[index].removeAttribute('readonly')
    }
    setvalues(element)
  
    showMenu()
}

function editing() {
    var proid = saveProduct.getAttribute('data-id');
    var element = data.filter(function(Element) {
        return Element.id == proid
    })
    var a = data.indexOf(element[0])

   

    data[a].Title = form.elements.inproduct[0].value;
    data[a].Descritpion = form.elements.inproduct[1].value;
    data[a].price = form.elements.inproduct[2].value;
    data[a].Image = form.elements.inproduct[3].value;

    displayproagain()

}


form.addEventListener('submit', function(event) {
    event.preventDefault()
    event.stopPropagation()

    form.classList.add('was-validated')
    if (form.checkValidity()) {
        Swal.fire({
            title: 'Do you want to save the changes?',
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: 'Save',
            denyButtonText: `Don't save`,
        }).then((result) => {
            if (result.isConfirmed) {
                if (saveProduct.getAttribute('data-prossing') == 'add') {
                    addpro();
                    Swal.fire('Add!', '', 'success')
                } else if (saveProduct.getAttribute('data-prossing') == 'edit') {
                    editing();
                    Swal.fire('Editing!', '', 'success')
                }

            } else if (result.isDenied) {
                Swal.fire('Opertion not Complite', '', 'info')
            }
        })
    }

}, false)