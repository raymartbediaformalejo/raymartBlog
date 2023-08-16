const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);

const topicSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Topic", topicSchema);
