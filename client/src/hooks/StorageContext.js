import React, { useContext, createContext, 
  useRef, useEffect, useState } from 'react';

const StorageContext = createContext({});

const StorageProvider = (props)=> {
  const { children } = props;
  const ref = {fileInput: useRef()};

  const [value, setValue] = useState({
    loadImage: null
  });

  useEffect(()=> {
    const fileInput = ref.fileInput.current;
    let currentCallback = ()=> 1;

    const loadImage = (callback)=> {
      fileInput.value = "";
      currentCallback = callback;
      fileInput.multiple = false;
      fileInput.accept = ".jpg, .png, .svg";
      fileInput.click();
    }
    
    const onChanged = (ev)=> {
      if(ev.target.files.length)
      currentCallback(ev.target.files[0]);
    } 

    setValue({loadImage});
    fileInput.addEventListener("change", onChanged);
    return ()=> fileInput.removeEventListener("change", onChanged);
  }, [props]);

  return (
    <StorageContext.Provider 
      value={value}>
      <input type="file" 
        ref={ref.fileInput} 
        style={{display: "none"}} />
      {children}
    </StorageContext.Provider>
  )
}

const useStorage = ()=> {
  return useContext(StorageContext);
}

export { StorageProvider, useStorage };