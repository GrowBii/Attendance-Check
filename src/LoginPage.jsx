
import React, { useEffect, useState } from "react";
import Logo from "./assets/logo.jpg";
import axios from "axios";

const LoginPage = () => {
  const [currentPage, setCurrentPage] = useState("login");
  const [user,setUser]=useState();
  const [loginId,setLoginId]=useState();
  const [password,setPassword]=useState();
  const [apiData,setApiData]=useState([]);
  const [loading,setLoading]=useState(false);
  const [attendance,setAttendance]=useState([]);
  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const response = await axios.get("https://script.googleusercontent.com/macros/echo?user_content_key=FC--ItrzLCVRvsejOEzABxmEyiHx88sc9TRJkPtHGTpM-u9BFV4mnqTkS8LqOtZEtd_Z97Kv8Ic8SBj4mtAUUJj4xljuqJtMm5_BxDlH2jW0nuo2oDemN9CCS2h10ox_1xSncGQajx_ryfhECjZEnEdkMpOjEy_3ZbtCMvAwhoesOJUuwpCX2ynJjaN2fI4uk6y0C5jHw1wbpzKlHjW6T5N97dlEMfcpJBjUD1Vp_5QnHzXNnzuIQw&lib=Muu5nrryvltAbocsFDk516rTI4cXDUyk2");
        if (response.data) {
          console.log(response.data)
          setLoading(false);
          let temp = response.data.data.slice(1);
          setApiData(temp);
        }
      } catch (error) {
        setLoading(false);
        console.error("Error fetching the data: ", error);
      }
    })();
  }, []);


  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        if(currentPage=="todaysAttendance" && loginId && password){
        const response = await axios.get("https://script.googleusercontent.com/macros/echo?user_content_key=zxQbViIZrrtMxM5UyG_SIpq3nKPScXGRxaEj2wO2no4VU-Q6tW1GHIrhdYgzWp_I_r2nWaLabTJa24iVbFg7vUZg_mXVuN43m5_BxDlH2jW0nuo2oDemN9CCS2h10ox_1xSncGQajx_ryfhECjZEnAAmATiOAkVWRKJTpgeA-hgLV2SXlLwo4ts5cXwEThyrgURlESJF5hBwNZt6H0ODNtfUuoZW0ONuEoWmjiRsGle4n-sJrZ3ggQ&lib=Muu5nrryvltAbocsFDk516rTI4cXDUyk2");
        if (response.data) {
          console.log(response.data)
          setLoading(false);
          let temp = response.data.data.slice(1);
          temp=temp.filter(item=>{
            if(item["Roll No."]==loginId){
              return true;
            }
            return false;
          }).map(item=>({...item,present:false}))
          setAttendance(temp);
          console.log(temp)
        }
      }
      } catch (error) {
        setLoading(false);
        console.error("Error fetching the data: ", error);
      }
    })();
  }, [currentPage]);

  const navigateToDashboard = () => {
    setCurrentPage("dashboard");
  };

  const navigateToLogin = () => {
    setCurrentPage("login");
  };

  const navigateToTodaysAttendance = () => {
    setCurrentPage("todaysAttendance");
  };

  const navigateToMonthlyAttendance = () => {
    setCurrentPage("monthlyAttendance");
  };

  const navigateToForgotPassword = () => {
    setCurrentPage("forgotPassword");
  };
  
  // if (currentPage === "monthlyAttendance") {
  //   return (
  //     <div className="flex flex-col items-center justify-center min-h-screen bg-white">
  //       {/* Logo */}
  //       <div className="mb-8 flex flex-col items-center">
  //         <img
  //           src={Logo}
  //           alt="Growbii Logo"
  //           className="w-24 h-24"
  //           style={{ borderRadius: "70%", width: "150px", height: "150px" }}
  //         />
  //         <h1 className="text-xl font-bold mt-4">Monthly Attendance Report</h1>
  //       </div>

  //       {/* Calendar UI */}
  //       <div className="w-80 bg-gray-100 p-4 rounded-lg shadow-lg">
  //         <h2 className="text-lg font-semibold mb-4 text-center">
  //           February 2025
  //         </h2>
  //         <div className="grid grid-cols-7 gap-2 text-center">
  //           {/* Days of the Week */}
  //           {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
  //             <div key={day} className="font-bold text-gray-600">
  //               {day}
  //             </div>
  //           ))}

  //           {/* Calendar Dates */}
  //           {[...Array(28)].map((_, index) => (
  //             <div
  //               key={index}
  //               className={`py-2 text-sm rounded-lg ${
  //                 index % 7 === 0 ? "text-red-500" : "text-gray-700"
  //               } bg-white border`}
  //             >
  //               {index + 1}
  //             </div>
  //           ))}
  //         </div>
  //       </div>

  //       {/* Footer Buttons */}
  //       <div className="flex justify-between w-80 mt-8">
  //         <button
  //           style={{
  //             backgroundColor: "transparent",
  //             color: "black",
  //             height: "40px",
  //             width: "48%",
  //             border: "1px solid black",
  //             borderRadius: "5px",
  //             marginRight: "20px",
  //           }}
  //         >
  //           Clear
  //         </button>
  //         <button
  //           onClick={navigateToDashboard}
  //           style={{
  //             backgroundColor: "black",
  //             color: "white",
  //             height: "40px",
  //             width: "48%",
  //             borderRadius: "5px",
  //           }}
  //         >
  //           Back
  //         </button>
  //       </div>
  //     </div>
  //   );
  // }

  const login=()=>{
    console.log(loginId,password,apiData)
    let temp=apiData.filter(item=>{
      if(item.loginId && item.loginId==loginId && item.password==password){
        return true;
      }
      return false;
    })

    if(temp && temp.length>0){
      console.log(temp);
      setCurrentPage("dashboard")
    }else{
      alert("No user found")
    }
  }
  if (currentPage === "todaysAttendance") {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-white">
        {/* Logo */}
        <div className="mb-8 flex flex-col items-center">
          <img
            src={Logo}
            alt="Growbii Logo"
            className="w-24 h-24"
            style={{ height: "100px" }}
          />
          <h1
            style={{ font: "normal", fontSize: "20px"}}
            className="text-xl font-bold mt-4"
          >
            Today's Attendance
          </h1>
        </div>

        {/* Attendance List */}
        <div className="w-80">
          <div className="flex flex-col gap-6">
            <div>
              <p
                style={{
                  marginTop: "-10px",
                  fontWeight: "bold",
                  marginBottom: "6px",
                }}
                className="text-lg font-semibold"
              >
                {new Date().toLocaleDateString()}
              </p>
            </div>
            <hr className="border-gray-400" />
            <div
              style={{ boxShadow: "10px 10px darkwhite" }}
              className="flex flex-col gap-4"
            >
            <div
                style={{ marginLeft: "-30px" }}
                className="flex justify-between"
              >
                <span style={{fontWeight:"bolder"}}>
                  Subject&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Attendance
                </span>
              </div>
              <hr/>
              {
                loading?
              <p>Loading...</p>
              :
              attendance.map(item=>
                  <>
                  <div
                style={{ marginLeft: "-30px" }}
                className="flex justify-between"
              >
                <span>
                  {item["Unique Number"]}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; {item.present?"Present":"Absent"}
                </span>
              </div>
              <span style={{ color: "grey" }} className="text-sm text-gray-500">
                07:00 am&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              </span>
              <hr/>
              </>
              )
              }
            </div>
          </div>

          {/* Footer Buttons */}
          <div
            style={{ marginTop: "20px" }}
            className="flex justify-between mt-8"
          >
            <button
              style={{
                backgroundColor: "transparent",
                color: "black",
                height: "40px",
                width: "48%",
                border: "1px solid black",
                borderRadius: "5px",
                marginRight: "10px",
              }}
              onMouseEnter={(e) => {
                e.target.style.border = "1px solid black";
              }}
              onMouseLeave={(e) => {
                e.target.style.border = "none";
              }}
            >
              Clear
            </button>
            <button
              onClick={navigateToDashboard}
              style={{
                backgroundColor: "black",
                color: "white",
                height: "40px",
                width: "48%",
                borderRadius: "5px",
              }}
            >
              Back
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (currentPage === "dashboard") {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-white">
        {/* Logo */}
        <div className="mb-8">
          <img
            src={Logo}
            alt="Growbii Logo"
            className="w-24 h-24"
            style={{
              height: "100px",
              marginTop: "-80px",
            }}
          />
        </div>

        {/* Buttons */}
        <div className="flex flex-col gap-6 w-50">
          <button
            onClick={navigateToTodaysAttendance}
            style={{
              backgroundColor: "black",
              color: "white",
              height: "40px",
              width: "60%",
              borderRadius: "5px",
              marginTop: "60px",
            }}
          >
            Today’s Attendance
          </button>
          <button
            // onClick={navigateToMonthlyAttendance}
            style={{
              backgroundColor: "black",
              color: "white",
              height: "40px",
              width: "60%",
              borderRadius: "5px",
              marginTop: "30px",
            }}
          >
            Monthly Attendance Report
          </button>
          <button
            style={{
              backgroundColor: "black",
              color: "white",
              height: "40px",
              width: "60%",
              borderRadius: "5px",
              marginTop: "30px",
            }}
          >
            Consolidated Marksheet
          </button>
          <button
            style={{
              backgroundColor: "black",
              color: "white",
              height: "40px",
              width: "60%",
              borderRadius: "5px",
              marginTop: "30px",
            }}
          >
            Timetable
          </button>
        </div>

        {/* Footer */}
        <div className="flex justify-between w-80 mt-8">
          <button
            style={{
              backgroundColor: "transparent",
              color: "black",
              height: "40px",
              width: "28%",
              border: "1px solid black",
              borderRadius: "5px",
              marginTop: "30px",
              marginRight: "30px",
            }}
          >
            Clear
          </button>
          <button
            onClick={navigateToLogin}
            style={{
              backgroundColor: "black",
              color: "white",
              height: "40px",
              width: "28%",
              borderRadius: "5px",
            }}
          >
            Back
          </button>
        </div>
      </div>
    );
  }

  if (currentPage === "forgotPassword") {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-white">
        {/* Logo */}
        <div className="mb-8">
          <img
            src={Logo}
            alt="Growbii Logo"
            className="w-24 h-24"
            style={{
              borderRadius: "70%",
              width: "150px",
              height: "150px",
              marginTop: "10px",
            }}
          />
        </div>

        {/* Forgot Password Form */}
        <div className="w-80">
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2" style={{ marginTop: "40px" }}>
              <label
                style={{
                  color: "black",
                  marginLeft: "-90px",
                  marginRight: "130px",
                }}
                htmlFor="email"
              >
                Email
              </label>
              <input
                style={{
                  border: "none",
                  backgroundColor: "lightgrey",
                  borderRadius: "5px",
                  height: "34px",
                  width: "100%",
                  marginTop: "6px",
                  marginBottom: "20px",
                }}
                type="email"
                placeholder=" Email"
              />
            </div>
          </div>

          {/* Buttons */}
          <div
            style={{ display: "flex", marginTop: "10px" }}
            className="flex justify-between mt-8"
          >
            <button
              onClick={navigateToLogin}
              style={{
                backgroundColor: "transparent",
                color: "black",
                height: "40px",
                width: "48%",
                border: "1px solid white",
                borderRadius: "5px",
                marginRight: "10px",
              }}
              onMouseEnter={(e) => {
                e.target.style.border = "1px solid black";
              }}
              onMouseLeave={(e) => {
                e.target.style.border = "none";
              }}
            >
              Cancel
            </button>
            <button
              style={{
                backgroundColor: "black",
                color: "white",
                height: "40px",
                width: "100%",
                borderRadius: "5px",
              }}
            >
              Submit Request
            </button>
          </div>

          {/* Footer Buttons */}
          <div
            style={{ marginTop: "90px" }}
            className="flex justify-between mt-8"
          >
            <button
              style={{
                backgroundColor: "transparent",
                color: "black",
                height: "40px",
                width: "48%",
                border: "1px solid black",
                borderRadius: "5px",
                marginRight: "10px",
              }}
              onMouseEnter={(e) => {
                e.target.style.border = "1px solid black";
              }}
              onMouseLeave={(e) => {
                e.target.style.border = "none";
              }}
            >
              Clear
            </button>
            <button
              onClick={navigateToLogin}
              style={{
                backgroundColor: "black",
                color: "white",
                height: "40px",
                width: "48%",
                borderRadius: "5px",
              }}
            >
              Back
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white">
      {/* Logo */}
      <div className="mb-8">
        <img
          src={Logo}
          alt="Growbii Logo"
          className="w-24 h-24"
          style={{
            // width: "150px",
            height: "100px",
            marginTop: "10px",
          }}
        />
      </div>

      {/* Login Form */}
      <div className="w-80">
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2" style={{ marginTop: "40px" }}>
            <label
              style={{
                color: "black",
                marginLeft: "-160px",
                marginRight: "130px",
              }}
              htmlFor="email"
            >
              Login ID
            </label>
            <input
              style={{
                border: "none",
                backgroundColor: "lightgrey",
                borderRadius: "5px",
                height: "34px",
                width: "100%",
                marginTop: "6px",
              }}
              type="text"
              placeholder=" Login Id"
              value={loginId}
              onChange={(e)=>setLoginId(e.target.value.trim())}
            />
          </div>
          <div className="flex flex-col gap-2" style={{ marginTop: "30px" }}>
            <label
              style={{
                color: "black",
                marginLeft: "-140px",
                marginRight: "120px",
              }}
              htmlFor="password"
            >
              Password
            </label>
            <input
              style={{
                border: "none",
                backgroundColor: "lightgrey",
                borderRadius: "5px",
                height: "34px",
                width: "100%",
                marginTop: "6px",
              }}
              type="password"
              placeholder=" Password"
              value={password}
              onChange={(e)=>setPassword(e.target.value.trim())}
            />
          </div>
        </div>

        <button
          onClick={login}
          style={{
            backgroundColor: "black",
            color: "white",
            marginTop: "30px",
            height: "40px",
            width: "100%",
          }}
          disabled={loading}
        >
          {loading?"Loading data please wait....":"Sign In"}
        </button>
        <div style={{ marginTop: "20px" }}>
          <a
            href="#"
            style={{
              fontSize: "0.875rem",
              color: "blue",
              marginTop: "10px",
              textDecoration: "none",
              transition: "color 0.2s ease-in-out",
            }}
            onMouseEnter={(e) => {
              e.target.style.textDecoration = "underline";
              e.target.style.color = "#374151";
            }}
            onMouseLeave={(e) => {
              e.target.style.textDecoration = "none";
              e.target.style.color = "blue";
            }}
            onClick={navigateToForgotPassword}
          >
            Forgot password?
          </a>
          {/* Footer */}
          <div className="absolute bottom-4 text-center">
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "10vh",
                margin: "0",
                backgroundColor: "white",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  gap: "20px",
                }}
              >
                <hr style={{ width: "100px" }} />
                <span style={{ fontSize: "17px", fontWeight: "normal" }}>
                  Contact Us
                </span>
                <hr style={{ width: "100px" }} />
              </div>
            </div>

            <div className="flex items-center justify-center gap-4 mt-2">
              <a
                href="#"
                style={{ marginRight: "10px" }}
                className="text-gray-500 hover:text-gray-700"
              >
                📞
              </a>
              <a
                style={{ marginRight: "10px" }}
                href="#"
                className="text-gray-500 hover:text-gray-700"
              >
                📸
              </a>
              <a href="#" className="text-gray-500 hover:text-gray-700">
                📹
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;