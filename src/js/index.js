const produkAPI = 'https://github.com/firmanhoy/Anyaman-Rotan/blob/main/json/data.json';

function tampilkanProdukTerbaru() {
  axios.get(produkAPI)
    .then(response => {
      const data = response.data;
      const produkTerbaruList = document.getElementById('produkTerbaruList');
      produkTerbaruList.innerHTML = '';

      // Urutkan dari id besar ke kecil
      data.sort((a, b) => b.id - a.id);

      const produkTerbaru = data.slice(0, 3);

      produkTerbaru.forEach(item => {
        produkTerbaruList.innerHTML += `
          <div class="col-md-4 mb-4 product-item">
            <div class="card shadow-lg hover-card h-100">
              <img src="${item.foto}" class="card-img-top" alt="${item.nama}" style="height: 200px; object-fit: cover;">
              <div class="card-body d-flex flex-column">
                <h5 class="card-title">${item.nama}</h5>
                <p class="card-text">${item.deskripsi.length > 100 ? item.deskripsi.substring(0, 100) + '...' : item.deskripsi}</p>
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
      console.error('Gagal mengambil produk terbaru:', error);
    });
}

document.addEventListener('DOMContentLoaded', tampilkanProdukTerbaru);
