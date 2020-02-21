import service from "../service/service.js";
export default {
  get: _id => {
    return service.bookBasket.get(_id);
  },
  list: () => {
    return service.bookBasket.list();
  },
  post: req => {
    return service.bookBasket.post(req);
  },
  put: (id, req) => {
    return service.bookBasket.put(id, req);
  },
  delete: id => {
    return service.bookBasket.delete(id);
  }
};
