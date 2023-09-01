import React, { useState, useEffect } from "react";
import "./Printapplication.css";
import jsPDF from "jspdf";
import "jspdf-autotable";
const PrintApplication = ({ RID, goToLogin }) => {
  const [applicationData, setApplicationData] = useState({});

  const convertToFormattedDate = (isoDate) => {
    const date = new Date(isoDate);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };
  const handleLogout = () => {
    window.alert("Logging Out");
    goToLogin();
  };
  const handleDownloadPDF = () => {
    const pdf = new jsPDF();

    const title = "Application Form for Internship in Niti Aayog";
    pdf.setFontSize(16);
    pdf.setFont("helvetica", "bold");
    pdf.text(title, 10, 20);

    pdf.setFontSize(12);
    pdf.setFont("helvetica", "normal");
    pdf.text("Personal Information:", 10, 40);

    const personalInfoFields = [
      `RegNo: ${applicationData.formCandidate?.RegNo}`,
      `Title: ${applicationData.formCandidate?.title}`,
      `Name: ${applicationData.candidate?.Fname}`,
      `Email: ${applicationData.candidate?.Email}`,
      `Date of Birth: ${convertToFormattedDate(
        applicationData.candidate?.Dob
      )}`,
      `Father's Name: ${applicationData.formCandidate?.fathersname}`,
      `Address 1: ${applicationData.formCandidate?.address1}`,
      `Address 2: ${applicationData.formCandidate?.address2}`,
      `City: ${applicationData.formCandidate?.city}`,
      `Country: ${applicationData.formCandidate?.country}`,
      `Pincode: ${applicationData.formCandidate?.pincode}`,
      `Phone: +${applicationData.formCandidate?.phone}`,
      `Mobile: +${applicationData.formCandidate?.mobile}`,
      `Desired Month of Internship: ${applicationData.formCandidate?.desiredMonth}`,
      `Area Of Interest: ${applicationData.formCandidate?.AreaOptions}`,
    ];

    // Add personal information to PDF
    personalInfoFields.forEach((info, index) => {
      pdf.text(info, 10, 50 + index * 10);
    });

    const startY = 50 + personalInfoFields.length * 10;

    pdf.autoTable({
      startY,
      head: [
        [
          "Examination",
          "Subject",
          "Board",
          "Start Year",
          "Completion Year",
          "Status",
          "Percentage",
          "Semester",
        ],
      ],
      body: applicationData.educationCandidate?.map((education) => [
        education.examination,
        education.subject,
        education.board,
        education.syear,
        education.cyear,
        education.status,
        education.percentage,
        education.semester,
      ]),
      theme: "grid",
      headStyles: {
        fillColor: "#007bff", // Change this to your desired color
        textColor: "#ffffff", // Change this to your desired text color
        fontSize: 9,
        fontStyle: "bold",
      },
    });

    pdf.save("application_form.pdf");
  };
  useEffect(() => {
    // Fetch data from the backend using the RID
    fetch(`http://localhost:4444/printapplication/${RID}`)
      .then((response) => response.json())
      .then((data) => setApplicationData(data))

      .catch((error) => console.error("Error fetching data:", error));
  }, [RID]);
  console.log(applicationData);

  return (
    <div>
      <div className="heading">
        <div className="logout">
          <button className="logout-btn" onClick={handleLogout}>
            Logout
          </button>
        </div>
        <h1 className="headingtext">
          Application form for Internship in Niti Aayog
        </h1>
      </div>
      <div className="application-data">
        <p>RegNo: {applicationData.formCandidate?.RegNo}</p>
        <p>Title: {applicationData.formCandidate?.title}</p>
        <p>Name: {applicationData.candidate?.Fname}</p>
        <p>Email: {applicationData.candidate?.Email}</p>
        <p>
          Date of Birth:{" "}
          {convertToFormattedDate(applicationData.candidate?.Dob)}
        </p>
        <p>Father Name: {applicationData.formCandidate?.fathersname}</p>
        <p>Address 1: {applicationData.formCandidate?.address1}</p>
        <p>Address 2: {applicationData.formCandidate?.address2}</p>
        <p>City: {applicationData.formCandidate?.city}</p>
        <p>Country: {applicationData.formCandidate?.country}</p>
        <p>Pincode: {applicationData.formCandidate?.pincode}</p>
        <p>Phone: +{applicationData.formCandidate?.phone}</p>
        <p>Mobile: +{applicationData.formCandidate?.mobile}</p>
        <p>
          Desired Month of Internship:{" "}
          {applicationData.formCandidate?.desiredMonth}
        </p>
        <p>Area Of Interest: {applicationData.formCandidate?.AreaOptions}</p>
      </div>
      <div className="education-data">
        <h2>Education Details:</h2>
        <table>
          <thead>
            <tr>
              <th>Examination</th>
              <th>Subject</th>
              <th>Board</th>
              <th>Start Year</th>
              <th>Completion Year</th>
              <th>Pursuing/Completed</th>
              <th>Percentage</th>
              <th>Semester</th>
            </tr>
          </thead>
          <tbody>
            {applicationData.educationCandidate?.map((education, index) => (
              <tr key={index}>
                <td>{education.examination}</td>
                <td>{education.subject}</td>
                <td>{education.board}</td>
                <td>{education.syear}</td>
                <td>{education.cyear}</td>
                <td>{education.status}</td>
                <td>{education.percentage}</td>
                <td>{education.semester}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="download-pdf">
        <button className="download-btn" onClick={handleDownloadPDF}>
          Download PDF
        </button>
      </div>
    </div>
  );
};

export default PrintApplication;
