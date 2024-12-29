import userModel from "../models/userModel.js";

// add items to user card

const addToCard = async(req, res) =>{
  try {
    let userData = await userModel.findOne({_id:req.body.userId});
    let cardData = await userData.cardData;
    if(!cardData[req.body.itemId]){
      cardData[req.body.itemId] = 1;
    }else{
      cardData[req.body.itemId] += 1;
    }

    await userModel.findByIdAndUpdate(req.body.userId, {cardData});
    res.send({success: true, message: "Added to card"});
  } catch (error) {
    console.log(error);
    res.send({success: false, message: "Error"})
  }
}



// remove items from user card

const removeFromCard = async(req, res) =>{
  try {
    let userData = await userModel.findById(req.body.userId);
    let cardData = await userData.cardData;
    if(cardData[req.body.itemId] > 0){
      cardData[req.body.itemId] -= 1;
    }

    await userModel.findByIdAndUpdate(req.body.userId, {cardData});
    res.send({success: true, message: "Removed from card"});
  } catch (error) {
    console.log(error);
    res.send({success: false, message: "Error"})
  }
}



// fetch user card data

const getCard = async(req, res) =>{
  try {
    let userData = await userModel.findById(req.body.userId);
    let cardData = await userData.cardData;
    res.send({success: true, cardData});

  } catch (error) {
    console.log(error);
    res.send({success: false, message: "Error"})
  }
}


export {addToCard, removeFromCard, getCard};