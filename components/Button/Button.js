import "./Button.css";

export const Button = (text, query="") => `
<button class="my-btn" data-query="${query}">
<h4>${text}</h4>
</button>
`;