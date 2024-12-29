import mongoose, { model, Schema } from "mongoose";

const foodSchema = new Schema({
  name:{
    type: String,
    required: true,
  },
  description:{
    type: String,
    required: true
  },
  price:{
    type: String,
    required: true
  },
  image:{
    type: String,
    required: true
  },
  category:{
    type: String,
    required: true
  }
});

const foodModel = mongoose.models.food || model("food", foodSchema);

export default foodModel