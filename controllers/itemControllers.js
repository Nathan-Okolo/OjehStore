const Item = require("../models/Item");

module.exports.get_items = async (req, res) => {
  try {
    const item = await Item.find().sort({ date: -1 });
    res.send(item);
  } catch (e) {
    res.status(500).send(`${e}`);
  }
};

module.exports.post_items = async (req, res) => {
  const item = new Item(req.body);
  try {
    await item.save();
    res.send(`new item created ${item}`);
    console.log("new item created");
  } catch (e) {
    res.status(400).send(`${e}`);
  }
};

module.exports.update_item = async (req, res) => {
  const updates = Object.keys(req.body);
  try {
    const item = await Item.findById(req.params.id);
    updates.forEach((update) => (item[update] = req.body[update]));
    await item.save();
    if (!item) {
      res.status(404).send(`Item not found`);
    }
    res.send(item);
  } catch (e) {
    res.status(500).send(`${e}`);
  }
};

module.exports.delete_item = async (req, res) => {
  try {
    const _id = req.params.id;
    const item = await Item.findByIdAndDelete(_id);
    if (!item) {
      res.status(400).send("Item not found");
    }
    res.send(`item deleted `);
  } catch (e) {
    res.status(500).send(`this error: ${e}`);
  }
};
