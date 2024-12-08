import axios from "axios";
import { useEffect, useState } from "react";

export const useGetMessages = (user) => {
  const [allMsg, setmsg] = useState([]);
  useEffect(() => {
    (async () => {
      try {
        const data = await axios.post(
          `http://localhost:5000/api/getmsg/${user._id}`,
          { token: localStorage.getItem("token") }
        );

        if (data.data.msg !== "error msg not get") {
          setmsg(data.data);
        }
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);
  return [allMsg];
};

export default useGetMessages;
