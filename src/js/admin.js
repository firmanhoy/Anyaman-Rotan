const apiUrl = 'https://github.com/firmanhoy/Anyaman-Rotan/blob/main/json/data.json';

function loadProdukAdmin() {
  axios.get(apiUrl)
    .then(response => {
      const data = response.data;
      const tableBody = document.getElementById('productTableBody');
      tableBody.innerHTML = '';

      data.forEach((item, index) => {
        tableBody.innerHTML += `
          <tr>
            <td>${index + 1}</td>
            <td>${item.nama}</td>
            <td>${item.kategori}</td>
            <td>Rp ${item.harga.toLocaleString('id-ID')}</td>
            <td>${item.deskripsi}</td>
            <td><img src="${item.foto}" alt="${item.nama}" width="100" height="70" style="object-fit:cover;"></td>
            <td>
              <a href="admincrudform.html?id=${item.id}" class="btn btn-warning btn-sm mb-1"><i class="fas fa-edit"></i> Edit</a>
              <button class="btn btn-danger btn-sm" onclick="hapusProduk('${item.id}')"><i class="fas fa-trash"></i> Hapus
              </button>
            </td>
          </tr>
        `;
      });
    })
    .catch(error => {
      console.error('Gagal memuat produk admin:', error);
    });
}
// DELETE
function hapusProduk(id) {
  if (confirm('Yakin ingin menghapus produk ini?')) {
    // konversi
    const stringId = String(id);
    
    axios.delete(`${apiUrl}/${stringId}`)
      .then(response => {
        console.log('Produk berhasil dihapus:', response);
        alert('Produk berhasil dihapus!');
        loadProdukAdmin();
      })
      .catch(error => {
        console.error('Gagal menghapus produk:', error);
        alert('Gagal menghapus produk!');
      });
  }
}

document.addEventListener('DOMContentLoaded', loadProdukAdmin);
