import mongoose from "mongoose";
const { Schema } = mongoose;
import { Book } from "./Book.js";
import _ from "lodash";
const status = {
  DONE: "DONE",
  PENDING: "PENDING"
};
var BasketSchema = new mongoose.Schema({
  books: [{ type: Schema.Types.ObjectId, ref: "Book" }],
  id: Schema.Types.ObjectId,
  price: Number,
  status: {
    type: String,
    enum: ["DONE", "PENDING"]
  }
});

var Basket = mongoose.model("Basket", BasketSchema);
export default Basket;
