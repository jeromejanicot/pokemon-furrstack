db.createUser({
  user: "user",
  pwd: "password",
  roles: [{ role: "readWrite", db: "pokemon" }],
});
db.createCollection("pokemon_list");
