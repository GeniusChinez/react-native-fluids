import { z } from 'zod';

export type CustomFormFields<SchemaType = any> = {
  [T in keyof SchemaType]: string;
};

export type CustomFieldErrors<SchemaType = any> = {
  [T in keyof SchemaType]: string[] | undefined;
};

export interface BaseActionData {
  formError?: string;
  fields?: {
    [index: string]: string;
  };
  fieldErrors?: {
    [index: string]: string[] | undefined;
  };
}

const ResponseRecordedSchema = z.object({
  responseRecorded: z.boolean(),
});
export function hasResponseRecorded(
  data: unknown
): data is z.infer<typeof ResponseRecordedSchema> {
  return ResponseRecordedSchema.safeParse(data).success;
}

const FormErrorSchema = z.object({
  formError: z.string().min(1),
});
export function hasFormError(
  data: unknown
): data is z.infer<typeof FormErrorSchema> {
  return FormErrorSchema.safeParse(data).success;
}

const FieldErrorsSchema = z.object({
  fieldErrors: z.record(z.string().array().optional()),
});
export function hasFieldErrors(
  data: unknown
): data is z.infer<typeof FieldErrorsSchema> {
  return FieldErrorsSchema.safeParse(data).success;
}

const FieldsSchema = z.object({
  fields: z.record(z.string()),
});

export function hasFields(data: unknown): data is z.infer<typeof FieldsSchema> {
  return FieldsSchema.safeParse(data).success;
}

export function convertFieldErrorsToArray(
  fieldErrors: BaseActionData['fieldErrors']
) {
  if (!fieldErrors) {
    return undefined;
  }
  return Object.keys(fieldErrors)
    .map((key) => {
      const errors = fieldErrors[key];
      if (!errors) {
        return undefined;
      }
      return `${key}: ${errors.join(', ')}`;
    })
    .filter(Boolean);
}
