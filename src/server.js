const express = require('express')
const {container} = require('./classes/Container.js')
const PORT = 8080
const app = express()
const productContainer = container('productos.txt')

//#region MANEJADORES
app.get('/productos', async (req, res) => {
    try {
        const products = await productContainer.getAll()
        res.status(200).json({products})
    } catch (error) {
        res.status(500).json({error})
    }
})

app.get('/productoRandom', async (req, res) => {
    try {
        const random = Math.floor(Math.random() * (4 - 1)) + 1
        const product = await productContainer.getById(random)
        res.status(200).json({product})
    } catch (error) {
        res.status(500).json({error})
    }
})

//#endregion 

const server = app.listen(PORT, () => console.log(`Listen on ${server.address().port}`))
server.on('error', error => console.log(`Error en el servidor ${error}`))
