import {
  useNavigate,
  Form as ReactForm,
  useActionData,
  redirect,
} from "react-router-dom";
import Error from "../components/Error";
import Form from "../components/Form";
import { addClient } from "../data/clients";

export async function action({ request }) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  // Validation
  console.log("data", data);
  const email = formData.get("email");
  const errors = [];
  if (Object.values(data).includes("")) {
    errors.push("All fields are required");
  }
  let regex = new RegExp(
    "([!#-'*+/-9=?A-Z^-~-]+(.[!#-'*+/-9=?A-Z^-~-]+)*|\"([]!#-[^-~ \t]|(\\[\t -~]))+\")@([!#-'*+/-9=?A-Z^-~-]+(.[!#-'*+/-9=?A-Z^-~-]+)*|[[\t -Z^-~]*])"
  );
  if (!regex.test(email)) {
    errors.push("Invalid email");
  }
  console.log(errors);
  if (Object.keys(errors).length) {
    console.log(Object.keys(errors));
    return errors;
  }
  await addClient(data);
  return redirect("/");
}
const NewClient = () => {
  const navigate = useNavigate();
  const errors = useActionData();
  console.log("ewe", errors);
  return (
    <>
      <h1 className="font-black text-4xl text-blue-900">New Client</h1>
      <p className="mt-3">Fill all fields to add new client</p>
      <div className="flex justify-end">
        <button
          className="bg-blue-800 text-white px-3 py-1 font-bold uppercase"
          onClick={() => navigate(-1)}
        >
          Back
        </button>
      </div>
      <div className="bg-white shadow rounded-md md:w-3/4 mx-auto px-5 py-10 mt-10">
        {errors?.length &&
          errors.map((error, index) => <Error key={index}>{error}</Error>)}
        <ReactForm method="post" noValidate>
          <Form />
          <input
            type="submit"
            className="mt-5 w-full bg-blue-800 p-3 uppercase font-bold text-white text-lg"
            value="Save"
          />
        </ReactForm>
      </div>
    </>
  );
};

export default NewClient;
