// Array to hold the products in the cart
let cart = [];

// Function to add a product to the cart
function addToCart(name, price) {
  const existing = cart.find(item => item.name === name);
  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({ name, price, quantity: 1 });
  }
  updateCartDisplay();
}

// Function to update the cart display
function updateCartDisplay() {
  // Update cart count in the cart icon
  const cartCount = document.getElementById('cartCount');
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  cartCount.textContent = totalItems;

  // Update modal content
  const cartItems = document.getElementById('cartItems');
  if (cart.length === 0) {
    cartItems.innerHTML = '<p>Your cart is empty.</p>';
  } else {
    let html = `<table>
                  <tr>
                    <th>Product</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th>Total</th>
                    <th>Action</th>
                  </tr>`;
    cart.forEach((item, index) => {
      html += `<tr>
                <td>${item.name}</td>
                <td>${item.price}</td>
                <td>
                  <div class="quantity-control">
                    <button onclick="decreaseQuantity(${index})">-</button>
                    <span>${item.quantity}</span>
                    <button onclick="increaseQuantity(${index})">+</button>
                  </div>
                </td>
                <td>${item.price * item.quantity}</td>
                <td>
                  <button onclick="removeItem(${index})" style="background:var(--color-dark); color:#fff; border:none; padding:5px 8px; border-radius:3px; cursor:pointer;">Remove</button>
                </td>
               </tr>`;
    });
    html += '</table>';
    cartItems.innerHTML = html;
  }

  // Update total price
  const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  document.getElementById('cartTotal').textContent = totalPrice;
}

// Function to increase quantity
function increaseQuantity(index) {
  cart[index].quantity += 1;
  updateCartDisplay();
}

// Function to decrease quantity
function decreaseQuantity(index) {
  if (cart[index].quantity > 1) {
    cart[index].quantity -= 1;
  } else {
    // Remove item if quantity is 1 and user decreases it
    cart.splice(index, 1);
  }
  updateCartDisplay();
}

// Function to remove an item from the cart
function removeItem(index) {
  cart.splice(index, 1);
  updateCartDisplay();
}

// Function to confirm purchase (can be modified to send data to a server)
function confirmPurchase() {
  if (cart.length === 0) {
    alert("Your cart is empty!");
    return;
  }
  alert("Your order has been confirmed!");
  cart = [];
  updateCartDisplay();
  toggleCartModal();
}

// Function to show/hide the cart modal
function toggleCartModal() {
  const modal = document.getElementById('cartModal');
  if (modal.style.display === 'flex') {
    modal.style.display = 'none';
  } else {
    modal.style.display = 'flex';
  }
}

// Function to show/hide the side navigation (hamburger menu)
function toggleSideNav() {
  const sideNav = document.getElementById("sideNav");
  if (sideNav.style.width === "250px") {
    sideNav.style.width = "0";
  } else {
    sideNav.style.width = "250px";
  }
}
// Function to confirm purchase and go to the order information page
function confirmPurchase() {
  if (cart.length === 0) {
    alert("Your cart is empty!");
    return;
  }
  // Redirect to the order information page
  window.location.href = "order.html";
}

