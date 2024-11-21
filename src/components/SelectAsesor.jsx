import React, { useEffect, useState } from 'react'
import clienteAxios from '../config/clienteAxios'
import { useNavigate, useLocation } from "react-router-dom";

import axios from 'axios'
import { jwtDecode } from "jwt-decode";
import { config } from 'tailwind-scrollbar-hide';


const SelectAsesor = ({telefono}) => {
    const [asesores, setAsesores] = useState([])
    const [dataChat, setDataChat] = useState({})
    const [seletected, setSelected] = useState('')
    const [opNombre, setOpNombre] = useState('')
    let cond = false

    const token = localStorage.getItem("token");

    const navigate = useNavigate()
    const location = useLocation()
    const ruta = location.pathname.split('/')[1]
    

    useEffect(() => {
        
        const inicio = async () => {
            
            const config = {
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${token}`,
                },
            };
            
            const [{data},{data: data2}]  = await Promise.all([
                clienteAxios.get('user/asesores'),
                clienteAxios.post(
                    "/chats/buscar-chat",
                    { numero: telefono },
                    config
                )
            ])
           
            setDataChat(data2)
            
            setAsesores(data)
            
        }
        inicio()


        return () => {
            // setDataChat(info)
            // console.log(dataChat);
        }
    },[])

    useEffect(()=>{
        asesores.map((asesor) => {
            
        })
    },[dataChat])

    const handleChange = (e) => {
        // console.log(e.target);
        const selectedIndex = e.target.options.selectedIndex;
        const text = e.target.options[selectedIndex].text;
        setSelected(e.target.value)
        setOpNombre(text)
        
    }

    const handleClick = async () => {
        try {

            const config = {
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${token}`,
                },
            };

            const { data } = await clienteAxios.post(
                "/user/asignar-asesor",
                { id: seletected, nombre: opNombre, telefono, ruta },
                config
            )

            if(data.msg === 'OK'){
                alert('Asesor asignado correctamente')
                navigate(`/${ruta}`)
            }
            
            
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className='flex flex-col'>
            <select className='bg-slate-600 p-2 rounded-lg w-fit h-fit text-gray-200' value={seletected} onChange={handleChange}>
                <option value='' key='alkdsjflk'>Asesores</option>
                {asesores.map(asesor => (
                    (
                        <option value={asesor._id} key={asesor._id}>{asesor.username}</option>
                    )

                   /*  return (
                        <option value={asesor._id} key={asesor._id}>{asesor.username}</option>

                    ) */
                ))}
            </select>
            <button className='bg-indigo-400 rounded-lg mt-2 p-1 hover:bg-indigo-600 text-white'  onClick={handleClick}>
                Asignar
            </button>
        </div>
      
    )
}

export default SelectAsesor