// Function to toggle the Add Product form
function AddProductBtn() {
  let popup = document.getElementById("PopupAddproduct");
  popup.style.display = popup.style.display === "none" ? "block" : "none";
}

// Function to save data in cookies
function setCookie(name, value, days) {
  let expires = "";
  if (days) {
    let date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    expires = "; expires=" + date.toUTCString();
  }
  document.cookie = name + "=" + JSON.stringify(value) + expires + "; path=/";
}

// Function to get data from cookies
function getCookie(name) {
  let cookies = document.cookie.split("; ");
  for (let i = 0; i < cookies.length; i++) {
    let [cookieName, cookieValue] = cookies[i].split("=");
    if (cookieName === name) {
      try {
        return JSON.parse(decodeURIComponent(cookieValue) || "[]");
      } catch (e) {
        console.error("Error parsing cookie value:", e);
        return [];
      }
    }
  }
  return [];
}

// Function to insert data into the product table
function insertProductData() {
  let productName = document.getElementById("productName").value;
  let productPrice = document.getElementById("productPrice").value;
  let productQuantity = document.getElementById("productQuantity").value;
  let productCategory = document.getElementById("productCategory").value;
  let productDescription = document.getElementById("productDescription").value;

  if (
    !productName ||
    !productPrice ||
    !productQuantity ||
    !productCategory ||
    !productDescription
  ) {
    alert("Please fill in all fields.");
    return;
  }

  let products = getCookie("products");
  let newProduct = {
    name: productName,
    price: productPrice,
    quantity: productQuantity,
    category: productCategory,
    description: productDescription,
  };

  products.push(newProduct);
  setCookie("products", products, 100);

  displayProducts();

  // Clear form fields
  document.getElementById("productName").value = "";
  document.getElementById("productPrice").value = "";
  document.getElementById("productQuantity").value = "";
  document.getElementById("productCategory").value = "";
  document.getElementById("productDescription").value = "";

  AddProductBtn();
}

// Function to display products in the table
function displayProducts() {
  let products = getCookie("products");
  let tableBody = document.getElementById("listProduct");
  tableBody.innerHTML = "";

  products.forEach((product, index) => {
    let newRow = document.createElement("tr");
    newRow.innerHTML = `
            <td>${product.name}</td>
            <td>${product.price}$</td>
            <td>${product.quantity}</td>
            <td>${product.category}</td>
            <td>${product.description}</td>
            <td>
                <button class="btn btn-primary btn-sm" onclick="editProduct(${index})">Edit</button>
                <button class="btn btn-danger btn-sm" onclick="deleteProduct(${index})">Delete</button>
            </td>
        `;
    tableBody.appendChild(newRow);
  });
}

// Function to delete a product
function deleteProduct(index) {
  let products = getCookie("products");
  products.splice(index, 1);
  setCookie("products", products, 100);
  displayProducts();
}

// Function to edit a product
function editProduct(index) {
  let products = getCookie("products");

  document.getElementById("productName").value = products[index].name;
  document.getElementById("productPrice").value = products[index].price;
  document.getElementById("productQuantity").value = products[index].quantity;
  document.getElementById("productCategory").value = products[index].category;
  document.getElementById("productDescription").value =
    products[index].description;

  document.getElementById("UpdateProduct").setAttribute("data-index", index);

  document.getElementById("addproduct").style.display = "none";
  document.getElementById("UpdateProduct").style.display = "block";

  document.getElementById("PopupAddproduct").style.display = "block";
}

// Function to update a product
function updateProduct() {
  let index = document
    .getElementById("UpdateProduct")
    .getAttribute("data-index");
  let products = getCookie("products");

  products[index] = {
    name: document.getElementById("productName").value,
    price: document.getElementById("productPrice").value,
    quantity: document.getElementById("productQuantity").value,
    category: document.getElementById("productCategory").value,
    description: document.getElementById("productDescription").value,
  };

  setCookie("products", products, 100);

  displayProducts();

  document.getElementById("PopupAddproduct").style.display = "none";

  document.getElementById("productName").value = "";
  document.getElementById("productPrice").value = "";
  document.getElementById("productQuantity").value = "";
  document.getElementById("productCategory").value = "";
  document.getElementById("productDescription").value = "";

  document.getElementById("addproduct").style.display = "block";
  document.getElementById("UpdateProduct").style.display = "none";
}

// Load products when the page loads
document.addEventListener("DOMContentLoaded", displayProducts);

// Function to insert a new category into cookies and refresh the table
function insertCategoryData() {
  let categories = getCookie("categories") || [];
  let newCategory = {
    id: document.getElementById("CategoryId").value,
    name: document.getElementById("CategoryName").value,
    description: document.getElementById("Description").value,
  };

  categories.push(newCategory);
  setCookie("categories", categories, 100);

  displayCategory();
  PopupCategoryBtn();
}

// Function to display the categories in the table
function displayCategory() {
  let categories = getCookie("categories") || [];
  let tableBody = document.getElementById("listCatgory");
  tableBody.innerHTML = ""; // Clear previous rows

  categories.forEach((category, index) => {
    let row = document.createElement("tr");
    row.innerHTML = `
        <td>${category.id}</td>
        <td>${category.name}</td>
        <td>${category.description}</td>
        <td>
          <button class="btn btn-primary btn-sm" onclick="editCategory(${index})">Edit</button>
          <button class="btn btn-danger btn-sm" onclick="deleteCategory(${index})">Delete</button>
        </td>
      `;
    tableBody.appendChild(row);
  });
}
// Function to delete a Category
function deleteCategory(index) {
  let categories = getCookie("categories");
  categories.splice(index, 1); // Remove item from array
  setCookie("categories", categories, 100); // Update cookies
  document.getElementById("CategoryId").value = "";
  document.getElementById("CategoryName").value = "";
  document.getElementById("Description").value = "";
  displayCategory(); // Refresh table
}

// Function to edit a category
function editCategory(index) {
  let categories = getCookie("categories");

  // Check if categories exist and the index is valid
  if (
    !categories ||
    !Array.isArray(categories) ||
    index < 0 ||
    index >= categories.length
  ) {
    console.error("Invalid category index or categories not found.");
    return;
  }

  let category = categories[index];
  if (!category) {
    console.error("Category data not found at the specified index.");
    return;
  }

  // Fill the form with the existing category data
  document.getElementById("CategoryId").value = category.id || "";
  document.getElementById("CategoryName").value = category.name || "";
  document.getElementById("Description").value = category.description || "";

  // Set the index in the UpdateCategory button
  document.getElementById("UpdateCategory").setAttribute("data-index", index);

  // Show Update button and hide Add button
  document.getElementById("AddCategoryBTN").style.display = "none";
  document.getElementById("UpdateCategory").style.display = "block";

  // Show the popup
  document.getElementById("PopupCategory").style.display = "block";
}

// Function to update a category
function updateCategory() {
  // Retrieve the index from the UpdateCategory button
  let index = parseInt(
    document.getElementById("UpdateCategory").getAttribute("data-index"),
    10
  );
  let categories = getCookie("categories");

  // Validate index and categories
  if (
    !categories ||
    !Array.isArray(categories) ||
    isNaN(index) ||
    index < 0 ||
    index >= categories.length
  ) {
    console.error("Invalid category index or categories not found.");
    return;
  }

  // Update the category data
  categories[index] = {
    id: document.getElementById("CategoryId").value,
    name: document.getElementById("CategoryName").value,
    description: document.getElementById("Description").value,
  };

  // Save updated data to cookies
  setCookie("categories", categories, 100);

  // Refresh the table
  displayCategory();

  // Hide the form
  document.getElementById("PopupCategory").style.display = "none";

  // Reset form fields
  document.getElementById("CategoryId").value = "";
  document.getElementById("CategoryName").value = "";
  document.getElementById("Description").value = "";

  // Show Add button and hide Update button
  document.getElementById("AddCategoryBTN").style.display = "block";
  document.getElementById("UpdateCategory").style.display = "none";
}
// Display Product

document.addEventListener("DOMContentLoaded", displayCategory);

// Function to insert a new order into cookies and refresh the table
function insertOrderData() {
  let orders = getCookie("orders") || [];

  // Get form values
  let orderId = document.getElementById("orderId").value;
  let orderCustomer = document.getElementById("orderCustomer").value;
  let orderDate = document.getElementById("orderDate").value;
  let orderTotal = document.getElementById("orderTotal").value;

  // Validate form inputs
  if (!orderId || !orderCustomer || !orderDate || !orderTotal) {
    alert("Please fill in all fields.");
    return;
  }

  // Create a new order object
  let newOrder = {
    id: orderId,
    customer: orderCustomer,
    date: orderDate,
    total: orderTotal,
  };

  // Add the new order to the array
  orders.push(newOrder);

  // Save updated orders to cookies
  setCookie("orders", orders, 100);

  // Refresh the order list
  displayOrders();

  // Reset the form
  document.getElementById("orderId").value = "";
  document.getElementById("orderCustomer").value = "";
  document.getElementById("orderDate").value = "";
  document.getElementById("orderTotal").value = "";

    // Hide Form Input

    document.getElementById("PopupOrder").style.display="none";
}

// Function to display orders in the table
function displayOrders() {
  let orders = getCookie("orders") || [];
  let tableBody = document.getElementById("listOrders");
  tableBody.innerHTML = ""; // Clear previous rows

  // Populate the table with orders
  orders.forEach((order, index) => {
    let row = document.createElement("tr");
    row.innerHTML = `
      <td>${order.id}</td>
      <td>${order.customer}</td>
      <td>${order.date}</td>
      <td>$${order.total}</td> <!-- Add $ symbol here -->
      <td>
        <button class="btn btn-primary btn-sm" onclick="editOrder(${index})">Edit</button>
        <button class="btn btn-danger btn-sm" onclick="deleteOrder(${index})">Delete</button>
      </td>
    `;
    tableBody.appendChild(row);
  });
}

// Function to delete an order
function deleteOrder(index) {
  let orders = getCookie("orders");
  orders.splice(index, 1); // Remove the order from the array
  setCookie("orders", orders, 100); // Update cookies
  displayOrders(); // Refresh the table
}

// Function to edit an order
function editOrder(index) {
  var orders = getCookie("orders");

  // Populate the form with the existing order data
  document.getElementById("orderId").value = orders[index].id;
  document.getElementById("orderCustomer").value = orders[index].customer;
  document.getElementById("orderDate").value = orders[index].date;
  document.getElementById("orderTotal").value = orders[index].total;

  document.getElementById("PopupOrder").style.display="block";

  // Set the index in the UpdateOrder button
  document.getElementById("UpdateOrder").setAttribute("data-index", index);

  // Show Update button and hide Add button
  document.getElementById("AddOrderBTN").style.display = "none";
  document.getElementById("UpdateOrder").style.display = "block";

  // Show the popup
  document.getElementById("Orders").style.display = "block";
}

// Function to update an order
function updateOrder() {
  // Retrieve the index from the UpdateOrder button
  let index = parseInt(
    document.getElementById("UpdateOrder").getAttribute("data-index"),
    10
  );

  let orders = getCookie("orders");

  // Validate index and orders
  if (
    !orders ||
    !Array.isArray(orders) ||
    isNaN(index) ||
    index < 0 ||
    index >= orders.length
  ) {
    console.error("Invalid order index or orders not found.");
    return;
  }

  // Update the order data
  orders[index] = {
    id: document.getElementById("orderId").value,
    customer: document.getElementById("orderCustomer").value,
    date: document.getElementById("orderDate").value,
    total: document.getElementById("orderTotal").value,
  };

  // Save updated data to cookies
  setCookie("orders", orders, 100);

  // Refresh the table
  displayOrders();

  // Reset form fields
  document.getElementById("orderId").value = "";
  document.getElementById("orderCustomer").value = "";
  document.getElementById("orderDate").value = "";
  document.getElementById("orderTotal").value = "";

  // Show Add button and hide Update button
  document.getElementById("AddOrderBTN").style.display = "block";
  document.getElementById("UpdateOrder").style.display = "none";

  // Hide Form Input

  document.getElementById("PopupOrder").style.display="none";
  
}

document.addEventListener("DOMContentLoaded", displayOrders);
