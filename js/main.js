let title = document.getElementById("title");
let price = document.getElementById("price");
let tax = document.getElementById("tax");
let ads = document.getElementById("ads");
let discount = document.getElementById("discount");
let total = document.getElementById("total");
let category = document.getElementById("category");
let count = document.getElementById("count");
let submit = document.getElementById("submit");
let mood = "create";
// let currentMode = "Create";
let currentMode = localStorage.getItem("currentMode") || "Create"; // Retrieve from localStorage, default to "Create"

// console.log(title, price, tax, ads, discount, total, category, count, submit);

function getTotal() {
  //   console.log("done");

  if (price.value != "") {
    let res =
      Number(price.value) +
      Number(tax.value) +
      Number(ads.value) -
      Number(discount.value);

    total.classList.remove("bg-danger");
    total.classList.add("bg-success");
    total.classList.remove("text-light");
    total.value = res;
  } else {
    total.value = 0;
    total.classList.add("bg-danger");
  }
}

// CREATE Product
let dataPro;
if (localStorage.product != null) {
  dataPro = JSON.parse(localStorage.product);
} else {
  dataPro = [];
}

// Clear Inputs

submit.onclick = function () {
  if (count.value === "" || count.value <= 0) {
    // alert("Please enter a valid count.");
    return;
  }

  for (let i = 0; i < parseInt(count.value); i++) {
    let newPro = {
      title: title.value,
      price: price.value,
      tax: tax.value,
      ads: ads.value,
      discount: discount.value,
      total: total.value,
      count: count.value,
      category: category.value,
    };
    dataPro.push(newPro);
  }

  localStorage.setItem("product", JSON.stringify(dataPro));
  console.log(dataPro);

  // Clear input fields
  clearData();

  // Show data with the current dataPro array (Create mode)
  showData(dataPro);
};

// Clear Inputs
function clearData() {
  title.value = "";
  price.value = "";
  tax.value = "";
  ads.value = "";
  discount.value = "";
  total.value = "";
  count.value = "";
  category.value = "";
}

// Read Data

// function showData() {
//   let table = "";
//   for (let i = 0; i < dataPro.length; i++) {
//     table += `
//     <tr>
//         <td>${i}</td>
//         <td>${dataPro[i].title}</td>
//         <td>${dataPro[i].price}</td>
//         <td>${dataPro[i].tax}</td>
//         <td>${dataPro[i].ads}</td>
//         <td>${dataPro[i].discount}</td>
//         <td>${dataPro[i].total}</td>
//         <td>${dataPro[i].category}</td>
//         <td><button class="btn btn-success" onclick="updateData( ${i})" id="update">Update</button></td>
//         <td><button class="btn btn-danger" onclick="delData( ${i})" id="delete">Delete</button></td>
//     </tr>
//     `;
//   }

//   document.getElementById("tableBody").innerHTML = table;
//   let btnDel = document.getElementById("delAll");
//   if (dataPro.length > 0) {
//     btnDel.innerHTML = `
//     <div class="d-grid gap-2">
//     <button onclick="deleteAll()" class="btn btn-danger" id="delete"><i class="bi bi-trash3-fill"></i>Delete All</button>
//     </div>
//     `;
//   } else {
//     btnDel.innerHTML = "";
//   }
// }
// showData();

function showData(productsToShow = dataPro) {
  let table = "";
  for (let i = 0; i < productsToShow.length; i++) {
    table += `
    <tr>
        <td>${i}</td>
        <td>${productsToShow[i].title}</td>
        <td>${productsToShow[i].price}</td>
        <td>${productsToShow[i].tax}</td>
        <td>${productsToShow[i].ads}</td>
        <td>${productsToShow[i].discount}</td>
        <td>${productsToShow[i].total}</td>
        <td>${productsToShow[i].category}</td>
        <td><button class="btn btn-success" onclick="updateData(${i})" id="update">Update</button></td>
        <td><button class="btn btn-danger" onclick="delData(${i})" id="delete">Delete</button></td>
    </tr>
    `;
  }

  document.getElementById("tableBody").innerHTML = table;
  let btnDel = document.getElementById("delAll");
  if (dataPro.length > 0) {
    btnDel.innerHTML = `
    <div class="d-grid gap-2">
    <button onclick="deleteAll()" class="btn btn-danger" id="delete"><i class="bi bi-trash3-fill"></i>Delete All</button>
    </div>
    `;
  } else {
    btnDel.innerHTML = "";
  }
}
showData();

// Delte Data

function delData(i) {
  const confirmationModal = document.getElementById("confirmationModal");
  $(confirmationModal).modal("show");

  const confirmBtn = document.getElementById("confirmDeleteBtn");
  const cancelBtn = document.getElementById("cancelDeleteBtn");
  const crossBtn = document.getElementById("crossDeleteBtn");

  // Add event listeners to the "Confirm Delete" and "Cancel" buttons
  confirmBtn.addEventListener("click", handleDeleteConfirmation);
  cancelBtn.addEventListener("click", handleCloseModal);
  crossBtn.addEventListener("click", handleCloseModal);

  // Remove event listeners when modal is hidden
  $(confirmationModal).on("hidden.bs.modal", function () {
    confirmBtn.removeEventListener("click", handleDeleteConfirmation);
    cancelBtn.removeEventListener("click", handleCloseModal);
    crossBtn.removeEventListener("click", handleCloseModal);
  });

  function handleDeleteConfirmation() {
    // Remove event listeners before handling the deletion
    confirmBtn.removeEventListener("click", handleDeleteConfirmation);
    cancelBtn.removeEventListener("click", handleCloseModal);
    crossBtn.removeEventListener("click", handleCloseModal);

    // Close the modal
    $(confirmationModal).modal("hide");

    // Delete the data
    dataPro.splice(i, 1);
    localStorage.product = JSON.stringify(dataPro);

    // Update the displayed data
    showData();
  }

  function handleCloseModal() {
    // Remove event listeners before closing the modal
    confirmBtn.removeEventListener("click", handleDeleteConfirmation);
    cancelBtn.removeEventListener("click", handleCloseModal);
    crossBtn.removeEventListener("click", handleCloseModal);

    // Close the modal
    $(confirmationModal).modal("hide");
  }
}

// Delete All

function deleteAll() {
  const confirmationModal = document.getElementById("confirmationModalAll");
  $(confirmationModal).modal("show");

  const confirmAllBtn = document.getElementById("confirmDeleteAllBtn");
  const cancelAllBtn = document.getElementById("cancelDeleteAllBtn");
  const crossAllBtn = document.getElementById("crossDeleteAllBtn");

  confirmAllBtn.addEventListener("click", function () {
    localStorage.clear();
    dataPro.splice(0);
    showData();
    console.log("All Items have been deleted.");
    $(confirmationModal).modal("hide");
  });

  cancelAllBtn.addEventListener("click", function () {
    $(confirmationModal).modal("hide");
  });

  crossAllBtn.addEventListener("click", function () {
    $(confirmationModal).modal("hide");
  });

  $(confirmationModal).on("hidden.bs.modal", function () {
    confirmAllBtn.removeEventListener("click");
    cancelAllBtn.removeEventListener("click");
    crossAllBtn.removeEventListener("click");
  });
}

// Update

// Update
function updateData(i) {
  title.value = dataPro[i].title;
  price.value = dataPro[i].price;
  tax.value = dataPro[i].tax;
  ads.value = dataPro[i].ads;
  discount.value = dataPro[i].discount;
  getTotal();
  count.value = dataPro[i].count;
  category.value = dataPro[i].category;

  // Switch to Update mode
  submit.innerHTML = '<i class="bi bi-pencil-square"></i> Update';
  currentMode = "Update";

  // After the update is done, reset back to Create mode
  submit.onclick = function () {
    if (count.value === "" || count.value <= 0) {
      return;
    }

    for (let i = 0; i < parseInt(count.value); i++) {
      let newPro = {
        title: title.value,
        price: price.value,
        tax: tax.value,
        ads: ads.value,
        discount: discount.value,
        total: total.value,
        count: count.value,
        category: category.value,
      };
      dataPro.push(newPro);
    }

    localStorage.setItem("product", JSON.stringify(dataPro));
    console.log(dataPro);

    // Clear input fields
    clearData();

    // Switch back to Create mode
    submit.innerHTML = '<i class="bi bi-plus-circle-fill"></i> Create';
    currentMode = "Create";

    // Show data with the current dataPro array (Create mode)
    showData(dataPro);
  };
}

// Search Data

const searchInput = document.getElementById("searchInput");
const searchByNameBtn = document.getElementById("searchByNameBtn");
const searchByCategoryBtn = document.getElementById("searchByCategoryBtn");

// Event listener for searching by name
searchByNameBtn.addEventListener("click", function () {
  const searchTerm = searchInput.value.toLowerCase();
  const filteredProducts = dataPro.filter((product) => {
    return product.title.toLowerCase().includes(searchTerm);
  });

  // Update the displayed data with the filtered results
  showData(filteredProducts);
});

// Event listener for searching by category
searchByCategoryBtn.addEventListener("click", function () {
  const searchTerm = searchInput.value.toLowerCase();
  const filteredProducts = dataPro.filter((product) => {
    return product.category.toLowerCase().includes(searchTerm);
  });

  // Update the displayed data with the filtered results
  showData(filteredProducts);
});
