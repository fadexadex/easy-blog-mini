import { Request, Response } from "express";
import Article from "../models/article";
import { AppError } from "../middlewares/errorHandlers";
import { NextFunction } from "express-serve-static-core";

export class ArticleController {
  listArticles = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { query } = req;

      if (Object.keys(query).length !== 0) {
        const articles = await Article.find({
          category: query.category,
        }).sort({ publishedAt: -1 });

        if (!articles || articles.length === 0) {
          return next(
            new AppError("No articles with specified category found", 404)
          );
        }
        return res.status(200).json(articles);
      }

      const articles = await Article.find().sort({ publishedAt: -1 });

      if (!articles) {
        return next(new AppError("No articles found", 404));
      }

      return res.status(200).json(articles);
    } catch (err) {
      return next(new AppError(err.message, err.statusCode));
    }
  };

  getAnArticle = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const article = await Article.findById(req.params.id);

      if (!article) {
        return next(new AppError("Article not found", 404));
      }
      return res.status(200).json(article);
    } catch (err) {
      return next(new AppError(err.message, err.statusCode));
    }
  };

  createArticle = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const article = await Article.create(req.body);

      if (!article) {
        return next(
          new AppError("There was an error creating the Article", 400)
        );
      }
      return res.status(201).json(article);
    } catch (err) {
      return next(new AppError(err.message, err.statusCode));
    }
  };

  deleteArticle = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const article = await Article.findByIdAndDelete(req.params.id);

      if (!article) {
        return next(new AppError("Article not found", 404));
      }
      return res.status(200).json({ message: "Article deleted successfully" });
    } catch (err) {
      return next(new AppError(err.message, err.statusCode));
    }
  };

  updateArticle = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const article = await Article.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
      });

      if (!article) {
        return next(new AppError("Article not found", 404));
      }
      return res.status(200).json(article);
    } catch (err) {
      return next(new AppError(err.message, err.statusCode));
    }
  };
}
