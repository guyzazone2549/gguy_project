let shop = document.getElementById("shop");

let basket = JSON.parse(localStorage.getItem("data")) || [];

let generateShop = () => {
  return (shop.innerHTML = front
    .map((x) => {
      let { id, name, price, desc, img } = x;
      let search = basket.find((x) => x.id === id) || [];
      return `
      <div class="container">
      <div class="row">
          <div class="col-xl-4 col-lg-4 col-md-6 col-sm-12">
              <img src="${img[0]}" alt="" width="100%" class="m-1">
              <img src="${img[1]}" alt="" width="100%" class="m-1">
          </div>
          <div class="col-xl-4 col-lg-4 col-md-6 col-sm-12">
              <img src="${img[2]}" alt="" width="100%" class="m-1">
              <img src="${img[3]}" alt="" width="100%" class="m-1">
          </div>
          <div class="col-xl-4 col-lg-4 col-md-6 col-sm-12">
              <h2>${name}</h2>
              <p>$ ${price}</p>
              <h3>Details</h3>
              <p>${desc}</p>
              <div class="btn btn-secondary d-flex flex-wrap">
              <i onclick="decrement(${id})" class="bi bi-dash-lg bg-secondary"><p>DELETE</p></i>
              <div id=${id} class="quantity p-3" style="color:light">
              ${search.item === undefined ? 0 : search.item}
              </div>
              <i onclick="increment(${id})" class="bi bi-plus-lg bg-secondary"><p>ADD CHART</p></i>
            </div>
          </div>
      </div>
  </div>
    `;
    })
    .join(""));
};

generateShop();

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

  // console.log(basket);
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
  // console.log(basket);
  localStorage.setItem("data", JSON.stringify(basket));
};
let update = (id) => {
  let search = basket.find((x) => x.id === id);
  // console.log(search.item);
  document.getElementById(id).innerHTML = search.item;
  calculation();
};

let calculation = () => {
  let cartIcon = document.getElementById("cartAmount");
  cartIcon.innerHTML = basket.map((x) => x.item).reduce((x, y) => x + y, 0);
};

calculation();