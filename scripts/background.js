console.log(" Background service worker cargado");

chrome.webNavigation.onBeforeNavigate.addListener(async (details) => {
  if (details.frameId !== 0) return; // solo la pestaña principal

  const data = await chrome.storage.sync.get("bloqueados");
  const bloqueados = data.bloqueados || [{ link: "facebook.com" }, { link: "youtube.com" }];

  const hostname = new URL(details.url).hostname;

  // convierto la lista de objetos en array de strings
  const listaLinks = bloqueados.map(item => item.link);

  console.log("➡️ Revisando:", hostname, " contra ", listaLinks);

  if (listaLinks.some(bloq => hostname.includes(bloq))) {
    console.log("🚫 BLOQUEAR:", hostname);

    const fechaActual = new Date().toISOString();
    await chrome.storage.sync.set({ ["ultimoAcceso_" + hostname]: fechaActual });

    const bloqueadoURL = chrome.runtime.getURL("pages/bloqueado.html") + "?site=" + hostname;
chrome.tabs.update(details.tabId, { url: bloqueadoURL });

  }
});
