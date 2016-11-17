export function getItem() {
  return fetch('http://qiscusinterview.herokuapp.com/products');
}

export function postItem(name, price) {
  const data = new FormData();
  data.append('product[name]', name);
  data.append('product[price]', price);
  const config = {
    method: 'POST',
    body: data,
  };
  return fetch('http://qiscusinterview.herokuapp.com/products/', config);
}
