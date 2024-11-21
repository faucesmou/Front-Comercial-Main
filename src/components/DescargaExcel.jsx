import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { useChats } from '../hooks/useChats'
import * as XLSX from "xlsx"

const DescargaExcel = () => {
    const [currentDate,setCurrentDate] = useState('')
    const [desde, setDesde] = useState('')
    const [hasta,setHasta] = useState('')
    const [error,setError] = useState('')

    const { primeraGestion } = useChats()

    const today = new Date()
    const location = useLocation()

    useEffect(()=>{
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const day = String(today.getDate()).padStart(2, '0');
        const formattedDate = `${year}-${month}-${day}`;
    
        // Establecer la fecha formateada
       
        setCurrentDate(formattedDate);
      
    },[])

    useEffect(() => {
        setDesde(currentDate)
        setHasta(currentDate)
    }, [currentDate])

    const descargarDatos = async ( data, nombreHoja, nombreArchivo ) => {
        try {
            const ws = XLSX.utils.json_to_sheet(data);
            const wb = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(wb, ws, nombreHoja );
            XLSX.writeFile(wb, `${nombreArchivo}.xlsx`);
        } catch (error) {
            console.error('Error al descargar el archivo:', error);
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

       

        const desdeDate = new Date(desde)
        const hastaDate = new Date(hasta)
        
        
        if(desdeDate > hastaDate) {
            // setError('La fecha Desde debe ser anterior a la fecha Hasta')
            setError('Error en las fechas')
            return
        }
        
        
        const resultado = await primeraGestion(desde,hasta)
        descargarDatos(resultado.chats,'1°Gestión','primera-gestion')
        
    }

    return (
        <div className='w-full h-full p-4 bg-slate-300 text-white bold rounded-lg shadow-lg'>
            <form 
                action=""
                className='flex flex-col gap-4 justify-center w-full h-full'
            >
                <div className='flex flex-col gap-4 bg-slate-500 py-8 rounded px-4 shadow-lg'>
                    <h3 
                        className='bg-slate-400 p-1 rounded text-center shadow text-gray-800'
                    >
                        Seleccione las fechas para la descarga del archivo
                    </h3>
                    <div className='flex w-full justify-between gap-4'>
                        <div className='w-full'>
                            <label 
                                htmlFor="desde" 
                                className='block text-gray-800 bg-slate-400 p-1 rounded-t w-full text-center'
                            >
                                Desde
                            </label>
                            <input 
                                type="date" 
                                id='desde' 
                                name='desde'
                                max={currentDate}
                                value={desde}
                                className='bg-slate-400 text-gray-800 rounded-b w-full'
                                onChange={(e) => setDesde(e.target.value)}
                            />
                        </div>

                        <div className='w-full'>
                            <label 
                                htmlFor="hasta" 
                                className='block text-gray-800 bg-slate-400 p-1 rounded-t w-full text-center'
                            >
                                Hasta
                            </label>
                            <input 
                                type="date" 
                                id='hasta' 
                                name='hasta'
                                max={currentDate}
                                value={hasta}
                                className='bg-slate-400 text-gray-800 rounded-b w-full'
                                onChange={(e) => setHasta(e.target.value)}
                            />
                        </div>
                      
                       
                    </div>
                   
                </div>
                {error !== '' && (
                    <div className='flex w-full  bg-red-500 rounded'>
                        <h3 className='rounded p-1 text-center w-full'>
                            {error}
                        </h3>
                    </div>
                )}
               
                <button 
                    type='submit'
                    className='w-full rounded p-2 bg-indigo-400 hover:bg-indigo-600 shadow-lg' 
                    onClick={(e) => handleSubmit(e)}
                >
                    Descarga Excel
                </button>
            </form>
        </div>
    )
}

export default DescargaExcel