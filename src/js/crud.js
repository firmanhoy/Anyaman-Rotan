const apiUrl = 'https://github.com/firmanhoy/Anyaman-Rotan/blob/main/json/data.json';

// 
document.addEventListener('DOMContentLoaded', function() {
  const urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get('id');

  if (id) {
    axios.get(`${apiUrl}/${id}`)
      .then(response => {
        const produk = response.data;
        document.getElementById('productId').value = produk.id;
        document.getElementById('namaProduk').value = produk.nama;
        document.getElementById('kategoriProduk').value = produk.kategori;
        document.getElementById('hargaProduk').value = produk.harga;
        document.getElementById('deskripsiProduk').value = produk.deskripsi;
        document.getElementById('fotoProduk').value = produk.foto;
      })
      .catch(error => console.error('Error fetching product:', error));
  }
});

// Submit
document.getElementById('productForm').addEventListener('submit', function(e) {
  e.preventDefault();

  const id = document.getElementById('productId').value;
  const produk = {
    nama: document.getElementById('namaProduk').value,
    kategori: document.getElementById('kategoriProduk').value,
    harga: parseInt(document.getElementById('hargaProduk').value),
    deskripsi: document.getElementById('deskripsiProduk').value,
    foto: document.getElementById('fotoProduk').value
  };

  if (id) {
    // UPDATE
    axios.put(`${apiUrl}/${id}`, produk) 
      .then(() => {
        alert('Produk berhasil diupdate!');
        window.location.href = 'adminbarang.html'; 
      })
      .catch(error => console.error('Error updating product:', error));
  } else {

    axios.post(apiUrl, produk)
      .then(() => {
        alert('Produk berhasil ditambahkan!');
        window.location.href = 'adminbarang.html';
      })
      .catch(error => console.error('Error adding product:', error));
  }
});

document.getElementById('resetBtn').addEventListener('click', function() {
  document.getElementById('productForm').reset();
  document.getElementById('productId').value = '';
});
