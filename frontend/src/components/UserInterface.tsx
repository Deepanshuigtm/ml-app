import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CardComponent from './CardComponent';
import { parse } from 'path';

interface User {
  id: number;
  name: string;
  email: string;
}

interface UserInterfaceProps {
  backendName: string;
}

const UserInterface : React.FC<UserInterfaceProps> = ({ backendName }) => {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

  const [users, setUsers] = useState<User[]>([]);
  const [newUser, setNewUser] = useState({name : '',email : ''});
  const [updateUser, setUpdateUser] = useState({ id: '', name: '', email:''});

  const backgroundColors :{[key : string]: string} = {
    flask : 'bg-blue-500'
  }
  const buttonColors :{[key : string]: string} = {
    flask : 'bg-blue-700 hover:bg-blue-600'
  }

  const bgColor = backgroundColors[backendName as keyof typeof backgroundColors] || 'bg-blue-200';
  const btnColor = buttonColors[backendName as keyof typeof buttonColors] || 'bg-blue-500 hover:bg-blue-600';

  // fetch user

  useEffect(() => {
    const fetchData = async () =>{
      try{
        const response = await axios.get(`${apiUrl}/api/${backendName}/users`)
        setUsers(response.data.reverse());
        console.log(users);
      }catch (error){
        console.log('Error in fetching the data', error);
      }
    };

    fetchData();
  },[backendName,apiUrl]);

  // create user
  const createUser = async (e : React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${apiUrl}/api/${backendName}/users`, newUser)
      setUsers([response.data,...users]);
      setNewUser({name:'', email:''});
    }catch (e){
      console.log('Error in creating user', e);
    }
  };
  // update user
  const handleUpdateUser = async (e : React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('wedewd')
    try {
      await axios.put(`${apiUrl}/api/${backendName}/users/${updateUser.id}`, { name: updateUser.name, email: updateUser.email});
      setUpdateUser({id:'', name:'', email: ''});
      console.log('wedewd3')
      setUsers(
        users.map((user)=>{
          if(user.id === parseInt(updateUser.id)){
            console.log('wedewd4')
            return ({...user, name: updateUser.name, email: updateUser.email});
          }
          return user;
        })
      );
      
    }catch (e){
      console.log('Error in creating user', e);
    }
  };
  // delete user
  const deleteUser = async (userId: number) => {
    try{
      await axios.delete(`${apiUrl}/api/${backendName}/user/${userId}`)
      setUsers(users.filter(user=> user.id !== userId))
    }catch (e){
      console.log("error deleting user", e);
    }
  };

  return (
    <div className={`user-interface ${bgColor} ${backendName} w-full max-w-md p-4 my-4 rounded shadow`}>
      <img src={`/${backendName}logo.svg`} alt={`${backendName} Logo`} className="w-20 h-20 mb-6 mx-auto" />
      <h2 className="text-xl font-bold text-center text-white mb-6">{`${backendName.charAt(0).toUpperCase() + backendName.slice(1)} Backend`}</h2>

      <form onSubmit={handleUpdateUser} className='mb-6 p-4 bg-blue-100 rounded shadow'>
        <input 
        placeholder='User Id'
        value={updateUser.id}
        onChange={(e) => setUpdateUser({...updateUser, id: e.target.value})}
        className='mb-2 w-full p-2 border-gray-300 rounded'
        />
        <input 
        placeholder='Name'
        value={updateUser.name}
        onChange={(e) => setUpdateUser({...updateUser, name: e.target.value})}
        className='mb-2 w-full p-2 border-gray-300 rounded'
        />

        <input 
        placeholder='Email'
        value={updateUser.email}
        onChange={(e) => setUpdateUser({...updateUser, email: e.target.value})}
        className='mb-2 w-full p-2 border-gray-300 rounded'
        />
        <button type='submit' className='w-full p-2 text-white bg-blue-500 rounded hover:bg-blue-600'>update User</button>

      </form>


      <form onSubmit={createUser} className='mb-6 p-4 bg-blue-100 rounded shadow'>
        <input 
        placeholder='Name'
        value={newUser.name}
        onChange={(e) => setNewUser({...newUser, name: e.target.value})}
        className='mb-2 w-full p-2 border-gray-300 rounded'
        />

        <input 
        placeholder='Email'
        value={newUser.email}
        onChange={(e) => setNewUser({...newUser, email: e.target.value})}
        className='mb-2 w-full p-2 border-gray-300 rounded'
        />
        <button type='submit' className='w-full p-2 text-white bg-blue-500 rounded hover:bg-blue-600'>Add User</button>

      </form>
      <div className="space-y-4">
        {users.map((user) => (
          <div key={user.id} className="flex items-center justify-between bg-white p-4 rounded-lg shadow">
            <CardComponent card={user} />
            <button onClick={() => deleteUser(user.id)} className={`${btnColor} text-white py-2 px-4 rounded`}>
              Delete User
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
export default UserInterface