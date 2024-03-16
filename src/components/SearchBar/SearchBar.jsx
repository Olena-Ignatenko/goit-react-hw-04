import { Field, Form, Formik } from "formik";

const SearchBar = ({ onSubmit }) => {
  return (
    <Formik
      initialValues={{ query: "" }}
      onSubmit={(values) => {
        onSubmit(values.query);
      }}
    >
      <Form>
        <Field placeholder="Search" type="text" name="query" />
        <button type="submit">Search</button>
      </Form>
    </Formik>
  );
};

export default SearchBar;
