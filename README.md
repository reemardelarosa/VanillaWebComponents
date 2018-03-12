# VanillaWebComponents

- [Web Component Fundamentals](#web-component-fundamentals)
- [Web Component Anatomy](#web-component-anatomy)
- [Star Rating Component](#star-rating-component)
- [Configurable Slide out Menu Component](#configurable-slide-out-menu-component)
- [Styling Web Components](#styling-web-components)
- [Production Ready Web Components](#production-ready-web-components)

## Web Component Fundamentals

### Building Blocks
- [HTML](https://www.w3schools.com/html/) - markup
- [CSS](https://www.w3schools.com/css/) - visual aspects of markup
- [Javascript](https://www.w3schools.com/js/) - functionality

### Web Component Library
- [Polymer](https://www.polymer-project.org/)
- [SkateJS](https://github.com/skatejs/skatejs)
- [x-tag](https://x-tag.github.io/)

### Web Components Specifications
- Custom Elements
- Shadow DOM
- HTML Templates
- HTML Imports

```
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Vanilla Web Components: Module 1 - Web Component Fundamentals</title>
    <script>
        class MyCustomElement extends HTMLElement {
            constructor() {
                super();
                console.log("My Custom Element constructed");
            }
        }
        window.customElements.define("my-custom-element", MyCustomElement);
        </script>
</head>
<body>
    <my-custom-element></my-custom-element>
</body>
</html>
```

> Shadow DOM is a sub-DOM tree attached to a DOM element.

> Shadow DOM  provides true encapsualtion.

> THe Custom Elements spec is one of the more important parts of Web Components

### Two type of Shadow DOM
- Open
- Closed

```
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Vanilla Web Components: Module 1 - Web Component Fundamentals - Shadow Dom</title>
    <style>
        p {
            color: red;
        }
    </style>
</head>
<body>
    <p>Paragraph text in the outer application</p>
    <div id="simple-div"></div>
    <p>Some more paragraph text in the outer application</p>
    <script>
        let $div = document.getElementById("simple-div");
        $div.attachShadow({mode: "open"});
        $div.shadowRoot.innerHTML = `
            <style>
                p {
                    color: blue;
                }    
            </style>
            <p>Paragraph text withiin the Shadow DOM!</p>
        `;
    </script>
</body>
</html>
```
### HTML Templates
> Gives you the ability to create reusable segments of HTML within your apps.

> The `<template>` element is not automatically rendered by the browser.

> Templates can be used to define markup fo specific segments of an application and then rendered on-the-fly as required. 

```
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Vanilla Web Components: Module 1 - Web Component Fundamentals -HTML Templates</title>
</head>
<body>
    
    <template id="list-item">
        <li>
            <h1>A Movie Title</h1>
            <p>A movie Pilot</p>
        </li>
    </template>
    <ul id="movie-list"></ul>
    <script>
        const items = [
            {
                "title": "The Lord of the Rings: The Fellowship of the Ring",
                "plot": "A meek Hobbit from the Shire and eight companions set out on a journey to destroy the powerful One Ring and save Middle Earth from the Dark Lord Sauron."
            },
            {
                "title": "The Lord of the Rings: The Two Towers",
                "plot": "While Frodo and Sam edge closer to Mordor with the help of the shifty Gollum, the divided fellowship makes a stand against Sauron's new ally, Saruman, and his hordes of Isengard."
            },
            {
                "title": "The Lord of the Rings: The Return of the King",
                "plot": "Gandalf and Aragorn lead the World of Men against Sauron's army to draw his gaze from Frodo and Sam as they approach Mount Doom with the One Ring."
            }
        ];
        const $template = document.getElementById("list-item");
        const $list = document.getElementById("movie-list");

        items.forEach(movie => {
            const $clone = document.importNode($template.content, true);
            $clone.querySelector("h1").innerText = movie.title;
            $clone.querySelector("p").innerText = movie.plot;
            $list.appendChild($clone);
        });
    </script>
    
</body>
</html>
```

### HTML Imports
> Include a HTML document just like a .css file.

> Often used in conjuction with HTML templates.

> Designed to be the packaging mechanism for Web Components.

> A contentious specification.

```
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Vanilla Web Components: Module 1 - Web Component Fundamentals -HTML Imports</title>
    <link rel="import" href="notice.html" id="notice"/>
</head>
<body>
    <script>
        const $link = document.getElementById("notice");
        const content = $link.import.querySelector(".notice-frame");
        document.body.appendChild(content.cloneNode(true));
    </script>    
</body>
</html>
```

## Web Component's Anatomy

### Two Methods for Writing WC
- Pure Javascript

#### Advantages
1. Familiar Concept
2. Consumed just like any other JS file
3. Can be easily transpiled to support older browsers
4. Template Strings can be used to make writing HTML within JS easier

#### Disadvantages
1. Writing HTML & CSS within JS can feel unanatural and add bloat to the code.
2. Many text editros and IDEs lack full template string support.


```
index.html
***************
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Vanilla Web Components: Module 1 - Web Component Fundamentals - Web Component Anatomy - Pure JS</title>
    <script src="my-component.js"></script>
</head>
<body>
    <my-component></my-component>
</body>
</html>

my-component.js
*****************
class MyComponent extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
            <style>
                p {
                    color: red;
                }
            </style>
            <p>My Web Component</p>
        `;
    }
}

window.customElements.define('my-component', MyComponent);
```

- HTML Import
#### Advantages
1. Automatic de-duplication of imports.
2. Writing HTML and CSS is more natural and IDE support isn't an issue.
#### Disadvantages
1. Currently the HTML Import spec is contentious and not well supported.
2. Even when polyfilled there are caveats which create bad code smells.
3. Hard to transpile JS within HTML files with current tools.

```
index.html
***********
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Vanilla Web Components: Module 1 - Web Component Fundamentals - Web Component Anatomy - HTML Import</title>
    <link rel="import" href="my-component.html">
</head>
<body>
    <my-component></my-component>
</body>
</html>

my-component.html
****************
<template>
    <style>
        p {
            color: red;
        }
    </style>
    <p>My Web Component</p>
</template>

<script>
    const $owner = (document._currentScript || document.currentScript).ownerDocument;
    $template = $owner.querySelector('template');
    class MyComponent extends HTMLElement {
        connectedCallback() {
            const $content = document.importNode($template.content, true);
            this.appendChild($content);
        }
    }

    window.customElements.define('my-component', MyComponent)
</script>

```

### Custom Element Best Practices
```
class RwRandowQuote extends HTMLElement {
    constructor() {
        super();
        this._quotes = [
            "All we have to decide is what to do with the time is given us.",
            "Two things are infinite: the universe and human stupidity; and I'm not about sure about the",
            "Try not to become a man of success, but rather try to become a man of value."
        ];
        this._$quote = null;
        this._interval = null;

    }
    connectedCallback() {
        this.innerHTML = `
            <style>
            .rw-container {
                width: 500px;
                margin: auto;
                border: dotted 1px #999;
                padding: 20px;
            }
            .rw-container h1 {
                font-size: 20px;
                margin: 0;
            }
            </style>
            <div clas="rw-container">
                <h1>Random Quote:</h1>
                <p>"<span id="quote"></span>"</p>
            </div>
        `;
        this._$quote = this.querySelector("#quote");
        this._interval = setInterval(() => this._render(), 10000);
        this._render();
    }

    _render() {
        if (this._$quote !== null) {
            this._$quote.innerHTML = this._quotes[Math.floor(Math.random() * this._quotes.length)];
        }
    }

    disconnectedCallback() {
        clearInterval(this._interval);
    }
}

window.customElements.define('rw-random-quote', RwRandowQuote);
```

### Web Component Attributes

```
class RwRandowQuote extends HTMLElement {
    constructor() {
        super();
        this._quotes = [
            "All we have to decide is what to do with the time is given us.",
            "Two things are infinite: the universe and human stupidity; and I'm not about sure about the",
            "Try not to become a man of success, but rather try to become a man of value."
        ];
        this._$quote = null;
        this._interval = null;

    }
    connectedCallback() {
        this.innerHTML = `
            <style>
            .rw-container {
                width: 500px;
                margin: auto;
                border: dotted 1px #999;
                padding: 20px;
            }
            .rw-container h1 {
                font-size: 20px;
                margin: 0;
            }
            </style>
            <div clas="rw-container">
                <h1>Random Quote:</h1>
                <p>"<span id="quote"></span>"</p>
            </div>
        `;
        this._$quote = this.querySelector("#quote");
        this._setInterval(this.getAttribute("interval"));
        this._render();
    }

    _render() {
        if (this._$quote !== null) {
            const index = Math.floor(Math.random() * this._quotes.length);
            this.setAttribute("current-index", index);
            this._$quote.innerHTML = this._quotes[index];
        }
    }

    _setInterval(value) {
        if (this._interval !== null) {
            clearInterval(this._interval);
        }
        if (value > 0) {
            this._interval = setInterval(() => this._render(), value);
        }
    }

    static get observedAttributes() {
        return ['interval'];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        this._setInterval(newValue);
    }

    disconnectedCallback() {
        clearInterval(this._interval);
    }
}

window.customElements.define('rw-random-quote', RwRandowQuote);
```

### Web Component Properties
> Has getters and setters

### Web Component Shadow DOM
```
this._root = this.attachShadow({"mode": "open"});
```
## Star Rating Component
## Configurable Slide out Menu Component
## Styling Web Components
## Production Ready Web Components



