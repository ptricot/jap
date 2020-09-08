
const getDataset = () => {
  const string = localStorage.getItem('dataset')
  return string ? string.replace('//','/').split('/') : null
}

const addToSet = (id) => {
  console.log('add',id)
  localStorage.setItem('dataset', localStorage.getItem('dataset')+'/'+id+'/')
  select(id)
}

const removeFromSet = (id) => {
  console.log('remove',id)
  localStorage.setItem('dataset', localStorage.getItem('dataset').replace('/'+id+'/',''))
  unselect(id)
}