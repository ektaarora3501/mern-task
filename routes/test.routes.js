const Test = require("../model/ test.model");

const Router = require("express").Router();

Router.get("/", async (req, res) => {
  return res.status(200).send("hello world");
});

Router.post("/add", async (req, res) => {
  // Route to add data to database
  try {
    const { data, array_data } = req.body;
    const test_data = new Test({
      data: data,
      array_data: array_data,
    });
    test_data.save((err, dt) => {
      if (err) {
        console.log(err);
        return res.status(200).json("error");
      }
    });
    return res.status(200).json("Data added");
  } catch (error) {
    console.log(error);
    return res.status(500).json("Error");
  }
});

Router.get("/all", async (req, res) => {
  try {
    const data = await Test.find();
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json("Error");
  }
});

Router.get("/element", async (req, res) => {
  const { element } = req.body;
  try {
    const data = await Test.find({ array_data: element });
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json("Error");
  }
});

// removing data from array containing particular element
Router.put("/element", async (req, res) => {
  const { element } = req.body;
  try {
    const data = await Test.updateMany(
      {},
      { $pull: { array_data: element } },
      { multi: true }
    );
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json("Error");
  }
});

module.exports = Router;
