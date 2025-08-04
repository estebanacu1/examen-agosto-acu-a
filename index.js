const fetch = require("node-fetch");
const prompt = require("prompt-sync")({ sigint: true });

function buscarPais(pais) {
  const url = `https://restcountries.com/v3.1/name/${pais}`;

  fetch(url)
    .then((res) => {
      if (!res.ok) throw new Error("País no encontrado");
      return res.json();
    })
    .then((data) => {
      const paisInfo = data[0];
      console.log("\n--- Resultado ---");
      console.log("Nombre:", paisInfo.name.common);
      console.log(
        "Capital:",
        paisInfo.capital ? paisInfo.capital[0] : "No tiene capital"
      );
      console.log("Región:", paisInfo.region);
      console.log("-----------------\n");
    })
    .catch(() => {
      console.log(`❌ No se encontró el país "${pais}"\n`);
    });
}

function iniciarApp() {
  console.log("🌍 Buscador de Países - API REST\n");

  let seguir = true;

  while (seguir) {
    const entrada = prompt("🔍 Ingresá el nombre de un país: ");
    if (!entrada.trim()) {
      console.log("⚠️ Ingresá un nombre válido.\n");
      continue;
    }

    buscarPais(entrada);

    const respuesta = prompt("¿Querés buscar otro país? (s/n): ").toLowerCase();
    if (respuesta !== "s") {
      seguir = false;
      console.log("\n👋 Hasta luego.");
    }
  }
}

iniciarApp();
