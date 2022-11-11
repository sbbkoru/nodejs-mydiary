const mongoose = require("mongoose");

mongoose
  .connect(process.env.MONGO_CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Veritabanına bağlandı!");
  })
  .catch((err) => {
    console.log("Veritabanına bağlanamadı! : " + err);
  });
