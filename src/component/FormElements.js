import React from "react";
import {
  Formik,
  Form as FormikForm,
  Field,
  ErrorMessage,
  useFormikContext,
} from "formik";

export function Form(props) {
  return (
    <Formik {...props}>
      <FormikForm className="needs-validation" noValidate="">
        {props.children}
      </FormikForm>
    </Formik>
  );
}

// for form input element's
export function CustomField(props) {
  const { name, id, type, label, placeholder, ...rest } = props;
  return (
    <>
      {label && (
        <label
          style={{
            color: "black",
            fontWeight: "800",
            fontSize: "22px",
            alignSelf: "center",
          }}
          htmlFor={name}
        >{`${label} `}</label>
      )}
      <Field
        className="form-control"
        type={type}
        style={{
          border: "2px solid #000",
          padding: "10px",
          width: "80%",
        }}
        name={name}
        id={id}
        placeholder={placeholder || ""}
        {...rest}
      />
      <ErrorMessage
        name={name}
        render={(msg) => <div style={{ color: "red" }}>{msg}</div>}
      />
    </>
  );
}

export function TextArea(props) {
  const { name, id, label, placeholder, ...rest } = props;
  return (
    <>
      {label && (
        <label
          style={{
            color: "black",
            fontWeight: "800",
            fontSize: "22px",
            alignSelf: "center",
          }}
          htmlFor={name}
        >{`${label} `}</label>
      )}
      <br />
      <Field
        rows={15}
        // cols={80}
        style={{
          border: "2px solid #000",
          padding: "10px",
          width: "80%",
        }}
        className="form-control"
        as="textarea"
        name={name}
        id={id}
        placeholder={placeholder || ""}
        {...rest}
      />
      <ErrorMessage
        name={name}
        render={(msg) => <div style={{ color: "red" }}>{msg}</div>}
      />
    </>
  );
}

export function SelectField(props) {
  const { name, id, label, options } = props;
  return (
    <>
      {label && (
        <label
          style={{
            color: "black",
            fontWeight: "800",
            fontSize: "22px",
            alignSelf: "center",
          }}
          htmlFor={name}
        >
          {label}
        </label>
      )}
      <Field as="select" id={id} name={name}>
        <option value="">Choose...</option>
        {options.map((optn, index) => (
          <option value={optn.value} label={optn.label || optn.value} />
        ))}
      </Field>
      <ErrorMessage
        name={name}
        render={(msg) => <div style={{ color: "red" }}>{msg}</div>}
      />
    </>
  );
}

export function SubmitButton(props) {
  const { title, ...rest } = props;
  const { isSubmitting } = useFormikContext();

  return (
    <button type="submit" {...rest} disabled={isSubmitting}>
      {title}
    </button>
  );
}

export function ResetButton(props) {
  const { title, ...rest } = props;

  return (
    <button type="reset" {...rest}>
      {title}
    </button>
  );
}
