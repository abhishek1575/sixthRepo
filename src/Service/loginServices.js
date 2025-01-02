// // src/services/loginServices.js
// const loginApiUrl = "http://localhost:8083/auth/login"; // Replace with your backend login API URL

// /**
//  * Authenticate user by sending email and password to the backend.
//  * @param {string} email - User's email
//  * @param {string} password - User's password
//  * @returns {Promise<Object>} - Backend response containing token and role
//  */
// export const loginUser = async (email, password) => {
//     try {
//         const response = await fetch(loginApiUrl, {
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/json",
//             },
//             body: JSON.stringify({ email, password }),
//         });

//         if (response.ok) {
//             return await response.json(); // Return the parsed JSON if the request is successful
//         } else {
//             const errorData = await response.json();
//             throw new Error(errorData.message || "Invalid login credentials");
//         }
//     } catch (error) {
//         throw new Error(error.message || "An error occurred while logging in");
//     }
// };
