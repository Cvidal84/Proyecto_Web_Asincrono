import "./Footer.css";
import { Button } from "../Button/Button.js";

export const Footer = () => `

<h2>Busquedas alternativas</h2>
<div class="myButton">
${Button("/icons/twitter.png", "Naturaleza", "nature")}
${Button("/icons/github.png", "Tecnologia", "technology")}
${Button("/icons/linkedin.png", "Negocios", "business")}
${Button("/icons/telegram.png", "Animales", "animals")}
</div>
`;