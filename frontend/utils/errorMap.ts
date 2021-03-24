import { FieldError } from 'frontend/graphql/generated/dist';

export const toErrorMap = (errors: FieldError[]) => {
  const errorMap: string[] = [];

  errors.forEach(({ field, message }) => {
    errorMap.push(`Field ${field} : ${message}`);
  });

  return errorMap;
};
