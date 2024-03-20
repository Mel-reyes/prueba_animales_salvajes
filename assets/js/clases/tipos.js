import Animal from './animal.js'

class Leon extends Animal{
    constructor(nombre, edad, img, comentarios, sonido){
        super(nombre, edad, img, comentarios, sonido)
    }
    Rugir(){
        console.log(`${this.sonido}`)
    }
}

class Lobo extends Animal{
    constructor(nombre, edad, img, comentarios, sonido){
        super(nombre, edad, img, comentarios, sonido)
    }
    Aullar(){
        console.log(`${this.sonido}`)
    }
}

class Oso extends Animal{
    constructor(nombre, edad, img, comentarios, sonido){
        super(nombre, edad, img, comentarios, sonido)
    }
    Gruñir(){
        console.log(`${this.sonido}`)
    }
}

class Serpiente extends Animal{
    constructor(nombre, edad, img, comentarios, sonido){
        super(nombre, edad, img, comentarios, sonido)
    }
    Sisear(){
        console.log(`${this.sonido}`)
    }
}

class Aguila extends Animal{
    constructor(nombre, edad, img, comentarios, sonido){
        super(nombre, edad, img, comentarios, sonido)
    }
    Chillar(){
        console.log(`${this.sonido}`)
    }
}

export { Leon, Lobo, Oso, Serpiente, Aguila }