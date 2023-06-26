const getRandomNumber = (max: number) => {
    const num = Math.floor(Math.random() * (max - 1)) + 1;
    return num;
  };
  
  const getRandomString = (length: number = 10) => {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    return result;
  };

  export default {
      getRandomNumber,
      getRandomString
  }