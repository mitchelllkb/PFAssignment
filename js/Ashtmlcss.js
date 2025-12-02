document.addEventListener("DOMContentLoaded", () => 
{
const hlabel = document.getElementById("lblh");
const hbutton = document.querySelectorAll(".hbtn");
const cbutton = document.getElementById("btn7");
const sizes =
    {
        h1: "2em",
        h2: "1.5em",
        h3: "1.17em",
        h4: "1em",
        h5: "0.83em",
        h6: "0.67em"
    };
hbutton.forEach(button=>
{
    button.addEventListener("click",() =>
    {
        hlabel.className = ""; // reset classes
        const hsize = button.textContent; // button content "h1"..."h6"
        const fsize = sizes[hsize]; //get size from object "sizes"

        hlabel.textContent = `${hsize} <-- (${fsize})`;
        
        hlabel.style.fontSize = fsize;
        hlabel.style.fontWeight = "bold";
        
    })
})

cbutton.addEventListener("click",() =>
{
    hlabel.textContent = "";
    hlabel.style.fontSize = "";
    hlabel.style.fontWeight = "";

    Object.keys(sizes).forEach(tag => {
        const hlbls = document.createElement(tag);
        hlbls.textContent = tag;

        hlbls.textContent = tag; // just show the tag name
        hlbls.style.display = "inline-block"; // keep them in a row
        hlbls.style.marginRight = "12px";     // spacing between hlblss
        hlabel.appendChild(hlbls);
    }
    )

})
})
