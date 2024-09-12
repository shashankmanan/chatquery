import { routes_urls } from "./routes"
import axios from "axios"

const getCarData = async (input) => {
    let baseURL = routes_urls["GET_ONE_DATA_CAR"]
    console.log(input)
    const newVal = input.value.replace(" ","%20")
    baseURL += `?${input.field}=${newVal}`
    try {
        const response = await axios.get(baseURL)
        if(response.status != 200)
            throw new Error()
        return {"status" : 200 , "data" : response.data}
    }catch(error) {
        return {"status" : 500 , "error" : 'true'}
    }
}

const getAllData = async () => {
    const baseURL = routes_urls['GET_ALL_DATA_CAR']  //"http://localhost:5000/cars/"
    
    
    try{ 
      const req = await axios.get(baseURL)

      if(req.status != 200) {
          console.log(500 + "SERVER_ERROR")
          return {status : 500 , "message" : "SERVER_ERROR" }
      }
      return {status : 200 , data : req.data}

    } catch(error) {
        return {status : 404 , "message" : "SERVER_NOT_FOUND" }
    }
  }

const deleteData = async (input) => {
    let baseURL = `${routes_urls["DELETE_ONE_CAR"]}${input}`
    try{ 
        const req = await axios.delete(baseURL)
  
        if(req.status != 200) {
            console.log(500 + "SERVER_ERROR")
            return {status : 500 , "message" : "SERVER_ERROR" }
        }
        return {status : 200 , data : req.data}
  
      } catch(error) {
          return {status : 404 , "message" : "SERVER_NOT_FOUND" }
      }
}  

export {
    getCarData,
    getAllData ,
    deleteData
}