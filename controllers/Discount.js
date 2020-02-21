import service from "../service/service.js";
export default {
  get: _id => {
    return service.discount.get(_id);
  },
  list: () => {
    return service.discount.list();
  },
  post: req => {
    return service.discount.post(req);
  },
  put: (id, req) => {
    return service.discount.put(id, req);
  },
  delete: id => {
    return service.discount.delete(id);
  }
};
