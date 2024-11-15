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
        
        // Impostare l'URL del video YouTube
        const youtubeVideoId = (currentScript && currentScript.getAttribute("videoId")) || "cElhIDdGz7M&t"; // Sostituisci con l'ID del video di YouTube
        const iframe = document.createElement("iframe");
        iframe.src = `https://www.youtube.com/embed/${youtubeVideoId}?autoplay=1&loop=1&playlist=${youtubeVideoId}&mute=1`;
        iframe.allow = "autoplay; encrypted-media";
        iframe.style.width = "100%";  //larghezza player video 
        iframe.style.height = "100%"; //altezza player video 
        iframe.style.border = "none";  // bordi player
        iframe.style.position = "absolute";
        iframe.style.top = "0";
        iframe.style.left = "0";
        iframe.style.objectFit = "cover";
  
        el.appendChild(iframe);
  
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
  