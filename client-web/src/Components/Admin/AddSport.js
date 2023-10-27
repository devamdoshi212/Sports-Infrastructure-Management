import React from "react";
import { useFormik } from "formik";
import { sportSchema } from "../../Schemas";

const initialValues = {
  name: "",
  Category: "",
  Image: "",
};
const AddSports = () => {
  const handleOneFileChange = (event) => {
    const selectedFiles = Array.from(event.target.files);
    setFieldValue("Image", selectedFiles);
  };
  const submitHandler = (values) => {
    // console.log(values);
    var fileInput = document.getElementById("fileInput");
    var formdata = new FormData();
    formdata.append("Title", values.title);
    formdata.append("Author_Name", values.author_name);
    formdata.append("About", values.about);
    formdata.append("Category", values.mainCategory);
    formdata.append("Image", fileInput.files[0], values.Image[0].name);

    var requestOptions = {
      method: "POST",
      body: formdata,
      redirect: "follow",
    };

    fetch("http://localhost:9999/blog", requestOptions)
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
      //   submitHandler(values);

      // action.resetForm();
    },
  });
  return (
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
              <option value="">Select any One</option>
              <option value="Heelo">Select any Nothing</option>
              {/* {Category.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))} */}
              {/* <option value="Jamnagar">Jamnagar</option>
              <option value="Surat">Surat</option>
              <option value="Anand">Anand</option> */}
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
  );
};

export default AddSports;
