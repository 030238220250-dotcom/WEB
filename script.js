let cart = [];

function addToCart(name, price) {
  cart.push({ name, price });
  renderCart();
}

function renderCart() {
  let cartItems = document.getElementById("cartItems");
  let total = document.getElementById("total");
  cartItems.innerHTML = "";
  let sum = 0;

  cart.forEach((item) => {
    let li = document.createElement("li");
    li.textContent = `${item.name} - ${item.price.toLocaleString()} đ`;
    cartItems.appendChild(li);
    sum += item.price;
  });

  total.textContent = sum.toLocaleString();
}

function checkout() {
  const name = document.getElementById("customerName").value;
  if (!name || cart.length === 0) {
    alert("Vui lòng nhập tên và chọn ít nhất 1 sản phẩm!");
    return;
  }

  const data = {
    name: name,
    items: JSON.stringify(cart),
    total: cart.reduce((acc, i) => acc + i.price, 0)
  };

  fetch("https://script.google.com/macros/s/AKfycbyU45n3I7Lqd1T2R0xxu5xbzA8s8cw6IviuO4EoR9vxNXEKt6_t1iad9vYAac67ME2U/exec", {
    method: "POST",
    mode: "no-cors",
     headers: {
    "Content-Type": "application/json",
     },
    body: JSON.stringify(data)
  })
  .then(res => res.text())
  .then(txt => {
    alert("✅ Đặt hàng thành công!");
    cart = [];
    renderCart();
    document.getElementById("customerName").value = "";
  })
  .catch(err => alert("❌ Lỗi: " + err));
}


