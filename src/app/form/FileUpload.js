"use client"
import { useState } from "react"

export default function FileUpload() {
    const [file, setFile] = useState(null);
    
    const handleFileChange = (e) => {
        e.preventDefault()
        setFile(e.target.files[0]);
        console.log(`File uploaded - ${file}`)
    }
    
    // const handleUpload = async (e) => {
    //     e.preventDefault();
    //     if (!file) {
    //         alert("Please upload a file.")
    //         return;
    //     }
    //     const formData = FormData()
    //     formData.append("file",file)

    // }
    return (
        <>
              <input type="file" 
              className="bg-white-500 hover:bg-white-700 text-black font-bold py-2 px-4 flex items-center gap-2 rounded"
              name="resume"
              accept="application/pdf"
              onChange={handleFileChange} 

              />
        </>
    )
}
