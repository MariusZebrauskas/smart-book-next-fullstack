

export const HTTP = () => {
  let url;
  if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
    //   development
    return (url = 'http://localhost:3000');
  } else {
    // production code
    return (url = "https://6276b3b93b8ea029fd6de7a6--statuesque-entremet-93144a.netlify.app");
  }
};


