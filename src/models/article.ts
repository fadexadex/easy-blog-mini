import { Schema, model } from "mongoose";
import { IArticle } from "./interfaces/articleInterface";

const ArticleSchema = new Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  publisher: { type: String, required: true },
  category: { type: String, required: true },
  publishedAt: { type: Date, default: Date.now },
});

type ArticleType = IArticle;

const Article = model<ArticleType>("Article", ArticleSchema);


export default Article;