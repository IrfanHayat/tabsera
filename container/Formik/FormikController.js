import Input from "./Input";
import Select from "./Select";
import RadioButtons from "./RadioButtons";
import CheckBoxes from "./CheckBoxes";
function FormikController(props) {
  const { control, ...rest } = props;
  switch (control) {
    case "input":
      return <Input {...rest} />;
    case "textArea":
      return <TextArea {...rest} />;
    case "select":
      return <Select {...rest} />;
    case "radio":
      return <RadioButtons {...rest} />;
    case "checkbox":
      return <CheckBoxes {...rest} />;
    default:
      return null;
  }
}
export default FormikController;
