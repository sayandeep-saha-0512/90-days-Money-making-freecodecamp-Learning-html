# 90 Days of HTML

A small, project-based learning journal for building strong HTML, CSS, and accessibility fundamentals.

This is a beginner-friendly static site. It is intentionally free of frameworks and build tools so the relationship between markup, styling, and browser behavior stays easy to see.

## What I am practising

- Writing semantic HTML with meaningful page landmarks
- Building accessible navigation, images, tables, and forms
- Creating responsive layouts with modern CSS
- Adding small, progressive enhancements with JavaScript
- Reading official documentation instead of guessing
- Reviewing and improving previous work

## Project map

- [index.html](index.html): the main learning journal and HTML practice page
- [about.html](about.html): a short profile and learning approach
- [style.css](style.css): shared responsive visual styles
- [script.js](script.js): active navigation, smooth scrolling, and demo form feedback
- [img/](img/): images used by the pages
- [scripts/validate-site.ps1](scripts/validate-site.ps1): repeatable checks for pages, anchors, assets, and JavaScript syntax
- [.editorconfig](.editorconfig): consistent indentation and file formatting

## Practice loop

1. Learn one concept from FreeCodeCamp or [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML).
2. Use it in a small, focused example.
3. Open the page in a browser and test the keyboard path.
4. Check the structure, content, and responsive layout.
5. Write down what changed and what to practise next.

## Quality checklist

Before calling an exercise complete, check that:

- Every page has a useful title and description.
- Headings follow a logical order.
- Form controls have visible labels.
- Images have useful alternative text.
- Links describe their destination.
- The page works without JavaScript.
- Keyboard focus is visible.
- The layout remains usable on a narrow screen.

## Run locally

No build tools are required. Open [index.html](index.html) directly in a browser, or use the Live Server extension in VS Code for automatic refresh while editing.

The contact form is currently a front-end exercise. It validates locally but does not send messages to a server.

To run the project checks in PowerShell:

```powershell
Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass
.\scripts\validate-site.ps1
```

The policy change applies only to the current terminal session.

## Learning path

- [x] Practise document structure, headings, text, lists, and links
- [x] Add semantic landmarks and accessible form labels
- [x] Build a responsive learning journal
- [ ] Complete the HTML portion of the FreeCodeCamp curriculum
- [ ] Build the required responsive web design projects
- [ ] Review each exercise with a validator and keyboard test

## Author

Sayandeep Saha (Aayushman Chaudhary)
