(function() {
  const currentScript = document.currentScript;
  window.addEventListener(
    "load",
    function() {
      const id = `s${Date.now()}`;
      const el = document.body.appendChild(document.createElement("div"));
      el.id = id;
      el.style.position = "fixed";

      el.className = "Screensaver";
      
      // Impostare il percorso del video locale
      const videoSrc = (currentScript && currentScript.getAttribute("videoSrc")) ||
                        "./video/ video.mp4";  // Sostituisci con il percorso del tuo file video locale
      const videoElement = document.createElement("video");
      videoElement.src = videoSrc;
      videoElement.autoplay = true;
      videoElement.loop = true;  // Ripete il video in loop
      videoElement.muted = true; // Muta l'audio del video
      videoElement.style.width = "100%";
      videoElement.style.height = "100%";
      videoElement.style.objectFit = "cover";  // Per far sì che il video copra tutto lo schermo

      el.appendChild(videoElement);

      const width = el.offsetWidth;
      const height = el.offsetHeight;

      const style = document.body.appendChild(document.createElement("style"));

      style.textContent = `
#${id} {
  left: 0; top: 0; right: 0; bottom: 0;
  z-index: 100000;
  color: #eee;
  background-color: #000;
}
#${id} div {
  width: ${width}px;
  height: ${height}px;
  line-height: 1;
}
#${id} > div {
  animation: x${id} 13s linear infinite alternate;
}
#${id} > div > div {
  animation: y${id} 7s linear infinite alternate;
}
@keyframes x${id} {
  100% {
    transform: translateX(calc(100vw - ${width}px));
  }
}

@keyframes y${id} {
  100% {
    transform: translateY(calc(100vh - ${height}px));
  }
}
`;
      let timeoutId = null;
      let timeout =
        (currentScript && Number(currentScript.getAttribute("timeout"))) ||
        180000;

      function disable() {
        el.style.display = "none";
        timeoutId && clearTimeout(timeoutId);
        timeoutId = setTimeout(function() {
          el.style.display = "block";
        }, timeout);
      }
      disable();
      document.addEventListener("mousemove", disable);
      document.addEventListener("keydown", disable);
      document.addEventListener("scroll", disable);
    },
    { once: true }
  );
})();
