import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import * as XLSX from 'xlsx';

// Función para exportar datos a PDF
export const exportToPDF = (filteredUsers: any[]) => {
  const doc = new jsPDF(); // Creación de documento PDF usando jsPDF
  doc.text('Lista de Usuarios', 14, 10); // Título del PDF

  // Columnas y filas
  const columns = ['ID', 'Nombre', 'Correo', 'Teléfono', 'Compañía'];
  const rows = filteredUsers.map((user) => [
    user.id,
    user.name ?? 'No disponible', // Si name es undefined, mostrar 'No disponible'
    user.email ?? 'No disponible', // Si email es undefined, mostrar 'No disponible'
    user.phone ?? 'No disponible', // Si phone es undefined, mostrar 'No disponible'
    user.company.name ?? 'No disponible', // Si company.name es undefined, mostrar 'No disponible'
  ]);

  // Tabla para el documento 
  autoTable(doc, {
    head: [columns],
    body: rows,
    startY: 20, // Espacio donde comenzará la tabla
  });

  doc.save('usuarios.pdf'); // Guardar el archivo
};

// Función para exportar datos a Excel con bordes
export const exportToExcel = (filteredUsers: any[]) => {
  // Transformación de datos para utilizar las propiedades requeridas
  const transformedUsers = filteredUsers.map((user) => ({
    id: user.id,
    name: user.name ?? 'No disponible', // Si name es undefined, mostrar 'No disponible'
    email: user.email ?? 'No disponible', // Si email es undefined, mostrar 'No disponible'
    phone: user.phone ?? 'No disponible', // Si phone es undefined, mostrar 'No disponible'
    company: user.company.name ?? 'No disponible', // Si company.name es undefined, mostrar 'No disponible'
  }));

  const ws = XLSX.utils.json_to_sheet(transformedUsers); // Conversión de datos a hoja de Excel
  const wb = XLSX.utils.book_new(); // Creación de un nuevo libro de trabajo
  XLSX.utils.book_append_sheet(wb, ws, 'Usuarios'); // Añadir la hoja al libro

  // Obtener el rango de celdas
  const sheet = wb.Sheets['Usuarios'];
  const ref = sheet['!ref'] || 'A1:E1'; // Usar un valor por defecto si no existe el rango de celdas
  const range = XLSX.utils.decode_range(ref); // Obtener el rango de celdas de la hoja

  // Aplicar bordes a todas las celdas
  for (let row = range.s.r; row <= range.e.r; row++) {
    for (let col = range.s.c; col <= range.e.c; col++) {
      const cellAddress = { c: col, r: row }; // Dirección de la celda
      const cellRef = XLSX.utils.encode_cell(cellAddress); // Convertir la dirección en referencia de celda

      if (!sheet[cellRef]) continue;

      // Aplicar bordes a la celda
      sheet[cellRef].s = {
        border: {
          top: { style: 'thin', color: { rgb: '000000' } }, // Borde superior
          right: { style: 'thin', color: { rgb: '000000' } }, // Borde derecho
          bottom: { style: 'thin', color: { rgb: '000000' } }, // Borde inferior
          left: { style: 'thin', color: { rgb: '000000' } }, // Borde izquierdo
        },
      };
    }
  }

  // Escribir el archivo Excel
  XLSX.writeFile(wb, 'usuarios.xlsx');
};