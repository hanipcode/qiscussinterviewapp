export function getItem() {
  return fetch('http://qiscusinterview.herokuapp.com/products');
}

export function postItem(name, price) {
  const data = {
    name: name,
    price: price,
  };
  const config = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  };
  console.log(config.body);
  return fetch('http://qiscusinterview.herokuapp.com/products/', config);
}
