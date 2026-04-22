import { useEffect, useState } from "react";
import { db } from "../db";
import { collection, getDocs } from "firebase/firestore";
import { Link } from "react-router-dom";

const ContactList = () => {
  const [contacts, setContacts] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const snapshot = await getDocs(collection(db, "contacts"));

      let list = [];

      snapshot.forEach((doc) => {
        list.push({ id: doc.id, ...doc.data() });
      });

      console.log("🔥 FIREBASE DATA:", list);

      list.sort((a, b) => a.lastName.localeCompare(b.lastName));

      setContacts(list);
    };

    fetchData();
  }, []);

  const filtered = contacts.filter((c) =>
    (c.firstName + " " + c.lastName)
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <div>
      <h1>Contact Book</h1>

      <input
        placeholder="Search..."
        onChange={(e) => setSearch(e.target.value)}
      />

      <br /><br />

      <Link to="/add">Add Contact</Link>

      {filtered.length === 0 ? (
        <p>No contacts found</p>
      ) : (
        filtered.map((c) => (
          <div key={c.id}>
            <Link to={`/contact/${c.id}`}>
              {c.firstName} {c.lastName}
            </Link>
          </div>
        ))
      )}
    </div>
  );
};

export default ContactList;
