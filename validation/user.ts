import { ObjectSchema, object, string } from "yup";

export const userSchema: ObjectSchema<UserSchemaType> = object({
  name: string().min(4).required(),
  email: string().email("Enter a valid email!").required(),
  password: string().min(4).max(10).required(),
});

export type UserSchemaType = {
  name: string;
  email: string;
  password: string;
};
