import React, { useState } from "react";
import "./App.css";

function App() {
  const [students, setStudents] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");
  const [editIndex, setEditIndex] = useState(null);

  // Add or update student with proper email validation
  const addStudent = () => {
    if (name === "" || email === "" || age === "") {
      alert("Please fill all fields");
      return;
    }

    // Regex to validate email format
    const emailPattern = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/i;
    if (!emailPattern.test(email)) {
      alert("Please enter a valid email address (e.g., example@gmail.com)");
      return;
    }

    const newStudent = { name, email, age };

    if (editIndex !== null) {
      const updated = [...students];
      updated[editIndex] = newStudent;
      setStudents(updated);
      setEditIndex(null);
    } else {
      setStudents([...students, newStudent]);
    }

    setName("");
    setEmail("");
    setAge("");
  };

  const editStudent = (index) => {
    const student = students[index];
    setName(student.name);
    setEmail(student.email);
    setAge(student.age);
    setEditIndex(index);
  };

  const deleteStudent = (index) => {
    const updated = students.filter((_, i) => i !== index);
    setStudents(updated);
  };

  const downloadExcel = () => {
    let csv = "Name,Email,Age\n";
    students.forEach((s) => {
      csv += `${s.name},${s.email},${s.age}\n`;
    });

    const blob = new Blob([csv], { type: "text/csv" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "students.csv";
    link.click();
  };

  return (
    <div className="container">
      <h2>Student Management</h2>

      <div className="input-group">
        <label>Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      <div className="input-group">
        <label>Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="example@gmail.com"
        />
      </div>

      <div className="input-group">
        <label>Age</label>
        <input
          type="number"
          value={age}
          onChange={(e) => setAge(e.target.value)}
        />
      </div>

      <div className="btn-row">
        <button className="btn-primary" onClick={addStudent}>
          {editIndex !== null ? "Update Student" : "Add Student"}
        </button>
        <button className="btn-secondary" onClick={downloadExcel}>
          Download CSV
        </button>
      </div>

      {students.length > 0 && (
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Age</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {students.map((s, index) => (
                <tr key={index}>
                  <td>{s.name}</td>
                  <td>
                    <a href={`mailto:${s.email}`}>{s.email}</a>
                  </td>
                  <td>{s.age}</td>
                  <td>
                    <button
                      className="edit-btn"
                      onClick={() => editStudent(index)}
                    >
                      Edit
                    </button>
                    <button
                      className="delete-btn"
                      onClick={() => deleteStudent(index)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default App;