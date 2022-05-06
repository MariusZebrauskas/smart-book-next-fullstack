

export const HTTP = () => {
  let url;
  if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
    //   development
    return (url = 'http://localhost:3000');
  } else {
    // production code
    return (url = "http://localhost:3000");
  }
};


