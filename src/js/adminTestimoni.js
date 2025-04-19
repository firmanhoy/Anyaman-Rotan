const apiUrl = 'http://localhost:3000/testimoni'; 
// READ
function loadTestimoniAdmin() {
  axios.get(apiUrl)
    .then(response => {
      const data = response.data;
      const tableBody = document.getElementById('testimoniTable');
      tableBody.innerHTML = ''; 

      data.forEach((item, index) => {
        const ratingStars = '⭐'.repeat(item.rating);

        const statusBadge = item.status === 'tampil' 
          ? `<span class="badge bg-success badge-status" >Ditampilkan</span>` 
          : `<span class="badge bg-secondary badge-status" >Disembunyikan</span>`;

        const row = document.createElement('tr');

        row.innerHTML = `
          <td class="text-center">${index + 1}</td>
          <td>
            <img src="${item.fotoProduk}" alt="${item.namaPengirim}" style="width: 50px; height: 50px; object-fit: cover;" class="rounded-circle">
            ${item.namaPengirim}
          </td>
          <td class="text-center">${ratingStars}</td> <!-- Menampilkan bintang rating -->
          <td>${item.pesan}</td>
          <td class="text-center">${statusBadge}</td>
          <td class="text-center">
            <button class="btn btn-sm btn-toggle btn-dark" onclick="toggleStatus('${item.id}', '${item.status}')">
              ${item.status === 'tampil' ? 'Sembunyikan' : 'Tampilkan'}
            </button>
          </td>
        `;

        tableBody.appendChild(row);
      });
    })
    .catch(error => {
      console.error('Gagal memuat data testimoni:', error);
    });
}

function toggleStatus(id, currentStatus) {
  const newStatus = currentStatus === 'tampil' ? 'sembunyi' : 'tampil';

  axios.patch(`${apiUrl}/${id}`, { status: newStatus })
    .then(() => {
      loadTestimoniAdmin();
    })
    .catch(error => {
      console.error('Gagal mengubah status testimoni:', error.response || error);
    });
}
document.addEventListener('DOMContentLoaded', loadTestimoniAdmin);
