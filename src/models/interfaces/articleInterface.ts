import { Document } from 'mongoose';


export interface IArticle extends Document {
    id: number;
    title: string;
    content: string;
    publisher: string;
    category: string;
    publishedAt: Date;
}