import { useEffect } from "react";
import { DistrictActions } from "../store/District";
import { useDispatch } from "react-redux";

function FetchDistrict() {
  const dispatch = useDispatch();
  useEffect(() => {
    fetch("http://localhost:9999/getDistrict")
      .then((response) => response.json())
      .then((result) => {
        console.log(result.data);
        result.data.map((item, index) =>
          dispatch(DistrictActions.getdistrict(item))
        );
      })
      .catch((error) => console.log("error", error));
  }, [dispatch]);
}
export { FetchDistrict };
