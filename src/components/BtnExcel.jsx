import React from 'react'
import * as XLSX from 'xlsx';


const BtnExcel = ({data, nombreArchivo, nombreHoja}) => {

    const descargarDatos = async (e) => {
        e.preventDefault()
        try {
            const ws = XLSX.utils.json_to_sheet(data);
            const wb = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(wb, ws, nombreHoja );
            XLSX.writeFile(wb, `${nombreArchivo}.xlsx`);
        } catch (error) {
            console.error('Error al descargar el archivo:', error);
        }
    }
  return (
    <div>BtnExcel</div>
  )
}

export default BtnExcel