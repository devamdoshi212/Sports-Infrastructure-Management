import React from "react";
import { useFormik } from "formik";
import { compalintSchemas } from "../../../Schemas";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
const initialValues = {
  type: "",
  description: "",
  Thumbnail: [],
};
const AddComplaint = () => {
  const navigate = useNavigate();
  const ComplaintType = useSelector((s) => s.complaintType.complaintType);
  const { _id } = useSelector((s) => s.user.user);
  const handleOneFileChange = (event) => {
    const selectedFiles = Array.from(event.target.files);
    setFieldValue("Thumbnail", selectedFiles);
  };
  const submitHandler = (values) => {
    var fileInput = document.getElementById("fileInput");
    var formdata = new FormData();
    formdata.append("type", values.type);
    formdata.append("Description", values.description);
    formdata.append("userId", _id);
    // formdata.append("sportsComplex", "654a07e68d14ca1d77041c04");
    formdata.append("level", "3");
    formdata.append("status", "0");
    formdata.append("picture", fileInput.files[0], values.Thumbnail[0].name);

    var requestOptions = {
      method: "POST",
      body: formdata,
      redirect: "follow",
    };

    fetch("http://localhost:9999/addComplaint", requestOptions)
      .then((response) => response.text())
      .then((result) => {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Complaint Added Successfully",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate("/authority/allcomplaint");
      })
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
    validationSchema: compalintSchemas,
    onSubmit: (values, action) => {
      console.log(values);
      submitHandler(values);

      // action.resetForm();
    },
  });
  return (
    <div className="flex items-center justify-center bg-[#f8f9fa] h-screen scrollbar m-5">
      <div className="w-full max-w-2xl">
        <h2 className="text-center text-2xl uppercase font-semibold font-serif text-gray-800">
          Add New Complaint
        </h2>
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 mt-8 shadow-gray-700"
        >
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="type"
            >
              Complaint Type
            </label>
            <select
              name="type"
              id="type"
              value={values.type}
              className=" border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              onChange={handleChange}
              onBlur={handleBlur}
            >
              <option value="">Select any One</option>
              {ComplaintType.map((item, index) => (
                <option key={index} value={item._id}>
                  {item.Type}
                </option>
              ))}
            </select>
            {errors.type && touched.type ? (
              <small className="text-ligth text-red-600">{errors.type}</small>
            ) : null}
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="description"
            >
              Description
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              name="description"
              type="text"
              placeholder="Description"
              value={values.description}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.description && touched.description ? (
              <small className="text-ligth text-red-600">
                {errors.description}
              </small>
            ) : null}
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="Thumbnail"
            >
              Image
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              name="Thumbnail"
              type="file"
              id="fileInput"
              accept="image/*"
              onChange={handleOneFileChange}
              onBlur={handleBlur}
            />
          </div>
          {errors.Thumbnail && touched.Thumbnail ? (
            <small className="text-ligth text-red-600">
              {errors.Thumbnail}
            </small>
          ) : null}
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

export default AddComplaint;
