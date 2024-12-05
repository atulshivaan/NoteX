import {  useParams } from "react-router-dom"
import axios from "axios";
import { useState , useEffect } from "react";

const View = () => {
  
    const {id}= useParams()
    const [employee,setEmployee]=useState()
    
    useEffect(() => {
        const fetchEmployee = async () => {
         
          try {
            const response = await axios.get(`http://localhost:4040/api/employee/${id}`, {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            });
            if (response.data.success) {
              
              setEmployee(response.data.employee)
            }
          } catch (error) {
            if (error.response && error.response.data.error) {
              alert(error.response.data.error);
            }
          } 
        };
        fetchEmployee();
      }, []);
    

      return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
          <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold text-center text-gray-700 mb-6">Employee Details</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex items-center">
                <p className="text-lg font-semibold text-gray-600 mr-2">Name:</p>
                <p className="font-medium text-gray-700">{employee?.name}</p>
              </div>
              <div className="flex items-center">
                <p className="text-lg font-semibold text-gray-600 mr-2">Email:</p>
                <p className="font-medium text-gray-700">{employee?.email}</p>
              </div>
              <div className="flex items-center">
                <p className="text-lg font-semibold text-gray-600 mr-2">Phone:</p>
                <p className="font-medium text-gray-700">{employee?.phone}</p>
              </div>
              <div className="flex items-center">
                <p className="text-lg font-semibold text-gray-600 mr-2">Gender:</p>
                <p className="font-medium text-gray-700">{employee?.gender}</p>
              </div>
              <div className="flex items-center">
                <p className="text-lg font-semibold text-gray-600 mr-2">Department:</p>
                <p className="font-medium text-gray-700">{employee?.department.dep_name}</p>
              </div>
              <div className="flex items-center">
                <p className="text-lg font-semibold text-gray-600 mr-2">Course:</p>
                <p className="font-medium text-gray-700">{employee?.course}</p>
              </div>
              <div className="flex items-center">
                <p className="text-lg font-semibold text-gray-600 mr-2">Role:</p>
                <p className="font-medium text-gray-700">{employee?.role}</p>
              </div>
            </div>
            
          </div>
        </div>
      )
    }

export default View
