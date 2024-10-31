// routes/admin.js
import express from 'express';
import { auth } from '../middleware/auth.js';
import { checkRole } from '../middleware/checkRole.js';

const router = express.Router();

router.get('/dashboard', auth, checkRole('admin'), (req, res) => {
  res.send('Bienvenido al panel de administración');
});

export default router;
