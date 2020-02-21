import Basket from "../model/Basket.js";
import Discount from "../model/Discount.js";
export default {
  get: id => {
    return Basket.findOne({ _id: id }).populate("books");
  },
  list: async query => {
    return Basket.find(query).populate("books");
  },
  post: async req => {
    var basket = await req.save();
    return basket.populate("books").execPopulate();
  },
  put: (id, req) => {
    return Basket.findOneAndUpdate({ _id: id }, req, { new: true }).populate(
      "books"
    );
  },
  delete: id => {
    Basket.deleteOne({ _id: id });
    return id;
  },
  summary: async id => {
    var basket = await Basket.findOne({ _id: id }).populate("books");
    var books = (basket.books || []).filter(v => v.category);
    var sum = 0;
    var dic = {};
    for (var i in books) {
      if (dic[books[i].category]) {
        dic[books[i].category] += 1;
      } else {
        dic[books[i].category] = 1;
      }
    }
    for (var k of Object.keys(dic)) {
      var discount = await Discount.findOne({
        $and: [{ category: k }, { num: dic[k] }]
      });
      if (discount) {
        var arr = books.filter(v => v.category == k);
        sum = (arr || []).map(v => v.price).reduce((a, b) => a + b, 0);
        sum = (sum * discount.price) / 100;
      }
    }
    return sum;
  }
};
