# PFAssignment
Programming Fundamental Assignment

# A Learning Journey – Full Stack Development

## Overview
**A Learning Journey – Full Stack Development** 
This is an interactive web application created as part of the Diploma in Full Stack Development (Year 1, 2025/26). This project serves as a **learning guide** to consolidate and demonstrate my understanding of web development concepts. Each chapter highlights a different aspect of front‑end and API integration, culminating in a capstone project that retrieves and displays data from a public API.

The vision is to **galvanize learning through practice** — showing not only the technical implementation but also the thought process behind each step. By documenting the journey, the project becomes both a functional application and a teaching artifact.

---

## Chapters (Learning Guide Structure)
**HTML/CSS Foundations**  
   - Semantic structure, accessibility, and layout basics.  
   - Structural diagram included (Powerpoint org chart).  
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

## Purpose & Vision
- **Purpose** 
To document and demonstrate my progression in full stack development through modular, interactive examples.  

- **Vision**
To create a resource that is both a personal learning artifact and a guide for others, showing how concepts connect from fundamentals to real‑world API usage.  

## Foundation Structure

![Structure Overview](images/PFAssignment.png)
[Download the editable PowerPoint version](PFAssignment.pptx)


This project, **A Learning Journey – Full Stack Development**, is organized into modular topic pages linked from a central hub (`index.html`). Each navigation item in `index.html` links to a dedicated topic page, which loads its own CSS and JavaScript files from the `/css/` and `/js/` folders, maintaining a clear separation of concerns.

All HTML pages include a consistent fixed header featuring a navigation link with the ID `linkhome`, represented by an icon, which hyperlinks back to the `index.html` hub. This structure diagram illustrates how the site is organized, demonstrating how each component contributes to a clear, maintainable, and pedagogically sound learning experience.

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
- Improve the user interface with more flexible navigation between pages.”

## Technologies Used ##
- HTML5 – semantic structure and accessibility.
- CSS3 – responsive layouts, typography, and styling.
- JavaScript (ES6) – interactivity, DOM manipulation, and API integration.
- Git/GitHub – version control and deployment.
- GitHub Pages – hosting the project online.
- PowerPoint – diagramming and documentation.

# API Access - A simple project ##

## Introduction

This section explains how the project connects to external APIs and demonstrates the principle of modular data flow. By selectively retrieving country data and chaining latitude/longitude into mapping and weather services, learners see how one API’s output can become another API’s input. The goal is not just technical integration, but to highlight intentional design choices that balance efficiency, clarity, and teaching value.

The decision to retrieve country information from REST Countries API (rescountries.com) by name is a deliberate design choice to keep the website simple. Fetching by country name reduces the data footprint and improves efficiency.

## Process

### 1. Fetch JSON Data from API Endpoints
The project begins by making requests to external APIs using JavaScript’s `fetch()` function.

```javascript
fetch("https://restcountries.com/v3.1/name/singapore")
  .then(response => response.json())
  .then(data => console.log(data));
```

### 2. Understand the JSON Structure
Once the data is retrieved, it is important to explore the shape of the JSON object.
Key fields include:
- name.common → Country name
- capital → Array of capital cities
- latlng → Latitude and longitude coordinates
- flags.png → URL to the country’s flag image

### 3. Construct a Data Structure from a Sample Country
By selecting one country (e.g., Singapore), learners can build a simplified data structure:

```javascript
{
  "name": "Singapore",
  "capital": "Singapore",
  "latlng": [1.3667, 103.8],
  "flag": "https://flagcdn.com/sg.png"
}
```
![Structure Overview](images/datastructure.png)
[Download the editable PowerPoint version](PFAssignment.pptx)

### 4. Use Latitude & Longitude Data for Other APIs
The latlng values retrieved from REST Countries are repurposed in other sections:
- Google Maps API → Plot the country’s location visually.
- Open-Meteo API → Fetch real-time weather forecasts for that location.
This demonstrates data chaining, where one API’s output becomes another API’s input.

### 5. Handling Errors.
APIs may fail or return unexpected results. Error handling is essential to ensure resilience.

fetch("https://restcountries.com/v3.1/name/singapore")
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error("Network or server error:", error));

### 6. Filter and Transform JSON Fields
Not all fields are needed. Therefore filtering and transforming data.

`data[0]` contains the country object. By assigning it to a variable makes it easier to reference fields.

For example: This is to assign the object to a variable.
```
const countryData = data[0];
```

You can either break latitude and longitude into two separate variables.
```javascript
// Traditional way:
const lat = countryData.latlng[0];
const lon = countryData.latlng[1];
```
Or you can use array destructuring, which is cleaner when both values are used together. 
```javascript
// Modern destructuring way:
const [lat, lon] = countryData.latlng;
```

### 7. Chain Data into Multiple APIs
The curated data structure is then passed into other APIs:
- → Google Maps Embed API for location pins.

```javascript
const mapContainer = document.getElementById("mapcontainer");
mapContainer.innerHTML = `
        <iframe width="100%" height="100%" style="border:0" loading="lazy" allowfullscreen
          src="https://www.google.com/maps/embed/v1/view?key=AIzaSyBHGnK_mPb1_SPTNQMDVkT0m0xxvHwe63w&center=${lat},${lon}&zoom=${zoom}&maptype=satellite">
        </iframe>
      `;
```
- → Open-Meteo API for weather forecasts.

```javascript
fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,weather_code&timezone=auto`)
```
- You can see that we have used template literals to substitute the variable `lat` and `lon` into the fetch command.

## Comparison: Full Data Access vs Targeted Data Access

### Accessing full dataset

**Advantage:**

- Full data is available to be used locally, improve from having less fetch frequency.
- There's no risk of missing fields.

**Disadvantage:**

- The payload will be higher since you are retrieving the data in full, which equals to slow initial performance.
- Parsing becomes more sophisticated due to the massive amount of data involves.

### Accessing partial dataset

**Advantage**
- It's lightweight and efficient as only required fields are being fetch to local.
- It will give faster response with a smaller footprint.
- It's easier to maintain since you are dealing with lesser and more specific fields.

**Disadvantage**

- it will be less flexible if there's a need to add additional data later.
- If there's changes to the API or if there's missing fields, you may be required to refactor.

### Risk of chaining
In our example, we are using chaining method to reuse variables extracted from an endpoint to fetch data from other API.

- Benefit: We can reuse data therefore having shorter codes or duplicated declarations.
- Risk: However, the risk of it is that if an API fails, where it doesn't return those required data, the downstream API will malfunction as well.

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
  - Background information adapted from Wikipedia (https://www.wikipedia.org/) (with attribution), specifically the introductory paragraphs for each country.  
  - API endpoints accessed via REST Countries API(https://restcountries.com/) and Open‑Meteo (https://open-meteo).  
  - Country maps accessed via Google Maps API(https://www.google.com/maps).