//Event Listener for Add Expense Button for form submission

const addButton = document.getElementById("addBtn");
addButton.addEventListener("click", (e) => {
  e.preventDefault();
  const amountInput = document.getElementById("expenseAmount");
  const descriptionInput = document.getElementById("expenseDescription");
  const categoryInput = document.getElementById("expenseCategory");

  const amount = amountInput.value;
  const description = descriptionInput.value;
  const category = categoryInput.value;

  if (!amount || !description || !category) {
    document.getElementById("warningMessage").classList.remove("d-none");
    return;
  }
  // If inputs are not empty, hide the warning message
  document.getElementById("warningMessage").classList.add("d-none");

  saveUserData(amount, description, category);
  checkUI();
  //clear form inputs
  amountInput.value = "";
  descriptionInput.value = "";
  categoryInput.value = "";
});

//function to store user in local storage
function saveUserData(amount, description, category) {
  const expenseList = {
    amount: amount,
    description: description,
    category: category,
  };
  let expenseData = JSON.parse(localStorage.getItem("expenseData")) || [];

  // Checking if expenseData is an array before pushing to avoid error
  if (Array.isArray(expenseData)) {
    expenseData.push(expenseList);
  } else {
    expenseData = [expenseList]; // If not an array, create a new array with the expenseList
  }

  localStorage.setItem("expenseData", JSON.stringify(expenseData));
  console.log(amount, description, category);
}

// Function to display all user entered expense data in the HTML body
function displayexpenseData() {
  const expenseData = JSON.parse(localStorage.getItem("expenseData"));
  const displayData = document.getElementById("expenseList");
  displayData.innerHTML = ""; //clear the previous data

  if (expenseData && expenseData.length > 0) {
    expenseData.forEach((expensedata, index) => {
      var expenseEntry = document.createElement("div");
      expenseEntry.className =
        "col-md-3 mb-4 border border-primary-subtle mx-2";

      var cardBody = document.createElement("div");
      cardBody.className = "card-body";

      cardBody.innerHTML = `
            <p><strong>Amount:</strong> Rs.${expensedata.amount}</p>
            <p><strong>Description:</strong> ${expensedata.description}</p>
            <p><strong>Category:</strong> ${expensedata.category}</p>
            <button type="button" class="btn btn-danger btn-sm btn-del" data-index="${index}">Delete</button>
            <button type="button" class="btn btn-secondary btn-sm btn-edit" data-index = "${index}">Edit</button>
        `;
      expenseEntry.appendChild(cardBody);
      displayData.appendChild(expenseEntry);
    });
  }
}
//Function & Event listener for delete button
function deleteexpenseData() {
  const deleteButtons = document.querySelectorAll(".btn-del");
  deleteButtons.forEach((button) => {
    button.addEventListener("click", function (e) {
      const indexToDel = e.target.getAttribute("data-index");
      deleteExpenseDataByIndex(indexToDel);
    });
  });
}
function deleteExpenseDataByIndex(index) {
  let expenseData = JSON.parse(localStorage.getItem("expenseData")) || [];
  if (index >= 0 && index < expenseData.length) {
    expenseData.splice(index, 1);
    localStorage.setItem("expenseData", JSON.stringify(expenseData));
    checkUI();
  }
}

//function & event listener for edit button
function editexpenseData() {
  const editButtons = document.querySelectorAll(".btn-edit");
  editButtons.forEach((button) => {
    button.addEventListener("click", function (e) {
      const indexToEdit = e.target.getAttribute("data-index");
      populateExpenseData(indexToEdit);
      deleteExpenseDataByIndex(indexToEdit);
    });
  });
}
function populateExpenseData(index) {
  let expenseData = JSON.parse(localStorage.getItem("expenseData"));
  if (index >= 0 && index < expenseData.length) {
    const userExpense = expenseData[index];
    document.getElementById("expenseAmount").value = userExpense.amount;
    document.getElementById("expenseDescription").value =
      userExpense.description;
    document.getElementById("expenseCategory").value = userExpense.category;
  }
}

function checkUI() {
  displayexpenseData();
  deleteexpenseData();
  editexpenseData();
}
checkUI();
