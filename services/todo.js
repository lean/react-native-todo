export default {
  getTodos() {
    return this.request({
      url: "/"
    });
  },
  createTodo(data) {
    return this.request({
      url: "/",
      method: "post",
      data
    });
  }
};
