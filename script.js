function addExpense() {
  // Getting values from the form
  var amount = document.getElementById("expenseAmount").value;
  var description = document.getElementById("expenseDescription").value;
  var category = document.getElementById("expenseCategory").value;

  // Creating a new expense entry
  var expenseEntry = document.createElement("div");
  expenseEntry.className = "col-md-3 mb-4 border border-primary-subtle mx-2";

  var cardBody = document.createElement("div");
  cardBody.className = "card-body";

  cardBody.innerHTML = `
            <p><strong>Amount:</strong> Rs.${amount}</p>
            <p><strong>Description:</strong> ${description}</p>
            <p><strong>Category:</strong> ${category}</p>
            <button type="button" class="btn btn-danger btn-sm" onclick="deleteExpense(this)">Delete</button>
            <button type="button" class="btn btn-secondary btn-sm" onclick="editExpense(this)">Edit</button>
        `;

  expenseEntry.appendChild(cardBody);

  // Append the new entry to the expense list
  document.getElementById("expenseList").appendChild(expenseEntry);

  // Clear the form inputs
  document.getElementById("expenseForm").reset();
}

function deleteExpense(button) {
  // Remove the parent card of the clicked delete button
  button.closest(".card").remove();
}

function editExpense(button) {
  // Retrieve the values from the card and populate the form for editing
  var cardBody = button.closest(".card").querySelector(".card-body");
  var amount = cardBody
    .querySelector("p:nth-child(1)")
    .innerText.split(": ")[1];
  var description = cardBody
    .querySelector("p:nth-child(2)")
    .innerText.split(": ")[1];
  var category = cardBody
    .querySelector("p:nth-child(3)")
    .innerText.split(": ")[1];

  // Set form values for editing
  document.getElementById("expenseAmount").value = parseFloat(amount);
  document.getElementById("expenseDescription").value = description;
  document.getElementById("expenseCategory").value = category;

  // Delete the expense entry
  deleteExpense(button);
}
