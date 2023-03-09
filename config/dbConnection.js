const mongoose = require("mongoose");

const connectDb = async () => {
  try {
    const connect = await mongoose.connect(process.env.DB);
    console.log(
      "database connected",
      connect.connection.host,
      connect.connection.name
    );
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

module.exports = connectDb;
// mongoose
//   .connect(DB)
//   .then(() => {
//     console.log("connected successflully");
//   })
//   .catch((e) => {
//     console.log(e);
//   });
