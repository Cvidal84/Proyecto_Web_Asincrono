import './style.css'
import { Footer } from "../components/Footer/Footer.js";

const ACCESS_KEY = "k0RNLWWsadV8Mhm7Rz7CGr7vrrZ_azBBlkrjrRp_cIc"
const SECRET_KEY = "DzfZDHmiagN_DEMeostQ08-9GoEsokmbtZRpsE4PF5s"

//funcion para obtener fotos segun la busqueda
const getPhotos = async (query) => {
  const res = await fetch (`https://api.unsplash.com/search/photos?page=1&per_page=20&query=${query}&client_id=${ACCESS_KEY}`)
  const data = await res.json()
  mapPhotos(data.results)

}
//transformamos lo obtenido para quedarnos con lo que queremos
const mapPhotos = (photos) => {
  const mappedPhotos = photos.map((photo) => ({
    alt: photo.alt_description,
    photo: photo.urls.regular,
    original_photo: photo.urls.raw,
    color: photo.color,
  }))
  printPhotos(mappedPhotos)
}
//funcion para mostrar fotos en pantalla
const printPhotos = (photos) => {
  const container = document.querySelector("#photo_container")
  container.innerHTML = ""

  for (const photo of photos) {
    const li = document.createElement("li")
    li.innerHTML = `
    <a href="${photo.original_photo}" target="_blank">
      <img src="${photo.photo}" alt="${photo.alt}"/>
    </a>
    
    `
    container.appendChild(li)
  }
}

//para buscar imagenes con el boton de buscar
document.querySelector("#searchButton").addEventListener("click", () => {
  const searchTerm = document.querySelector("#searchInput").value.trim()
  if (searchTerm) {
    getPhotos(searchTerm)
  }
})

// Permitir búsqueda con la tecla "Enter"
document.querySelector("#searchInput").addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    const searchTerm = event.target.value.trim()
    if (searchTerm) {
      getPhotos(searchTerm)
    }
  }
})

window.addEventListener("DOMContentLoaded", () => {
  getPhotos()

  const footerContainer = document.createElement("footer");
  footerContainer.innerHTML = Footer();
  
  // Insertar el footer al final del body
  document.body.appendChild(footerContainer);



})
