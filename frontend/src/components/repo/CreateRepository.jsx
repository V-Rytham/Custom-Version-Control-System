import React, { useState } from "react";
import Navbar from "../Navbar";
import "../forms/formPages.css";
import API_BASE_URL from "../../config";

const CreateRepository = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [visibility, setVisibility] = useState("public");
  const [message, setMessage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    const owner = localStorage.getItem("userId");

    try {
      const response = await fetch(`${API_BASE_URL}/repo/create`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ owner, name, description, visibility }),
      });

      const data = await response.json();
      if (!response.ok) {
        setMessage(data.error || "Could not create repository.");
        return;
      }

      setMessage("Repository created successfully.");
      setName("");
      setDescription("");
      setVisibility("public");
    } catch (error) {
      console.error(error);
      setMessage("Network error while creating repository.");
    }
  };

  return (
    <>
      <Navbar />
      <section className="form-page">
        <h2>Create a new repository</h2>
        <form className="form-grid" onSubmit={handleSubmit}>
          <label>
            Repository name
            <input value={name} onChange={(e) => setName(e.target.value)} required />
          </label>

          <label>
            Description
            <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
          </label>

          <label>
            Visibility
            <select value={visibility} onChange={(e) => setVisibility(e.target.value)}>
              <option value="public">Public</option>
              <option value="private">Private</option>
            </select>
          </label>

          <button type="submit">Create repository</button>
        </form>
        <p className="form-note">{message}</p>
      </section>
    </>
  );
};

export default CreateRepository;
