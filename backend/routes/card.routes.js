import express from 'express'
import { addToCard, getCard, removeFromCard } from '../controllers/card.controller.js';
import auth_middleware from '../middleware/auth.js';



const cardRouter = express.Router();

cardRouter.post("/add", auth_middleware, addToCard);
cardRouter.post("/remove", auth_middleware, removeFromCard);
cardRouter.get("/get", auth_middleware, getCard);


export default cardRouter;