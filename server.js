const express = require('express');
const productosRoutes = require('./src/routes/productosRoutes');

const app = express();
app.use(express.json());

// Enlazamos las rutas del módulo de productos
app.use('/productos', productosRoutes);

app.listen(3000, () => {
    console.log('Servidor profesional corriendo en http://localhost:3000');
});