import React, { useState, useEffect } from 'react'
import { useChats } from '../hooks/useChats';

const CargaExcel = () => {
    const [addFile, setAddFile] = useState(null);
    const [error, setError] = useState('')

    const { cargaExcel } = useChats()

    useEffect(()=>{
        setAddFile(null)
        setError('')
    },[])

    useEffect(()=>{
        setAddFile(null)
    },[error])


    const handleAddFile = (e) => {
        const file = e.target.files[0];

        setAddFile(file)

    }
    

    const handleSubmit = async (e) => {
        e.preventDefault()

        if(addFile){
            const result = await cargaExcel(addFile)
            
            if(result.status === 400){
                setAddFile(null)
                setError(result.errors[0].msg)
            }

            if(result.status === 200){
                setError('')
                alert(result.msg)
            }
            
        }else{
            setError('Debe cargar un archivo con extensión .xlsx')
        }
        
    }
    
  return (
    <div className='w-full h-full p-4 bg-slate-300 text-white bold rounded-lg shadow-lg'>
        <form 
            action=""
            className='flex flex-col gap-4 justify-center w-full h-full'
        >
            <div className='flex flex-col gap-4 bg-slate-500 py-8 rounded px-4 shadow-lg'>
                <label 
                    htmlFor="file" 
                    className='bg-slate-400 p-1 rounded text-center shadow text-gray-800'
                >
                    Cargue un archivo (.xlsx)
                </label>
                <input 
                    type="file" 
                    id='file' 
                    name='file'
                    accept='.xlsx'
                    className='bg-slate-400 text-gray-800 rounded'
                    onChange={handleAddFile}
                />
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
                Cargar Excel
            </button>
        </form>
    </div>
  )
}

export default CargaExcel