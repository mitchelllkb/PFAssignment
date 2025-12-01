document.addEventListener("DOMContentLoaded", () => 
{
const hlabel = document.getElementById("lblh");
const hbutton = document.querySelectorAll(".hbtn");

hbutton.forEach(button=>
{
    button.addEventListener("click",() =>
    {
        hlabel.className="";

        const hsize = button.textContent;
        hlabel.textContent=hsize;
        hlabel.classList.add(hsize + "style");
    })
})

});
