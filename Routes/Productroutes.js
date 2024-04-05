import express from 'express';
import { createproduct, deleteproduct, getproduct, getsingle, updateproduct } from '../Controller/Productcontroller.js';
const router=express.Router();
router.get('/getdata',getproduct)
router.get('/getsingle/:id',getsingle)
router.post('/create',createproduct)
router.delete('/delete/:id',deleteproduct)
router.put('/update/:id',updateproduct)
export default router;
