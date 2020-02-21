import mongoose from "mongoose";
const { Schema } = mongoose;
var CategorySchema = new mongoose.Schema({
  id: Schema.Types.ObjectId,
  title: String
});

var Category = mongoose.model("Category", CategorySchema);
export default Category;
