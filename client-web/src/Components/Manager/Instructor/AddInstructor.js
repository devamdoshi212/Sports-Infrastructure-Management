import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import { SupervisorSchemas } from "../../../Schemas";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { Button } from "@material-tailwind/react";
import { useSelector } from "react-redux";
import { UserActions } from "../../../store/UserData";
const initialValues = {
  name: "",
  email: "",
  mobileNumber: "",
  dob: "",
  sports: [],
};

const SportsInitial = (data) => {
  let Initial = [{}];
  for (let index = 0; index < data.length; index++) {
    const element = data[index];
    let item = {
      SportName: data[index].sport.SportName,
      value: data[index].sport._id,
      experience: "",
      fields: [{ from: "", to: "" }],
    };
    Initial.push(item);
  }
  Initial.shift();
  console.log(Initial);
  return Initial;
};

const AddInstructor = () => {
  const { _id } = useSelector((state) => state.user.user);
  const { SportComplexId } = useSelector((state) => state.user.user);
  const navigate = useNavigate();
  const [sport, setSports] = useState([{}]);
  const [instructor, setinstructor] = useState(false);
  const [formData, setFormData] = useState([{}]);
  const [checkedCheckboxes, setCheckedCheckboxes] = useState([]);
  const [fieldsPerCheckbox, setFieldsPerCheckbox] = useState(
    Array.from({ length: sport.length }, () => 1)
  );

  useEffect(() => {
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch(
      `http://localhost:9999/getSportsComplexwithsport?_id=${SportComplexId}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((res) => {
        console.log(res.data[0].sports);
        setFormData(SportsInitial(res.data[0].sports));
      })
      .then((result) => {
        // console.log(result.data);
        // setFormData(SportsInitial(result.data));
      })
      .catch((error) => console.log("error", error));
  }, []);

  const selectedData = formData
    .filter((data, index) => checkedCheckboxes.includes(index))
    .map((data) => ({
      timeSlot: data.fields,
      sport: data.value,
      experience: data.experience,
    }));

  const handleCheckboxChange = (index) => {
    const newCheckedCheckboxes = [...checkedCheckboxes];
    if (newCheckedCheckboxes.includes(index)) {
      newCheckedCheckboxes.splice(newCheckedCheckboxes.indexOf(index), 1);
    } else {
      newCheckedCheckboxes.push(index);
      // Initialize fields for this checkbox if it's being checked
      if (!formData[index].fields) {
        formData[index].fields = [{ from: "", to: "" }];
      }
    }
    setCheckedCheckboxes(newCheckedCheckboxes);
  };

  const handleExperience = (checkboxIndex, value) => {
    const updatedFormData = [...formData];
    updatedFormData[checkboxIndex].experience = value;
    setFormData(updatedFormData);
  };

  const handleInputChange = (checkboxIndex, fieldIndex, field, value) => {
    const updatedFormData = [...formData];
    updatedFormData[checkboxIndex].fields[fieldIndex][field] = value;
    setFormData(updatedFormData);
  };

  const handleAddField = (checkboxIndex) => {
    const newFieldsPerCheckbox = [...fieldsPerCheckbox];
    newFieldsPerCheckbox[checkboxIndex] += 1;

    const updatedFormData = [...formData];
    if (!updatedFormData[checkboxIndex].fields) {
      updatedFormData[checkboxIndex].fields = [];
    }
    updatedFormData[checkboxIndex].fields.push({ from: "", to: "" });

    setFieldsPerCheckbox(newFieldsPerCheckbox);
    setFormData(updatedFormData);
  };

  const handleRemoveField = (checkboxIndex, fieldIndex) => {
    const updatedFormData = [...formData];
    updatedFormData[checkboxIndex].fields.splice(fieldIndex, 1);

    setFieldsPerCheckbox(
      fieldsPerCheckbox.map((count, index) =>
        index === checkboxIndex ? count - 1 : count
      )
    );
    setFormData(updatedFormData);
  };

  // const handleSubmit2 = (e) => {
  //   e.preventDefault();
  //   console.log(formData);
  // };

  const submitHandler = (values) => {
    values.sports = selectedData;
    // console.log(values);

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      Email: values.email,
      DOB: values.dob,
      ContactNum: values.mobileNumber,
      Role: 2,
      Name: values.name,
      createdBy: _id,
      SportComplexId: SportComplexId,
      sports: values.sports,
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch("http://localhost:9999/signup", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        setinstructor(!instructor);
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Instructor Added Successfully",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate("/manager/allinstructor");
      })
      .catch((error) => console.log("error", error));
  };

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: initialValues,
      validationSchema: SupervisorSchemas,
      onSubmit: (values, action) => {
        // console.log(selectedData);
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
            Add New Instructor
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
                Name
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
                htmlFor="email"
              >
                Email
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                name="email"
                type="text"
                placeholder="Enter Your Email"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.email && touched.email ? (
                <small className="text-ligth text-red-600">
                  {errors.email}
                </small>
              ) : null}
            </div>
            <div className="mb-6">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="mobileNumber"
              >
                Mobile Number
              </label>
              <input
                name="mobileNumber"
                type="number"
                value={values.mobileNumber}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Enter Mobile Number"
                className="shadow appearance-none  rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              ></input>
              {errors.mobileNumber && touched.mobileNumber ? (
                <small className="text-ligth text-red-600">
                  {errors.mobileNumber}
                </small>
              ) : null}
            </div>
            <div className="mb-6">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="dob"
              >
                Date of Birth
              </label>
              <input
                name="dob"
                type="date"
                value={values.dob}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Enter Number"
                className="shadow appearance-none  rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              ></input>
              {errors.dob && touched.dob ? (
                <small className="text-ligth text-red-600">{errors.dob}</small>
              ) : null}
            </div>
            {/* <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="sports"
              >
                Sports
              </label>

              <div className="">
                {sport.map((item) => (
                  <label key={item._id} className="mr-4">
                    <input
                      type="checkbox"
                      name="sports"
                      value={item.SportName}
                      id={item._id}
                      checked={values.sports.includes(item.SportName)}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {item.SportName}
                  </label>
                ))}
              </div>
              {errors.sports && touched.sports ? (
                <small className="text-ligth text-red-600">
                  {errors.sports}
                </small>
              ) : null}
            </div> */}

            <div className="mb-6">
              <div>
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="dob"
                >
                  Facility
                </label>
              </div>
              {formData.map((data, checkboxIndex) => (
                <div key={checkboxIndex}>
                  <label>
                    <input
                      // className="shadow appearance-none  rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                      type="checkbox"
                      checked={checkedCheckboxes.includes(checkboxIndex)}
                      onChange={() => handleCheckboxChange(checkboxIndex)}
                    />
                    {data.SportName}
                  </label>
                  {checkedCheckboxes.includes(checkboxIndex) && (
                    <div>
                      <input
                        type="text"
                        value={data.experience}
                        onChange={(e) =>
                          handleExperience(checkboxIndex, e.target.value)
                        }
                        placeholder="Experience in Sports"
                        className="shadow appearance-none w-full rounded py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                      />
                      {data.fields.map((field, fieldIndex) => (
                        <div key={fieldIndex} className="flex gap-2">
                          <input
                            className="shadow appearance-none rounded py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                            type="text"
                            placeholder="Start Time"
                            value={field.from}
                            onChange={(e) =>
                              handleInputChange(
                                checkboxIndex,
                                fieldIndex,
                                "from",
                                e.target.value
                              )
                            }
                            required
                          />
                          <input
                            type="text"
                            className="shadow appearance-none  rounded py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                            placeholder="End Time"
                            value={field.to}
                            onChange={(e) =>
                              handleInputChange(
                                checkboxIndex,
                                fieldIndex,
                                "to",
                                e.target.value
                              )
                            }
                            required
                          />
                          <button
                            type="button"
                            className="text-blue-500 hover:text-blue-700 rounded-md py-2  h-10"
                            onClick={() =>
                              handleRemoveField(checkboxIndex, fieldIndex)
                            }
                          >
                            Remove Field
                          </button>
                        </div>
                      ))}
                      <button
                        type="button"
                        onClick={() => handleAddField(checkboxIndex)}
                        className="text-blue-500 hover:text-blue-700 rounded-md py-2 px-2 h-10"
                      >
                        Add Field
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="flex items-center justify-center">
              <button
                className="bg-black uppercase hover:bg-gray-900 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
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

export default AddInstructor;
