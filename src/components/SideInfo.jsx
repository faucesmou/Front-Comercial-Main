import React, { useEffect, useState } from "react";

const SideInfo = ({info}) => {
  const [operador, setOperador] = useState('')


  useEffect(()=>{

    return () => {
      switch(info.operador) {
        case '66a7edce1508ebca4070a637':
          setOperador('Jofre Jessica')
          break;
        case '66a7ee201508ebca4070a7d8':
          setOperador('Rojo Yesica')
          break;
        case '66a7eea51508ebca4070a9c8':
          setOperador('Lopez Mariela')
          break;
        case '66a7eef51508ebca4070aaff':
          setOperador('Cabello Daniela')
          break;
        case '66a7ef3f1508ebca4070acef':
          setOperador('Garcia Florencia')
          break;
        case '66a7ef931508ebca4070ae26':
          setOperador('Loiero Mariela')
          break;
        default:
      }
      
    }
    
    
  },[])
  
  
  return (
    <>
      <div className="fixed right-0  md:block hidden  text-gray-800 overflow-hidden  rounded-l-lg border-l border-gray-400   h-[365px] w-[calc(3.35rem)] border border-gray-400  bg-yellow-100 hover:w-56 hover:shadow-2xl pr-0 transition-all">
        <div className="absolute flex flex-col justify-between items-center py-1 m-0">
          <div className="relative left-0">
            <ul className="space-y-1 tracking-wide">
              {/* icono operador */}
              <li className="w-56 hover:bg-amber-200 pr-4 rounded-lg ">
               {/*  <a
                  href="#"
                  className="group flex items-center  space-x-7 rounded-md  py-3 text-gray-600"
                > */}
                <div className="flex p-4 space-around text-gray-600 items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6 ml-2 mr-3"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21.75 6.75a4.5 4.5 0 01-4.884 4.484c-1.076-.091-2.264.071-2.95.904l-7.152 8.684a2.548 2.548 0 11-3.586-3.586l8.684-7.152c.833-.686.995-1.874.904-2.95a4.5 4.5 0 016.336-4.486l-3.276 3.276a3.004 3.004 0 002.25 2.25l3.276-3.276c.256.565.398 1.192.398 1.852z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4.867 19.125h.008v.008h-.008v-.008z"
                    />
                  </svg>
                  <div className="flex flex-col">
                    {/* <span className="font-light">{info.operador}</span> */}
                    <span className="font-light">{info.op_nombre ? info.op_nombre : 'Jose Asistente'}</span>

                  </div>
                </div>
              </li>
              {/* icono condicion */}
              <li className="w-56 hover:bg-amber-200 pr-4 rounded-lg">
              {/*   <a
                  href="#"
                  className="group flex items-center  space-x-7 rounded-md  py-3 text-gray-600"
                > */}
                <div className="flex p-4 space-around text-gray-600 items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6 ml-1 mr-4"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6.429 9.75L2.25 12l4.179 2.25m0-4.5l5.571 3 5.571-3m-11.142 0L2.25 7.5 12 2.25l9.75 5.25-4.179 2.25m0 0L21.75 12l-4.179 2.25m0 0l4.179 2.25L12 21.75 2.25 16.5l4.179-2.25m11.142 0l-5.571 3-5.571-3"
                    />
                  </svg>

                  <span className="font-light">
                    {info.cotizacion ? info.cotizacion.provincia : 'Provincia'}
                  </span>
                </div>
              </li>
              
              <li className="w-56 hover:bg-amber-200 pr-4 rounded-lg">
              
                <div className="flex p-4 space-around text-gray-600 items-center">
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    strokeWidth="1.5" 
                    stroke="currentColor" 
                    className="w-6 h-6 ml-1 mr-4"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      d="M11.35 3.836c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m8.9-4.414c.376.023.75.05 1.124.08 1.131.094 1.976 1.057 1.976 2.192V16.5A2.25 2.25 0 0 1 18 18.75h-2.25m-7.5-10.5H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V18.75m-7.5-10.5h6.375c.621 0 1.125.504 1.125 1.125v9.375m-8.25-3 1.5 1.5 3-3.75" 
                    />
                  </svg>


                  <span className="font-light">
                  {info.cotizacion ? `T - $${info.cotizacion.titanium}` : 'Titanium'}
                  </span>
                </div>
              </li>

              <li className="w-56 hover:bg-amber-200 pr-4 rounded-lg">
            
                <div className="flex p-4 space-around text-gray-600 items-center">
                   <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    strokeWidth="1.5" 
                    stroke="currentColor" 
                    className="w-6 h-6 ml-1 mr-4"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      d="M11.35 3.836c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m8.9-4.414c.376.023.75.05 1.124.08 1.131.094 1.976 1.057 1.976 2.192V16.5A2.25 2.25 0 0 1 18 18.75h-2.25m-7.5-10.5H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V18.75m-7.5-10.5h6.375c.621 0 1.125.504 1.125 1.125v9.375m-8.25-3 1.5 1.5 3-3.75" 
                    />
                  </svg>

                  <span className="font-light">
                  {info.cotizacion ? `B - $${info.cotizacion.black}` : 'Black'}
                  </span>
                </div>
              </li>

              <li className="w-56 hover:bg-amber-200 pr-4 rounded-lg">
              
                <div className="flex p-4 space-around text-gray-600 items-center">

                   <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    strokeWidth="1.5" 
                    stroke="currentColor" 
                    className="w-6 h-6 ml-1 mr-4"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      d="M11.35 3.836c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m8.9-4.414c.376.023.75.05 1.124.08 1.131.094 1.976 1.057 1.976 2.192V16.5A2.25 2.25 0 0 1 18 18.75h-2.25m-7.5-10.5H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V18.75m-7.5-10.5h6.375c.621 0 1.125.504 1.125 1.125v9.375m-8.25-3 1.5 1.5 3-3.75" 
                    />
                  </svg>


                  <span className="font-light">
                    {info.cotizacion ? `P - $${info.cotizacion.platinum}` : 'Platinum'}
                  </span>
                </div>
              </li>

              <li className="w-56 hover:bg-amber-200 pr-4 rounded-lg">
                {/* <a
                  href="#"
                  className="group flex items-center  space-x-7 rounded-md  py-3 text-gray-600"
                > */}
                <div className="flex p-4 space-around text-gray-600 items-center">

                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  strokeWidth="1.5" 
                  stroke="currentColor" 
                  className="w-6 h-6 ml-1 mr-4"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z"  
                  />
                </svg>

                  <span className="font-light">
                    {info.cotizacion ? `GF: ${info.cotizacion.grupo} - CAT: ${info.cotizacion.categoria}` : 'GF - CAT'}
                  </span>
                </div>
              </li>

            </ul>
          </div>
        </div>
      </div>
    </>
  );
};


/**
 * 
 */

export default SideInfo;
