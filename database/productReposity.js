const { data: products } = require('./products');
function getAll() {
  return products;
}

function getOne(id) {
  return products.find((product) => parseInt(id) === product.id);
}

function add(data) {
  const updateProducts = [data, ...products];
  return writeFileSync(
    './products',
    JSON.stringify({
      data: updateProducts,
    })
  );
}

function remove(id) {
  const updateProducts = products.filter((product) => product.id !== id);
  return writeFileSync(
    './products',
    JSON.stringify({
      data: updateProducts,
    })
  );
}
module.exports = {
  getAll,
  getOne,
  add,
  remove,
};
