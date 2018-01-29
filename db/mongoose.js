const mongoose = require("mongoose");

mongoose.Promise = global.Promise;
var conn_uri = "mongodb://sivagopaltech:mongodb512@cluster0-shard-00-00-k4jvt.mongodb.net:27017,cluster0-shard-00-01-k4jvt.mongodb.net:27017,cluster0-shard-00-02-k4jvt.mongodb.net:27017/sweepssample?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin"
mongoose.connect(conn_uri).then(
  () => { console.log("connected to db") },
  (err) => { console.log("error in connection") }
);;

module.exports.mongoose = mongoose;
