import { useEffect } from "react";
import { ComplaintTypeActions } from "../store/ComplaintType";
import { useDispatch } from "react-redux";

function FetchComplaintType() {
  const dispatch = useDispatch();
  //   useEffect(() => {
  fetch("http://localhost:9999/getComplaintType")
    .then((response) => response.json())
    .then((result) => {
      console.log(result.data);
      result.data.map((item, index) =>
        dispatch(ComplaintTypeActions.getcomplaintType(item))
      );
    })
    .catch((error) => console.log("error", error));
  //   }, [dispatch]);
}
export { FetchComplaintType };
