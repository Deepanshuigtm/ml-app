
import React, { useState } from 'react';
import axios from 'axios';
import Image from 'next/image'
import { ThreeDots } from 'react-loader-spinner';
import { AiOutlineLoading } from "react-icons/ai";
import { CAlertLink, CAlert } from '@coreui/react';
import { CButton } from '@coreui/react';
import { CButtonGroup } from '@coreui/react';

const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';


const ImageFortText = () => {

    const [files, setFiles] = useState(null);
    const handleFileChanges = (e) => {
      const files = e.target.files;
      setFiles(files);
      setResponse('');
    }
    const isImage = (file) => file.type.startsWith('image');
    const isVideo = (file) => file.type.startsWith('video');

    const [response, setResponse] = useState('');

    const [loading, setLoading] = useState(false);

  const handleFileUpload = async (e) => {
    e.preventDefault();
    setResponse('');

    if (files) {
      setLoading(true)
      console.log("hii"+files)
      console.log(files)
      const formData = new FormData();
      formData.append('file', files[0]);
      setFiles(null);

      // Call your backend API to generate response
      try {
        const apiResponse = await axios.post(`${apiUrl}/api/flask/answering`, formData)
        console.log(apiResponse.data.answer)
        setResponse(apiResponse.data.answer);
        setLoading(false) // Assuming your API returns a 'response' field
      } catch (error) {
        console.error('Error fetching response from backend:', error);
      }
    }
    
    };
    interface TextAnswer {
      answer: string;
      start: number;
      end: number;
      score: number;
    }
    
    let textanswer: TextAnswer = {
      answer: "none'", // Initialize with appropriate values
      start: 0,
      end: 0,
      score: 0,
    };
    
    const [answer, setAnswer] = useState<TextAnswer>({
      answer: 'none',
      start: 0,
      end: 0,
      score: 0
    });
    const [newQues, setNewQues] = useState({question : '',context : ''});

    const textResponse = async (e : React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      try {
        const response = await axios.get(`${apiUrl}/api/flask/answering`)
        setAnswer(response.data.answer);
        console.log(textanswer);
        console.log(response.data.answer);
        textanswer = response.data.answer;
        console.log(textanswer);
      }catch (e){
        console.log('Error in creating user', e);
      }
    };

  return (
    <div className="flex items-center justify-center flex-col mt-24">
      {response != '' && <div>
        <p style={{ marginBottom: '40px', paddingLeft: '40px', paddingRight: '40px' }} >{response}</p>
        </div>}

        <div className='flex flex-col item-center justify-center'>
          {
            files && Array.from(files).map((file, index) =>{
              return (
                <div key={index} className='flex flex-col items-center justify-center'>
                  <div className='flex flex-col items-center justify-center'>
                    {
                      isImage(file) && (
                        <Image src={URL.createObjectURL(file)} width={500} height={500} alt={file}/>
                      )
                    }
                  </div>
                </div>
              )
            })
          }
        </div>
        {/* <button type='submit' onClick={handleFileUpload} className='w-full px-24 p-2 text-white bg-blue-500 rounded hover:bg-blue-600'>Submit</button> */}

        {files && <CAlert color="light">
          File Uploaded <CAlertLink href="#">Sucessfully</CAlertLink>. Click on Submit Button to Extract the text.
        </CAlert>}
        
        {!files && !loading && (
          <label className="cursor-pointer bg-white text-black py-2 px-4 rounded-lg shadow-lg">
          Upload File
          <input
            type="file"
            accept="audio/*,video/*"
            onChange={handleFileChanges}
            className="hidden"
            required
          />
        </label>
        )}

        {loading && <div className='flex items-center justify-center'>
        <div style={{ marginRight: '20px' }}>
          <p>Extracting the text. Please wait  </p>
        </div>
        <div>
          <ThreeDots
            visible={true}
            height="80"
            width="80"
            color="#ffffff"
            radius="5"
            ariaLabel="three-dots-loading"
            wrapperStyle={{}}
            wrapperClass=""
            />
        </div>
      </div>}
      {files && <button type="submit" onClick={handleFileUpload} className="mt-16 peer hidden whitespace-nowrap rounded-full bg-gray-50 px-10 py-2 font-normal text-gray-900 duration-300 hover:cursor-pointer hover:bg-gray-300 md:flex ">Submit</button>}
    </div>
  );
};

export default ImageFortText;