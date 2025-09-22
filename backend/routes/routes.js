const express = require('express');
const router = express.Router();
const { pool } = require('../db');  

// prueba de vida
router.get('/test', (_req, res) => {
  res.json({ message: 'si esta funcionando la conexionn' });
});

router.post('/register', async (req, res) => {
  res.json({ message: 'User registration endpoint' });
});

router.post('/login', async (req, res) => {
  res.json({ message: 'User login endpoint' });
});




router.get('/tours/:limit/:offset', async (req, res) => {
  try{
    const { limit = 10, offset = 0 } = req.params;
    const mostrar = await pool.query('SELECT * from tourapp.tours LIMIT $1 OFFSET $2', [limit, offset]);
    res.json(mostrar.rows);
   }catch(error){
    console.error('Error al obtener los tours:', error);
    res.status(500).json({ error: 'Error al obtener los tours' });
   }
  }
);




router.get('/tours/availability', async (req, res) => {
  try {
    const disponibilidad = await pool.query ('SELECT * FROM tourapp.tour_schedules WHERE schedule_time > NOW() AND seats_available > 0 ORDER BY schedule_time');    
    res.json (disponibilidad.rows);
  } catch (err) {
    console.error('No se puede encontrar lugar en esa fecha:', err);
    res.status(500).json({ error: 'El servidor no funciona' });
  } 
});



router.put('/tours/reserve', async (req, res) => {
  const {personName,scheduleTime, tourId} = req.body;

  if (!personName || !scheduleTime || !tourId) {
    return res.status(400).json({ error: 'se le olvido escribir algo' });
  }
  try {
    await pool.query('UPDATE tourapp.tour_schedules SET seats_available = seats_available - 1 WHERE schedule_time = $1 AND tour_id = $2 AND seats_available > 0', [scheduleTime, tourId]);
    res.json({ message: 'Su reservacion se ha hecho!' });
  } catch (error) {
    console.error('Error al reservar el tour:', error);
    res.status(500).json({ error: 'Error al reservar el tour' });
  }
});



module.exports = router;

