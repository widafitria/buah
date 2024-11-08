import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.4.0/firebase-app.js';
import {
  getFirestore,
  collection,
  doc,
  getDocs,
  getDoc,
  addDoc,
  deleteDoc,
  updateDoc,
  query,
  orderBy
} from 'https://www.gstatic.com/firebasejs/10.4.0/firebase-firestore.js';

const firebaseConfig = {
    apiKey: "AIzaSyDmI0zRauvzaL4oEuXinkmXhGiwTsYxYQc",
      authDomain: "insan-cemerlang-ee7af.firebaseapp.com",
      projectId: "insan-cemerlang-ee7af",
      storageBucket: "insan-cemerlang-ee7af.appspot.com",
      messagingSenderId: "1047091827759",
      appId: "1:1047091827759:web:0f1742d6f3922f856de2da",
      measurementId: "G-GL8J5GC8XB"
};

// Inisialisasi firebase
const aplikasi = initializeApp(firebaseConfig)
const basisdata = getFirestore(aplikasi)

export async function tambahBuah(nama, warna, harga) {
  try {
    // menyimpan data ke firebase
    const refDokumen = await addDoc(collection(basisdata, "buah"), {
      nama: nama,
      warna: warna,
      harga: harga
    })
    
    // menampilkan pesan berhasil
    console.log("berhasil menyimpan data buah")
  } catch (error) {
    // menampilkan pesan gagal 
  console.log("gagal menyimpan data buah")
  }
}

export async function ambilDaftarBuah() {
  const refDokumen = collection(basisdata, "buah");
  const kueri = query(refDokumen, orderBy("nama"));
  const cuplikankueri = await getDocs(kueri);

  let hasilkueri = [];
  cuplikankueri.forEach((dokumen) => {
    hasilkueri.push({
      id: dokumen.id,
      nama: dokumen.data().nama,
      warna: dokumen.data().warna,
      harga: dokumen.data().harga
    })
  })

  return hasilkueri;
}

export async function hapusBuah(id) {
  await deleteDoc(doc(basisdata, "buah", id))
}

export async function ubahBuah(id, namabaru, warnabaru, hargabaru) {
  await updateDoc(
   doc(basisdata, "buah", id),
   { nama: namabaru, warna: warnabaru, harga: hargabaru}
  )
}

export async function ambilBuah(id) {
  const refDokumen = await doc(basisdata, "buah", id)
  const snapshotDokumen = await getDoc(refDokumen)
  
  return await snapshotDokumen.data()
}