import './style.css'
import { Footer } from "../components/Footer/Footer.js";
import { Divider } from "../components/Divider/Divider.js";


const ACCESS_KEY = "k0RNLWWsadV8Mhm7Rz7CGr7vrrZ_azBBlkrjrRp_cIc"
const SECRET_KEY = "DzfZDHmiagN_DEMeostQ08-9GoEsokmbtZRpsE4PF5s"

let currentPage = 1
let currentQuery = "coches"

//funcion para obtener fotos segun la busqueda
const getPhotos = async (query, page = 1) => {
  currentQuery = query
  currentPage = page
  const res = await fetch (`https://api.unsplash.com/search/photos?page=${page}&per_page=30&query=${query}&client_id=${ACCESS_KEY}`)
  const data = await res.json()
  mapPhotos(data.results)
  updateFooter() //cambia las palabras tras cada busqueda

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
//cambio de tema claro oscuro
export const changeTheme = () => {
  const themeBtn = document.querySelector("#themeBtn");
  themeBtn.addEventListener("click", () => {
    document.body.classList.toggle("light");
    changeText();
  });
};

export const changeText = () => {
  const themeBtn = document.querySelector("#themeBtn");
  if (themeBtn.innerText === "☀") {
    themeBtn.innerText = "☾";
  } else {
    themeBtn.innerText = "☀";
  }
};
// Agregar el Divider después del header
const header = document.querySelector("header");
if (header) {
    const tempContainer = document.createElement("div");
    tempContainer.innerHTML = Divider();
    header.insertAdjacentElement("afterend", tempContainer.firstElementChild);
}

//para buscar imagenes con el boton de buscar
document.querySelector("#searchButton").addEventListener("click", () => {
  const searchTerm = document.querySelector("#searchInput").value.trim()
  if (searchTerm) {
    currentPage = 1
    getPhotos(searchTerm, currentPage)
    updatePageNumber()
  }
})

// Permitir búsqueda con la tecla "Enter"
document.querySelector("#searchInput").addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    const searchTerm = event.target.value.trim()
    if (searchTerm) {
      currentPage = 1
      getPhotos(searchTerm, currentPage)
      updatePageNumber()
    }
  }
})
//arrays de busquedas alternativas
const alternativeSearches = {
  Busqueda1: ["Montañas", "Ríos", "Bosques", "Playa", "Cascadas", "Lagos", "Valles", "Colinas", "Arroyos", "Desiertos", "Senderos", "Flora", "Fauna", "Cielo", "Estrellas", "Sol", "Lluvia", "Rocío", "Niebla", "Auroras"],
  Busqueda2: ["Ordenadores", "Software", "Código", "Robots", "Inteligencia Artificial", "Hardware", "Redes", "Electrónica", "Servidores", "Innovación", "Automática", "Máquinas", "Sistemas", "Aplicaciones", "Computación", "Data", "Programación", "Gadgets", "Ciberseguridad", "Realidad Virtual"],
  Busqueda3: ["Oficina", "Empleo", "Reunión", "Empresas", "Finanzas", "Marketing", "Ventas", "Estrategias", "Gestión", "Productividad", "Planificación", "Liderazgo", "Clientes", "Capital", "Networking", "Comercio", "Recursos Humanos", "Presupuesto", "Exportación", "Crecimiento"],
  Busqueda4: ["Gatos", "Perros", "Aves", "Peces", "Reptiles", "Insectos", "Mamíferos", "Anfibios", "Felinos", "Caninos", "Ballenas", "Delfines", "Elefantes", "Tigres", "Gorilas", "Águilas", "Caballos", "Conejos", "Serpientes", "Pingüinos"],
};

const updateFooter = () => {
  const footerElement = document.querySelector("footer");
  if (footerElement) {
    const busquedas = {
      b1: getRandomWord(alternativeSearches.Busqueda1),
      b2: getRandomWord(alternativeSearches.Busqueda2),
      b3: getRandomWord(alternativeSearches.Busqueda3),
      b4: getRandomWord(alternativeSearches.Busqueda4),
    };
    footerElement.innerHTML = Footer(busquedas);
  }
};

//funcion para elegir una palabra aleatoria del array
const getRandomWord = (array) => {
  return array[Math.floor(Math.random()*array.length)]
}


//Para buscar con los botones del footer
document.addEventListener("click", (event) => {
  const button = event.target.closest(".my-btn");
  if (button && button.dataset.query) {
    const query = button.dataset.query;
    currentPage = 1
    getPhotos(query, currentPage)
    updatePageNumber()
  }
});

//pasar paginas
document.querySelector("#nextPage").addEventListener("click", () => {
  currentPage++;
  getPhotos(currentQuery, currentPage);
  updatePageNumber();
});

document.querySelector("#prevPage").addEventListener("click", () => {
  if (currentPage > 1) {
    currentPage--;
    getPhotos(currentQuery, currentPage);
    updatePageNumber();
  }
});

const updatePageNumber = () => {
  document.querySelector("#pageNumber").textContent = `Página ${currentPage}`;
};



window.addEventListener("DOMContentLoaded", () => {
  getPhotos("coches"); //cargamos fotos
  updateFooter(); //se carga footer con palabras aleatorias
  changeTheme();
});