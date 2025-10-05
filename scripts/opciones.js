/*  probar que pasa si se dan campos duplicados , */
document.addEventListener("DOMContentLoaded", async () => {
    const lista = document.getElementById("lista");
    const input = document.getElementById("nuevoSitio");
    const razon = document.getElementById("razon");
    const agregarBtn = document.getElementById("agregar");

    console.log("esta es:",razon)

    const data = await chrome.storage.sync.get("bloqueados");
    const sitios = data.bloqueados || [];
    
    console.log(data.bloqueados)

    async function cargarLista() {
      const data = await chrome.storage.sync.get("bloqueados");
      const sitios = data.bloqueados || [];
      const fechahoy =  Date.now();//.toISOString().split('T')[0];
      lista.innerHTML = "";
      sitios.forEach((sitio, index) => {
        var dias =fechahoy - sitio.FechaDeInicio  ;
         var dias   = Math.floor(dias / (1000 * 60 * 60 * 24));
        const li = document.createElement("li");
        li.textContent = `${sitio.link} - ${sitio.razon}- Dias de racha:  ${dias}   `; // aqui se muestra la razon y el sitio , creo que deberia poner un contador usando la fecha 
        const btn = document.createElement("button");
        btn.textContent = "X";
        btn.className = "delete";
        btn.onclick = () => eliminarSitio(index);
        li.appendChild(btn);
        lista.appendChild(li);
      });
      console.log(sitios)
    }
  
    async function agregarSitio() { /*
      
      const data = await chrome.storage.sync.get("bloqueados");

      const sitios = data.bloqueados || [];

      if (input.value && !sitios.includes(input.value)) {

        sitios.push(input.value);

        await chrome.storage.sync.set({ "bloqueados": sitios });

        input.value = "";

        cargarLista();

      }
anterior 
*/  

    console.log("esta es:",razon)

    const data = await chrome.storage.sync.get("bloqueados");
    const sitios = data.bloqueados || [];

    const nuevoLink = input.value.trim(); //trim quita espacios en blanco al principio y al final 
    const nuevaRazon = razon.value.trim();


    if (nuevoLink && nuevaRazon) {
      // Evitar duplicados por link
      const existe = sitios.some(item => item.link === nuevoLink);
      if (!existe) {
        const nuevoSitio = {
          link: nuevoLink,
          razon: nuevaRazon,
          FechaDeInicio:  Date.now(),//.toISOString().split('T')[0], // date crea la fecha toISO lo pone en formato internacional , T divide entre fecha y hora y el 0 agarra la primera mitad 
        };

        sitios.push(nuevoSitio);
        await chrome.storage.sync.set({ "bloqueados": sitios });

        input.value = "";
        razon.value = "";

        cargarLista();
      }
    }

    }
  
    async function eliminarSitio(index) {
      const data = await chrome.storage.sync.get("bloqueados");
      const sitios = data.bloqueados || [];
      sitios.splice(index, 1);
      await chrome.storage.sync.set({ "bloqueados": sitios });
      cargarLista();
    }
  
    agregarBtn.addEventListener("click", agregarSitio);
    cargarLista();
  });
  