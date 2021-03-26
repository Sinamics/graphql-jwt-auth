import { FieldError } from 'frontend/graphql/generated/dist';

export const toErrorMap = (errors: FieldError[], field: string) => {
  if (!errors) return false;

  const index = errors.findIndex((i) => i.field.includes(field));
  if (index > -1) {
    return errors[index].message;
  }

  return false;
};
