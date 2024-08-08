const mongoose = require("mongoose");
const express = require("express");
const app = express();
const PORT = 3000;
const catRouter = require("./routes/cat-router");

app.use(express.json());
app.use("/api/v1", catRouter);

const uri =
  "mongodb+srv://cclUser:superSecurePassword@colorcodedlabs.jnwokit.mongodb.net/specialDemonstrationDatabase?retryWrites=true&w=majority";
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
