// models/User.ts
import { ObjectId } from 'mongodb';

export interface User {
  _id?: ObjectId;
  email: string;
  password: string; // In a real application, store a hashed password
}

export const UserSchema = {
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
};
