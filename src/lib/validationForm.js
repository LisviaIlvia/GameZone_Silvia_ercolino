import z from "zod";

// Regex per password sicura
const passwordRegex = /(?=.*[A-Z])(?=.*[a-z])(?=.*\d).*$/;
const passwordError =
  "Password must contain at least one uppercase letter, one lowercase letter, and one number.";

// Schema del form di registrazione
export const FormSchema = z.object({
  email: z.string().email("Email non valida"),
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  username: z.string().min(3, "Username must be at least 3 characters"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(passwordRegex, passwordError),
});

// Usa direttamente FormSchema come schema principale
export const ConfirmSchema = FormSchema;

export const FormSchemaLogin = z.object({
  email: z.string().email("Email non valida"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(passwordRegex, passwordError),
});

export const ConfirmSchemaLogin = FormSchemaLogin;

// Per validazione onBlur di singoli campi
export function getFieldError(schema, property, value) {
  const fieldSchema = schema.shape[property];
  if (!fieldSchema) return;
  const result = fieldSchema.safeParse(value);
  return result.error
    ? result.error.issues.map((issue) => issue.message).join(", ")
    : undefined;
}

export const getLoginFieldError = (property, value) =>
  getFieldError(FormSchemaLogin, property, value);

export const getRegisterFieldError = (property, value) =>
  getFieldError(FormSchema, property, value);


// Per estrarre tutti gli errori da Zod in un oggetto `{ field: message }`
export const getErrors = (error) =>
  error.issues.reduce((all, issue) => {
    const path = issue.path.join(""); // es. ["email"] => "email"
    const message = all[path] ? all[path] + ", " : "";
    all[path] = message + issue.message;
    return all;
  }, {});
