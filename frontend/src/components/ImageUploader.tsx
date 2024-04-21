import React, { useState } from 'react';
import axios from 'axios';
import Image from 'next/image'

const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';


const ImageUploader = () => {

    const [fileContent, setFileContent] = useState(null);
    const [response, setResponse] = useState('');

    const [file, setFile] = useState<File | null>(null);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const formData = new FormData();
    const uploadedFile = e.target.files?.[0]; // Access the uploaded file from the event

    if (uploadedFile) {
      formData.append('file', uploadedFile);
      setFile(uploadedFile);
      console.log(uploadedFile)
      console.log(file)

      // Call your backend API to generate response
      try {
        const apiResponse = await axios.post(`${apiUrl}/api/flask/answering`,formData,{
            headers:{"Content-Type":"multipart/form-data"}
        })
        console.log(apiResponse)
        setResponse(apiResponse.data.response); // Assuming your API returns a 'response' field
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
      answer: "", // Initialize with appropriate values
      start: 0,
      end: 0,
      score: 0,
    };
    
    const [answer, setAnswer] = useState<TextAnswer>({
      answer: '',
      start: 0,
      end: 0,
      score: 0
    });
    const [newQues, setNewQues] = useState({question : '',context : ''});

    const textResponse = async (e : React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      try {
        const response = await axios.post(`${apiUrl}/api/flask/answer/text`, newQues)
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
    <form onSubmit={textResponse} className='mb-6 p-4 bg-black rounded shadow'style={{ backgroundColor: 'transparent' }}>
      <input 
        type="text"
        placeholder='Question'
        value={newQues.question}
        onChange={(e) => setNewQues({...newQues, question: e.target.value})}
        className='mb-2 w-full p-2 border-gray-300 rounded'
        style={{ backgroundColor: 'transparent', color: 'white' }}
      />


        <input 
        type="text"
        placeholder='Context'
        value={newQues.context}
        onChange={(e) => setNewQues({...newQues, context: e.target.value})}
        className='mb-2 w-full p-2 border-gray-300 rounded'
        style={{ backgroundColor: 'transparent', color: 'white' }}
        />
        <button type='submit' className='w-full p-2 text-black bg-gray-300 rounded hover:bg-gray-700 hover:text-white duration-300'>Submit</button>

      </form>
      {answer.answer != '' && <div>
        <p>Answer : {answer.answer}</p>
        <p>Score : {answer.score}</p>
        <p>Start: {answer.start}</p>
        <p>End : {answer.end}</p>
        </div>}
        {/* <label className="cursor-pointer bg-white text-black py-2 px-4 rounded-lg shadow-lg">
        Upload File
       <input
        type="file"
        accept=".pdf, .doc, .docx, application/msword, application/vnd.openxmlformats-officedocument.wordprocessingml.document"
        onChange={handleFileUpload}
        className="hidden"
        required
      />
      </label>
      {file && (
        <p>File Uploaded</p>
      )} */}
    </div>
  );
};

export default ImageUploader;
