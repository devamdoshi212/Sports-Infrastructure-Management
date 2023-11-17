import * as Yup from "yup";

export const userSchemas = Yup.object().shape({
  name: Yup.string().required("Please Enter Name"),
  email: Yup.string().email().required("Please Enter Valid Email"),
  mobileNumber: Yup.number()
    .typeError("That doesn't look like a phone number")
    .positive("A phone number can't start with a minus")
    .integer("A phone number can't include a decimal point")
    .min(8)
    .required("Please Enter Mobile Number"),
  district: Yup.string().required("Select at least one District"),
  dob: Yup.string().required("Select at Date of Birth"),
});

export const ManagerSchemas = Yup.object().shape({
  name: Yup.string().required("Please Enter Name"),
  email: Yup.string().email().required("Please Enter Valid Email"),
  mobileNumber: Yup.number()
    .typeError("That doesn't look like a phone number")
    .positive("A phone number can't start with a minus")
    .integer("A phone number can't include a decimal point")
    .min(8)
    .required("Please Enter Mobile Number"),
  dob: Yup.string().required("Select at Date of Birth"),
  Sportscomplex: Yup.string().required("Select Sports Complex"),
});
export const SupervisorSchemas = Yup.object().shape({
  name: Yup.string().required("Please Enter Name"),
  email: Yup.string().email().required("Please Enter Valid Email"),
  mobileNumber: Yup.number()
    .typeError("That doesn't look like a phone number")
    .positive("A phone number can't start with a minus")
    .integer("A phone number can't include a decimal point")
    .min(8)
    .required("Please Enter Mobile Number"),
  dob: Yup.string().required("Select at Date of Birth"),
});

export const LoginSchemas = Yup.object().shape({
  Email: Yup.string().email().required(" Email is Required"),
  Password: Yup.string().required("Password is Required"),
});

export const sportSchema = Yup.object().shape({
  name: Yup.string().required("Facility Name is Required "),
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
export const sportComplexSchema = Yup.object().shape({
  name: Yup.string().required("Sports Complex Name is Required "),
  district: Yup.string().required("District is Required"),
  area: Yup.string().required("Area is Required"),
  latitude: Yup.string().required("Latitude is Required"),
  longitude: Yup.string().required("Longitude is Required"),
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
  taluka: Yup.string().required("Taluka is Required"),
  location: Yup.string().required("Location is Required"),
  operationalSince: Yup.string().required("Opreational Since is Required"),
});

export const facilitySchema = Yup.object().shape({
  Fees: Yup.number()
    .positive("fees not include minus")
    .required("Fees is Required"),
  capacity: Yup.number()
    .positive("Capacity not include minus")
    .required("Capacity is Required"),
  Image: Yup.array()
    .min(1, "Select at least one file")
    .max(10, "Select at least one file")
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
  Facility: Yup.string().required("Facility is Required"),
});
export const eventSchemas = Yup.object().shape({
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
  Title: Yup.string().required("Facility is Required"),
  Description: Yup.string().required("Facility is Required"),
});

export const compalintSchemas = Yup.object().shape({
  type: Yup.string().required("Type is required"),
  description: Yup.string().required("Description is required"),
  Thumbnail: Yup.array()
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
});
export const complaintTypeSchemas = Yup.object().shape({
  type: Yup.string().required("Type is require "),
});
