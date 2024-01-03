'use client';

import { useEffect } from 'react';
import EmptyState from './EmptyState';

const CustomErrorHandler = ({ error }: any) => {
   useEffect(() => {
      console.error(error);
   }, [error]);

   return <EmptyState title='Uh Oh' subtitle='Something went wrong' />;
};

export default CustomErrorHandler;
