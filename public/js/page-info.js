const template = document.createElement("template");
template.innerHTML = `



            <slot class="info" name="info"></slot>
    `;

class PageInfo extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: "open" });
    shadow.appendChild(template.content.cloneNode(true));
  }
}

window.customElements.define("page-info", PageInfo);
