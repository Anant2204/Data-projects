import React, { createContext, useContext, useEffect, useState } from 'react';
 
const MyContext = createContext(undefined);
 
interface MyContextProps {   // Define your component props here
    message: string;
   }
const MyContextProvider : React.FC<MyContextProps> = ({ children,message }) => {
  const [contextValue, setContextValue] = useState(() => {
   
    const storedData = sessionStorage.getItem(`myContextData_${message}`);
    return storedData ? JSON.parse(storedData) : { data:[] };
  });
 
  const updateContextData = (newData) => {
    setContextValue((prevContextValue) => ({
      ...prevContextValue,
      data: newData,
    }));
  };
 
  useEffect(() => {
    // Save the context data to local storage whenever it changes
    sessionStorage.setItem(`myContextData_${message}`, JSON.stringify(contextValue));
  }, [contextValue, message]);
 
  contextValue.updateContextData = updateContextData;
 
  return <MyContext.Provider value={contextValue}>{children}</MyContext.Provider>;
};
 
const useMyContext = () => {
  return useContext(MyContext);
};
 
export { MyContextProvider, useMyContext };


