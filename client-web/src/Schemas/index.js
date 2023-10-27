import * as Yup from "yup";

export const userSchemas = Yup.object().shape({
  name: Yup.string().required("Please Enter Name"),
  email: Yup.string().email().required("Please Enter Valid Email"),
  mobileNumber: Yup.number().required("Please Enter Mobile Number"),
  district: Yup.string().required("Select at least one District"),
  dob: Yup.string().required("Select at Date of Birth"),
});

export const LoginSchemas = Yup.object().shape({
  Email: Yup.string().email().required("Enter Email"),
  Password: Yup.string().required("Enter Password"),
});

export const sportSchema = Yup.object().shape({
  name: Yup.string().required("Facility Name is Require "),
  Image: Yup.array()
    .min(1, "Select at least one file")
    .max(1, "Select at least one file")
    .of(
      Yup.mixed()
        .test("fileFormat", "Only image files are allowed", (value) => {
          if (!value) return true; // If no file is selected, skip validation

          const acceptedFormats = ["image/jpeg", "image/png", "image/gif"];
          return acceptedFormats.includes(value.type);
        })
        .test("fileSize", "File size is too large", (value) => {
          if (!value) return true; // If no file is selected, skip validation

          const maxSizeInBytes = 10 * 1024 * 1024; // 50MB
          return value.size <= maxSizeInBytes;
        })
    ),
  Category: Yup.string().required("Category is Require"),
});
