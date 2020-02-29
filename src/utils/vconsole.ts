export default () => {
  if (process.env.NODE_ENV === 'development') {
    import('vconsole')
      .then((m) => {
        const VConsole = m.default;
        const vconsole = new VConsole();
        console.info(`vconsole init, version is ${vconsole.version}`);
      });
  }
};
