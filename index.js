////////////////
// INIT VALUE
///////////////
let products = [
  {
    id: 1579581880923,
    category: "Fast Food",
    name: "Noodle",
    price: 3500,
    stock: 9,
  },
  {
    id: 1579581881130,
    category: "Electronic",
    name: "Handphone",
    price: 430000,
    stock: 8,
  },
  {
    id: 1579581881342,
    category: "Cloth",
    name: "Hoodie",
    price: 30000,
    stock: 7,
  },
  {
    id: 1579581881577,
    category: "Fruit",
    name: "Apple",
    price: 10000,
    stock: 8,
  },
];

const categories = ["All", "Fast Food", "Electronic", "Cloth", "Fruit"];

let carts = [];

////////////////////
// Fungsi Rendering
///////////////////
const fnRenderList = (index) => {
  const listProduct = products.map((product) => {
    const { id, category, name, price, stock } = product;

    if (id != index) {
      return `
        <tr>
            <td>${id}</td>
            <td>${category}</td>
            <td>${name}</td>
            <td>${price}</td>
            <td>${stock}</td>
            <td><input type="button" value="Add" onclick="fnAdd(${id})" /></td>
            <td><input type="button" value="Delete" onclick="fnDelete(${id})" /></td>
            <td><input type="button" value="Edit" onclick="fnEdit(${id})" /></td>
        </tr>`;
    }
    return `
        <tr>
            <td>${id}</td>
            <td>${category}</td>
            <td><input type="text" id="nameEdit" value="${name}" /></td>
            <td><input type="text" id="priceEdit" value="${price}" /></td>
            <td><input type="text" id="stockEdit" value="${stock}" /></td>
            <td><input type="button" value="Add" disabled /></td>
            <td><input type="button" value="Save" onclick="fnSave(${id})" /></td>
            <td><input type="button" value="Cancel" onclick="fnCancel()" /></td>
        </tr>`;
  });

  const listCategory = categories.map((category) => {
    return `<option value="${category}">${category}</option>`;
  });

  //category
  document.getElementById("catFilter").innerHTML = listCategory.join("");
  document.getElementById("catInput").innerHTML = listCategory.join("");

  //Data Products
  document.getElementById("render").innerHTML = listProduct.join("");
};

///////////////////////////
//Fungsi render filter list
///////////////////////////
const fnFilterList = (arr) => {
  const listProduct = arr.map((product) => {
    const { id, category, name, price, stock } = product;
    return `
        <tr>
            <td>${id}</td>
            <td>${category}</td>
            <td>${name}</td>
            <td>${price}</td>
            <td>${stock}</td>
            <td><input type="button" value="Add" onclick="fnAdd(${id})" /></td>
            <td><input type="button" value="Delete" onclick="fnDelete(${id})" /></td>
            <td><input type="button" value="Edit" onclick="fnEdit(${id})" /></td>
        </tr>`;
  });

  //Data Products
  document.getElementById("render").innerHTML = listProduct.join("");
};

////////////////////
//Fungsi Render Cart
/////////////////////
const fnRenderCart = () => {
  const listCart = carts.map((cart) => {
    const { id, category, name, price, qty } = cart;
    return `
    <tr>
          <td>${id}</td>
          <td>${category}</td>
          <td>${name}</td>
          <td>${price}</td>
          <td>${qty}</td>
          <td><input type="button" value="Delete" onclick="fnDeleteCart(${id})" /></td>
      </tr>`;
  });
  document.getElementById("renderCart").innerHTML = listCart.join("");
};

////////////////////
//Fungsi Payment
/////////////////////

const fnPayment = () => {
  const listCart = carts.map((cart) => {
    const { id, category, name, price, qty } = cart;
    return `<p>${id} || ${category} || ${name} || ${price} x ${qty} = ${
      price * qty
    }</p>`;
  });

  let subTotal = 0;
  carts.forEach((cart) => {
    subTotal += cart.price * cart.qty;
  });

  const ppn = subTotal * 0.1;
  const finalTotal = subTotal + ppn;

  const listDetail = listCart.join("");

  document.getElementById("payment").innerHTML = listDetail;
  document.getElementById(
    "subTotal"
  ).innerHTML = `Sub Total : ${subTotal}</h3>`;
  document.getElementById("ppn").innerHTML = `PPN 10% : ${ppn}`;
  document.getElementById("totalPrice").innerHTML = `Total : ${finalTotal}`;
  document.getElementById("totalPrice2").value = finalTotal;
  document.getElementById("pay").hidden = false;
};

const fnPay = () => {
  const totalPrice = document.getElementById("totalPrice2").value;
  const pay = parseInt(prompt(`Input your payment: ${totalPrice}`));
  if (pay == totalPrice) {
    alert("Thanks, Payment Success");
  } else if (pay < totalPrice) {
    alert(`Sorry, your money is not enaugh`);
  } else if (pay > totalPrice) {
    alert(
      `Thanks, Payment Success. change money for you : ${pay - totalPrice}`
    );
  }
};

////////////////////
//Fungsi Filter name
/////////////////////
const fnFilterName = () => {
  //get data from user
  const keyword = document.getElementById("nameFilter").value;

  //filter sesuai nama
  let filterResult = products.filter((product) => {
    //turn lowercase product name
    nameLow = product.name.toLowerCase();

    //turn lowercase keyword
    keywordLow = keyword.toLowerCase();

    return nameLow.includes(keywordLow);
  });
  fnFilterList(filterResult);
};

//////////////////////
//Fungsi Filter Price
//////////////////////
const fnFilterPrice = () => {
  //get data from user
  const min = document.getElementById("min").value;
  const max = document.getElementById("max").value;

  let filterResult = products;

  //all text box don't empty
  if (!(min == "" || max == "")) {
    filterResult = products.filter((product) => {
      const { price } = product;
      return price >= min && price <= max;
    });
  }
  fnFilterList(filterResult);
};

///////////////////////
//Funsi filter category
///////////////////////
const fnFilterCategory = () => {
  //get data from user
  const selectedCategory = document.getElementById("catFilter").value;

  let filterResult = products;
  if (selectedCategory != "All") {
    filterResult = products.filter((product) => {
      return product.category == selectedCategory;
    });
  }
  fnFilterList(filterResult);
};

/////////////////////
//Fungsi Reset Filter
/////////////////////
const fnResetFilter = () => {
  const inputTags = document.getElementsByName("txtfilter");

  for (const input of inputTags) {
    input.value = "";
  }

  fnRenderList();
};

/////////////////////
//Fungsi Input Data
/////////////////////
const fnInputData = () => {
  //get data from html
  const name = document.getElementById("nameInput").value;
  const price = parseInt(document.getElementById("priceInput").value);
  const category = document.getElementById("catInput").value;
  const stock = document.getElementById("stock").value;

  //create data object
  const time = new Date();
  const id = time.getTime();

  //push new data
  products.push({ id, name, price, category, stock });

  //clean all text box
  document.getElementById("nameInput").value = "";
  document.getElementById("priceInput").value = "";
  document.getElementById("stock").value = "";

  fnRenderList();
};

////////////////
//Fungsi Delete
////////////////
const fnDelete = (index) => {
  products = products.filter((product) => {
    return product.id != index;
  });
  fnRenderList();
};

////////////////
//Fungsi Edit
////////////////
const fnEdit = (index) => {
  fnRenderList(index);
};

////////////////
//Fungsi Cancel
////////////////
const fnCancel = () => {
  fnRenderList();
};

////////////////
//Fungsi Save
////////////////
const fnSave = (index) => {
  //get data from user
  const name = document.getElementById("nameEdit").value;
  const price = document.getElementById("priceEdit").value;
  const stock = document.getElementById("stockEdit").value;

  //found index
  const found = products.findIndex((product) => {
    return product.id == index;
  });

  products[found] = { ...products[found], name, price, stock };

  fnRenderList();
};

////////////////
//Fungsi Add Buy
////////////////
const fnAdd = (index) => {
  const selectedProduct = products.find((product) => {
    return product.id == index;
  });

  if (selectedProduct.stock == 0) {
    alert("Stock sudah habis");
  } else {
    const foundCart = carts.find((cart) => {
      return cart.id == index;
    });

    //jika produk belum ada di cart
    if (!foundCart) {
      const { id, category, name, price } = selectedProduct;
      carts.push({ id, category, name, price, qty: 1 });
    } else {
      //Tambah quantity cart
      const idx = carts.findIndex((cart) => {
        return cart.id == index;
      });
      carts[idx].qty++;
    }

    //Kurangi Quantity products
    const idx = products.findIndex((cart) => {
      return cart.id == index;
    });
    products[idx].stock--;
  }

  fnRenderList();
  fnRenderCart();
};

////////////////
//Fungsi Delete
////////////////
const fnDeleteCart = (index) => {
  //temukan index
  const idxProduct = products.findIndex((product) => {
    return product.id == index;
  });
  const idxCart = carts.findIndex((cart) => {
    return cart.id == index;
  });

  //menjumlahkan quantity yg di delete dgn stock product
  products[idxProduct].stock += carts[idxCart].qty;

  carts = carts.filter((cart) => {
    return cart.id != index;
  });
  fnRenderCart();
  fnRenderList();
};

fnRenderList();
