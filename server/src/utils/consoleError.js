const consoleError = (error)=> {
  const date = new Date();
  console.log("-------------------");
  console.log(`${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`);
  console.log(error);
  console.log("-------------------\n");
}

module.exports = consoleError;