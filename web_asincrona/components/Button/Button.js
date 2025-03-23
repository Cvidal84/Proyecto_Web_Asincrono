import "./Button.css";

export const Button = (icon, text, query="") => `
<button class="my-btn" data-query="${query}">
<img src=${icon} alt='${text} icon'/>
<h4>${text}</h4>
</button>
`;