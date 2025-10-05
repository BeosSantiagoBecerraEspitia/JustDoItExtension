document.addEventListener("DOMContentLoaded", () => {

  console.log("✅ bloqueado.js se está ejecutando (DOM listo)");

  // Extraer parámetro de la URL
  const params = new URLSearchParams(window.location.search);
  const site = params.get("site");

  // Buscar el objeto correspondiente en storage
  chrome.storage.sync.get("bloqueados", (data) => {
    const bloqueados = data.bloqueados || [];
    const encontrado = bloqueados.find(b => site.includes(b.link));

    let razon = "Sin razón registrada";
    let ultimoAcceso = null;

    if (encontrado) {
      razon = encontrado.razon || razon;
    }

    // Traer fecha del último acceso si existe
    const keyAcceso = "ultimoAcceso_" + site;
    chrome.storage.sync.get(keyAcceso, (res) => {
      ultimoAcceso = res[keyAcceso] ? new Date(res[keyAcceso]) : null;

      // Calcular días de racha
      let dias = 0;
      if (ultimoAcceso) {
        const diffMs = Date.now() - ultimoAcceso.getTime();
        dias = Math.floor(diffMs / (1000 * 60 * 60 * 24));
      }

      console.log("📊 sitio:", site, "| razón:", razon, "| días:", dias);

      // Insertar en el HTML
      const sitioEl = document.getElementById("sitio");
      const razonEl = document.getElementById("razon");
      const rachaEl = document.getElementById("racha");

      if (sitioEl) sitioEl.textContent = `Has intentado acceder a: ${site}`;
      if (razonEl) razonEl.textContent = `Razón del bloqueo: ${razon}`;
      if (rachaEl) rachaEl.textContent = `Llevas ${dias} días sin romper tu racha 🚀`;
    });
  });
});
