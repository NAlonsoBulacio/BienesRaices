'use client';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import MensajesPerfil from './MensajesPerfil';
import { useSession } from 'next-auth/react';

export default function Mensajes() {
  const session = useSession();
  // const id = session.data.user.id;

  const [viewUsers, setViewUsers] = useState([]);

  useEffect(() => {
    fetchDataUsers();
  }, []);

  const fetchDataUsers = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3001/appraisals/${id}`
      );
      const data = response.data;
      setViewUsers([data]);
    } catch (error) {
      // Manejar el error de la solicitud
    }
  };
console.log(viewUsers);
  return (
    <div id="last-users">
      <h1 className="font-bold py-4 uppercase">Mensajes contactados</h1>
      <table className="w-full whitespace-nowrap">
        <thead className="bg-black/60">
          <th className="text-left py-3 px-2 rounded-l-lg">Tipo de mensaje</th>
          <th className="text-left py-3 px-2">Estado</th>
          <th className="text-left py-3 px-2">Fecha</th>
        </thead>
        {viewUsers.map((message) => (
          <MensajesPerfil
            key={message ? message.id : ''}
            address={message ? message.address : ''}
            callTime={message ? message.callTime : ''}
            comment={message ? message.comment : ''}
            email={message ? message.email : ''}
            id={message ? message.userId : ''}
            lastName={message ? message.lastName : ''}
            mobile={message ? message.mobile : ''}
            name={message ? message.name : ''}
            phone={message ? message.phone : ''}
          />
        ))}
      </table>
    </div>
  );
}