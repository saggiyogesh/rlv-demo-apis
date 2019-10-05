const express = require('express');

const app = express();

function limit(c) {
  return this.filter((x, i) => {
    if (i <= c - 1) {
      return true;
    }
  });
}
//limit function,internally we have just used filter function and //used index of its callback function
Array.prototype.limit = limit;

function skip(c) {
  return this.filter((x, i) => {
    if (i > c - 1) {
      return true;
    }
  });
}
Array.prototype.skip = skip;

const posts = [];

for (let i = 1; i <= 10000; i++) {
  posts.push({ id: i, hitCount: 0 });
}

app.get('/', (req, res) => {
  return res.send('Received a GET HTTP method');
});

app.get('/getPosts', (req, res) => {
  console.log('req---', req.url, req.query);
  const { skip = 0, limit = 10 } = req.query;

  return res.send(posts.skip(skip).limit(limit));
});

app.get('/newPost', (req, res) => {
  console.log('req---', req.url, req.query);
  const post = { id: Math.random(), hitCount: 0 };
  posts.splice(0, 0, post);
  return res.send({ post });
});

app.listen(process.env.PORT || 8080, () =>
  console.log(`Example app listening on port ${process.env.PORT}!`)
);
