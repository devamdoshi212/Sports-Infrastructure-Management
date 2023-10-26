import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

export const Verify = () => {
  const navigate = useNavigate();
  const [cookie] = useCookies(["token"]);
  if (cookie.token === null) {
    navigate("/");
  } else {
    //     var myHeaders = new Headers();
    //     myHeaders.append("Content-Type", "application/json");
    //     var raw = JSON.stringify({
    //       Email: values.Email,
    //       Password: values.Password,
    //     });
    //     var requestOptions = {
    //       method: "POST",
    //       headers: myHeaders,
    //       body: raw,
    //       redirect: "follow",
    //     };
    //     fetch("http://localhost:9999/login", requestOptions)
    //       .then((response) => response.json())
    //       .then((result) => {
    //         console.log(result);
    //         const errorCode = result.rcode;
    //         // console.log(errorCode);
    //         if (errorCode === -9) {
    //         }
    //         if (errorCode === 200) {
    //           const maxAgeInSeconds = 86400; // 60 seconds
    //           setCookies("token", result.token, {
    //             maxAge: maxAgeInSeconds,
    //             path: "/",
    //           });
    //           navigate("/admin");
    //         }
    //       })
    //       .catch((error) => console.log("error", error));
  }
};
