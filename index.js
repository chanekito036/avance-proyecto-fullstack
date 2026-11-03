const express = require('express');
const jwt = require('jsonwebtoken');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

// Clave secreta para JWT
const SECRET_KEY = 'mi_clave_secreta_super_segura';

// Base de datos simulada (CRUD en memoria)
let tareas = [
    { id: 1, titulo: 'Estudiar para el reto', completada: false },
    { id: 2, titulo: 'Entregar avance de proyecto', completada: true }
];

// Inicio de Secion (JWT)
app.post('/api/login', (req, res) => {
    const { usuario, password } = req.body;
    if (usuario === 'admin' && password === '12345') {
        const token = jwt.sign({ usuario: 'admin' }, SECRET_KEY, { expiresIn: '1h' });
        return res.json({ mensaje: 'Login exitoso', token });
    }
    res.status(401).json({ error: 'Usuario o contraseña incorrectos' });
});

// Create (Crear tarea)
app.post('/api/tareas', (req, res) => {
    const nuevaTarea = {
        id: tareas.length + 1,
        titulo: req.body.titulo,
        completada: false
    };
    tareas.push(nuevaTarea);
    res.json({ mensaje: 'Tarea creada con éxito', tarea: nuevaTarea });
});

// Read (Leer/Consultar tareas)
app.get('/api/tareas', (req, res) => {
    res.json(tareas);
});

// Update(Actualizar tarea)
app.put('/api/tareas/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const tarea = tareas.find(t => t.id === id);
    if (!tarea) return res.status(404).json({ error: 'Tarea no encontrada' });
    
    tarea.titulo = req.body.titulo || tarea.titulo;
    res.json({ mensaje: 'Tarea actualizada', tarea });
});

// Delete (Borrar tarea)
app.delete('/api/tareas/:id', (req, res) => {
    const id = parseInt(req.params.id);
    tareas = tareas.filter(t => t.id !== id);
    res.json({ mensaje: 'Tarea eliminada con éxito' });
});

// Iniciar servidor
app.listen(3000, () => {
    console.log('Servidor corriendo en http://localhost:3000');
});