const produkAPI = 'http://localhost:3000/produk'; 

function tampilkanProduk() {
  axios.get(produkAPI)
    .then(response => {
      const data = response.data;
      const productList = document.getElementById('productList');
      productList.innerHTML = '';

      data.forEach(item => {
        productList.innerHTML += `
          <div class="col-md-4 mb-4 product-item" data-category="${item.kategori.toLowerCase()}">
            <div class="card shadow-lg hover-card h-100">
              <img src="${item.foto}" class="card-img-top" alt="${item.nama}" style="height: 200px; object-fit: cover;">
              <div class="card-body d-flex flex-column">
                <h5 class="card-title">${item.nama}</h5>
                <p class="card-text">${item.deskripsi}</p>
                <div class="mt-auto d-flex justify-content-between align-items-center">
                  <span class="price">Rp ${item.harga.toLocaleString('id-ID')}</span>
                </div>
              </div>
            </div>
          </div>
        `;
      });
    })
    .catch(error => {
      console.error('Gagal mengambil produk:', error);
    });
}

document.addEventListener('DOMContentLoaded', tampilkanProduk);
