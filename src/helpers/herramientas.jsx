export const limpiarNumero = (numero) => {
  let celular = numero.split("@")[0];
  return celular;
};

export const formatearFecha = (fecha) => {
  const nuevaFecha = fecha.split("T")[0].split("-").reverse().join("/");
  return nuevaFecha;
};

export const fcoBusqueda = (arreglo, cadena) => {
  const regex = new RegExp(cadena.toLowerCase());
  const busquedaTelefono = arreglo.filter((elemento) =>
    regex.test(elemento.telefono)
  );

  const busquedaEmail = arreglo.filter((elemento) =>
    regex.test(elemento.email)
  );

  if (busquedaEmail.length > busquedaTelefono.length) {
    return busquedaEmail;
  } else {
    return busquedaTelefono;
  }
};

/**
 * Funcion para comparar dos fechas y devolver true en el caso de que hayan pasado 24hs
 */
export const fnDoceHoras = (ultimo) => {

  const argentinaTime = new Intl.DateTimeFormat('es-AR', {
    timeZone: 'America/Argentina/Buenos_Aires',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    hour12: false,  // Formato de 24 horas
  }).format(new Date());
 
 
  const arregloFecha = argentinaTime.split(', ')

  const horaFecha = arregloFecha[1].split(':')[0]
  const horaUltimo = ultimo.hora.split(':')[0]

  const fechaAño = arregloFecha[0].split('/')[2]
  const fechaMes = arregloFecha[0].split('/')[1]
  const fechaDia = arregloFecha[0].split('/')[0]

  const ultimoAño = ultimo.fecha.split('/')[2]
  const ultimoMes = ultimo.fecha.split('/')[1]
  const ultimoDia = ultimo.fecha.split('/')[0]

  const dateToday = new Date(`${fechaAño}-${fechaMes}-${fechaDia}T${horaFecha}:${arregloFecha[1].split(':')[1]}:00`)
  const dateUltimo = new Date(`${ultimoAño}-${ultimoMes}-${ultimoDia}T${horaUltimo}:${ultimo.hora.split(':')[1]}:00`)

  const diferencia = dateToday - dateUltimo
  const resultado = diferencia / (1000*60*60)

  return resultado

}
