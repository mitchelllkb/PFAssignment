# PFAssignment
Programming Fundamental Assignment

# A Learning Journey – Full Stack Development

### Overview ###
**A Learning Journey – Full Stack Development**  
This is an interactive web application created as part of the Diploma in Full Stack Development (Year 1, 2025/26). This project serves as a **learning guide** to consolidate and demonstrate my understanding of web development concepts. Each chapter highlights a different aspect of front‑end and API integration, culminating in a capstone project that retrieves and displays data from a public API.

The vision is to **galvanize learning through practice** — showing not only the technical implementation but also the thought process behind each step. By documenting the journey, the project becomes both a functional application and a teaching artifact.

---

## Chapters (Learning Guide Structure) ##
**HTML/CSS Foundations**  
   - Semantic structure, accessibility, and layout basics.  
   - Structural diagram included (Visio org chart).  
   - Typography, color schemes, and adaptive layouts.  
   - Focus on user experience and inclusion.
   - Accessibility features, including semantic tags and descriptive alt text, are consistently applied.  

**JavaScript Fundamentals**
   - Understand variables, arithmetic operations, arrays and objects declaration and initialization.
   - DOM manipulation, event handling, and interactivity.  
   - Examples of user feedback cues (loading, errors).  

**Deployment & Version Control**  
   - GitHub repository management with commits and logs.  
   - Hosting via GitHub Pages for public access.

**API Integration**  
   - Using `fetch()` to call a public API.  
   - Handling responses, errors, and displaying data meaningfully.    

**Capstone Project**  
   - A simple interactive application that retrieves data from a public API.  
   - Demonstrates the culmination of all chapters in a user‑focused experience.  

---

# Purpose & Vision #
- **Purpose** 
To document and demonstrate my progression in full stack development through modular, interactive examples.  

- **Vision**
To create a resource that is both a personal learning artifact and a guide for others, showing how concepts connect from fundamentals to real‑world API usage.  

# Foundation Structure #

![Structure Overview](images/PFAssignment.png)
📎 [Download the editable PowerPoint version](PFAssignment.pptx)


This project, **A Learning Journey – Full Stack Development**, is organized into modular topic pages linked from a central hub (`index.html`). Each navigation item in `index.html` links to a dedicated topic page, which loads its own CSS and JavaScript files from the `/css/` and `/js/` folders, maintaining a clear separation of concerns.

All HTML pages include a consistent fixed header featuring a navigation link with the ID `linkhome`, represented by an icon, which hyperlinks back to the `index.html` hub. This structure diagram illustrates how the site is organized, demonstrating how each component contributes to a clear, maintainable, and educationally sound learning experience.

## User Experience/ User Interface ##

This project is designed for learners beginning their journey in full stack development.

- **Target audience:** Self‑learners who want modular, interactive examples.  
- **Objectives:**  
  - Navigate through topic modules so that each concept can be understood individually.  
  - Ensure each component is explained with exemplary interactive snippets.  
  - Highlight essential rules and good practices while learning the programming language.  
  - Provide a fixed header with a home link for simple navigation back to `index.html`.  
  - Maintain clear separation of HTML, CSS, and JS to show how each layer contributes.  
  - Engage learners by creating small applications that demonstrate simple programming capabilities.  

- **Design artifacts:** The structure diagram in PowerPoint illustrates navigation flow and file dependencies.

## Features ##
** Existing Features **
- Index hub: Central navigation to all topic modules.
- Fixed header: Consistent across all pages, with `linkhome` icon returning to `index.html`.
- Modular topic pages: Each page loads its own CSS and JS for separation of concerns.
- Scroll‑snap layout: Provides a clean, single‑screen user experience.
- API integration: Capstone project demonstrates data retrieval and display from a public API.

** Features Left to Implement **
- Dark mode toggle for improved accessibility.
- Background image toggle with option to hide containers.
- Search functionality across topic modules.
- Expanded API examples (multiple endpoints).


## Technologies Used ##
- HTML5 – semantic structure and accessibility.
- CSS3 – responsive layouts, typography, and styling.
- JavaScript (ES6) – interactivity, DOM manipulation, and API integration.
- Git/GitHub – version control and deployment.
- GitHub Pages – hosting the project online.
- PowerPoint – diagramming and documentation.

## Testing ##
Manual testing was conducted to ensure all user stories are met:
- Navigation links from `index.html` correctly load topic pages.
- Pages will be inaccessible if Under‑Construction and remain inactive.
- Each topic page loads its corresponding CSS and JS files.
- The `linkhome` icon consistently returns to `index.html`.
- API fetch tested with valid and invalid responses (error handling verified).
- Browser/device checks performed on Chrome, Edge, and mobile viewports.

**Known Issues**
- No critical issues observed; minor layout differences may occur on very small screens.
- API fetch availability depends on external site uptime, though appropriate error‑handling is in place.

## Deployment ##
The project is hosted via GitHub Pages.
- Local development: open `index.html` in a browser.
- Deployment steps:  
  1. Push to `main` branch.  
  2. Enable GitHub Pages in repository settings.  
  3. Access via published URL: `https://mitchelllkb.github.io/PFAssignment/`

## Credits ##
- **Content:** All text and examples authored by me. References include MDN Web Docs, W3Schools.com, and course materials.  
- **Media:** Icons and images sourced from free repositories (e.g., GitHub assets, royalty‑free sources).  
- **Acknowledgements:**  
  - Inspired by Code Institute’s README template and guided by diploma coursework requirements.  
  - Background information adapted from Wikipedia (with attribution), specifically the introductory paragraphs for each country.  
  - API endpoints accessed via REST Countries API and Open‑Meteo.  
  - Country maps accessed via Google Maps API.