const mongoose = require("mongoose");
const express = require("express");
const app = express();
const PORT = 3000;
const catRouter = require("./routes/cat-router");
const cors = require("cors"); // Import the cors package


app.use(express.json());
app.use(cors());
app.use("/api/v1", catRouter);

const uri =
  "mongodb+srv://filmon:abraha@catcluster.twra24t.mongodb.net/?retryWrites=true&w=majority&appName=CatCluster";
const clientOptions = {
  serverApi: { version: "1", strict: true, deprecationErrors: true },
};

async function connectDb() {
  try {
    await mongoose.connect(uri, clientOptions);
    await mongoose.connection.db.admin().command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } catch (error) {
    console.log("Error: " + error);
    await mongoose.disconnect();
  }
}

app.listen(PORT, async () => {
  await connectDb().catch(console.dir);
  console.log(`Express API started: http://localhost:${PORT}`);
});
