const express = require("express");
const app = express();
const mongoose = require("mongoose");
const User = require("./models/user");
const bodyParser = require("body-parser");

mongoose.connect(
  "mongodb://127.0.0.1:27017/pagination",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  () => console.log("connected")
);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/user", async (req, res) => {
  const page = req.body.page;
  const limit = req.body.limit;
  console.log("limit:", limit);
  const get = await User.find()
    .skip(parseInt(page - 1) * limit)
    .limit(parseInt(limit));

  // const startIndex = (page - 1) * limit;
  // const endIndex = page * limit;
  // const result = get.slice(startIndex, endIndex);
  res.status(202).json(get);
});
app.post("/create-user", async (req, res) => {
  const { name } = req.body;
  const user = await new User({
    name,
  })
    .save()
    .then((result) => {
      res.status(201).json({
        success: true,
        data: result,
      });
    })

    .catch((err) => {
      res.status(501).json(err);
    });
});

app.listen(3000);

// const users = [
//   { id: 1, name: "user 1" },
//   { id: 2, name: "user 2" },
//   { id: 3, name: "user 3" },
//   { id: 4, name: "user 4" },
//   { id: 5, name: "user 5" },
//   { id: 6, name: "user 6" },
//   { id: 7, name: "user 7" },
//   { id: 8, name: "user 8" },
//   { id: 9, name: "user 9" },
//   { id: 10, name: "user 10" },
//   { id: 11, name: "user 11" },
//   { id: 12, name: "user 12" },
//   { id: 13, name: "user 13" },
// ];
