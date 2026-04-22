import { useState } from "react";
import { db } from "../db";
import { collection, addDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

const AddContact = () => {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });

  const navigate = useNavigate();

  const isFilled =
    form.firstName !== "" &&
    form.lastName !== "" &&
    form.email !== "";

  const handleSubmit = async (e) => {
    e.preventDefault();

    const docRef = await addDoc(collection(db, "contacts"), form);

    navigate(`/contact/${docRef.id}`);
  };

  return (
    <div>
      <h2>Add New Contact</h2>

      <form onSubmit={handleSubmit}>
        <input
          placeholder="First Name"
          value={form.firstName}
          onChange={(e) =>
            setForm({ ...form, firstName: e.target.value })
          }
        />

        <input
          placeholder="Last Name"
          value={form.lastName}
          onChange={(e) =>
            setForm({ ...form, lastName: e.target.value })
          }
        />

        <input
          placeholder="Email"
          value={form.email}
          onChange={(e) =>
            setForm({ ...form, email: e.target.value })
          }
        />

        <button
          type="submit"
          disabled={!isFilled}
          style={{
            backgroundColor: isFilled ? "green" : "#4a90e2",
          }}
        >
          Add Contact
        </button>
      </form>

      <button onClick={() => navigate("/")}>
        Back
      </button>
    </div>
  );
};

export default AddContact;