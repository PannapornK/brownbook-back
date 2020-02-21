import express from "express";
import api from "./controllers/api.js";
import mongoose from "mongoose";
import Book from "./model/Book.js";
import Basket from "./model/Basket.js";
import Category from "./model/Category.js";
import Discount from "./model/Discount.js";
import "regenerator-runtime/runtime";
import axios from "axios";
import "core-js/stable"; // if polyfills are also needed
import graphqlHTTP from "express-graphql";
import { buildSchema } from "graphql";
import cors from "cors";
const schema = buildSchema(`
  enum Status{
    DONE,
    PENDING
  }

  type Category{
    _id:ID!
    title:String
  }
  type Book {
    _id: ID!
    title: String
    price: Float
    cover: String
    category:Category
  }
  type Basket{
    _id:ID!
    books:[Book]
    price: Float
    status:Status
  }
  type Discount{
    _id:ID!
    num:Int
    price:Float
    category:Category
  }

  input CategoryInput{
    title:String
  }
  input BookInput {
    title: String
    price: Float
    cover: String
    category:ID
  }
  input BasketInput {
    books:[ID]
    price:Float
    status:Status
  }
  input DiscountInput{
    num:Int
    price:Float
    category:ID
  }



  type Query {
    books(query:BookInput,title:String): [Book]
    book(_id:ID!):Book
    baskets(query:BasketInput):[Basket]
    basket(_id:ID!):Basket
    discounts:[Discount]
    summary(_id:ID!):Float
  }
  type Mutation {
    createBook(data: BookInput): Book
    updateBook(_id:ID!,data: BookInput):Book
    deleteBook(_id:ID!):ID
    createBasket(data: BasketInput): Basket
    updateBasket(_id:ID!,data: BasketInput):Basket
    deleteBasket(_id:ID!):ID
    createCategory(data:CategoryInput):Category
    createDiscount(data:DiscountInput):Discount
  }
`);
const root = {
  book: _id => {
    return api.book.get(_id);
  },
  books: ({ query, title }) => {
    return api.book.list(query, title);
  },
  createBook: async ({ data }) => {
    return await api.book.post(new Book(data));
  },
  updateBook: async ({ _id, data }) => {
    return await api.book.put(_id, data);
  },
  deleteBook: async ({ _id }) => {
    return await api.book.delete(_id);
  },
  basket: _id => {
    return api.basket.get(_id);
  },
  baskets: async ({ query }) => {
    return await api.basket.list(query);
  },
  createBasket: async ({ data }) => {
    return await api.basket.post(new Basket(data));
  },
  updateBasket: async ({ _id, data }) => {
    return await api.basket.put(_id, data);
  },
  deleteBasket: async ({ _id }) => {
    return await api.basket.delete(_id);
  },
  createCategory: async ({ data }) => {
    return await api.category.post(new Category(data));
  },
  discounts: async () => {
    return await api.discount.list();
  },
  createDiscount: async ({ data }) => {
    return await api.discount.post(new Discount(data));
  },
  summary: async ({ _id }) => {
    return await api.basket.summary(_id);
  }
};
mongoose.connect(
  "mongodb://localhost/brownbook",
  { useNewUrlParser: true, useUnifiedTopology: true }
);
var db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function() {
  console.log("mongodb is now opening");
  api.book.list("").then(v => {
    if (v.length == 0) {
      axios
        .get("https://api.lbbs.line-beta.me/b/5c52a1be15735a25423d3540")
        .then(response => {
          for (var i in response.data.books) {
            delete response.data.books[i]["id"];
            api.book.post(new Book(response.data.books[i]));
          }
          api.category.post(new Category({ title: "Harry" })).then(category => {
            api.book.list({}, "Harry").then(books => {
              for (var book of books) {
                api.book.put(book._id, { category: category._id }).then();
              }
            });
            api.discount
              .post(new Discount({ category: category._id, price: 10, num: 2 }))
              .then();
            api.discount
              .post(new Discount({ category: category._id, price: 11, num: 3 }))
              .then();
            api.discount
              .post(new Discount({ category: category._id, price: 12, num: 4 }))
              .then();
            api.discount
              .post(new Discount({ category: category._id, price: 13, num: 5 }))
              .then();
            api.discount
              .post(new Discount({ category: category._id, price: 14, num: 6 }))
              .then();
            api.discount
              .post(new Discount({ category: category._id, price: 15, num: 7 }))
              .then();
          });
        });
    }
  });

  // we're connected!
});

const app = express();
app.use(cors());
app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
    cors: {
      origin: "*", // <- allow request from all domains
      credentials: true
    }
  })
);

app.listen({ port: 4000 }, () =>
  console.log("Now browse to http://localhost:4000")
);
