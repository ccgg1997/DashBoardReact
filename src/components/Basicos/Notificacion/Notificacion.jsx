import React, { useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Notificacion = ({ mensaje, tipoNotificacion, mostrarNotificacion }) => {
    useEffect(() => {
      if (mostrarNotificacion) {
        if (tipoNotificacion === 'success') {
          toast.success(mensaje, {
            position: 'top-right',
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined
          });
        } else if (tipoNotificacion === 'error') {
          toast.error(mensaje, {
            position: 'top-right',
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined
          });
        }
      }
    }, [mensaje, tipoNotificacion, mostrarNotificacion]);
  
    return (
      <div>
        <ToastContainer />
      </div>
    );
  };
  
export default Notificacion;
