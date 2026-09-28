import React, { useRef } from "react";
import { Formik, Form, Field, FieldArray, ErrorMessage } from "formik";
import { useDispatch } from "react-redux";
import { addCard } from "../redux/cardSlice";
import { useNavigate, NavLink } from "react-router-dom";
import { HiOutlineUpload } from "react-icons/hi";
import { AiOutlinePlus } from "react-icons/ai";
import { RiDeleteBin6Line } from "react-icons/ri";

function CreateCard() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const groupImageRef = useRef(null);

  const initialValues = {
    groupName: "",
    groupDescription: "",
    groupImage: null,
    terms: [{ term: "", definition: "", image: null }],
  };

  const validate = (values) => {
    const errors = {};
    if (!values.groupName.trim()) {
      errors.groupName = "Group name is required";
    }
    const termsErrors = [];
    values.terms.forEach((t, i) => {
      const termError = {};
      if (!t.term.trim()) termError.term = "Term is required";
      if (!t.definition.trim()) termError.definition = "Definition is required";
      if (Object.keys(termError).length) termsErrors[i] = termError;
    });
    if (termsErrors.length) errors.terms = termsErrors;
    return errors;
  };

  const handleImageUpload = (e, setFieldValue, fieldName) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFieldValue(fieldName, reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (values, { resetForm }) => {
    dispatch(addCard(values));
    resetForm();
    navigate("/my-cards");
  };

  return (
    <div className="min-h-screen bg-[#f0ebe5]">
      {/* Page Title & Tabs */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-4">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">
          Create Flashcard
        </h1>
        <div className="flex gap-6 border-b border-gray-300">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              `pb-2 text-sm font-medium transition-colors ${
                isActive
                  ? "text-red-600 border-b-2 border-red-600"
                  : "text-gray-500 hover:text-gray-700"
              }`
            }
          >
            Create New
          </NavLink>
          <NavLink
            to="/my-cards"
            className={({ isActive }) =>
              `pb-2 text-sm font-medium transition-colors ${
                isActive
                  ? "text-red-600 border-b-2 border-red-600"
                  : "text-gray-500 hover:text-gray-700"
              }`
            }
          >
            My Flashcard
          </NavLink>
        </div>
      </div>

      {/* Form */}
      <Formik
        initialValues={initialValues}
        validate={validate}
        onSubmit={handleSubmit}
      >
        {({ values, setFieldValue }) => (
          <Form className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
            {/* Group Section */}
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <label className="block text-sm font-semibold text-blue-700 mb-2">
                Create Group<span className="text-red-500">*</span>
              </label>
              <div className="flex flex-col sm:flex-row gap-4 mb-4">
                <div className="flex-1">
                  <Field
                    name="groupName"
                    type="text"
                    placeholder="Enter group name"
                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <ErrorMessage
                    name="groupName"
                    component="div"
                    className="text-red-500 text-xs mt-1"
                  />
                </div>
                <div>
                  <input
                    type="file"
                    ref={groupImageRef}
                    accept="image/*"
                    className="hidden"
                    onChange={(e) =>
                      handleImageUpload(e, setFieldValue, "groupImage")
                    }
                  />
                  {values.groupImage ? (
                    <div className="relative w-20 h-20">
                      <img
                        src={values.groupImage}
                        alt="Group"
                        className="w-20 h-20 object-cover rounded-md border border-gray-200"
                      />
                      <button
                        type="button"
                        onClick={() => setFieldValue("groupImage", null)}
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs hover:bg-red-600 cursor-pointer"
                      >
                        ×
                      </button>
                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={() => groupImageRef.current?.click()}
                      className="flex items-center gap-2 border border-gray-300 rounded-md px-4 py-2 text-sm text-blue-600 hover:bg-gray-50 transition-colors cursor-pointer"
                    >
                      <HiOutlineUpload className="text-lg" />
                      Upload Image
                    </button>
                  )}
                </div>
              </div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Add description
              </label>
              <Field
                as="textarea"
                name="groupDescription"
                rows="4"
                placeholder="Describe the roles, responsibility, skills required for the job and help candidate understand the role better."
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Terms Section */}
            <FieldArray name="terms">
              {({ push, remove }) => (
                <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
                  {values.terms.map((termItem, index) => (
                    <div key={index} className="mb-6 last:mb-2">
                      <div className="flex items-start gap-4">
                        {/* Number circle */}
                        <div className="flex-shrink-0 w-8 h-8 bg-red-100 text-red-600 rounded-full flex items-center justify-center text-sm font-semibold mt-1">
                          {index + 1}
                        </div>

                        {/* Term & Definition inputs */}
                        <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm text-gray-500 mb-1">
                              Enter Term<span className="text-red-500">*</span>
                            </label>
                            <Field
                              name={`terms.${index}.term`}
                              type="text"
                              placeholder=""
                              className="w-full border-b border-gray-300 px-1 py-2 text-sm focus:outline-none focus:border-blue-500"
                            />
                            <ErrorMessage
                              name={`terms.${index}.term`}
                              component="div"
                              className="text-red-500 text-xs mt-1"
                            />
                          </div>
                          <div>
                            <label className="block text-sm text-gray-500 mb-1">
                              Enter Defination
                              <span className="text-red-500">*</span>
                            </label>
                            <Field
                              name={`terms.${index}.definition`}
                              type="text"
                              placeholder=""
                              className="w-full border-b border-gray-300 px-1 py-2 text-sm focus:outline-none focus:border-blue-500"
                            />
                            <ErrorMessage
                              name={`terms.${index}.definition`}
                              component="div"
                              className="text-red-500 text-xs mt-1"
                            />
                          </div>
                        </div>

                        {/* Image upload for term */}
                        <div className="flex-shrink-0 flex items-center gap-2">
                          {termItem.image ? (
                            <div className="relative w-16 h-16">
                              <img
                                src={termItem.image}
                                alt={`Term ${index + 1}`}
                                className="w-16 h-16 object-cover rounded-md border border-gray-200"
                              />
                              <button
                                type="button"
                                onClick={() =>
                                  setFieldValue(`terms.${index}.image`, null)
                                }
                                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs hover:bg-red-600 cursor-pointer"
                              >
                                ×
                              </button>
                            </div>
                          ) : (
                            <>
                              <input
                                type="file"
                                id={`term-image-${index}`}
                                accept="image/*"
                                className="hidden"
                                onChange={(e) =>
                                  handleImageUpload(
                                    e,
                                    setFieldValue,
                                    `terms.${index}.image`
                                  )
                                }
                              />
                              <button
                                type="button"
                                onClick={() =>
                                  document
                                    .getElementById(`term-image-${index}`)
                                    ?.click()
                                }
                                className="border border-gray-300 rounded-md px-4 py-2 text-sm text-blue-600 hover:bg-gray-50 transition-colors cursor-pointer"
                              >
                                Select Image
                              </button>
                            </>
                          )}

                          {/* Delete term button (only if more than one term) */}
                          {values.terms.length > 1 && (
                            <button
                              type="button"
                              onClick={() => remove(index)}
                              className="text-gray-400 hover:text-red-500 transition-colors p-1 cursor-pointer"
                            >
                              <RiDeleteBin6Line className="text-lg" />
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}

                  {/* Add more button */}
                  <button
                    type="button"
                    onClick={() =>
                      push({ term: "", definition: "", image: null })
                    }
                    className="flex items-center gap-1 text-blue-600 text-sm font-medium hover:text-blue-800 transition-colors mt-2 cursor-pointer"
                  >
                    <AiOutlinePlus className="text-base" />
                    Add more
                  </button>
                </div>
              )}
            </FieldArray>

            {/* Submit Button */}
            <div className="flex justify-center">
              <button
                type="submit"
                className="bg-red-600 hover:bg-red-700 text-white font-medium px-12 py-2.5 rounded-md transition-colors shadow-sm cursor-pointer"
              >
                Create
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default CreateCard;
