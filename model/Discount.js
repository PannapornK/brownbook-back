import mongoose from "mongoose";
const { Schema } = mongoose;
var DiscountSchema = new mongoose.Schema({
  price: Number,
  num: Number,
  id: Schema.Types.ObjectId,
  category: { type: Schema.Types.ObjectId, ref: "Category" }
});

var Discount = mongoose.model("Discount", DiscountSchema);
export default Discount;
