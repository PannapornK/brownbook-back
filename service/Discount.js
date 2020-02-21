import Discount from "../model/Discount.js";
export default {
  get: id => {
    return Discount.findOne({ _id: id }).populate("category");
  },
  list: filter => {
    return Discount.find().populate("category");
  },
  post: req => {
    return req.save();
  },
  put: (id, req) => {
    return Discount.findOneAndUpdate({ _id: id }, req, { new: true }).populate(
      "category"
    );
  },
  delete: id => {
    Discount.deleteOne({ _id: id }).populate("category");
    return id;
  }
};
