class RWComponentSkeleton extends HTMLElement {
    constructor() {
        super();
        // Private variables
        this._private = null;
        // Create a shadow root
        this._root = this.attachShadow({"mode": "open"});
    }

    connectedCallback() {
        //Add an initial template
        this._root.innerHTML =  `
            <p id="text"> My Web Component Skeleton...</p>
        `;
        // Store important elements for later use
        // prefixing DOM elements with $
        this._$text = this._root.querySelector("#text");
    }

    // private methods
    _render() {
        // Selectively update only parts of the tempalte which need to change
        this._$text.innerText = "...is awesome!";
    }

    // Observe attribute changes
    static get observedAttributes() {
        return ["attribute"];
    }

    // React to attribute changes
    attributeChangedCallback(name, oldValue, newValue) {
        // Execute logic
    }

    // Use setters and getters to create an API for your component
    set property(data) {
        if (this._private === data) return;
        this._private = data;
    }

    get property() {
        return this._private;
    }
}

window.customElements.define('rw-component-skeleton', RwComponentSkeleton);