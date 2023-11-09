import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import { complaintTypeSchemas } from "../../../Schemas";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { Button } from "@material-tailwind/react";
import { useSelector } from "react-redux";
import { FetchComplaintType } from "../../../API/FetchComplaintType";
const initialValues = {
  type: "",
};
const AddComplaintType = () => {
  const navigate = useNavigate();
  const ComplaintType = useSelector(
    (state) => state.complaintType.complaintType
  );
  const [TableData, setTableData] = useState([]);
  const [refresh, setrefresh] = useState(false);

  useEffect(() => {
    setTableData(ComplaintType);
  }, [TableData]);
  const submitHandler = (values) => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      Type: values.type,
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch("http://localhost:9999/addComplaintType", requestOptions)
      .then((response) => response.text())
      .then((result) => {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Complaint Type Added Successfully",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate("/admin/addcomplianttype");
      })
      .catch((error) => console.log("error", error));
  };

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: initialValues,
      validationSchema: complaintTypeSchemas,
      onSubmit: (values, action) => {
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
      <div className="flex items-center justify-center bg-cyan-50 min-h-screen">
        <div className="w-full max-w-2xl">
          <table className="min-w-full table-auto">
            <thead>
              <tr className="bg-gray-200">
                <th className="border border-gray-400 px-4 py-2">Index</th>
                <th className="border border-gray-400 px-4 py-2">Type</th>
                {/* <th className="border border-gray-400 px-4 py-2">Age</th> */}
              </tr>
            </thead>
            <tbody>
              {TableData.map((item, index) => (
                <tr key={index}>
                  <td className="border border-gray-400 px-4 py-2">
                    {index + 1}
                  </td>
                  <td className="border border-gray-400 px-4 py-2">
                    {item.Type}
                  </td>
                  {/* <td className="border border-gray-400 px-4 py-2">{item.age}</td> */}
                </tr>
              ))}
            </tbody>
          </table>
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
    </>
  );
};

export default AddComplaintType;
