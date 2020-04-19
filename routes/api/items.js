const router = require("express").Router();
const authorize = require("../../verifyToken");
//model
const Item = require("../../model/Item");

//GET => /api/items/
router.get("/", (req, res) => {
  Item.find() //returns array
    .sort({ date: -1 })
    .then((items) => {
      console.log("Items", items);
      res.json(items);
    });
});

//POST =>/api/items/add
router.post("/add", authorize, (req, res) => {
  const { name } = req.body;
  //Only saved in memory
  const newItem = new Item({
    name,
  });
  newItem
    .save()
    .then((item) => res.json(item))
    .catch((err) => console.log(err));
});

//DELETE =>/api/items/remove/:id
router.delete("/remove/:id", authorize, (req, res) => {
  Item.findById(req.params.id)
    .then((item) => {
      item.remove().then(() => res.json("Succesfully Removed"));
    })
    .catch((err) =>
      res.status(404).json("Unable to find user or Unabe to remove")
    );
});
module.exports = router;
