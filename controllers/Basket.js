import service from "../service/service.js";
export default {
  get: _id => {
    return service.basket.get(_id);
  },
  list: query => {
    return service.basket.list(query);
  },
  post: req => {
    return service.basket.post(req);
  },
  put: (id, req) => {
    return service.basket.put(id, req);
  },
  delete: id => {
    return service.basket.delete(id);
  },
  summary: async _id => {
    return await service.basket.summary(_id);
  }
};
