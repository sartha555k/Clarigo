import express from 'express';
import { getUsers, addUser, updateUser, deleteUser } from '../controllers/userController.js';
import { verifyToken, isAdmin } from '../middleware/auth.js';

const router = express.Router();

router.route('/')
  .get(verifyToken, isAdmin, getUsers)
  .post(verifyToken, isAdmin, addUser);

router.route('/:id')
  .put(verifyToken, isAdmin, updateUser)
  .delete(verifyToken, isAdmin, deleteUser);

export default router;
