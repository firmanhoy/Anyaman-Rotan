const apiUrl = 'https://github.com/firmanhoy/Anyaman-Rotan/blob/main/json/data.json';


function loadTestimoniUser() {
  axios.get(apiUrl)
    .then(response => {
      const data = response.data;
      const container = document.getElementById('testimoniContainer');
      container.innerHTML = '';

      data.forEach(item => {
        if (item.status === 'tampil') {
          container.innerHTML += `
            <div class="col-md-4">
              <div class="testimonial-card">
                <div class="d-flex align-items-center mb-3">
                  <img src="${item.fotoProduk}" class="testimonial-img" alt="Testimoni ${item.id}" />
                  <div>
                    <div class="testimonial-name">${item.namaPengirim}</div>
                    <div class="testimonial-rating">
                      ${'⭐'.repeat(item.rating)} <!-- Menampilkan rating sesuai dengan nilai -->
                    </div>
                  </div>
                </div>
                <p class="testimonial-text">${item.pesan}</p>
              </div>
            </div>
          `;
        }
      });
    })
    .catch(error => {
      console.error('Gagal memuat testimoni:', error);
    });
}

function submitTestimoni(event) {
  event.preventDefault();

  const nama = document.getElementById('nama').value;
  const foto = document.getElementById('foto').value || "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"; // Menggunakan foto default jika tidak diisi
  const rating = document.getElementById('rating').value;
  const pesan = document.getElementById('pesan').value;

  if (!nama || !rating || !pesan) {
    alert("Semua kolom harus diisi!");
    return;
  }

  const newTestimoni = {
    namaPengirim: nama,
    fotoProduk: foto,
    rating: Number(rating),
    pesan: pesan,
    status: "tampil"
  };

  axios.post(apiUrl, newTestimoni)
    .then(response => {
      console.log('Testimoni berhasil dikirim:', response.data);
      loadTestimoniUser(); 
      document.querySelector("form").reset(); 
    })
    .catch(error => {
      console.error('Gagal mengirim testimoni:', error);
    });
}

document.querySelector("form").addEventListener("submit", submitTestimoni);

document.addEventListener('DOMContentLoaded', loadTestimoniUser);
