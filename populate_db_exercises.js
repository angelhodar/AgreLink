const db = require('./db')
const Cube = require('./models/cube')
const Matcher = require('./models/matcher')
const IceCreamShop = require('./models/iceshop')
const Sandwich = require('./models/sandwich')
const Discriminator = require('./models/discriminator')
const Recycle = require('./models/recycle')

cube = new Cube({
  name: "Cubos",
  description: "Se presentan unos cubos con tiempos de aparición aleatorios donde el paciente debe reaccionar con el mando adecuado para hacerlos desaparecer.",
  img: "cubos.jpg",
  parameters: {
    cantidad: 2,
    reaparicion: 2,
    duracion: 40
  }
})

matcher = new Matcher({
  name: "Matcher",
  description: "El paciente debe usar el joystick del mando correspondiente para destruir ciertos objetos en el momento adecuado.",
  img: "matcher.png",
  parameters: {
    velocidad: 2,
    reaparicion: 3,
    duracion: 40
  }
})

iceCreamShop = new IceCreamShop({
  name: "Heladeria",
  description: "Simulación de una heladería en la que el paciente deberá atender a un conjunto de clientes sirviendo helados.",
  img: "heladeria.jpg",
  parameters: {
    sabores: 6,
    clientes: 1,
    duracion: 60
  }
})

sandwich = new Sandwich({
  name: "Sandwich",
  description: "Creación de diferentes sandwiches con número de ingredientes y pisos variable.",
  img: "sandwich.jpg",
  parameters: {
    ingredientes: 6,
    pisos: 2,
    duracion: 60
  }
})

discriminator = new Discriminator({
  name: "Discriminación",
  description: "Discriminar palabras en distintas temáticas según la palabra concreta",
  img: "voronoi.png",
  parameters: {
    ingredientes: 6,
    pisos: 2,
    duracion: 60
  }
})

recycle = new Recycle({
  name: "Reciclaje",
  description: "Reciclado de distintos objetos en sus cubos correspondientes",
  img: "reciclaje2.jpg",
  parameters: {
    ingredientes: 6,
    pisos: 2,
    duracion: 60
  }
})

async function populate() {
  cube = await cube.save();
  matcher = await matcher.save();
  iceCreamShop = await iceCreamShop.save();
  sandwich = await sandwich.save();
  discriminator = await discriminator.save();
  recycle = await recycle.save();
}

populate()