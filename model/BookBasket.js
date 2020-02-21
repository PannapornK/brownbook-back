import mongoose from "mongoose";
const { Schema } = mongoose;
var BookBasketSchema = new mongoose.Schema({
  book: { type: Schema.Types.ObjectId, ref: "Book" },
  num: Number,
  basket: { type: Schema.Types.ObjectId, ref: "Basket" }
});

var BookBasket = mongoose.model("BookBasket", BookBasketSchema);
export default BookBasket;
