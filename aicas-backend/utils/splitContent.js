const splitContent = (text) => {
  const title = text.split("\n")[0];
  const body = text.substring(title.length).trim();

  return { title, body };
};