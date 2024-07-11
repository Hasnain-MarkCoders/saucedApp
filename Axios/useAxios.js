import  axios from 'axios';
import { useDispatch, useSelector } from "react-redux";
import { handleAuth } from '../android/app/Redux/userReducer';
import { useNavigation } from "@react-navigation/native";
//export const host =  "http://localhost:5000"
export const host =  "https://aws.markcoders.com/sauced-backend/api"

const useAxios = () => {
  const auth = useSelector((state) => state?.auth);
  const dispatch = useDispatch();
  const navigation = useNavigation()
  const token = auth.token;
  const axiosInstance = axios.create({
    // baseURL: host,
    baseURL:host,
    validateStatus: function (status) {
      return status >= 200 && status < 300; // default
    }
  });
  axiosInstance.interceptors.request.use(
    (config) => {
      config.headers["Authorization"] = `Bearer ${token}`;
      return config;
    },
    (error) => Promise.reject(error)
  );
  axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
      if (error?.response?.status === 480) {
        dispatch(
          handleAuth({
              "token": null,
              "uid": null,
              "name": null,
              "email": null,
              "provider":null,
              "type":null,
              "status":null,
              "_id": null,
          })
        );
        navigation.navigate("SignIn");
      
        
      }
      
    }
  );
  return axiosInstance;
};
export default useAxios;
