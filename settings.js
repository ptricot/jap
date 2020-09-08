
// -------------------------------------------------
//  Components
// -------------------------------------------------

// -------------------------------------------------
//  Functions
// -------------------------------------------------

const select = (id) => {
  const card = document.getElementById("card-"+id)
  if (card) card.className += " selected-card"
}

const unselect = (id) => {
  const card = document.getElementById("card-"+id)
  if (card) card.className = "card word-card"
}

const manageDataset = () => {
  content.innerHTML = ""

  const cardContainer = document.createElement('DIV')
  cardContainer.setAttribute("id","card-container")
  content.appendChild(cardContainer)

  for (const word of data) {
    displayCard(cardContainer, word)
  }

  const dataset = getDataset()

  if (!dataset) return null

  for (const id of dataset) {
    select(id)
  }
}

const handleClick = (id) => {
  const dataset = getDataset()
  if (dataset && dataset.includes(id+"")) removeFromSet(id)
  else addToSet(id)
}

const displayCard = (container, word) => {
  const card = document.createElement('DIV')
  card.setAttribute("class","card word-card")
  card.setAttribute("id","card-"+word.id)
  card.setAttribute("onclick","handleClick("+word.id+")")

  const kanjisCard = document.createElement('SPAN')
  kanjisCard.setAttribute("class","sub-text")
  kanjisCard.innerHTML = word.kanjis || "&nbsp;"
  
  const readingCard = document.createElement('SPAN')
  readingCard.setAttribute("class","sub-sub-text")
  readingCard.innerHTML = word.reading
  
  const meaningCard = document.createElement('SPAN')
  meaningCard.setAttribute("class","sub-sub-text")
  meaningCard.innerHTML = word.meaning

  card.appendChild(kanjisCard)
  card.appendChild(readingCard)
  card.appendChild(meaningCard)

  container.appendChild(card)
}
