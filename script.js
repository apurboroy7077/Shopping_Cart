// -------------------------MAKING PRODUCT LIST-------------------------------------------------------------------------------
let casual_t_shirt = {
  name: "Casual T-Shirt",
  price: 150,
  image_source: "images/tshirt.webp",
  number: 0,
};
let fireworks_t_shirt = {
  name: "Fireworks T-Shirt",
  price: 100,
  image_source: "images/tshirt2.jpg",
  number: 0,
};
let kids_fireworks_t_shirt = {
  name: "Kids Fireworks T-Shirt",
  price: 200,
  image_source: "images/tshirt3.jpg",
  number: 0,
};
let jurassic_park_shirt = {
  name: "Jurassic Park T-Shirt",
  price: 500,
  image_source: "images/jurassic_park.jpg",
  number: 0,
};
let iceland_tshirt = {
  name: "Iceland T-Shirt",
  price: 700,
  image_source: "images/iceland_tshirt.jpg",
  number: 0,
};
let doraemon_tshirt = {
  name: "Doraemon Tshirt",
  price: 399,
  image_source: "images/doraemon_tshirt.webp",
  number: 0,
};
//---------------------------local-storage ---------------------------------
// localStorage.setItem("doraemon", JSON.stringify(doraemon_tshirt));
// let p = localStorage.getItem("doraemon");
// console.log(JSON.parse(p));

let product_div = document.getElementsByClassName("main1")[0];
let products = [
  casual_t_shirt,
  fireworks_t_shirt,
  kids_fireworks_t_shirt,
  jurassic_park_shirt,
  iceland_tshirt,
  doraemon_tshirt,
];
//---------------------------Connecting to localStorage-----------------------------------------------------------------------
console.log(JSON.parse(localStorage.getItem("Cart_Information")));
let cart_information = localStorage.getItem("Cart_Information");
if (cart_information == null) {
  localStorage.setItem("Cart_Information", JSON.stringify(products));
} else {
  products = JSON.parse(cart_information);
}
let update_local_storage = () => {
  localStorage.setItem("Cart_Information", JSON.stringify(products));
};

for (let i = 0; i < products.length; i++) {
  let product = products[i];
  product_div.innerHTML =
    product_div.innerHTML +
    `
  <div class="card">
            <img src="${product.image_source}" alt="" />
            <div>
              <p class="card_text_1">${product.name}</p>
              <p class="card_text_2">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio,
                maiores!
              </p>
              <span class="card_span">
                <span class="card_price_span">${product.price}</span>
                <span>
                  <span class="minus_button">-</span>
                  <span class="number_span">${product.number}</span>
                  <span class="plus_button">+</span>
                </span>
              </span>
            </div>
          </div>`;
}
// -----------------------ADDING FUNCTIONALITY TO PLUS AND MINUS BUTTON---------------------------------------------------------
let plus_button = document.getElementsByClassName("plus_button");
plus_button = Array.from(plus_button);
let cart_icon_number = document.getElementsByClassName("cart_icon_number")[0];
let total_product = 0;
let reduce_total_product = () => {
  total_product--;
  cart_icon_number.innerHTML = total_product;
};
let increase_total_product = () => {
  total_product++;
  cart_icon_number.innerHTML = total_product;
};
for (let i = 0; i < plus_button.length; i++) {
  let button = plus_button[i];
  button.addEventListener("click", () => {
    let number_span = button.previousElementSibling;
    // let number = number_span.innerHTML;
    let product_name =
      button.parentElement.parentElement.parentElement.firstElementChild
        .innerHTML;
    products.forEach((product) => {
      if (product_name == product.name) {
        product.number++;
        number_span.innerHTML = product.number;
      }
    });
    // number = Number(number);
    // number++;
    //number_span.innerHTML = number;
    update_cart_icon();
    update_local_storage();
  });
}

let minus_button = document.getElementsByClassName("minus_button");
minus_button = Array.from(minus_button);
for (let i = 0; i < minus_button.length; i++) {
  let button = minus_button[i];
  button.addEventListener("click", () => {
    let number_span = button.nextElementSibling;
    let product_name =
      button.parentElement.parentElement.parentElement.firstElementChild
        .innerHTML;
    products.forEach((product) => {
      if (product_name == product.name) {
        if (product.number > 0) {
          product.number--;
          number_span.innerHTML = product.number;
          update_cart_icon();
        }
      }
    });
  });
}
// -------------------------------------ADDING THE FUNCTIONALITY OF CART Icon -------------------------------------------------------------------
let cart_icon = document.getElementsByClassName("fa-cart-shopping")[0];
let shopping_list = document.getElementsByClassName("main1")[0];
let cart_list = document.getElementsByClassName("cart")[0];
let cart_billing = document.getElementsByClassName("cart_billing")[0];

cart_icon.addEventListener("click", () => {
  if (shopping_list.classList.contains("inactive")) {
    shopping_list.classList.remove("inactive");
    cart_list.classList.add("inactive");
    cart_billing.classList.add("inactive");
  } else {
    shopping_list.classList.add("inactive");
    cart_list.classList.remove("inactive");
    cart_billing.classList.remove("inactive");
  }
});
cart_icon.addEventListener("click", () => {
  cart_list.innerHTML = "";
  for (let i = 0; i < products.length; i++) {
    let product = products[i];
    if (product.number > 0) {
      cart_list.innerHTML =
        cart_list.innerHTML +
        `
        <div class="cart_card">
        <img src="${product.image_source}" alt="" />
        <div class="cart_card_details">
          <div class="">
            <div class="cart_card_details_row_1">
              <span class="cart_product_name">${product.name}</span>
              <span class="cart_product_price">${product.price}</span>
            </div>
            <div class="cart_card_details_row_2">
              <span class="cart_minus_button">-</span>
              <span class="cart_single_total_number">${product.number}</span>
              <span class="cart_plus_button">+</span>
            </div>
            <div class="cart_card_details_row_2 cart_single_product_total_price">$500</div>
          </div>
          <span class="cross_sign">X</span>
        </div>
      </div>
      `;
    }
  }
});
cart_icon.addEventListener("click", () => {
  // ----------------------------Adding the Function to cart plus and minus button -----------------------------------------------
  let cart_plus_button = document.getElementsByClassName("cart_plus_button");
  cart_plus_button = Array.from(cart_plus_button);
  for (let i = 0; i < cart_plus_button.length; i++) {
    let button = cart_plus_button[i];

    button.addEventListener("click", () => {
      let product_name =
        button.parentElement.parentElement.children[0].children[0].innerHTML;
      let product_number_span = button.parentElement.children[1];

      products.forEach((product) => {
        if (product_name == product.name) {
          product.number++;
          product_number_span.innerHTML = product.number;
        }
      });
      update_cart_icon();
    });
  }
  let cart_minus_button = document.getElementsByClassName("cart_minus_button");
  cart_minus_button = Array.from(cart_minus_button);
  for (let i = 0; i < cart_minus_button.length; i++) {
    let button = cart_minus_button[i];
    button.addEventListener("click", () => {
      let product_name =
        button.parentElement.parentElement.children[0].children[0].innerHTML;
      let product_number_span = button.parentElement.children[1];
      products.forEach((product) => {
        if (product_name == product.name) {
          if (product.number > 0) {
            product.number--;
            product_number_span.innerHTML = product.number;
          }
        }
      });
      update_cart_icon();
    });
  }
});
cart_icon.addEventListener("click", () => {
  let empty_message = document.createElement("h1");
  empty_message.classList.add("empty_message");
  empty_message.innerHTML = `Your Cart is Empty`;
  if (total_product <= 0) {
    cart_list.appendChild(empty_message);
  } else {
    // cart_list.removeChild(empty_message);
  }
});
cart_icon.addEventListener("click", () => {
  let number_span = document.getElementsByClassName("number_span");
  number_span = Array.from(number_span);
  for (let i = 0; i < number_span.length; i++) {
    let number = number_span[i];
    let name =
      number.parentElement.parentElement.parentElement.children[0].innerHTML;
    products.forEach((product) => {
      if (name == product.name) {
        number.innerHTML = product.number;
      }
    });
  }
});
cart_icon.addEventListener("click", () => {
  let cart_single_product_total_price = document.getElementsByClassName(
    "cart_single_product_total_price"
  );
  cart_single_product_total_price = Array.from(cart_single_product_total_price);
  for (let i = 0; i < cart_single_product_total_price.length; i++) {
    let name_1 =
      cart_single_product_total_price[i].parentElement.children[0].children[0]
        .innerHTML;
    products.forEach((product) => {
      if (product.name == name_1) {
        cart_single_product_total_price[i].innerHTML =
          product.price * product.number;
      }
    });
  }
});
cart_icon.addEventListener("click", () => {
  let cart_plus_button = document.getElementsByClassName("cart_plus_button");
  cart_plus_button = Array.from(cart_plus_button);
  for (let i = 0; i < cart_plus_button.length; i++) {
    let plus_button = cart_plus_button[i];
    plus_button.addEventListener("click", () => {
      let name =
        plus_button.parentElement.parentElement.children[0].children[0]
          .innerHTML;
      let price_span = plus_button.parentElement.parentElement.children[2];
      products.forEach((product) => {
        if (name == product.name) {
          price_span.innerHTML = product.price * product.number;
        }
      });
    });
  }
});
cart_icon.addEventListener("click", () => {
  let cart_minus_button = document.getElementsByClassName("cart_minus_button");
  cart_minus_button = Array.from(cart_minus_button);
  for (let i = 0; i < cart_minus_button.length; i++) {
    let minus_button = cart_minus_button[i];
    minus_button.addEventListener("click", () => {
      let name =
        minus_button.parentElement.parentElement.children[0].children[0]
          .innerHTML;
      let price_span = minus_button.parentElement.parentElement.children[2];
      products.forEach((product) => {
        if (name == product.name) {
          price_span.innerHTML = product.price * product.number;
        }
      });
    });
  }
});
cart_icon.addEventListener("click", () => {
  update_total_money();
  let cart_plus_button = document.getElementsByClassName("cart_plus_button");
  cart_plus_button = Array.from(cart_plus_button);
  for (let i = 0; i < cart_plus_button.length; i++) {
    let button = cart_plus_button[i];
    button.addEventListener("click", () => {
      update_total_money();
    });
  }
  let cart_minus_button = document.getElementsByClassName("cart_minus_button");
  cart_minus_button = Array.from(cart_minus_button);
  for (let i = 0; i < cart_minus_button.length; i++) {
    let button = cart_minus_button[i];
    button.addEventListener("click", () => {
      update_total_money();
    });
  }
});
//--------------------------Making the Cross_Card Button--------------------------------------------------------------
cart_icon.addEventListener("click", () => {
  let cross_button = document.getElementsByClassName("cross_sign");
  cross_button = Array.from(cross_button);
  for (let i = 0; i < cross_button.length; i++) {
    let button = cross_button[i];
    button.addEventListener("click", () => {
      let name =
        button.parentElement.children[0].children[0].children[0].innerHTML;
      products.forEach((product) => {
        if (product.name == name) {
          product.number = 0;
        }
      });
      update_total_money();
      update_cart_icon();
      let this_card = button.parentElement.parentElement;

      this_card.remove();
    });
  }
});
cart_icon.addEventListener("click", () => {
  update_cart_icon();
});
//-----------------------Updating Product Number in Icon -------------------------------------------------------
let update_cart_icon = () => {
  total_product = 0;
  for (let i = 0; i < products.length; i++) {
    let product = products[i];
    total_product = total_product + product.number;
  }
  cart_icon_number.innerHTML = total_product;
};
let update_total_money = () => {
  let total_bill = 0;
  for (let i = 0; i < products.length; i++) {
    let product = products[i];
    total_bill = total_bill + product.price * product.number;
  }
  let total_bill_div = document.getElementsByClassName("total_bill")[0];
  total_bill_div.innerHTML = total_bill;
};
// -------------Clear Cart Button----------------------------------------------------------------------------------
let clear_cart_button = document.getElementsByClassName("clear_cart")[0];
clear_cart_button.addEventListener("click", () => {
  for (let i = 0; i < products.length; i++) {
    let product = products[i];
    product.number = 0;
  }
  update_cart_icon();
  update_total_money();
  cart_section.innerHTML = "";
  let cart_section = document.getElementsByClassName("cart")[0];
  let empty_message = document.createElement("h1");
  empty_message.classList.add("empty_message");
  empty_message.innerHTML = `Your Cart is Empty`;
});
let container = document.getElementsByClassName("container")[0];
container.addEventListener("click", () => {
  update_cart_icon();
  update_local_storage();
});
update_cart_icon();
