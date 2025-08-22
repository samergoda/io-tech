// Form validation schema
import * as Yup from "yup";

const validationSchema = Yup.object({
  email: Yup.string().email("Invalid email address").required("Email is required"),
});

export default validationSchema;
