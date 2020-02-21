import service from "../service/service.js";
export default {
  get: _id => {
    return service.book.get(_id);
  },
  list: (query, title) => {
    return service.book.list(query, title);
  },
  post: req => {
    return service.book.post(req);
  },
  put: (id, req) => {
    return service.book.put(id, req);
  },
  delete: id => {
    return service.book.delete(id);
  }
};
