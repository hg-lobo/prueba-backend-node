const pool = require('../config/db'); //importar la info de la base de datos

// Obtener todos los productos
const obtenerTodos = async (req, res) => {
    try {
        const resultado = await pool.query('SELECT * FROM productos ORDER BY id ASC');
        res.json(resultado.rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Crear un producto
const crearProducto = async (req, res) => {
    try {
        const { nombre, precio } = req.body;
        const query = 'INSERT INTO productos (nombre, precio) VALUES ($1, $2) RETURNING *';
        const resultado = await pool.query(query, [nombre, precio]);
        res.status(201).json(resultado.rows[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Actualizar un producto existente
const actualizarProducto = async (req, res) => {
    try {
        const { id } = req.params; // Sacamos el ID de la URL (ej: /productos/1)
        const { nombre, precio } = req.body; // Sacamos los nuevos datos del Body

        // La consulta SQL usa $1 y $2 para los datos, y $3 para el ID de control
        const query = 'UPDATE productos SET nombre = $1, precio = $2 WHERE id = $3 RETURNING *';
        
        // El orden en este arreglo DEBE coincidir con los números de los $
        const resultado = await pool.query(query, [nombre, precio, id]);
        
        // Si Postgres devuelve un arreglo vacío, significa que ese ID no existía
        if (resultado.rows.length === 0) {
            return res.status(404).send('Producto no encontrado');
        }

        // Devolvemos el producto ya modificado
        res.json(resultado.rows[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Eliminar un producto de la base de datos
const eliminarProducto = async (req, res) => {
    try {
        const { id } = req.params; // Capturamos el ID de la URL

        // Borramos la fila donde el id coincida con nuestro parámetro $1
        const resultado = await pool.query('DELETE FROM productos WHERE id = $1', [id]);
        
        // rowCount nos dice cuántas filas se vieron afectadas. Si es 0, el ID no existía
        if (resultado.rowCount === 0) {
            return res.status(404).send('Producto no encontrado');
        }

        res.send('Producto eliminado correctamente de la base de datos.');
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    obtenerTodos,
    crearProducto,
    actualizarProducto,
    eliminarProducto
};