import React from "react";
import { useFormik } from "formik";
import { useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { Button } from "@material-tailwind/react";
import Swal from "sweetalert2";
import { sportComplexSchema } from "../../../Schemas";
const initialValues = {
  name: "",
  location: "",
  area: "",
  latitude: "",
  longitude: "",
  taluka: "",
  district: "",
  operationalSince: "",
};
const AddSportsComplex = () => {
  const District = useSelector((state) => state.district.districts);
  const navigate = useNavigate();
  const submitHandler = (values) => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      name: values.name,
      location: values.location,
      taluka: values.taluka,
      area: values.area,
      latitude: values.latitude,
      longitude: values.longitude,
      operationalSince: values.operationalSince,
      district: values.district,
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch("http://localhost:9999/addSportsComplex", requestOptions)
      .then((response) => response.text())
      .then((result) => {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Sport Complex Added Successfully",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate("/admin/allsportscomplex");
      })
      .catch((error) => console.log("error", error));
  };

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: initialValues,
      validationSchema: sportComplexSchema,
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
            Add New Sports Complex
          </h2>
          <form
            onSubmit={handleSubmit}
            className="bg-white shadow-md rounded-md px-8 pt-6 pb-8 mb-4 mt-5"
          >
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="name"
              >
                Sports Complex Name
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                name="name"
                type="text"
                placeholder="Name"
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
                htmlFor="name"
              >
                Taluka
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                name="taluka"
                type="text"
                placeholder="Taluka"
                value={values.taluka}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.taluka && touched.taluka ? (
                <small className="text-ligth text-red-600">
                  {errors.taluka}
                </small>
              ) : null}
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="location"
              >
                Location
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                name="location"
                type="text"
                placeholder="Location"
                value={values.location}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.location && touched.location ? (
                <small className="text-ligth text-red-600">
                  {errors.location}
                </small>
              ) : null}
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="area"
              >
                Area
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                name="area"
                type="text"
                placeholder="Area"
                value={values.area}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.area && touched.area ? (
                <small className="text-ligth text-red-600">{errors.area}</small>
              ) : null}
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="latitude"
              >
                Latitude
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                name="latitude"
                type="text"
                placeholder="Latitude"
                value={values.latitude}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.latitude && touched.latitude ? (
                <small className="text-ligth text-red-600">
                  {errors.latitude}
                </small>
              ) : null}
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="longitude"
              >
                Longitude
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                name="longitude"
                type="text"
                placeholder="Longitude"
                value={values.longitude}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.longitude && touched.longitude ? (
                <small className="text-ligth text-red-600">
                  {errors.longitude}
                </small>
              ) : null}
            </div>

            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="distric"
              >
                District
              </label>
              <select
                name="district"
                id="district"
                value={values.district}
                className=" border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                onChange={handleChange}
                onBlur={handleBlur}
              >
                <option value="">Select any One</option>
                {District.map((item, index) => (
                  <option key={index} value={item._id}>
                    {item.District}
                  </option>
                ))}
                {/* <option value="Jamnagar">Jamnagar</option>
              <option value="Surat">Surat</option>
              <option value="Anand">Anand</option> */}
              </select>
              {errors.district && touched.district ? (
                <small className="text-ligth text-red-600">
                  {errors.district}
                </small>
              ) : null}
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="operationalSince"
              >
                Operational Since
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                name="operationalSince"
                type="text"
                placeholder="Operational Since"
                value={values.operationalSince}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.operationalSince && touched.operationalSince ? (
                <small className="text-ligth text-red-600">
                  {errors.operationalSince}
                </small>
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

export default AddSportsComplex;
