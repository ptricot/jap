const initCanvas = canvas => {
  // init
  canvas.width = 400
  canvas.height = 400
  canvas.style.width = canvas.width+'px'
  canvas.style.height = canvas.height+'px'
  // set params
  const ctx = canvas.getContext('2d')
  ctx.lineWidth = 3;
  ctx.lineCap = 'round'
  ctx.strokeStyle = '#522'
  ctx.setTransform(1,0,0,1,0,0)
  // clear canvas
  clearCanvas(canvas)
  // mouse listeners
  let drawing
  canvas.addEventListener('mousedown', e => {
    ctx.beginPath()
    ctx.moveTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop)
    drawing = true
  })
  canvas.addEventListener('mousemove', e => {
    if (drawing) {
      ctx.lineTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop)
      ctx.stroke()
    }
  })
  canvas.addEventListener('mouseup', e => {
    drawing = false
  })
  canvas.addEventListener('mouseleave', e => {
    drawing = false
  })
}

const clearCanvas = canvas => {
  const ctx = canvas.getContext('2d')
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}