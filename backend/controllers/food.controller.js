import foodModel from '../models/foodModel.js'
import fs from 'fs'


const addFood = async (req, res) => {

  let image_filename = req.file.filename;
  const { name,
    description,
    price,
    category } = req.body;

    const food = new foodModel({name,
      description,
      price,
      image: image_filename,
      category});
    
    try {
      await food.save();
      res.status(200).send({message: "Food added"});
    } catch (error) {
      res.status(500).send({error: error.message});
    }
}


// all food list

const listFood = async(req, res) =>{
  try {
    const foods = await foodModel.find({});
    res.status(200).send({data: foods});
  } catch (error) {
    res.status(500).send({error: error.message});
  }
}


// remove food

const removeFood = async (req, res) =>{
  try {
    const food = await foodModel.findById(req.body.id);
    fs.unlink(`uploads/${food.image}`, () =>{});

    await foodModel.findByIdAndDelete(req.body.id);
    res.status(200).send({message: "Food removed successfully"});
  } catch (error) {
    res.status(500).send({error: error.message});
  }

}

export { addFood, listFood, removeFood }