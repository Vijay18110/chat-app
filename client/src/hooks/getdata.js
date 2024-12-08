import axios from "axios";
import { useEffect, useState } from "react";
const useGetData = (url) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    (() => {
      setLoading(true);
      try {
        axios(url).then((res) =>
          setData(
            res.data.filter(
              (it) => it.accesstoken !== localStorage.getItem("token")
            )
          )
        );
      } catch (error) {
        setError(error.message);
      }
      setLoading(false);
    })();
  }, [url]);
  return [data, error, loading, setData];
};
export { useGetData };
