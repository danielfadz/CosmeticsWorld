function displayFavorites() {
  var favorites = JSON.parse(localStorage.getItem("favorites")) || [];
  var favoritesContainer = document.getElementById("favorites-container");
  var favoritesContent = "";

  favorites.forEach((item, index) => {
    favoritesContent += `
        <div class="favorite-item">
          <p>Brand: ${item.brand}</p>
          <p>Name: <span id="item-name-${index}">${item.name}</span></p>
          <p>Type: ${item.type}</p>
          <button class="edit-button" data-index="${index}">Edit</button>
          <button class="delete-button" data-index="${index}">Delete</button>
        </div>
      `;
  });

  // Display the favorites content on the favorites.html page
  favoritesContainer.innerHTML = favoritesContent;

  // Attach event listeners after the content is added
  attachEventListeners();
}

function editItem(index) {
  var newName = prompt("Enter the new name:");
  if (newName !== null) {
    // Update the name in the local storage
    var favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    favorites[index].name = newName;
    localStorage.setItem("favorites", JSON.stringify(favorites));

    // Update the displayed name on the page
    document.getElementById(`item-name-${index}`).innerText = newName;
  }
}

function deleteItem(index) {
  // Confirm before deleting
  var confirmDelete = confirm("Are you sure you want to delete this item?");
  if (confirmDelete) {
    // Remove the item from local storage
    var favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    favorites.splice(index, 1);
    localStorage.setItem("favorites", JSON.stringify(favorites));

    // Re-display the updated favorites list
    displayFavorites();
  }
}

function attachEventListeners() {
  var editButtons = document.querySelectorAll(".edit-button");
  var deleteButtons = document.querySelectorAll(".delete-button");

  editButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      // Get the index from the data-index dataset property
      var index = button.dataset.index;
      editItem(index);
    });
  });

  deleteButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      // Get the index from the data-index dataset property
      var index = button.dataset.index;
      deleteItem(index);
    });
  });
}
