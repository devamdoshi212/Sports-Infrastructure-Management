import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { Button } from "@material-tailwind/react";
import { useSelector } from "react-redux";
import { eventSchemas } from "../../../Schemas";
const initialValues = {
  Title: "",
  Image: [],
  Description: "",
};
const AddNews = () => {
  //   const { SportComplexId } = useSelector((state) => state.user.user);

  const navigate = useNavigate();

  const handleOneFileChange = (event) => {
    const selectedFiles = Array.from(event.target.files);
    setFieldValue("Image", selectedFiles);
  };

  const [sports, setSports] = useState([]);

  //   useEffect(() => {
  //     var requestOptions = {
  //       method: "GET",
  //       redirect: "follow",
  //     };

  //     fetch(`http://localhost:9999/filtersport/${SportComplexId}`, requestOptions)
  //       .then((response) => response.json())
  //       .then((result) => {
  //         setSports(result.data);
  //       })
  //       .catch((error) => console.log("error", error));
  //   }, []);

  // submit handler

  const submitHandler = (values) => {
    var formdata = new FormData();
    var fileInput = document.getElementById("fileInput");
    formdata.append("title", values.Title);
    formdata.append("description", values.Description);
    formdata.append("image", fileInput.files[0], values.Image[0].name);
    formdata.append("level", 0);
    //   formdata.append("sportComplexId", "");

    var requestOptions = {
      method: "POST",
      body: formdata,
      redirect: "follow",
    };

    fetch("http://localhost:9999/addUpdates", requestOptions)
      .then((response) => response.text())
      .then((result) => {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Event Added Successfully",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate("/admin/allevents");
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
    validationSchema: eventSchemas,
    onSubmit: (values, action) => {
      console.log(values);
      submitHandler(values);
      // action.resetForm();
    },
  });
  return (
    <>
    <div className="bg-gray-200 m-5">
      <div className="flex mx-5">
        <Button
          className="items-end cta-btn font-semibold py-4 mt-5 rounded-br-lg rounded-bl-lg rounded-tr-lg shadow-lg hover:shadow-xl "
          onClick={() => {
            navigate(-1);
          }}
        >
          Back
        </Button>
      </div>
      <div className="flex items-center justify-center m-5">
        <div className="w-full max-w-2xl">
          <h2 className="text-center text-2xl uppercase font-semibold font-serif text-gray-800">
            Add New Events
          </h2>
          <form
            onSubmit={handleSubmit}
            className="bg-white shadow-md rounded-md px-8 pt-6 pb-8 mb-4 mt-5"
          >
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="Title"
              >
                Title
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                name="Title"
                type="text"
                placeholder="Title"
                value={values.Title}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.Title && touched.Title ? (
                <small className="text-ligth text-red-600">
                  {errors.Title}
                </small>
              ) : null}
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="Description"
              >
                Description
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                name="Description"
                type="text"
                placeholder="Description"
                value={values.Description}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.Description && touched.Description ? (
                <small className="text-ligth text-red-600">
                  {errors.Description}
                </small>
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
                multiple
              />
            </div>
            {errors.Image && touched.Image ? (
              <small className="text-ligth text-red-600">{errors.Image}</small>
            ) : null}

            <div className="flex items-center justify-center">
              <button
                className="bg-blue-500 uppercase hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="submit"
                // onClick={console.log("Hello")}
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
      </div>
    </>
  );
};

export default AddNews;
