// import components from componentns module
const componentsPath = './componentsModule.js';
import components from './componentsModule.js';

class HeaderTestComponent extends HTMLElement {

	constructor() {
		super();
	}

	connectedCallback() {
		this.innerHTML = components['header-test'];
	}
}

class FooterComponent extends HTMLElement {

	constructor() {
		super();
	}

	connectedCallback() {
		this.innerHTML = components['footer'];
	}
}

class ButtonComponent extends HTMLElement {

	constructor() {
		super();
	}

	connectedCallback() {
		this.innerHTML = components['button'];
	}
}

// define custom elements
customElements.define('app-header-test', HeaderTestComponent);
customElements.define('app-footer', FooterComponent);
customElements.define('app-button', ButtonComponent);

// delete require Cache
delete require.cache[componentsPath];