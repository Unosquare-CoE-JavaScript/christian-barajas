# Styles to follow

## CSS Modules
- CSS Files in which all class names and animation names are scoped locally by default.
- CSS Modules compile to a low-level interchange format called ICSS or Interoperable CSS, but are written like normal CSS files
- It's not an official spec or an implementation in the browser but rather a process in a build step (with the help of Webpack or Browserify) that changes class names and selectors to be scoped 
- Instead of writing plain HTML, we need to write all of our markuo ina JS file.
    ```javascript
        import styles from "./styles.css";

        element.innerHTML = 
        `<h1 class="${styles.title}">
            An example heading
        </h1>`;
    ```
- During our build step, the compiler would search throuh that imported CSS File, then llok through the JS we've written  and make the class accessible through the variable.
- Our build step would then process both these things into new, separate HTML and CSS Files, with a new string of characters replaceing both the HTML class and the CSS selector class. Our original CSS is not being served to the browser at all.
- With CSS Modules, it's a guarantee that all the styles for a single component: 
    1. Live in one place
    2. Only apply to that component and nothing else
- This approach is designed to fix the problem of the global scope in CSS.

### The Composes Keyword
- We have a class like this and e can even compose from a specific class in a separate CSS file.
```CSS
    .font-serif {
        font-familiy: Georgia, serif;
    }

    .display {
        composes: font-serif;
        composes: font-dark from "./font-colors.css";
        font-size: 20px;
        linke-height: 12px;
    }
```
- After, we declare it and see the compiled version, Both classess have been bound to the element by the use of the composes keyworld, this avoiding some of the problems of similar solutions like Sass' @extend.

### Webpack and Loaders
- Loaders are small plugins that basically say "When you encounter this kinf of file, do this with it".
- Tools like Babel Allos us to write new ES2015 code today and perform a task called transpiling(much like prepocessing) to convert the code into a earlier version fo JS that has greater browser support.
- This is similar to how SASS works, initially writing your code in SASS syntax, and then a prepropcessor compiles to standard CSS.


## Tailwind
- A utility-first CSS Framework
- You can setup your project with Tailwind with
    - Tailwind CLI
    - PostCSS
    - Framework Guides
    - CDN 