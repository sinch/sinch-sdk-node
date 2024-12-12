import FormData = require('form-data');

export const appendFilteredPropertiesToFormData = (
  obj: Record<string, any>,
  prefix: string,
  formData: FormData,
) => {
  for (const [key, value] of Object.entries(obj)) {
    if (key.startsWith(prefix) && value != null) {
      if (value instanceof Date) {
        formData.append(key, value.toISOString());
      } else {
        formData.append(key, String(value));
      }
    }
  }
};
