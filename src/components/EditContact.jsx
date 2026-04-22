import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { db } from "../db";
import { doc, getDoc, updateDoc } from "firebase/firestore";

const EditContact = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      const docRef = doc(db, "contacts", id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setForm(docSnap.data());
      }
    };

    fetchData();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const docRef = doc(db, "contacts", id);
    await updateDoc(docRef, form);

    navigate(`/contact/${id}`);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={form.firstName}
        onChange={(e) =>
          setForm({ ...form, firstName: e.target.value })
        }
      />

      <input
        value={form.lastName}
        onChange={(e) =>
          setForm({ ...form, lastName: e.target.value })
        }
      />

      <input
        value={form.email}
        onChange={(e) =>
          setForm({ ...form, email: e.target.value })
        }
      />

      <button type="submit">Update</button>
    </form>
  );
};

export default EditContact;