import Category from "../model/Category.js";
export default {
  get: id => {
    return Category.findOne({ _id: id });
  },
  list: filter => {
    return Category.find();
  },
  post: req => {
    return req.save();
  },
  put: (id, req) => {
    return Category.findOneAndUpdate({ _id: id }, req, { new: true });
  },
  delete: id => {
    Category.deleteOne({ _id: id });
    return id;
  }
};
