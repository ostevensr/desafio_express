import { Router } from "express";
import {getHtml,getCanciones,postCancion,putCancion,borrarCancion} from '../controllers/cancionesControllers.js';

const router = Router();

router.get('/', getHtml);
router.get('/canciones', getCanciones);
router.post('/canciones', postCancion);
router.put('/canciones/:id', putCancion);
router.delete('/canciones/:id', borrarCancion);

export default router;