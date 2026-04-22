import { useParams, useNavigate, Link } from "react-router-dom";
import { db } from "../db";
import { doc, getDoc, deleteDoc } from "firebase/firestore";
import { useEffect, useState } from "react";

const ContactDetails = () => {
  const { id } = useParams();
  const [contact, setContact] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const docRef = doc(db, "contacts", id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setContact(docSnap.data());
      }
    };

    fetchData();
  }, [id]);

  const handleDelete = async () => {
    await deleteDoc(doc(db, "contacts", id));
    navigate("/");
  };

  if (!contact) return <p>Loading...</p>;

  return (
    <div>
      <h2>{contact.firstName} {contact.lastName}</h2>
      <p>{contact.email}</p>

      <Link to={`/edit/${id}`}>Edit</Link>
      <br />
      <button onClick={handleDelete}>Delete</button>
      <br />
      <button onClick={() => navigate("/")}>Back</button>
    </div>
  );
};

export default ContactDetails;