console.log("db.auth");
db.auth(
  process.env.MONGO_INITDB_ROOT_USERNAME,
  process.env.MONGO_INITDB_ROOT_PASSWORD
);

console.log("getSiblingDB");
db = db.getSiblingDB(process.env.MONGO_DB);

console.log("createUser");
db.createUser({
  user: process.env.MONGO_USERNAME,
  pwd: process.env.MONGO_PASSWORD,
  role: [{ role: "readWrite", db: process.env.MONGO_DB }],
});

console.log("createCollection");
db.createCollection("pokemon_list");
