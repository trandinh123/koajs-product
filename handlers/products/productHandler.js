const Router = require('koa-router');
const _ = require('lodash');
const {
  getAll: getAllProducts,
  getOne: getOneProduct,
  add: addProduct,
  remove: removeProduct,
} = require('../../database/productReposity');

async function getProducts(ctx) {
  try {
    let products = getAllProducts();
    const { limit, sort, fields } = ctx.request.query;
    if (limit) {
      products = products.slice(0, limit);
    }

    if (sort) {
      products.sort((a, b) => {
        if (sort === 'asc') {
          return a.createdAt - b.createdAt;
        }
        return b.createdAt - a.createdAt;
      });
    }

    if (fields) {
      console.log(fields.split(','));
      products = products.map((product) => _.pick(product, fields.split(',')));
    }
    ctx.body = {
      data: products,
    };
  } catch (e) {
    ctx.status = 404;
    ctx.body = {
      success: false,
      data: [],
      message: e.message,
    };
  }
}

async function getProduct(ctx) {
  try {
    const { id } = ctx.params;
    const getCurrentProduct = getOneProduct(id);
    const fields = ctx.request.query;

    if (getCurrentProduct) {
      return (ctx.body = {
        data: getCurrentProduct,
      });
    }
    ctx.status = 404;
    return (ctx.body = {
      success: false,
      message: `No product with id ${id}`,
    });
  } catch (e) {
    ctx.body = {
      success: false,
      message: e.message,
    };
  }
}

async function save(ctx) {
  try {
    const newProduct = ctx.request.body;
    addProduct(newProduct);
    ctx.status = 201;
    return (ctx.body = {
      success: true,
    });
  } catch (e) {
    return (ctx.body = {
      success: false,
      message: e.message,
    });
  }
}

async function remove(ctx) {
  try {
    const { id } = ctx.params;
    removeProduct(id);
    return (ctx.body = {
      success: true,
    });
  } catch (e) {
    return (ctx.body = {
      success: false,
      message: e.message,
    });
  }
}
module.exports = {
  getProducts,
  getProduct,
  save,
  remove,
};
