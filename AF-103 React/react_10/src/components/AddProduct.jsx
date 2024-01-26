import React, { useEffect, useState } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { Select, Input, Button, Checkbox, notification } from "antd";

const { Option } = Select;

const AddProductForm = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          "https://northwind.vercel.app/api/categories"
        );
        setCategories(response.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategories();
  }, []);

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    unitPrice: Yup.number()
      .min(0, "Unit Price must be greater than zero")
      .required("Unit Price is required"),
    unitsInStock: Yup.number()
      .min(0, "Units in Stock must be greater than zero")
      .required("Units in Stock is required"),
    quantityPerUnit: Yup.string().required("Quantity per Unit is required"),
    categoryId: Yup.string().required("Category is required"),
  });

  const handleSubmit = async (values, { resetForm, setSubmitting }) => {
    try {
      const data = {
        ...values,
        discontinued: values.isDiscounted,
      };

      const response = await axios.post(
        "https://6565fafaeb8bb4b70ef2b8f9.mockapi.io/products",
        data
      );
      console.log(response.data);

      notification.success({
        message: "Product Added",
        description: "Product has been successfully added.",
      });

      resetForm();
    } catch (error) {
      console.error("Error adding product:", error);
      notification.error({
        message: "Error",
        description: "There was an error while adding the product.",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
        
      <Formik
        initialValues={{
          name: "",
          unitPrice: null,
          unitsInStock: null,
          isDiscounted: false,
          quantityPerUnit: "",
          categoryId: "",
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, touched, values, isSubmitting }) => (
          <Form
            style={{
              width: "600px",
              padding: "20px",
              borderRadius: "10px",
              backgroundColor: "#E6E6FA",
            }}
          >
            <h3 style={{textAlign:'center'}}>Product Add Form</h3>
           <div style={{marginLeft:'44%',marginBottom:'10px'}}> <a target="_blank" href="https://6565fafaeb8bb4b70ef2b8f9.mockapi.io/products">Products API</a></div>
            <Field name="categoryId">
              {({ field, form }) => (
                <Select
                  style={{ width: "200px", marginLeft: "35%" }}
                  {...field}
                  placeholder="Select a category"
                  onChange={(value) => {
                    form.setFieldValue("categoryId", value);
                  }}
                >
                  <Option value="">Select a category</Option>
                  {categories.map((category) => (
                    <Option key={category.id} value={category.id}>
                      {category.name}
                    </Option>
                  ))}
                </Select>
              )}
            </Field>
            {errors.categoryId && touched.categoryId && (
              <div style={{ color: "red", margin:'5px 0 5px 35%'}}>{errors.categoryId}</div>
            )}

            <div style={{ display: "flex", gap: "20px" }}>
              <div style={{ flex: 1 }}>
                <Field name="name">
                  {({ field, form }) => (
                    <>
                      <Input
                      style={{margin:'10px 0'}}
                       {...field} placeholder="Name" />
                      {errors.name && touched.name && (
                        <div style={{ color: "red", margin: "5px 0" }}>
                          {errors.name}
                        </div>
                      )}
                    </>
                  )}
                </Field>
              </div>
              <div style={{ flex: 1 }}>
                <Field name="unitPrice">
                  {({ field, form }) => (
                    <>
                      <Input
                      style={{margin:'10px 0'}}
                        {...field}
                        type="number"
                        placeholder="Unit Price"
                      />
                      {errors.unitPrice && touched.unitPrice && (
                        <div style={{ color: "red", margin: "5px 0" }}>
                          {errors.unitPrice}
                        </div>
                      )}
                    </>
                  )}
                </Field>
              </div>
            </div>
            <div style={{ display: "flex", gap: "20px" }}>
              <div style={{ flex: 1 }}>
                <Field name="unitsInStock">
                  {({ field, form }) => (
                    <>
                      <Input
                      style={{margin:'10px 0'}}
                        {...field}
                        type="number"
                        placeholder="Units in Stock"
                      />
                      {errors.unitsInStock && touched.unitsInStock && (
                        <div style={{ color: "red", margin: "5px 0" }}>
                          {errors.unitsInStock}
                        </div>
                      )}
                    </>
                  )}
                </Field>
              </div>
              <div style={{ flex: 1 }}>
                <Field name="isDiscounted">
                  {({ field, form }) => (
                    <Checkbox style={{margin:'10px 0'}} {...field}>Is Discounted</Checkbox>
                  )}
                </Field>
              </div>
            </div>
            <Field name="quantityPerUnit">
              {({ field, form }) => (
                <>
                  <Input style={{ width: "200px", marginLeft: "35%" }} {...field} placeholder="Quantity per Unit" />
                  {errors.quantityPerUnit && touched.quantityPerUnit && (
                    <div  style={{ color: "red", margin:'5px 0 5px 35%'}}>
                      {errors.quantityPerUnit}
                    </div>
                  )}
                </>
              )}
            </Field>

            <Button style={{margin:"10px 35%"}}  type="primary" htmlType="submit" disabled={isSubmitting}>
              {isSubmitting ? "Adding..." : "Add Product to API"}
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AddProductForm;
