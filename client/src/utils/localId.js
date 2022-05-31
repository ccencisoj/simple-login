import { nanoid } from 'nanoid';

const createLocalId = ()=> {
  return `local#id-${nanoid()}`;
}

const isLocalId = (value)=> {
  return String(value).startsWith("local#id-");
}

export { createLocalId, isLocalId };