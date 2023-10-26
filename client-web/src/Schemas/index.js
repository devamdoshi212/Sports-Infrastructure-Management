import * as Yup from "yup";

export const userSchemas = Yup.object().shape({
  name: Yup.string().required("Please Enter Name"),
  email: Yup.string().email().required("Please Enter Valid Email"),
  mobileNumber: Yup.number().required("Please Enter Mobile Number"),
  district: Yup.string().required("Select at least one District"),
  dob: Yup.string().required("Select at Date of Birth"),
});
