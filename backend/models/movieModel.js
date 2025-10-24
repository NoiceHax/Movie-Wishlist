import mongoose from "mongoose";

const movieSchema = new mongoose.Schema({
  title: { type: String, required: true },
  year: String,
  poster: String,
  watched: { type: Boolean, default: false },
});

export default mongoose.model("Movie", movieSchema);
