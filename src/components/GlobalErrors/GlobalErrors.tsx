import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { addGlobalError, deleteGlobalError } from '../../reducers/globalErrors';
import { RootState } from '../../store';

function GlobalErrors() {
  const messageList = useSelector((store: RootState) => store.globalErrors);
  const dispatch = useDispatch();

  useEffect(() => {
    const errrorHandler = (event: PromiseRejectionEvent) => {
      event.preventDefault();

      const message = event.reason?.message;

      if (message) {
        dispatch(addGlobalError(message));
      }
    };

    window.addEventListener('unhandledrejection', errrorHandler);

    return () => {
      window.removeEventListener('unhandledrejection', errrorHandler);
    };
  }, [dispatch]);

  useEffect(() => {
    messageList.forEach((message) => {
      toast(message, {
        onClose: () => {
          // нужно сделать синхронизацию с анимацией скрытия ошибки
          dispatch(deleteGlobalError(message));
        },
      });
    });
  }, [messageList, dispatch]);

  return <ToastContainer autoClose={3000} limit={3} position="bottom-right" hideProgressBar />;
}

export default GlobalErrors;
