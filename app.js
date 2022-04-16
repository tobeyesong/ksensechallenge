/** @format */
const express = require("express");
const axios = require("axios");
const path = require("path");
const app = express();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static("css"));

app.get("/", async (req, res) => {
  const users = await axios
    .get("https://jsonplaceholder.typicode.com/users")
    .then(function (response) {
      // console.log(response.data);
      return response.data;
    })
    .catch(function (error) {
      console.log(error);
    });
  res.render("index", { users });
});

app.get("/users/:id/posts", async (req, res) => {
  const { id } = req.params;

  const posts = await axios
    .get(`https://jsonplaceholder.typicode.com/users/${id}/posts`)
    .then(function (response) {
      console.log(response.data);
      return response.data;
    })
    .catch(function (error) {
      console.log(error);
    });

  res.render("show", { posts });
});

app.listen(3000, function () {
  console.log("Server is running on port 3000");
});
