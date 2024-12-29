import  mongoose  from "mongoose";

export const connectDb = async () =>{
  await mongoose.connect("mongodb+srv://Khurshid:Khurshid@cluster0.iump9.mongodb.net/").then(() =>console.log("Db Connected"));
}