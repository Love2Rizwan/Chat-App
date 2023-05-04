import React, { useEffect, useState, useCallback } from "react";
import styled from "styled-components";
import axios from "axios";
import { Buffer } from "buffer";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { setAvatarRoute } from "../utils/APIRoutes";

const api = `https://api.multiavatar.com/4645646`;

export default function SetAvatar() {
  const navigate = useNavigate();
  const [avatars, setAvatars] = useState([]);
  const [selectedAvatar, setSelectedAvatar] = useState(undefined);

  useEffect(() => {
    if (!localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY))
      navigate("/login");
  }, [navigate]);

  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  const setProfilePicture = useCallback(async () => {
    if (selectedAvatar === undefined) {
      toast.error("Please select an avatar", toastOptions);
    } else {
      const user = JSON.parse(
        localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
      );

      const { data } = await axios.post(`${setAvatarRoute}/${user._id}`, {
        image: avatars[selectedAvatar],
      });

      if (data.isSet) {
        user.isAvatarImageSet = true;
        user.avatarImage = data.image;
        localStorage.setItem(
          process.env.REACT_APP_LOCALHOST_KEY,
          JSON.stringify(user)
        );
        navigate("/");
      } else {
        toast.error("Error setting avatar. Please try again.", toastOptions);
      }
    }
  }, [selectedAvatar, avatars, navigate, toastOptions]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = [];
        for (let i = 0; i < 4; i++) {
          const image = await axios.get(
            `${api}/${Math.round(Math.random() * 1000)}`
          );
          const buffer = new Buffer(image.data);
          data.push(buffer.toString("base64"));
        }
        setAvatars(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <Container>
        <div className="title-container">
          <h1>Pick an Avatar as your profile picture</h1>
        </div>
        <div className="avatars">
          {avatars.map((avatar, index) => {
            return (
              <div
                className={`avatar ${selectedAvatar === index ? "selected" : ""}`}
                key={avatar}
                onClick={() => setSelectedAvatar(index)}
              >
                <img
                  src={`data:image/svg+xml;base64,${avatar}`}
                  alt="avatar"
                  height="100%"
                  width="100%"
                />
              </div>
            );
          })}
        </div>
        <button onClick={setProfilePicture} className="submit-btn">
          Set as Profile Picture
        </button>
        <ToastContainer />
      </Container>
    </>
  );
}


const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 3rem;
  background-color: #131324;
  height: 100vh;
  width: 100vw;

  .loader {
    max-inline-size: 100%;
  }

  .title-container {
    h1 {
      color: white;
    }
  }
  .avatars {
    display: flex;
    gap: 2rem;

    .avatar {
      border: 0.4rem solid transparent;
      padding: 0.4rem;
      border-radius: 5rem;
      display: flex;
      justify-content: center;
      align-items: center;
      transition: 0.5s ease-in-out;
      img {
        height: 6rem;
        transition: 0.5s ease-in-out;
      }
    }
    .selected {
      border: 0.4rem solid #4e0eff;
    }
  }
  .submit-btn {
    background-color: #4e0eff;
    color: white;
    padding: 1rem 2rem;
    border: none;
    font-weight: bold;
    cursor: pointer;
    border-radius: 0.4rem;
    font-size: 1rem;
    text-transform: uppercase;
    &:hover {
      background-color: #4e0eff;
    }
  }
`;













// ye hi code ralkna hai 

// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { Buffer } from "buffer";
// import loader from "../assets/loader.gif";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { useNavigate } from "react-router-dom";
// import { setAvatarRoute } from "../utils/APIRoutes";


// export default function SetAvatar() {
//   const api = `https://api.multiavatar.com/Starcrasher.png`
//   const navigate = useNavigate();
//   const [avatars, setAvatars] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [selectedAvatar, setSelectedAvatar] = useState(undefined);
//   const toastOptions = {
//     position: "bottom-right",
//     autoClose: 8000,
//     pauseOnHover: true,
//     draggable: true,
//     theme: "dark",
//   };


//   useEffect(() => {
//     async function checkLocalStorage() {
//       if (!localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)) {
//         navigate("/login");
//       }
//     }

//     checkLocalStorage();
//   }, []);

//   const setProfilePicture = async () => {
//     if (selectedAvatar === undefined) {
//       toast.error("Please select an avatar", toastOptions);
//     } else {
//       const user = await JSON.parse(
//         localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
//       );

//       const { data } = await axios.post(`${setAvatarRoute}/${user._id}`, {
//         image: avatars[selectedAvatar],
//       });
//       console.log("dta api pic line 72 ===>", data)

//       if (data.isSet) {
//         user.isAvatarImageSet = true;
//         user.avatarImage = data.image;
//         localStorage.setItem(
//           process.env.REACT_APP_LOCALHOST_KEY,
//           JSON.stringify(user)
//         );

//         navigate("/");
//       } else {
//         toast.error("Error setting avatar. Please try again.", toastOptions);
//       }
//     }
//   };



//   useEffect(() => {
//     async function fetchAvatars() {
//       const data = [];
//       for (let i = 0; i < 4; i++) {
//         const image = await axios.get(
//           `${api}/${Math.round(Math.random() * 1000)}`
//         );
//         const buffer = new Buffer(image.data);
//         data.push(buffer.toString("base64"));
//       }
//       console.log("dta api pic  ===>", data)
//       setAvatars(data);
//       setIsLoading(false);
//     }

//     fetchAvatars();
//   }, []);


  // useEffect(() => {
  //   setIsLoading(false);
  // }, [avatars]);


//   return (
//     <>
//       {isLoading ? (
//         <div style={{
//           display: "flex",
//           justifyContent: "center",
//           alignItems: "center",
//           flexDirection: "column", 
//           gap: "3rem", 
//           backgroundColor: "#131324",
//           height: "100vh",
//           width: "100vw"
//         }}>
//           <img src={loader} 
//           alt="loader" 
//           style={{ maxInlineSize: "100%" }} />
//         </div>
//       ) : (
//         <div style={{ 
//             display: "flex",
//             justifyContent: "center",
//             alignItems: "center",
//             flexDirection: "column", 
//             gap: "3rem", 
//             backgroundColor: "#131324", 
//             height: "100vh",
//             width: "100vw"
//           }}>
//           <div style={{ color: "white" }}>
//             <h1>Pick an Avatar as your profile picture</h1>
//           </div>
//             <div style={{
//               display: "flex",
//               gap: "2rem"
//             }}>
//             {avatars.map((avatar, index) => {
//               return (
//                 <div
//                   key={avatar}
//                   className={`avatar ${
//                     selectedAvatar === index ? "selected" : ""
//                     }`}
//                   style={{
//                     border: "0.4rem solid transparent",
//                     padding: "0.4rem",
//                     borderRadius: "5rem",
//                     display: "flex",
//                     justifyContent: "center",
//                     alignItems: "center",
//                     transition: "0.5s ease-in-out",
//                   }}
//                   onClick={() => setSelectedAvatar(index)}
//                 >
//                   <img
//                     src={`data:image/png;base64,${avatar}`}
//                     alt={`avatar - ${index}`}
//                     style={{ maxWidth: "100%" }}
//                   />
//                 </div>
//               );
//             })}
//           </div>
//           <div>
//             <button onClick={setProfilePicture} className="primary-button">
//               Set Profile Picture
//             </button>
//           </div>
//         </div>
//       )}
//       <ToastContainer />
//     </>
//   );
// }











// import React, { useEffect, useState } from "react";
// import styled from "styled-components";
// import axios from "axios";
// import { Buffer } from "buffer";
// import loader from "../assets/loader.gif";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { useNavigate } from "react-router-dom";
// import { setAvatarRoute } from "../utils/APIRoutes";
// export default function SetAvatar() {
//   const api = `https://api.multiavatar.com/4645646`;
//   const navigate = useNavigate();
//   const [avatars, setAvatars] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [selectedAvatar, setSelectedAvatar] = useState(undefined);
//   const toastOptions = {
//     position: "bottom-right",
//     autoClose: 8000,
//     pauseOnHover: true,
//     draggable: true,
//     theme: "dark",
//   };

//   useEffect(async () => {
//     if (!localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY))
//       navigate("/login");
//   }, []);

//   const setProfilePicture = async () => {
//     if (selectedAvatar === undefined) {
//       toast.error("Please select an avatar", toastOptions);
//     } else {
//       const user = await JSON.parse(
//         localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
//       );

//       const { data } = await axios.post(`${setAvatarRoute}/${user._id}`, {
//         image: avatars[selectedAvatar],
//       });

//       if (data.isSet) {
//         user.isAvatarImageSet = true;
//         user.avatarImage = data.image;
//         localStorage.setItem(
//           process.env.REACT_APP_LOCALHOST_KEY,
//           JSON.stringify(user)
//         );

//         navigate("/");

//       } else {
//         toast.error("Error setting avatar. Please try again.", toastOptions);
//       }
//     }
//   };

//   useEffect(async () => {
//     const data = [];
//     for (let i = 0; i < 4; i++) {
//       const image = await axios.get(
//         `${api}/${Math.round(Math.random() * 1000)}`
//       );
//       const buffer = new Buffer(image.data);
//       data.push(buffer.toString("base64"));
//     }
//     setAvatars(data);
//     setIsLoading(false);
//   }, []);
//   return (
//     <>
//       {isLoading ? (
//         <Container>
//           <img src={loader} alt="loader" className="loader" />
//         </Container>
//       ) : (
//         <Container>
//           <div className="title-container">
//             <h1>Pick an Avatar as your profile picture</h1>
//           </div>
//           <div className="avatars">
//             {avatars.map((avatar, index) => {
//               return (
//                 <div
//                   className={`avatar ${
//                     selectedAvatar === index ? "selected" : ""
//                   }`}
//                 >
//                   <img
//                     src={`data:image/svg+xml;base64,${avatar}`}
//                     alt="avatar"
//                     key={avatar}
//                     onClick={() => setSelectedAvatar(index)}
//                   />
//                 </div>
//               );
//             })}
//           </div>
//           <button onClick={setProfilePicture} className="submit-btn">
//             Set as Profile Picture
//           </button>
//           <ToastContainer />
//         </Container>
//       )}
//     </>
//   );
// }



// const Container = styled.div`
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   flex-direction: column;
//   gap: 3rem;
//   background-color: #131324;
//   height: 100vh;
//   width: 100vw;

//   .loader {
//     max-inline-size: 100%;
//   }

//   .title-container {
//     h1 {
//       color: white;
//     }
//   }
//   .avatars {
//     display: flex;
//     gap: 2rem;

//     .avatar {
//       border: 0.4rem solid transparent;
//       padding: 0.4rem;
//       border-radius: 5rem;
//       display: flex;
//       justify-content: center;
//       align-items: center;
//       transition: 0.5s ease-in-out;
//       img {
//         height: 6rem;
//         transition: 0.5s ease-in-out;
//       }
//     }
//     .selected {
//       border: 0.4rem solid #4e0eff;
//     }
//   }
//   .submit-btn {
//     background-color: #4e0eff;
//     color: white;
//     padding: 1rem 2rem;
//     border: none;
//     font-weight: bold;
//     cursor: pointer;
//     border-radius: 0.4rem;
//     font-size: 1rem;
//     text-transform: uppercase;
//     &:hover {
//       background-color: #4e0eff;
//     }
//   }
// `;




// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { Buffer } from "buffer";
// import loader from "../assets/loader2.gif";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { useNavigate } from "react-router-dom";
// import { setAvatarRoute } from "../utils/APIRoutes";
// import "./styles/SetAvatar.css";

// export default function SetAvatar() {
//   const api = `https://api.multiavatar.com/4645646`;
//   const navigate = useNavigate();
//   const [avatars, setAvatars] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [selectedAvatar, setSelectedAvatar] = useState(undefined);
//   const toastOptions = {
//     position: "bottom-right",
//     autoClose: 8000,
//     pauseOnHover: true,
//     draggable: true,
//     theme: "dark",
//   };

//   useEffect(async () => {
//     if (!localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY))
//       navigate("/login");
//   }, []);

//   const setProfilePicture = async () => {
//     if (selectedAvatar === undefined) {
//       toast.error("Please select an avatar", toastOptions);
//     } else {
//       const user = await JSON.parse(
//         localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
//       );

//       const { data } = await axios.post(`${setAvatarRoute}/${user._id}`, {
//         image: avatars[selectedAvatar],
//       });

//       if (data.isSet) {
//         user.isAvatarImageSet = true;
//         user.avatarImage = data.image;
//         localStorage.setItem(
//           process.env.REACT_APP_LOCALHOST_KEY,
//           JSON.stringify(user)
//         );
//         navigate("/");
//       } else {
//         toast.error("Error setting avatar. Please try again.", toastOptions);
//       }
//     }
//   };

//   useEffect(async () => {
//     const data = [];
//     for (let i = 0; i < 4; i++) {
//       const image = await axios.get(
//         `${api}/${Math.round(Math.random() * 1000)}`
//       );
//       const buffer = new Buffer(image.data);
//       data.push(buffer.toString("base64"));
//     }
//     setAvatars(data);
//     setIsLoading(false);
//   }, []);

//   return (
//     <>
//       {isLoading ? (
//         <div className="Container">
//           <img src={loader} alt="loader" className="loader" />
//         </div>
//       ) : (
//         <div className="Container2">
//           <div className="title-container">
//             <h1>Pick an Avatar as your profile picture</h1>
//           </div>
//           <div className="avatars">
//             {avatars.map((avatar, index) => {
//               return (
//                 <div
//                   className={`avatar ${
//                     selectedAvatar === index ? "selected" : ""
//                   }`}
//                   key={avatar}
//                   onClick={() => setSelectedAvatar(index)}
//                 >
//                   <img
//                     src={`data:image/svg+xml;base64,${avatar}`}
//                     alt="avatar"
//                     key={avatar}
//                     onClick={() => setSelectedAvatar(index)}
//                   />
//                 </div>
//               );
//             })}
//           </div>
//           <button onClick={setProfilePicture} className="submit-btn">
//             Set as Profile Picture
//           </button>
//           <ToastContainer />
//         </div>
//       )}
//     </>
//   );
// }
