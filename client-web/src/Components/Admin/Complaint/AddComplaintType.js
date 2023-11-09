import React from "react";
import { useFormik } from "formik";
import { complaintTypeSchemas } from "../../../Schemas";

const initialValues = {
  type: "",
};
const AddComplaintType = () => {
  const submitHandler = (values) => {
    console.log(values);
  };

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: initialValues,
      validationSchema: complaintTypeSchemas,
      onSubmit: (values, action) => {
        console.log(values);
        submitHandler(values);
      },
    });
  return (
    <div className="flex items-center justify-center bg-cyan-50 min-h-screen">
      <div className="w-full max-w-2xl">
        <h2 className="text-center text-2xl uppercase font-semibold font-serif text-gray-800">
          Add New Complaint Type
        </h2>
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 mt-8"
        >
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="Type"
            >
              Add New Type
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              name="type"
              type="text"
              placeholder="type"
              value={values.type}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.type && touched.type ? (
              <small className="text-ligth text-red-600">{errors.type}</small>
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
  );
};

export default AddComplaintType;
