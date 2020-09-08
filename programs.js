
// current word
let word

// current program
let prog

// Is the answer to the current question given
let over

// -------------------------------------------------
//  Components
// -------------------------------------------------

const question = document.createElement('DIV')
question.setAttribute("id", "question")

const answer = document.createElement('DIV')
answer.setAttribute("id", "answer")

const input = document.createElement('INPUT')
input.setAttribute("type", "text")
input.setAttribute("id", "input")

const correction = document.createElement('SPAN')
correction.setAttribute("id", "correction")

const subCorrection = document.createElement('SPAN')
subCorrection.setAttribute("id", "subCorrection")

const reading = document.createElement('SPAN')
reading.setAttribute("id", "reading")

const meaning = document.createElement('SPAN')
meaning.setAttribute("id", "meaning")

const kanjis = document.createElement('SPAN')
kanjis.setAttribute("id", "kanjis")

const canvas = document.createElement('canvas')
canvas.setAttribute("id", "canvas")

const respondButton = document.createElement('button')
respondButton.setAttribute("id", "respond-button")
respondButton.setAttribute("class", "button")
respondButton.innerHTML = "OK"
respondButton.setAttribute("onclick", "respond()")

const clearButton = document.createElement('button')
clearButton.setAttribute("id", "clear-button")
clearButton.setAttribute("class", "button")
clearButton.innerHTML = "Clear"
clearButton.setAttribute("onclick", "clearCanvas(canvas)")

const nextButton = document.createElement('button')
nextButton.setAttribute("id", "next-button")
nextButton.setAttribute("class", "button")
nextButton.innerHTML = "Next"
nextButton.setAttribute("onclick", "startProg(prog)")

// -------------------------------------------------
//  renderProgram
// -------------------------------------------------
const renderProgram = (number) => {
  // reset content
  content.innerHTML = ""
  // Question
  content.appendChild(question)
  // Answer
  content.appendChild(answer)
  // Reset
  question.innerHTML = ""
  answer.innerHTML = ""
}

// -------------------------------------------------
//  pickAWord
// -------------------------------------------------
const pickAWord = (param = 'any') => {
  word = null
  const dataset = getDataset()
  if (!dataset || !dataset.length) return null
  let i = 0
  while (!word && i<1000) {
    const pick = data[parseInt(dataset[Math.floor(Math.random()*dataset.length)])]
    if (param === 'kanjis') {
      console.log(pick)
      if (pick && pick.kanjis && pick.kanjis.length) word = pick
    } else {
      word = pick
    }
    i++
  }
}
// -------------------------------------------------
//  startProg
// -------------------------------------------------
const startProg = (number) => {
  over = false
  switch(number) {
    case 1:
      startProg1()
      break
    case 2:
      startProg2()
      break
    case 3:
      startProg3()
      break
  }
}

// -------------------------------------------------
//  startProg1
// -------------------------------------------------
const startProg1 = () => {
  // Init
  renderProgram()
  pickAWord()
  prog = 1
  if (!word) return null

  // Reading
  reading.innerHTML = word.reading

  // Kanjis
  if (word.kanjis.length) {
    kanjis.innerHTML = word.kanjis
    kanjis.setAttribute("class", "main-text")
    reading.setAttribute("class", "sub-text")
    question.appendChild(kanjis)
  }
  else {
    // empty kanjis
    kanjis.innerHTML = ""
    // set reading class
    reading.setAttribute("class", "main-text")
  }
  question.appendChild(reading)
  
  // Input
  input.value = ""
  answer.appendChild(input)
  input.focus()
}

// -------------------------------------------------
//  startProg3
// -------------------------------------------------
const startProg3 = () => {
  // Init
  renderProgram()
  pickAWord('kanjis')
  prog = 3
  if (!word) return null

  // Reading
  meaning.innerHTML = word.meaning
  meaning.setAttribute("class", "main-sub-text")
  question.appendChild(meaning)

  // Canvas
  answer.appendChild(canvas)
  initCanvas(canvas)

  // respondButton
  answer.appendChild(clearButton)
  answer.appendChild(respondButton)
}

// -------------------------------------------------
//  respond
// -------------------------------------------------

const respond = () => {
  const text = input.value
  switch (prog) {
    case 1:
      if (text.length > 1 && word.meaning.includes(text)) win(word.meaning)
      else lose(word.meaning)
      break
    case 3:
      end(word.kanjis, word.reading)
      if (answer.contains(respondButton)) answer.removeChild(respondButton)
      answer.appendChild(nextButton)
      break
  }
  over = true
}

// -------------------------------------------------
//  win
// -------------------------------------------------

const win = (correctAnswer) => {
  addCorrection(1, correctAnswer)
}

// -------------------------------------------------
//  lose
// -------------------------------------------------

const lose = (correctAnswer) => {
  addCorrection(-1, correctAnswer)
}

// -------------------------------------------------
//  end
// -------------------------------------------------

const end = (correctAnswer, correctSubAnswer) => {
  addCorrection(0, correctAnswer, correctSubAnswer)
}

// -------------------------------------------------
//  addCorrection
// -------------------------------------------------

const addCorrection = (win, correctAnswer, correctSubAnswer) => {
  // Set color
  if (win === 1) correction.setAttribute("class", "correct-answer")
  else if (win === 0) correction.setAttribute("class", "neutral-answer")
  else if (win === -1) correction.setAttribute("class", "wrong-answer")
  // Set answer
  correction.innerHTML = correctAnswer
  question.appendChild(correction)
  // Set sub correction
  if (correctSubAnswer) {
    subCorrection.innerHTML = correctSubAnswer
    question.appendChild(subCorrection)
  }
}

// -------------------------------------------------
//  listener
// -------------------------------------------------

document.onkeyup = function(e) {
  switch(e.which) {
    case 13:
      if (!over) {
        respond()
      }
      else {
        startProg(prog)
      }
      break
    default:
      break
  }
}
