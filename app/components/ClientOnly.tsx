'use client';

import React, { useEffect, useState } from 'react';

type ClientOnlyProps = {
   children: React.ReactNode;
};

/**
 * The `ClientOnly` component is a React functional component that conditionally renders its children
 * This component is rendered intentionally to avoid hyration errors
 * only when it is mounted on the client side.
 * @param  - - `ClientOnly`: The name of the functional component.
 * @returns The component is returning the children passed to it.
 */
const ClientOnly: React.FC<ClientOnlyProps> = ({ children }) => {
   const [isMounted, setIsMounted] = useState(false);

   useEffect(() => {
      setIsMounted(true);
   }, []);

   if (!isMounted) {
      return null;
   }

   return <>{children}</>;
};

export default ClientOnly;
