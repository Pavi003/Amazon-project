export let cart;

if (cart) {
  cart = JSON.parse(localStorage.getItem("cart"));
} else {
  cart = [
    {
      productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
      quantity: 2,
      delieveryOptionId: "1",
    },
    {
      productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
      quantity: 1,
      delieveryOptionId: "2",
    },
  ];
}

let cartQuantity = 0;

cart.forEach((cartItem) => {
  cartQuantity += cartItem.quantity;
});

export function addToCart(productId) {
  let matchingItem;

  cart.forEach((item) => {
    if (productId === item.productId) {
      matchingItem = item;
    }
  });

  if (matchingItem) {
    matchingItem.quantity += 1;
  } else {
    cart.push({
      productId: productId,
      quantity: 1,
      delieveryOptionId: "1",
    });
  }
  saveToStorge();
  console.log(JSON.parse(localStorage.getItem("cart")));
}

export function removeFromCart(productId) {
  let newCart = [];

  cart.forEach((cartItem) => {
    if (cartItem.productId !== productId) {
      newCart.push(cartItem);
    }
  });

  cart = newCart;

  saveToStorge();
}

export function updateDeliveryOption(productId, delieveryOptionId) {
  let matchingItem;

  cart.forEach((item) => {
    if (productId === item.productId) {
      matchingItem = item;
    }
  });

  matchingItem.delieveryOptionId = delieveryOptionId;

  saveToStorge();
}

function saveToStorge() {
  localStorage.setItem("cart", JSON.stringify(cart));
}
