
let employees = [
  {
    id: 1,
    firstName: "Alice",
    lastName: "Johnson",
    email: "alice@example.com",
    department: "HR",
    role: "Manager"
  },
  {
    id: 2,
    firstName: "Bob",
    lastName: "Smith",
    email: "bob@example.com",
    department: "IT",
    role: "Developer"
  },
  {
    id: 3,
    firstName: "Bobby",
    lastName: "Smith",
    email: "bobby@example.com",
    department: "IT",
    role: "Developer"
  },
  {
    id: 4,
    firstName: "John",
    lastName: "Smith",
    email: "bjohn@example.com",
    department: "IT",
    role: "Manager"
  },
  {
    id: 5,
    firstName: "Joe",
    lastName: "Smith",
    email: "joe@example.com",
    department: "IT",
    role: "Developer"
  },
  {
    id: 6,
    firstName: "Bobb",
    lastName: "Smith",
    email: "bobb@example.com",
    department: "IT",
    role: "Developer"
  },
  {
    id: 7,
    firstName: "BaBlu",
    lastName: "Smith",
    email: "bablu@example.com",
    department: "IT",
    role: "Developer"
  }
];


let currentPage = 1;
let itemsPerPage = 10;
let filteredEmployees = [...employees]; 


function showEmployees() {
  let container = document.getElementById("employeeList");
  container.innerHTML = "";

  let startIndex = (currentPage - 1) * itemsPerPage;
  let endIndex = startIndex + itemsPerPage;

  let listToShow = filteredEmployees.slice(startIndex, endIndex);

  if (listToShow.length === 0) {
    container.innerHTML = "<p>No employees found.</p>";
    return;
  }

  listToShow.forEach(function (emp) {
    let card = document.createElement("div");
    card.className = "employee-card";
    card.innerHTML = `
      <h3>${emp.firstName} ${emp.lastName}</h3>
      <p>Email: ${emp.email}</p>
      <p>Department: ${emp.department}</p>
      <p>Role: ${emp.role}</p>
      <button onclick="editEmployee(${emp.id})">Edit</button>
      <button onclick="deleteEmployee(${emp.id})">Delete</button>
    `;
    container.appendChild(card);
  });

  showPagination();
}


function showPagination() {
  let totalPages = Math.ceil(filteredEmployees.length / itemsPerPage);
  let container = document.getElementById("paginationControls");
  container.innerHTML = "";

  for (let i = 1; i <= totalPages; i++) {
    let btn = document.createElement("button");
    btn.textContent = i;
    if (i === currentPage) {
      btn.style.fontWeight = "bold";
    }
    btn.onclick = function () {
      currentPage = i;
      showEmployees();
    };
    container.appendChild(btn);
  }
}


document.getElementById("addEmployeeBtn").onclick = function () {
  showForm();
};


function showForm() {
  document.getElementById("formTitle").textContent = "Add Employee";
  document.getElementById("employeeForm").reset();
  document.getElementById("employeeId").value = "";
  document.getElementById("formSection").style.display = "block";
  document.getElementById("employeeListSection").style.display = "none";
}


document.getElementById("cancelBtn").onclick = function () {
  hideForm();
};

function hideForm() {
  document.getElementById("formSection").style.display = "none";
  document.getElementById("employeeListSection").style.display = "block";
}


document.getElementById("employeeForm").onsubmit = function (event) {
  event.preventDefault();

  let id = document.getElementById("employeeId").value;
  let firstName = document.getElementById("firstName").value.trim();
  let lastName = document.getElementById("lastName").value.trim();
  let email = document.getElementById("email").value.trim();
  let department = document.getElementById("department").value;
  let role = document.getElementById("role").value;

  if (!firstName || !lastName || !email || !department || !role) {
    alert("All fields are required.");
    return;
  }

  if (!email.includes("@")) {
    alert("Invalid email format.");
    return;
  }

  if (id) {
    
    let index = employees.findIndex(function (emp) {
      return emp.id == id;
    });

    employees[index] = { id: parseInt(id), firstName, lastName, email, department, role };
  } else {
    
    let newEmployee = {
      id: Date.now(),
      firstName,
      lastName,
      email,
      department,
      role
    };
    employees.push(newEmployee);
  }

  filteredEmployees = [...employees];
  hideForm();
  showEmployees();
};


function editEmployee(id) {
  let emp = employees.find(function (e) {
    return e.id === id;
  });

  if (emp) {
    showForm();
    document.getElementById("formTitle").textContent = "Edit Employee";
    document.getElementById("employeeId").value = emp.id;
    document.getElementById("firstName").value = emp.firstName;
    document.getElementById("lastName").value = emp.lastName;
    document.getElementById("email").value = emp.email;
    document.getElementById("department").value = emp.department;
    document.getElementById("role").value = emp.role;
  }
}


function deleteEmployee(id) {
  if (confirm("Are you sure you want to delete?")) {
    employees = employees.filter(function (emp) {
      return emp.id !== id;
    });
    filteredEmployees = [...employees];
    showEmployees();
  }
}


document.getElementById("searchBox").addEventListener("input", function () {
  let text = this.value.toLowerCase();

  filteredEmployees = employees.filter(function (emp) {
    return (
      emp.firstName.toLowerCase().includes(text) ||
      emp.lastName.toLowerCase().includes(text) ||
      emp.email.toLowerCase().includes(text)
    );
  });

  currentPage = 1;
  showEmployees();
});


document.getElementById("sortSelect").addEventListener("change", function () {
  let sortValue = this.value;

  if (sortValue === "firstName" || sortValue === "department") {
    filteredEmployees.sort(function (a, b) {
      return a[sortValue].localeCompare(b[sortValue]);
    });
  }

  currentPage = 1;
  showEmployees();
});


document.getElementById("itemsPerPage").addEventListener("change", function () {
  itemsPerPage = parseInt(this.value);
  currentPage = 1;
  showEmployees();
});


window.onload = function () {
  showEmployees();
};
  