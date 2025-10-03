function waveFlagCanvas(canvasElement, imgAddress) {
  const canvas = document.getElementById(canvasElement);
  // console.log(canvasElement);
  const ctx = canvas.getContext("2d");
  // console.log(ctx);

  const img = new Image();
  img.src = imgAddress;
  img.crossOrigin = "anonymous";

  img.onload = () => {
    const canvasWidth = canvas.width;
    const canvasHeight = canvas.height;
    const imgWidth = img.width;
    const imgHeight = img.height;

    // Calculate offsets to center image
    const offsetX = (canvasWidth - imgWidth) / 2;
    const offsetY = (canvasHeight - imgHeight) / 2;
    let time = 0;

    function waveFlag() {
      ctx.clearRect(0, 0, canvasWidth, canvasHeight);

      const amplitude = 10; // vertical wave height
      const wavelength = 50; // controls number of waves
      const speed = 0.05; // animation speed

      for (let x = 0; x < imgWidth; x++) {
        const offset = Math.sin(x / wavelength + time) * amplitude;
        // console.log(offset);
        ctx.drawImage(
          img,
          x,
          0,
          1,
          imgHeight, // source column
          x + offsetX,
          offsetY + offset,
          1,
          imgHeight // destination on canvas
        );
      }

      time += speed;
      requestAnimationFrame(waveFlag);
    }

    waveFlag();
  };
}

export default waveFlagCanvas;
