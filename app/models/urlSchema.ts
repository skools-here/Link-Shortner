import mongoose, { Document, Model, Schema } from "mongoose";

// Define the interface for a single URL document
interface UrlDocument extends Document {
  urlId: string;
  origUrl: string;
  shortUrl: string;
  clicks: number;
  date: Date;
}

// Define the model type
type UrlModel = Model<UrlDocument>;

// Define the schema
const urlSchema = new Schema<UrlDocument>({
  urlId: { type: String, required: true },
  origUrl: { type: String, required: true },
  shortUrl: { type: String, required: true },
  clicks: { type: Number, required: true, default: 0 },
  date: { type: Date, default: Date.now },
});

// Use a safe model redefinition check
const Url = mongoose.models.Url as UrlModel || mongoose.model<UrlDocument>("Url", urlSchema);

export default Url;
