import express from 'express';
import { signin, signup, userRentals, updateRentals } from '../controllers/user.js';
import auth from '../middleware/auth.js';

//routes the front end can use to contact the backend for requests.
//some routes require the user the be authenticated.
const router = express.Router();

router.post('/signin', signin);
router.post('/signup', signup);
router.get('/', userRentals);
router.patch('/:id/updateRentals',auth, updateRentals);

export default router;