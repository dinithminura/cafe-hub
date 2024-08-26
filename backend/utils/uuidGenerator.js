import { v4 as uuidv4 } from 'uuid';

const generateCafeID = () => {
  return uuidv4();
};

const generateEmployeeID = () => {
  const randomString = () => Math.random().toString(36).substr(2, 7).toUpperCase();
  return `UI${randomString()}`;
};

export { generateCafeID, generateEmployeeID };
