
import "./Footer.css";
import { Button } from "../Button/Button.js";

export const Footer = (busquedas) => {
  const { b1, b2, b3, b4 } = busquedas;

  return `
    <h2>Búsquedas alternativas</h2>
    <div class="myButton">
      ${Button("Naturaleza", b1)}
      ${Button("Tecnología", b2)}
      ${Button("Negocios", b3)}
      ${Button("Animales", b4)}
    </div>
  `;
};
