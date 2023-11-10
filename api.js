function buttonClicked() {
  var makeup = document.getElementById("makeupbrand").value;
  var type = document.getElementById("makeuptype").value;

  fetch(
    `http://makeup-api.herokuapp.com/api/v1/products.json?brand=${makeup}&product_type=${type}`
  )
    .then((response) => response.json())
    .then((data) => {
      var displayContent = `<div id="product-grid">`; // Start a grid container.

      // Filter the data for items of the selected type.
      var filteredData = data.filter((item) => item.product_type === type);

      if (filteredData.length > 0) {
        // Loop through the filtered data and create product grid items.
        for (let i = 0; i < Math.min(10, filteredData.length); i++) {
          var item = filteredData[i];
          var brand = item.brand;
          var name = item.name;
          var desc = item.description;
          var price = item.price;
          var itemType = item.product_type;
          var productLink = item.product_link;
          var imageLink = item.image_link; // Use the correct property for the image link.

          var imageUrl = imageLink || "makeup.jpg";

          // Create a product grid item.
          displayContent += `
            <div class="product">
              <div class="image-container">
                <img src="${imageUrl}" alt="${name} Image">
              </div>
              <p class="brand">Brand: ${brand}</p>
              <p class="name">Name: ${name}</p>
              <p class="type">Type: ${itemType}</p>
              <p class="desc">Description: ${desc} </p>
              <p class="price">Price: ${price} </p>
              <p class="productLink">Learn more at: <a href="${productLink}" target="_blank">${productLink}</a></p>
              <button type="button" onclick="addToFavorites('${brand}', '${name}', '${itemType}')">Add to Favorites</button>
            </div>
          `;
        }

        displayContent += `</div>`; // Close the grid container.

        document.getElementById("display").innerHTML = displayContent;
      } else {
        document.getElementById("display").innerHTML =
          "No items of the selected type found.";
      }
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
      // Handle the error, and use a placeholder image from your folder.
      var imageUrl = "makeup.jpg";
      var displayContent = `
        <div id="product-grid">
          <div class="product">
            <div class="image-container">
              <img src="${imageUrl}" alt="Placeholder Image">
            </div>
            <p>No data available</p>
          </div>
        </div>`;
      document.getElementById("display").innerHTML = displayContent;
    });
}

function addToFavorites(brand, name, type) {
  var favorites = JSON.parse(localStorage.getItem("favorites")) || [];

  // Check if the limit has been reached
  if (favorites.length >= 5) {
    alert("You can only add up to 5 items to favorites.");
    return;
  }

  var newItem = { brand, name, type };
  favorites.push(newItem);
  localStorage.setItem("favorites", JSON.stringify(favorites));
  alert("Item added to favorites!");
}
