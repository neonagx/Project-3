
var users = [
  {
    userName: "Gaye",
    email: "gaye@email.com"
  },
  {
    userName: "Darin",
    email: "darin@email.com"
  },
  {
    userName: "Paul",
    email: "paul@email.com"
  },
]

function index(req, res) {
  res.json(users)
}

function create(req, res) {
  users.push(req.body)
  res.json(users);
};

function show(req, res) {
  user = users.find(function(c) {
    return c["id"] == req.params.id;
  });
  res.json(user);
}

function update(req, res) {
  userIndex = users.findIndex(function(c) {
    return c["id"] == req.params.id;
  });
  users[userIndex] = req.body;
  res.json(users);
}

function destroy(req, res) {
  userIndex = users.findIndex(function(c) {
    return c["id"] == req.params.id;
  });
  users.splice(userIndex,1);
  res.json(users);
}

module.exports = {
  index: index,
  create: create,
  show: show,
  update: update,
  destroy: destroy
}
