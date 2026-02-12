import React from "react";

const Greeting = () => {
  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>Thank you for registration!</h2>
      <p>Your data was submitted successfully.</p>
      <br />
      <p>Check your mail for confirmation. <br/><b>NOTE: check your spam folder if you don't see the email.</b> </p>
    </div>
  );
};

export default Greeting;
