export const maskToken = (token)=>{
  if(!token) return "";
  return token.slice(0,4) + "****" + token.slice(-4);
};