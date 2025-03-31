// const btn = document.querySelector(".toggle-btn");

function btn() {
  document.querySelector("#sidebar").classList.toggle("expand");
}

// menu  Dashboard

function DashboardBTn() {
  // Hide the Add Product section
  document.getElementById("Addproduct").style.display = "none";

  // Show the Dashboard section by removing the "d-none" class
  document.getElementById("AddCategory").style.display = "none";
  document.getElementById("Dashboard").style.display = "block";
  document.getElementById("Orders").style.display = "none";
  document.getElementById("Setting").style.display = "none";
  document.getElementById("ListProduct").style.display = "none";
  document.getElementById("ListCategory").style.display = "none";
}

function ProductBtn() {
  // Hide all sections
  document.getElementById("Addproduct").style.display = "block";
  document.getElementById("Dashboard").style.display = "none";
  document.getElementById("AddCategory").style.display = "none";
  document.getElementById("Orders").style.display = "none";
  document.getElementById("Setting").style.display = "none";
  document.getElementById("ListProduct").style.display = "block";
  document.getElementById("ListCategory").style.display = "none";
}
// CategoryMenu

function CategoryBtn() {
  document.getElementById("Addproduct").style.display = "none";
  document.getElementById("Dashboard").style.display = "none";
  document.getElementById("AddCategory").style.display = "block";
  document.getElementById("Orders").style.display = "none";
  document.getElementById("Setting").style.display = "none";
  document.getElementById("ListProduct").style.display = "none";
  document.getElementById("ListCategory").style.display = "block";
}

function OrderBtn() {
  document.getElementById("Addproduct").style.display = "none";
  document.getElementById("Dashboard").style.display = "none";
  document.getElementById("AddCategory").style.display = "none";
  document.getElementById("Orders").style.display = "block";
  document.getElementById("Setting").style.display = "none";
  document.getElementById("ListProduct").style.display = "none";
  document.getElementById("ListCategory").style.display = "none";
}

function AddOrderBtn() {
  // Show the "Add Order" section and hide others
  document.getElementById("Orders").style.display = "block";
  // document.getElementById("ListOrders").style.display = "none";
  document.getElementById("Addproduct").style.display = "none";
  document.getElementById("Dashboard").style.display = "none";
  document.getElementById("AddCategory").style.display = "none";
  document.getElementById("Setting").style.display = "none";
  document.getElementById("ListProduct").style.display = "none";
  document.getElementById("ListCategory").style.display = "none";

  // Ensure only the "Add Order" button is visible
  document.getElementById("AddOrderBTN").style.display = "block";
  document.getElementById("UpdateOrder").style.display = "none";
}
function ListOrderBtn() {
  // Show the "List Orders" section and hide others
  document.getElementById("Orders").style.display = "none";
  document.getElementById("ListOrders").style.display = "block";
  document.getElementById("Addproduct").style.display = "none";
  document.getElementById("Dashboard").style.display = "none";
  document.getElementById("AddCategory").style.display = "none";
  document.getElementById("Setting").style.display = "none";
  document.getElementById("ListProduct").style.display = "none";
  document.getElementById("ListCategory").style.display = "none";
}

function SettingBtn() {
  document.getElementById("Setting").style.display = "block";
  document.getElementById("Addproduct").style.display = "none";
  document.getElementById("Dashboard").style.display = "none";
  document.getElementById("AddCategory").style.display = "none";
  document.getElementById("Orders").style.display = "none";
  document.getElementById("ListProduct").style.display = "none";
  document.getElementById("ListCategory").style.display = "none";
}
var index = 0;
function PopupCategoryBtn() {
  if (index == 0) {
    document.getElementById("PopupCategory").style.display = "block";
    index++;
  } else {
    document.getElementById("PopupCategory").style.display = "none";
    index--;
  }
}

var number = 0;
function AddProductBtn() {
  if (number == 0) {
    document.getElementById("PopupAddproduct").style.display = "block";
    number++;
  } else {
    document.getElementById("PopupAddproduct").style.display = "none";
    number--;
  }
}
var Order= 0;
function PopupOrder() {
  if (Order == 0) {
    document.getElementById("PopupOrder").style.display = "block";
    Order++;
  } else {
    document.getElementById("PopupOrder").style.display = "none";
    Order--;
  }
}
