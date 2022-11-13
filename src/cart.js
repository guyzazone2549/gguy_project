let label = document.getElementById("label");
let ShoppingCart = document.getElementById("shopping-cart");

let basket = JSON.parse(localStorage.getItem("data")) || [];

let calculation = () => {
  let cartIcon = document.getElementById("cartAmount");
  cartIcon.innerHTML = basket.map((x) => x.item).reduce((x, y) => x + y, 0);
};
calculation();

let generateCartItems = () => {
  if (basket.length !== 0) {
    return (ShoppingCart.innerHTML = basket
      .map((x) => {
        let { id, item } = x;
        let search = pall.find((y) => y.id === id) || [];
        return `
        <div class="container card mt-1" style="width:100%; border:2px solid gray">
  <div class="row text-center">
    <div class="col-10">
    <a href="${search.desc}"><img class="" width="100px" src=${search.img} alt="" /></a>
      <h3>${search.name}</h3>
      <p class="cart-item-price">${item} Units</p>
      <div class="text-center"
      <div class="btn">
        <i onclick="decrement(${id})" class="bi bi-dash-lg"></i>
        <div id=${id} class="quantity">${item}</div>
        <i onclick="increment(${id})" class="bi bi-plus-lg"></i>
    
    </div>
    <div>
        <input type="text" placeholder="size,color,etc." class="form-control">
        </div>
    <h3>$ ${item * search.price}</h3>
    </div>
    <div class="col-2">
      <i onclick="removeItem(${id})">
        <p class="btn btn-danger">remove</p>
      </i>
    </div>
  </div>
</div>
     
      `;
      })
      .join(""));
  } else {
    ShoppingCart.innerHTML = ``;
    label.innerHTML = `
    <h2>Cart is Empty</h2>
    <a href="index.html">
      <button class="btn btn-secondary">Back to shop</button>
    </a>
    `;
  }
};

generateCartItems();

  let increment = (id) => {
  let selectedItem = id;
  let search = basket.find((x) => x.id === selectedItem.id);

  if (search === undefined) {
    basket.push({
      id: selectedItem.id,
      item: 1,
    });
  } else {
    search.item += 1;
  }

  generateCartItems();
  update(selectedItem.id);
  localStorage.setItem("data", JSON.stringify(basket));
};
let decrement = (id) => {
  let selectedItem = id;
  let search = basket.find((x) => x.id === selectedItem.id);

  if (search === undefined) return;
  else if (search.item === 0) return;
  else {
    search.item -= 1;
  }
  update(selectedItem.id);
  basket = basket.filter((x) => x.item !== 0);
  generateCartItems();
  localStorage.setItem("data", JSON.stringify(basket));
};

let update = (id) => {
  let search = basket.find((x) => x.id === id);
  // console.log(search.item);
  document.getElementById(id).innerHTML = search.item;
  calculation();
  TotalAmount();
};

let removeItem = (id) => {
  let selectedItem = id;
  // console.log(selectedItem.id);
  basket = basket.filter((x) => x.id !== selectedItem.id);
  generateCartItems();
  TotalAmount();
  localStorage.setItem("data", JSON.stringify(basket));
};

let clearCart = () => {
  basket = [];
  generateCartItems();
  localStorage.setItem("data", JSON.stringify(basket));
};

let TotalAmount = () => {
  if (basket.length !== 0) {
    let amount = basket
      .map((x) => {
        let { item, id } = x;
        let search = pall.find((y) => y.id === id) || [];

        return item * search.price;
      })
      .reduce((x, y) => x + y, 0);
    // console.log(amount);
    label.innerHTML = `
    <h2>Total Bill : <mark class="btn btn-danger">$ ${amount}</mark></h2>
    <div class="btn btn-secondary" onclick="clearCart()">Clear Cart</div>
    <div class="btn btn-secondary"><a style="color: white;" href="index.html">back to shop</a></div>
    `;
  } else return;
};

TotalAmount();