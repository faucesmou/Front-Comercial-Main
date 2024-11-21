import React from 'react'
import { Link } from 'react-router-dom'
import ItemCarga from './ItemCarga'

const SidebarCarga = () => {


  return (
    <>
        <aside className="md:w-80 lg:w-3/12 px-5 pt-20 bg-gray-100 overflow-hidden  border-r border-stone-400 h-full md:block hidden flex flex-col">
          <ItemCarga titulo={'Cargar Excel'} ruta={'/herramientas/carga-excel'}/>
          <ItemCarga titulo={'Descargar Excel'} ruta={'/herramientas/descarga-excel'}/>

           
        </aside>
    </>
  )
}

export default SidebarCarga