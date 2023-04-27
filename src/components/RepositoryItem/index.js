import './index.css'

const RepositoryItem = props => {
  const {repositoryItemList} = props
  const {
    name,
    issuesCount,
    forksCount,
    starsCount,
    avatarUrl,
  } = repositoryItemList
  return (
    <div className="respository-items-container">
      <img src={avatarUrl} alt={name} className="repository-image" />
      <div className="about-container ">
        <h1 className="title">{name}</h1>
        <div className="each-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/stars-count-img.png"
            className="icons"
            alt="stars"
          />
          <p className="count">{starsCount} stars</p>
        </div>
        <div className="each-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/forks-count-img.png"
            className="icons"
            alt="forks"
          />
          <p className="count">{forksCount} forks</p>
        </div>
        <div className="each-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/issues-count-img.png"
            className="icons"
            alt="open issues"
          />
          <p className="count">{issuesCount} open issues</p>
        </div>
      </div>
    </div>
  )
}

export default RepositoryItem
