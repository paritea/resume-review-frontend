'use client'
import { useState } from "react"
import FileUpload from "./FileUpload"

export default () => {
  const [file, setFile] = useState(null)
  const [jobDesc, setJobDesc] = useState("")
  const handleFileChange = (e) => {
    e.preventDefault();
    setFile(e.target.files[0]);
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (file === null){
      alert("Please upload a file");
      return;
    }
    const formData = new FormData();
    formData.append("file", file)
    try {
      const response = await fetch(`http://127.0.0.1:8000/upload?job_description=${encodeURIComponent(jobDesc)}`, 
        {
          method: "POST",
          headers:{
            Accept: "application/json"
          },
          body: formData
        } 
      );
      
      if (!response.ok){
        throw new Error("Failed to upload file")
      }

      const result =  await response.json()
      console.log(`Response - ${JSON.stringify(result)}`)      

    } catch (error) {
      console.error("error found")
    }
  }

  return (
    <div className="grid place-content-center h-screen gap-6">
      <form onSubmit={handleSubmit}> 
        <div className="mb-2 flex flex-col justify-center items-center">
          <label className="text-center text-lg font-semibold mb-2">Upload your resumé to get started</label>
          <input
            type="file"
            className="block mx-auto bg-white border border-gray-300 text-black font-medium py-2 px-4 rounded cursor-pointer"
            name="resume"
            accept="application/pdf"
            onChange={handleFileChange}
          />
        </div>
        <div className="mt-6 mb-2 flex flex-col justify-center items-center">
          <label className="block text-lg font-semibold mb-2" htmlFor="job-desc">Job Description (optional)</label>
          <input type="text" id="job-desc" value={jobDesc} onChange={(e) => setJobDesc(e.target.value)} className="border mx-auto py-2 px-4 rounded"/>
        </div>
        <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-6 flex items-center gap-2 rounded mx-auto"
        onClick={handleSubmit}
        >
          Upload
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1}
            stroke="currentColor"
            className="w-5 h-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3"
            />
          </svg>
        </button>
      </form>
    </div>


  )
}
