import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import { facilitySchema } from "../../../Schemas";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { Button } from "@material-tailwind/react";
import { useSelector } from "react-redux";
const initialValues = {
  Fees: "",
  Facility: "",
  Image: [],
};
const EditSportsComplexDetails = () => {
  const { SportComplexId } = useSelector((state) => state.user.user);
  // console.log(SportComplexId);

  const navigate = useNavigate();

  const handleOneFileChange = (event) => {
    const selectedFiles = Array.from(event.target.files);
    setFieldValue("Image", selectedFiles);
  };

  const [sports, setSports] = useState([]);

  useEffect(() => {
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch(`http://localhost:9999/filtersport/${SportComplexId}`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        setSports(result.data);
      })
      .catch((error) => console.log("error", error));
  }, []);

  // submit handler

  const submitHandler = (values) => {
    var formdata = new FormData();
    var fileInput = document.getElementById("fileInput");

    for (var i = 0; i < fileInput.files.length; i++) {
      var file = fileInput.files[i];
      formdata.append("images", file, values.Image[i].name);
    }
    formdata.append("fees", values.Fees);
    formdata.append("sport", values.Facility);

    var requestOptions = {
      method: "PATCH",
      body: formdata,
      redirect: "follow",
    };

    fetch(
      `http://localhost:9999/updateSportsComplex/${SportComplexId}`,
      requestOptions
    )
      .then((response) => response.json())
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
    validationSchema: facilitySchema,
    onSubmit: (values, action) => {
      console.log(values);
      submitHandler(values);
      // action.resetForm();
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
            Add New Facility
          </h2>
          <form
            onSubmit={handleSubmit}
            className="bg-white shadow-md rounded-md px-8 pt-6 pb-8 mb-4 mt-5"
          >
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="Facility"
              >
                Facility
              </label>
              <select
                name="Facility"
                id="Facility"
                value={values.Facility}
                className=" border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                onChange={handleChange}
                onBlur={handleBlur}
              >
                <option value="">Select any One</option>
                {sports.map((item, index) => (
                  <option key={index} value={item._id}>
                    {item.SportName}
                  </option>
                ))}
              </select>
              {errors.Facility && touched.Facility ? (
                <small className="text-ligth text-red-600">
                  {errors.Facility}
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

            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="Fees"
              >
                Fees
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                name="Fees"
                type="number"
                placeholder="Fees"
                value={values.Fees}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.Fees && touched.Fees ? (
                <small className="text-ligth text-red-600">{errors.Fees}</small>
              ) : null}
            </div>

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
    </>
  );
};

export default EditSportsComplexDetails;
