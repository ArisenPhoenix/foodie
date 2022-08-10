const Delay = new Promise((resolve, ms) => {
  const delay = setTimeout(resolve, ms);
  return delay;
});

// const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export default Delay;
