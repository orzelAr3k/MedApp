const MongoClient = require("mongodb").MongoClient;

const client = new MongoClient("mongodb://localhost:27017", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

client.connect((err, res) => {
  console.log("Connected to MongoDB!")
});
const db = client.db("MedApp");

module.exports = { db };