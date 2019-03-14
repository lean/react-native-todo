const request = {
  config: {
    api: "http://www.mocky.io/v2/5c87e4b63200004a343bd57e"
  },

  request: function async({ url, data, method }) {
    return new Promise(resolve => {
      fetch(`${this.config.api}${url}`, {
        method: method || "get",
        body: data ? JSON.stringify(data) : null,
        heades: {
          "content-type": "application/json"
        }
      }).then(response => {
        response
          .json()
          .then(json => {
            resolve(json);
          })
          .catch(err => {
            resolve(err);
          });
      });
    }).catch(error => error);
  }
};

export default request;
