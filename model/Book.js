import mongoose from "mongoose";
const { Schema } = mongoose;
var BookSchema = new mongoose.Schema({
  title: String,
  price: Number,
  cover: String,
  id: Schema.Types.ObjectId,
  category: { type: Schema.Types.ObjectId, ref: "Category" }
});

var Book = mongoose.model("Book", BookSchema);
export default Book;
