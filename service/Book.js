import Book from "../model/Book.js";
export default {
  get: id => {
    return Book.findOne({ _id: id });
  },
  list: (query, title = "") => {
    var q = query ? query : {};
    q = { ...q, title: { $regex: `.*${title}.*`, $options: "i" } };
    return Book.find(q).sort("title");
  },
  post: req => {
    return req.save();
  },
  put: (id, req) => {
    return Book.findOneAndUpdate({ _id: id }, req, { new: true });
  },
  delete: id => {
    Book.deleteOne({ _id: id });
    return id;
  }
};
