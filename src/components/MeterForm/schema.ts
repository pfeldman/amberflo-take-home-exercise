import * as Yup from "yup";

export const metersSchema = Yup.object({
  display_name: Yup.string()
    .required("This field is required"),
  api_name: Yup.string()
    .required("This field is required"),
});
