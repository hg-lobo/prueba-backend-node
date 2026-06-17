const { Pool } = require('pg'); //se descarga la libreria npm install pg 

const pool = new Pool({
    user: '',                   // El usuario por defecto de Postgres
    host: 'localhost',          // Tu máquina local
    database: '',               // La base de datos que se crea en pgAdmin
    password: '',               // contraseña
    port: ,                     // El puerto por defecto
});

const inicializarBaseDeDatos = async () => {
    const queryTabla = `
        CREATE TABLE IF NOT EXISTS productos (
            id SERIAL PRIMARY KEY,
            nombre VARCHAR(100) NOT NULL,
            precio NUMERIC(10, 2) NOT NULL
        );
    `;
    await pool.query(queryTabla);
    console.log("¡Conexión exitosa! Tabla 'productos' verificada en Postgres Local.");
};

inicializarBaseDeDatos().catch(err => console.error("Error en la base de datos:", err));

module.exports = pool;
