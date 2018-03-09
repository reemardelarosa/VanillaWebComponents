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

## Web Component Anatomy
## Star Rating Component
## Configurable Slide out Menu Component
## Styling Web Components
## Production Ready Web Components



