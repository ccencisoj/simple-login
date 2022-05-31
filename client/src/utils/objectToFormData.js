import mapObject from 'utils/mapObject';

const objectToFormData = async (object)=> {

  object = await mapObject(object, async (value)=> {
    if(typeof value === "string" && 
      value.startsWith("blob:http:")) 
        return await fetch(value).then((r)=> r.blob());
      return value;
  });

  const formData = new FormData();

  for(const key in object) 
    formData.append(key, object[key]);

  return formData;
}

export default objectToFormData;  