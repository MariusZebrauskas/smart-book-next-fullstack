

export const HTTP = () => {
  let url;
  if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
    //   development
    return (url = 'https://statuesque-entremet-93144a.netlify.app');
  } else {
    // production code
    return (url = "https://statuesque-entremet-93144a.netlify.app");
  }
};


