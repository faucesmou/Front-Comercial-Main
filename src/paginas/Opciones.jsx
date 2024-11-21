import React, { useEffect, useState } from 'react'
import {useLocation} from 'react-router-dom'
import CargaExcel from '../components/CargaExcel'
import DescargaExcel from '../components/DescargaExcel'

const Opciones = () => {

  const [cargaExcel,setCargaExcel] = useState(false)
  const [descargaExcel,setDesargaExcel] = useState(false)

  const location = useLocation()
  const path = location.pathname.split('/')[2]

  const limpiar = () => {
    setCargaExcel(false)
    setDesargaExcel(false)
  }

  

  useEffect(()=>{
    limpiar()

   
    switch(path){
      case "carga-excel":
        setCargaExcel(true)
        break;
      case "descarga-excel":
        setDesargaExcel(true)
        break;
    }
  },[path])

  const handleSubmit = (e) => {
    e.preventDefault()

    alert('tengo que cargar el excel')
  }

  

  
  return (
    <div className="bg-gray-200 w-full h-full flex justify-center items-center py-28 px-60">
        {cargaExcel && (
          <CargaExcel />
        )}
        {descargaExcel && (
          <DescargaExcel />
        )}
    </div>
  )
}

export default Opciones