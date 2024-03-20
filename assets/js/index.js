import { Leon, Lobo, Oso, Serpiente, Aguila } from './clases/tipos.js';

const animalesTabla = [];
let animal = []; // Variable para almacenar los datos de los animales

// Función para obtener los datos de la API
let callAPi = (() => {
    const url_personajes = 'animales.json';
    try {
        const getData = async () => {
            const res = await fetch(url_personajes);
            const data = await res.json();
            return data
        }
        return { getData }
    } catch (error) {
        console.log(error)
    }
})()
const { animales } = await callAPi.getData()

// Manipulación del formulario al hacer click en el botón 
document.querySelector('#btnRegistrar').addEventListener('click', () => {
    const nombre = document.querySelector('#animal').value;
    const edad = document.querySelector('#edad').value;
    const comentarios = document.querySelector('#comentarios').value;
    const previewImg = document.querySelector('#preview');

    const imgSrc = previewImg.style.backgroundImage.slice(5, -2);
    const sonido = obtenerSonido(nombre);

    if (validarCampos(nombre, edad, comentarios, imgSrc)) {
        const AnimalClass = obtenerClaseAnimal(nombre);
        if (AnimalClass) {
            const animal = new AnimalClass(nombre, edad, imgSrc, comentarios, `/assets/sounds/${sonido}`);
            animalesTabla.push(animal);
            createTable(animal, animalesTabla.length - 1);
            cleanForm();
        } else {
            alert('El animal seleccionado no es válido.');
        }
    } else {
        alert('Todos los campos son obligatorios.');
    }
});

function obtenerSonido(nombre) {
    const animal = animales.find(a => a.name === nombre);
    return animal ? animal.sonido : '';
}

function validarCampos(nombre, edad, comentarios, imgSrc) {
    return nombre !== '' && edad !== '' && comentarios !== '' && imgSrc !== '';
}

function obtenerClaseAnimal(nombre) {
    const clasesAnimales = {
        'Leon': Leon,
        'Lobo': Lobo,
        'Oso': Oso,
        'Serpiente': Serpiente,
        'Aguila': Aguila
    };
    return clasesAnimales[nombre]; }

// Evento que cambia la vista Preview de la imagen
document.querySelector('#animal').addEventListener('change', async (e) => {
    const nombre = e.target.value;
    const previewImg = document.querySelector('#preview');
    let img = animales.find(a => a.name === nombre).imagen
    previewImg.style.backgroundImage = `url(/assets/imgs/${img})`
})


// Función para limpiar el formulario después de agregar un animal
function cleanForm() {
    document.querySelector('#animal').value = '';
    document.querySelector('#edad').value = '';
    document.querySelector('#comentarios').value = '';
    document.querySelector('#preview').style.backgroundImage = 'url(/assets/imgs/lion.svg)';
}

// Función para crear la tabla de animales
function createTable(animal, id) {
    document.querySelector('#Animales').innerHTML += `
        <div class="card mx-2 my-2" style="width: 18rem;">
            <img src="${animal.img}" onclick='modal(${id})' class="card-img-top" style="height: 10rem;" alt="...">
            <div class="card-body">
                <h5 class="card-title">${animal.nombre}</h5>
            </div>
            <ul class="list-group list-group-flush">
                <li class="list-group-item">Edad : ${animal.edad}</li>
                <button onclick='reproducirSonido(${id})' type="button" class="btn btn-secondary">
                    <i class="fa-solid fa-play"></i>
                    <audio src="${animal.sonido}"></audio>
                </button>
            </ul>
        </div>
    `;
}

// Función para reproducir el sonido del animal
window.reproducirSonido = (id) => {
    document.querySelector(`audio[src="${animalesTabla[id].sonido}"]`).play();
}

// Función para mostrar el modal con la información del animal
window.modal = (id) => {
    $('#exampleModal').modal('show');
    document.querySelector('.modal-body').innerHTML = `
        <div class="card mx-auto" style="width: 18rem;">
            <img src="${animalesTabla[id].img}" class="card-img-top" style="height: 10rem;" alt="...">
            <div class="card-body">
                <h5 class="card-title">${animalesTabla[id].nombre}</h5>
                <p class="card-text">Comentarios : ${animalesTabla[id].comentarios}</p>
            </div>
            <ul class="list-group list-group-flush">
                <li class="list-group-item">Edad : ${animalesTabla[id].edad}</li>
                <button onclick='reproducirSonido(${id})' type="button" class="btn btn-secondary">
                    <i class="fa-solid fa-play"></i>
                    <audio src="${animalesTabla[id].sonido}"></audio>
                </button>
            </ul>
        </div>
    `;
}