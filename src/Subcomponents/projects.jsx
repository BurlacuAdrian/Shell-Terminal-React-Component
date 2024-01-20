import data from './data.json'
const GitHub = data.github

const renderProjects = () => {
  return(
  <>
  Projects can be viewed on <a href={GitHub}>my GitHub page</a>
  </>)
}

export default renderProjects