// // Login.jsx
// import React, { useState } from "react";
// import background_image from "../Image/background_image.png";
// import ceinsys_logo from "../Image/ceinsys_logo.png";
// import AuthService from "../../Service/AuthService";

// function Login() {
//     // State variables
//     const [email, setEmail] = useState("");
//     const [password, setPassword] = useState("");
//     const [errorMessage, setErrorMessage] = useState("");

//     // Inline styles
//     const containerStyle = {
//         backgroundImage: `url(${background_image})`,
//         backgroundSize: "cover",
//         backgroundPosition: "center",
//         height: "100vh",
//         display: "flex",
//         justifyContent: "space-between",
//         alignItems: "center",
//         padding: "0 50px",
//         boxSizing: "border-box",
//     };

//     const welcomeSectionStyle = {
//         flex: 1,
//         textAlign: "left",
//     };

//     const logoStyle = {
//         width: "200px",
//         height: "35px",
//         marginBottom: "30px",
//     };

//     const logoContainerStyle = {
//         position: "absolute",
//         top: "20px",
//         left: "20px",
//         zIndex: 10,
//     };

//     const headingStyle = {
//         color: "#084298",
//         fontSize: "60px",
//         margin: "10px 0",
//         textAlign: "center",
//     };

//     const paragraphStyle = {
//         color: "#F3E5E5",
//         fontSize: "40px",
//         margin: "10px 0",
//         textAlign: "center",
//     };

//     const loginSectionStyle = {
//         background: "#fff",
//         padding: "30px 40px",
//         borderRadius: "8px",
//         boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
//         textAlign: "center",
//         width: "320px",
//     };

//     const titleStyle = {
//         color: "#333",
//         fontSize: "24px",
//         marginBottom: "20px",
//     };

//     const inputGroupStyle = {
//         marginBottom: "15px",
//         textAlign: "left",
//     };

//     const labelStyle = {
//         fontSize: "14px",
//         color: "#333",
//         marginBottom: "5px",
//         display: "block",
//     };

//     const inputStyle = {
//         width: "100%",
//         padding: "10px 12px",
//         border: "1px solid #ccc",
//         borderRadius: "4px",
//         fontSize: "14px",
//     };

//     const buttonStyle = {
//         width: "100%",
//         padding: "12px 0",
//         background: "#333",
//         color: "#fff",
//         border: "none",
//         borderRadius: "4px",
//         fontSize: "16px",
//         cursor: "pointer",
//     };

//     const forgotPasswordStyle = {
//         display: "block",
//         marginTop: "10px",
//         fontSize: "14px",
//         color: "#007bff",
//         textDecoration: "none",
//     };

//     const forgotPasswordHoverStyle = {
//         textDecoration: "underline",
//     };

//     const handleLogin = async (e) => {
//         e.preventDefault();
//         setErrorMessage("");

//         try {
//             const response = await AuthService.login(email, password);
//             alert("Login successful! Redirecting...");
//             window.location.href = "/dashboard"; // Redirect to dashboard after successful login
//         } catch (error) {
//             setErrorMessage("Invalid email or password. Please try again.");
//         }
//     };

//     return (
//         <div style={containerStyle}>
//             {/* Welcome Section */}
//             <div style={welcomeSectionStyle}>
//                 <div style={logoContainerStyle}>
//                     <img src={ceinsys_logo} alt="Ceinsys Logo" style={logoStyle} />
//                 </div>
//                 <h1 style={headingStyle}>Welcome to Ceinsys</h1>
//                 <p style={paragraphStyle}>Hardware Asset Management Tool</p>
//             </div>

//             {/* Login Section */}
//             <div style={loginSectionStyle}>
//                 <h2 style={titleStyle}>Login Here</h2>
//                 <form onSubmit={handleLogin}>
//                     <div style={inputGroupStyle}>
//                         <label htmlFor="email" style={labelStyle}>
//                             Email
//                         </label>
//                         <input
//                             type="email"
//                             id="email"
//                             value={email}
//                             onChange={(e) => setEmail(e.target.value)}
//                             placeholder="Enter your email"
//                             style={inputStyle}
//                             required
//                         />
//                     </div>
//                     <div style={inputGroupStyle}>
//                         <label htmlFor="password" style={labelStyle}>
//                             Password
//                         </label>
//                         <input
//                             type="password"
//                             id="password"
//                             value={password}
//                             onChange={(e) => setPassword(e.target.value)}
//                             placeholder="Enter your password"
//                             style={inputStyle}
//                             required
//                         />
//                     </div>
//                     {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
//                     <button type="submit" style={buttonStyle}>
//                         GET STARTED
//                     </button>
//                 </form>
//                 <a
//                     href="#"
//                     style={forgotPasswordStyle}
//                     onMouseEnter={(e) =>
//                         (e.target.style.textDecoration =
//                             forgotPasswordHoverStyle.textDecoration)
//                     }
//                     onMouseLeave={(e) =>
//                         (e.target.style.textDecoration =
//                             forgotPasswordStyle.textDecoration)
//                     }
//                 >
//                     Forgot Password?
//                 </a>
//             </div>
//         </div>
//     );
// }

// export default Login;

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthService from "../../Service/AuthService";
import { Snackbar, Alert } from "@mui/material";
import background_image from "../Image/background_image.png";
import ceinsys_logo from "../Image/ceinsys_logo.png";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // To handle error messages
  const [showError, setShowError] = useState(false); // Snackbar visibility
  const navigate = useNavigate();

  const containerStyle = {
    backgroundImage: `url(${background_image})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    height: "100vh",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "0 50px",
    boxSizing: "border-box",
  };

  const welcomeSectionStyle = {
    flex: 1,
    textAlign: "left",
  };

  const logoStyle = {
    width: "200px",
    height: "35px",
    marginBottom: "30px",
  };

  const headingStyle = {
    color: "#084298",
    fontSize: "60px",
    margin: "10px 0",
    textAlign: "center",
  };
  const logoContainerStyle = {
    position: "absolute",
    top: "20px",
    left: "20px",
    zIndex: 10,
  };

  const paragraphStyle = {
    color: "#F3E5E5",
    fontSize: "40px",
    margin: "10px 0",
    textAlign: "center",
  };

  const loginSectionStyle = {
    background: "#fff",
    padding: "30px 40px",
    borderRadius: "8px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    textAlign: "center",
    width: "320px",
  };

  const titleStyle = {
    color: "#333",
    fontSize: "24px",
    marginBottom: "20px",
  };

  const inputGroupStyle = {
    marginBottom: "15px",
    textAlign: "left",
  };

  const labelStyle = {
    fontSize: "14px",
    color: "#333",
    marginBottom: "5px",
    display: "block",
  };

  const inputStyle = {
    width: "100%",
    padding: "10px 12px",
    border: "1px solid #ccc",
    borderRadius: "4px",
    fontSize: "14px",
  };

  const buttonStyle = {
    width: "100%",
    padding: "12px 0",
    background: "#333",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    fontSize: "16px",
    cursor: "pointer",
  };

  const forgotPasswordStyle = {
    display: "block",
    marginTop: "10px",
    fontSize: "14px",
    color: "#007bff",
    textDecoration: "none",
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await AuthService.login(email, password);
      console.log("response is ", response, "type of", typeof response);

      // debugger
      if (response.data.jwt) {
        // Save token and role to session storage
        sessionStorage.setItem("token", response.data.jwt);
        sessionStorage.setItem("Role", response.data.role);
        sessionStorage.setItem("isLoggedIn", "true");

        // Clear previous errors
        setError("");
        setShowError(false);

        // Redirect based on role
        switch (response.data.role) {
          case "ADMIN":
            navigate("/adashboard");
            break;
          case "USER":
            navigate("/udashboard");
            break;
          case "SUPER_ADMIN":
            navigate("/sdashboard");
            break;
          default:
            throw new Error("Unknown role");
        }
      }
    } catch (error) {
      // Set error message and show Snackbar
      setError(error.response?.data?.message || "Invalid email or password");
      setShowError(true);
    }
  };

  const handleSnackbarClose = () => {
    setShowError(false);
  };

  return (
    <div style={containerStyle}>
      <Snackbar
        open={showError}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        transitionDuration={0} // Disable animations
      >
        <Alert
          onClose={handleSnackbarClose}
          severity="error"
          sx={{ width: "100%" }}
        >
          {error}
        </Alert>
      </Snackbar>

      <div style={welcomeSectionStyle}>
        <div style={logoContainerStyle}>
          <img src={ceinsys_logo} alt="Ceinsys Logo" style={logoStyle} />
        </div>
        <h1 style={headingStyle}>Welcome to Ceinsys</h1>
        <p style={paragraphStyle}>Hardware Asset Management Tool</p>
      </div>

      <div style={loginSectionStyle}>
        <h2 style={titleStyle}>Login Here</h2>
        <form onSubmit={handleLogin}>
          <div style={inputGroupStyle}>
            <label htmlFor="email" style={labelStyle}>
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Input"
              style={inputStyle}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div style={inputGroupStyle}>
            <label htmlFor="password" style={labelStyle}>
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="*********"
              style={inputStyle}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" style={buttonStyle}>
            GET STARTED
          </button>
        </form>
        <a href="/forgotpassword" style={forgotPasswordStyle}>
          Forgot Password?
        </a>
      </div>
    </div>
  );
}

export default Login;

// Login.jsx
// import React, { useState } from "react";
// import background_image from "../Image/background_image.png";
// import ceinsys_logo from "../Image/ceinsys_logo.png";
// import AuthService from "../../Service/AuthService";

// function Login() {
//     // State variables
//     const [email, setEmail] = useState("");
//     const [password, setPassword] = useState("");
//     const [errorMessage, setErrorMessage] = useState("");

//     // Inline styles
//     const containerStyle = {
//         backgroundImage: `url(${background_image})`,
//         backgroundSize: "cover",
//         backgroundPosition: "center",
//         height: "100vh",
//         display: "flex",
//         justifyContent: "space-between",
//         alignItems: "center",
//         padding: "0 50px",
//         boxSizing: "border-box",
//     };

//     const welcomeSectionStyle = {
//         flex: 1,
//         textAlign: "left",
//     };

//     const logoStyle = {
//         width: "200px",
//         height: "35px",
//         marginBottom: "30px",
//     };

//     const logoContainerStyle = {
//         position: "absolute",
//         top: "20px",
//         left: "20px",
//         zIndex: 10,
//     };

//     const headingStyle = {
//         color: "#084298",
//         fontSize: "60px",
//         margin: "10px 0",
//         textAlign: "center",
//     };

//     const paragraphStyle = {
//         color: "#F3E5E5",
//         fontSize: "40px",
//         margin: "10px 0",
//         textAlign: "center",
//     };

//     const loginSectionStyle = {
//         background: "#fff",
//         padding: "30px 40px",
//         borderRadius: "8px",
//         boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
//         textAlign: "center",
//         width: "320px",
//     };

//     const titleStyle = {
//         color: "#333",
//         fontSize: "24px",
//         marginBottom: "20px",
//     };

//     const inputGroupStyle = {
//         marginBottom: "15px",
//         textAlign: "left",
//     };

//     const labelStyle = {
//         fontSize: "14px",
//         color: "#333",
//         marginBottom: "5px",
//         display: "block",
//     };

//     const inputStyle = {
//         width: "100%",
//         padding: "10px 12px",
//         border: "1px solid #ccc",
//         borderRadius: "4px",
//         fontSize: "14px",
//     };

//     const buttonStyle = {
//         width: "100%",
//         padding: "12px 0",
//         background: "#333",
//         color: "#fff",
//         border: "none",
//         borderRadius: "4px",
//         fontSize: "16px",
//         cursor: "pointer",
//     };

//     const forgotPasswordStyle = {
//         display: "block",
//         marginTop: "10px",
//         fontSize: "14px",
//         color: "#007bff",
//         textDecoration: "none",
//     };

//     const forgotPasswordHoverStyle = {
//         textDecoration: "underline",
//     };

//     const handleLogin = async (e) => {
//         e.preventDefault();
//         setErrorMessage("");

//         try {
//             const response = await AuthService.login(email, password);
//             alert("Login successful! Redirecting...");
//             window.location.href = "/dashboard"; // Redirect to dashboard after successful login
//         } catch (error) {
//             setErrorMessage("Invalid email or password. Please try again.");
//         }
//     };

//     return (
//         <div style={containerStyle}>
//             {/* Welcome Section */}
//             <div style={welcomeSectionStyle}>
//                 <div style={logoContainerStyle}>
//                     <img src={ceinsys_logo} alt="Ceinsys Logo" style={logoStyle} />
//                 </div>
//                 <h1 style={headingStyle}>Welcome to Ceinsys</h1>
//                 <p style={paragraphStyle}>Hardware Asset Management Tool</p>
//             </div>

//             {/* Login Section */}
//             <div style={loginSectionStyle}>
//                 <h2 style={titleStyle}>Login Here</h2>
//                 <form onSubmit={handleLogin}>
//                     <div style={inputGroupStyle}>
//                         <label htmlFor="email" style={labelStyle}>
//                             Email
//                         </label>
//                         <input
//                             type="email"
//                             id="email"
//                             value={email}
//                             onChange={(e) => setEmail(e.target.value)}
//                             placeholder="Enter your email"
//                             style={inputStyle}
//                             required
//                         />
//                     </div>
//                     <div style={inputGroupStyle}>
//                         <label htmlFor="password" style={labelStyle}>
//                             Password
//                         </label>
//                         <input
//                             type="password"
//                             id="password"
//                             value={password}
//                             onChange={(e) => setPassword(e.target.value)}
//                             placeholder="Enter your password"
//                             style={inputStyle}
//                             required
//                         />
//                     </div>
//                     {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
//                     <button type="submit" style={buttonStyle}>
//                         GET STARTED
//                     </button>
//                 </form>
//                 <a
//                     href="/forgotpassword"
//                     style={forgotPasswordStyle}
//                     onMouseEnter={(e) =>
//                         (e.target.style.textDecoration =
//                             forgotPasswordHoverStyle.textDecoration)
//                     }
//                     onMouseLeave={(e) =>
//                         (e.target.style.textDecoration =
//                             forgotPasswordStyle.textDecoration)
//                     }
//                 >
//                     Forgot Password?
//                 </a>
//             </div>
//         </div>
//     );
// }

// export default Login;

// import React from "react";
// import background_image from "../Image/background_image.png";
// import ceinsys_logo from "../Image/ceinsys_logo.png"

// function Login() {
//     // Inline styles
//     const containerStyle = {
//         backgroundImage: `url(${background_image})`,
//         backgroundSize: "cover",
//         backgroundPosition: "center",
//         height: "100vh", // Full screen height
//         display: "flex", // Use Flexbox for alignment
//         justifyContent: "space-between", // Space out the welcome and login sections
//         alignItems: "center", // Center the content vertically
//         padding: "0 50px", // Add padding for spacing
//         boxSizing: "border-box",
//     };

//     const welcomeSectionStyle = {
//         flex: 1,
//         textAlign: "left",
//     };

//     const logoStyle = {
//         // logoImage =`url(${ceinsys logo.png})`,
//         width: "200px",
//         height:"35px",
//         marginBottom: "30px",
//     };
//     const logoContainerStyle = {
//         position: "absolute", // Positioning logo absolutely
//         top: "20px", // Add spacing from the top
//         left: "20px", // Add spacing from the left
//         zIndex: 10, // Ensures it stays on top
//     };

//     const headingStyle = {
//         color: "#084298",
//         fontSize: "60px",
//         margin: "10px 0", // Adjust spacing between heading and paragraph
//         textAlign: "center",
//     };

//     const paragraphStyle = {
//         color: "#F3E5E5",
//         fontSize: "40px",
//         margin: "10px 0", // Adjust spacing below paragraph
//         textAlign: "center",
//     };
//     const loginSectionStyle = {
//         background: "#fff",
//         padding: "30px 40px",
//         borderRadius: "8px",
//         boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
//         textAlign: "center",
//         width: "320px",
//     };

//     const titleStyle = {
//         color: "#333",
//         fontSize: "24px",
//         marginBottom: "20px",
//     };

//     const inputGroupStyle = {
//         marginBottom: "15px",
//         textAlign: "left",
//     };

//     const labelStyle = {
//         fontSize: "14px",
//         color: "#333",
//         marginBottom: "5px",
//         display: "block",
//     };

//     const inputStyle = {
//         width: "100%",
//         padding: "10px 12px",
//         border: "1px solid #ccc",
//         borderRadius: "4px",
//         fontSize: "14px",
//     };

//     const buttonStyle = {
//         width: "100%",
//         padding: "12px 0",
//         background: "#333",
//         color: "#fff",
//         border: "none",
//         borderRadius: "4px",
//         fontSize: "16px",
//         cursor: "pointer",
//     };

//     const forgotPasswordStyle = {
//         display: "block",
//         marginTop: "10px",
//         fontSize: "14px",
//         color: "#007bff",
//         textDecoration: "none",
//     };

//     const forgotPasswordHoverStyle = {
//         textDecoration: "underline",
//     };

//     return (
//         <div style={containerStyle}>
//             {/* Welcome Section */}
//             <div style={welcomeSectionStyle}>
//             <div style={logoContainerStyle}>
//                 <img src={ceinsys_logo} alt="Ceinsys Logo" style={logoStyle} />
//             </div>
//                 <h1 style={headingStyle}>Welcome to Ceinsys</h1>
//                 <p style={paragraphStyle}>Hardware Asset Management Tool</p>
//             </div>

//             {/* Login Section */}
//             <div style={loginSectionStyle}>
//                 <h2 style={titleStyle}>Login Here</h2>
//                 <form>
//                     <div style={inputGroupStyle}>
//                         <label htmlFor="email" style={labelStyle}>
//                             Email
//                         </label>
//                         <input
//                             type="email"
//                             id="email"
//                             name="email"
//                             placeholder="Input"
//                             style={inputStyle}
//                             required
//                         />
//                     </div>
//                     <div style={inputGroupStyle}>
//                         <label htmlFor="password" style={labelStyle}>
//                             Password
//                         </label>
//                         <input
//                             type="password"
//                             id="password"
//                             name="password"
//                             placeholder="*********"
//                             style={inputStyle}
//                             required
//                         />
//                     </div>
//                     <button type="submit" style={buttonStyle}>
//                         GET STARTED
//                     </button>
//                 </form>
//                 <a
//                     href="#"
//                     style={forgotPasswordStyle}
//                     onMouseEnter={(e) =>
//                         (e.target.style.textDecoration =
//                             forgotPasswordHoverStyle.textDecoration)
//                     }
//                     onMouseLeave={(e) =>
//                         (e.target.style.textDecoration =
//                             forgotPasswordStyle.textDecoration)
//                     }
//                 >
//                     Forgot Password?
//                 </a>
//             </div>
//         </div>
//     );
// }

// export default Login;
