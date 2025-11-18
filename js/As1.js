function updateClock() {
  const now = new Date();
  const timeString = now.toLocaleTimeString('en-SG', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false
  });
  document.getElementById("digiclock").textContent = timeString;
}

setInterval(updateClock, 1000);
updateClock(); // initial call

