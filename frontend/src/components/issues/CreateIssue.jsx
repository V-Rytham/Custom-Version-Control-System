import React, { useState } from "react";
import Navbar from "../Navbar";
import "../forms/formPages.css";
import API_BASE_URL from "../../config";

const CreateIssue = () => {
  const [repository, setRepository] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(`${API_BASE_URL}/issue/create`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ repository, title, description }),
      });

      const data = await response.json();
      if (!response.ok) {
        setMessage(data.error || "Could not create issue.");
        return;
      }

      setMessage("Issue created successfully.");
      setRepository("");
      setTitle("");
      setDescription("");
    } catch (error) {
      console.error(error);
      setMessage("Network error while creating issue.");
    }
  };

  return (
    <>
      <Navbar />
      <section className="form-page">
        <h2>Create a new issue</h2>
        <form className="form-grid" onSubmit={handleSubmit}>
          <label>
            Repository id
            <input value={repository} onChange={(e) => setRepository(e.target.value)} required />
          </label>
          <label>
            Title
            <input value={title} onChange={(e) => setTitle(e.target.value)} required />
          </label>
          <label>
            Description
            <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
          </label>

          <button type="submit">Create issue</button>
        </form>
        <p className="form-note">{message}</p>
      </section>
    </>
  );
};

export default CreateIssue;
