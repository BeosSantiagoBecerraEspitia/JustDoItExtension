chrome.storage.sync.get("bloqueados", (data) => {

  console.log("scrippt de bloqueo cargado")
  
    const urlsBloqueadas = data.bloqueados || ["facebook.com", "youtube.com"];
  
    if (urlsBloqueadas.some(url => window.location.href.includes(url))) {
      const overlay = document.createElement("div");
      overlay.style.position = "fixed";
      overlay.style.top = "0";
      overlay.style.left = "0";
      overlay.style.width = "100vw";
      overlay.style.height = "100vh";
      overlay.style.backgroundColor = "rgba(0, 0, 0, 0.8)";
      overlay.style.zIndex = "9999";
  
      const img = document.createElement("img");
      img.src = "https://via.placeholder.com/500";  // Cambia esto por tu imagen
      img.style.position = "absolute";
      img.style.top = "50%";
      img.style.left = "50%";
      img.style.transform = "translate(-50%, -50%)";
      img.style.border = "5px solid white";
      img.style.borderRadius = "10px";
  
      overlay.appendChild(img);
      document.body.appendChild(overlay);
    }
  });
  