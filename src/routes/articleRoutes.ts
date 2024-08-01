import express from "express";
import { ArticleController } from "../controllers/article";
const Article = new ArticleController()

const router = express.Router();

router.get("/", (req, res) => {
  res.send("Hello from article");
});


//Return list of articles

router.get("/list/", Article.listArticles);


//Return a single article
router.get("/article/:id", Article.getAnArticle);



//Delete an article
router.delete("/delete/:id", Article.deleteArticle);


//Create an article
router.post("/create", Article.createArticle)

export default router;