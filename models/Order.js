// Only works when running your server locally
// Make sure server.js is running

async function loadOrders() {
  try {
    const res = await fetch('http://localhost:3000/api/orders');
    const orders = await res.json();

    const tbody = document.getElementById('order-list');
    tbody.innerHTML = '';

    orders.forEach(order => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td>${order._id}</td>
        <td>${order.customer.name}</td>
        <td>${order.customer.phone}</td>
        <td>${order.customer.address}</td>
        <td>${order.items.map(i => i.title + ' x' + i.qty).join(', ')}</td>
        <td>${order.total}</td>
        <td>${order.status}</td>
      `;
      tbody.appendChild(tr);
    });
  } catch (err) {
    console.error('Error fetching orders:', err);
  }
}

// Refresh every 5 seconds
loadOrders();
setInterval(loadOrders, 5000);
