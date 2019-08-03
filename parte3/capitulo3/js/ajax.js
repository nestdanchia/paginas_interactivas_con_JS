
const resultados = document.querySelector("div#resultados");
const subtitulo = document.querySelector("h2#subtitulo");
let nombre = document.querySelector("input[name='nombre']");
const pais = document.querySelector("input[name='pais']");
console.log("nombre :", nombre);
const btn1 = document.querySelector("#btn1");
const btn2 = document.querySelector("#btn2");
const btn3 = document.querySelector("#btn3");
const btn4 = document.querySelector("#btn4");

//Ejemplo 1 - usando callbacks
btn1.addEventListener("click", () => {
  subtitulo.innerText = "Callbacks";

  const ajax = new XMLHttpRequest();
  ajax.open("GET", "http://localhost:3000/imagenes");
  ajax.addEventListener("load", e => {
    if (e.target.status !== 200) {
      console.log("Error!", e.target.status);
      return;
    }
    // transformar el JSON que viaja como texto desde el servidor
    // a un objeto con JSON.parse
    armarListado(JSON.parse(ajax.responseText), resultados);
  });
  ajax.send();
});
function armarListado(listado, contenedor) {
  //limpio al contenedor
  contenedor.innerText = "";
  cambiarColor("silver");
  listado.forEach(item => {
    const img = document.createElement("img");
    img.src = item.show.image.medium;
    contenedor.appendChild(img);
  });
}
function verNombre(listado, contenedor) {
  subtitulo.innerText = "Muestra nombre y pais";
  let es = listado.filter(item => item.show.nombre === "Batichico");
  /*document.querySelector("input[name='nombre']").style.backgroundColor =
    "yellow";
  document.querySelector("input[name='pais']").style.backgroundColor = "yellow";*/
  cambiarColor("yellow");
  nombre.placeholder = es[0].show.nombre;

  pais.placeholder = es[0].show.pais;
}
//Ejemplo 2 - usando promesas
btn2.addEventListener("click", () => {
  subtitulo.innerText = "Promesas";
  cambiarColor("silver");
  fetch("http://localhost:3000/imagenes")
    .then(response => {
      if (response.status !== 200) throw new Error(response.status);
      return response.json();
    })

    .then(listado => {
      armarListado(listado, resultados);
    })
    .catch(error => {
      console.error("Error en promesas", error);
    });
});

btn4.addEventListener("click", () => {
  fetch("http://localhost:3000/imagenes")
    .then(response => {
      if (response.status !== 200) throw new Error(response.status);

      return response.json();
    })
    .then(listado => {
      verNombre(listado, resultados);
    })
    .catch(error => {
      console.error("Error en promesas", error);
    });
});

// ejemplo 3
btn3.addEventListener("click", async () => {
  subtitulo.innerText = "Async/Await";
  cambiarColor("silver");
  try {
    //recordar declarar el callback con async
    const respuesta = await fetch("http://localhost:3000/imagenes");
    if (respuesta.status !== 200) throw new Error(respuesta.status);
    const listado = await respuesta.json();
    armarListado(listado, resultados);
  } catch (error) {
    console.error("Problemas en Async", error);
  }
});
function cambiarColor(color) {
  document.querySelector("input[name='nombre']").style.backgroundColor = color;
  document.querySelector("input[name='pais']").style.backgroundColor = color;
  nombre.placeholder = "";
  pais.placeholder = "";
 
