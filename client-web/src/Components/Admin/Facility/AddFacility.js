import React from "react";
import { useFormik } from "formik";
import { sportSchema } from "../../../Schemas";
import { Button } from "@material-tailwind/react";
import { Navigate, useNavigate } from "react-router-dom";
const initialValues = {
  name: "",
  Category: "",
  Image: "",
};
const AddFacility = () => {
  const navigate = useNavigate();
  const handleOneFileChange = (event) => {
    const selectedFiles = Array.from(event.target.files);
    setFieldValue("Image", selectedFiles);
  };
  const submitHandler = (values) => {
    var formdata = new FormData();
    var fileInput = document.getElementById("fileInput");
    formdata.append("SportName", values.name);
    formdata.append("Category", values.Category);
    formdata.append("picture", fileInput.files[0], values.Image[0].name);

    var requestOptions = {
      method: "POST",
      body: formdata,
      redirect: "follow",
    };

    fetch("http://localhost:9999/sport", requestOptions)
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.log("error", error));
  };

  const {
    values,
    errors,
    touched,
    handleBlur,
    handleChange,
    handleSubmit,
    setFieldValue,
  } = useFormik({
    initialValues: initialValues,
    validationSchema: sportSchema,
    onSubmit: (values, action) => {
      console.log(values);
      submitHandler(values);

      action.resetForm();
    },
  });
  return (
    <>
      <div className="flex bg-gray-200 mx-5">
        <Button
          className="items-end cta-btn font-semibold py-4 mt-5 rounded-br-lg rounded-bl-lg rounded-tr-lg shadow-lg hover:shadow-xl "
          onClick={() => {
            navigate(-1);
          }}
        >
          Back
        </Button>
      </div>
      <div className="flex items-center justify-center bg-gray-200 min-h-screen">
        <div className="w-full max-w-2xl">
          <h2 className="text-center text-2xl uppercase font-semibold font-serif text-gray-800">
            Add Sports Facility
          </h2>
          <form
            onSubmit={handleSubmit}
            className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 mt-8"
          >
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="name"
              >
                Facility Name
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                name="name"
                type="text"
                placeholder="Sports Name"
                value={values.name}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.name && touched.name ? (
                <small className="text-ligth text-red-600">{errors.name}</small>
              ) : null}
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="Image"
              >
                Image
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                name="Image"
                type="file"
                id="fileInput"
                accept="image/*"
                onChange={handleOneFileChange}
                onBlur={handleBlur}
              />
            </div>
            {errors.Image && touched.Image ? (
              <small className="text-ligth text-red-600">{errors.Image}</small>
            ) : null}
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="Category"
              >
                Category
              </label>
              <select
                name="Category"
                id="Category"
                value={values.Category}
                className=" border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                onChange={handleChange}
                onBlur={handleBlur}
              >
                <option>Select any One</option>
                <option value="Indoor">Indoor</option>
                <option value="Outdoor">Outdoor</option>
              </select>
              {errors.Category && touched.Category ? (
                <small className="text-ligth text-red-600">
                  {errors.Category}
                </small>
              ) : null}
            </div>
            <div className="flex items-center justify-center">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="submit"
                // onClick={console.log("Hello")}
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddFacility;
