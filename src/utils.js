import {
  CustomField,
  TextArea,
  SelectField,
} from "./component/FormElements.js";

// used to create form elements (i.e input, textarea)
export function getFormElement(elementName, elementSchema) {
  const props = {
    name: elementSchema.id,
    id: elementSchema.id,
    type: elementSchema.type,
    label: elementSchema.label,
    options: elementSchema.options,
  };

  if (
    elementSchema.type === "date" ||
    elementSchema.type === "url" ||
    elementSchema.type === "text" ||
    elementSchema.type === "email" ||
    elementSchema.type === "month"
  ) {
    return <CustomField {...props} />;
  }

  if (elementSchema.type === "textarea") {
    return <TextArea {...props} />;
  }

  if (elementSchema.type === "select") {
    return <SelectField {...props} />;
  }
}
