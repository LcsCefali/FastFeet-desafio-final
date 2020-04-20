import React from 'react';
import { useSelector } from 'react-redux';
import createRouter from './routes';

export default function src() {
  const signed = useSelector((state) => state.auth.signed);

  return createRouter(signed);
}
