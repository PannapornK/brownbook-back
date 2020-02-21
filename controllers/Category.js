import service from "../service/service.js";
export default {
  get: _id => {
    return service.category.get(_id);
  },
  list: () => {
    return service.category.list();
  },
  post: req => {
    return service.category.post(req);
  },
  put: (id, req) => {
    return service.category.put(id, req);
  },
  delete: id => {
    return service.category.delete(id);
  }
};
