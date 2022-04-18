export const playTurnSound = () => {
  // it is the case when we really can catchall for the sake of ux
  try {
    // one context per document
    const context = new (window.AudioContext || (window as any).webkitAudioContext)();
    const osc = context.createOscillator();
    osc.type = 'sine'; // this is the default - also square, sawtooth, triangle
    osc.frequency.value = 440; // Hz
    osc.connect(context.destination);
    osc.start();
    osc.stop(context.currentTime + 0.5);
  } catch (e) {
    console.error('Error playing sound', e);
  }
};
