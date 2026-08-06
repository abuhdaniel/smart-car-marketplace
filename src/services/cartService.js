let cart = [];

export function addToCart(vehicle) {

  cart.push(vehicle);

  updateCartCounter();

  alert(`${vehicle.brand} ${vehicle.model} added to cart!`);

}

export function getCart() {
  return cart;
}

export function getTotal() {

  return cart.reduce((total, vehicle) => {

    return total + vehicle.price;

  }, 0);

}

function updateCartCounter() {

  const counter = document.getElementById("cart-count");

  if(counter){

    counter.textContent = `(${cart.length})`;

  }

}