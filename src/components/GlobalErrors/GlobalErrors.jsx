import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { addGlobalError, deleteGlobalError } from '../../reducers/globalErrors';

function GlobalErrors() {
  const messageList = useSelector((store) => store.globalErrors);
  const dispatch = useDispatch();

  useEffect(() => {
    const errrorHandler = (event) => {
      event.preventDefault();

      dispatch(addGlobalError(event.reason.message));
    };

    window.addEventListener('unhandledrejection', errrorHandler);

    return () => {
      window.removeEventListener('unhandledrejection', errrorHandler);
    };
  }, [dispatch]);

  useEffect(() => {
    messageList.forEach((message) => {
      dispatch(deleteGlobalError(message));

      toast(message);
    });
  }, [messageList, dispatch]);

  return <ToastContainer autoClose={3000} limit={3} position="bottom-right" hideProgressBar />;
}

export default GlobalErrors;
