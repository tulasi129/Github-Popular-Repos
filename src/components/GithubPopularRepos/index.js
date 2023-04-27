import {Component} from 'react'
import Loader from 'react-loader-spinner'
import LanguageFilterItem from '../LanguageFilterItem'
import RepositoryItem from '../RepositoryItem'

import './index.css'

const languageFiltersData = [
  {id: 'ALL', language: 'All'},
  {id: 'JAVASCRIPT', language: 'Javascript'},
  {id: 'RUBY', language: 'Ruby'},
  {id: 'JAVA', language: 'Java'},
  {id: 'CSS', language: 'CSS'},
]
const apiStatsuConstants = {
  intial: 'INTIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  progress: 'PROGRESS',
}

class GithubPopularRepos extends Component {
  state = {
    reposDataList: [],
    activeId: languageFiltersData[0].id,
    apiStatus: apiStatsuConstants[0],
  }

  componentDidMount() {
    this.getrepositoryItems()
  }

  getrepositoryItems = async () => {
    this.setState({apiStatus: apiStatsuConstants.progress})
    const {activeId} = this.state
    const url = `https://apis.ccbp.in/popular-repos?language=${activeId}`
    const response = await fetch(url)
    if (response.ok === true) {
      const fetchedData = await response.json()
      const updatedData = fetchedData.popular_repos.map(data => ({
        name: data.name,
        id: data.id,
        starsCount: data.stars_count,
        forksCount: data.forks_count,
        issuesCount: data.issues_count,
        avatarUrl: data.avatar_url,
      }))
      this.setState({
        reposDataList: updatedData,
        apiStatus: apiStatsuConstants.success,
      })
    } else if (response.status === 401) {
      this.setState({
        apiStatus: apiStatsuConstants.failure,
      })
    }
  }

  activeFilterItems = id => {
    this.setState({activeId: id}, this.getrepositoryItems)
  }

  renderSuccess = () => {
    const {reposDataList} = this.state
    return (
      <ul className="repositoryList">
        {reposDataList.map(each => (
          <RepositoryItem repositoryItemList={each} key={each.id} />
        ))}
      </ul>
    )
  }

  renderFailure = () => (
    <div className="">
      <h1 className="failure-view-heading">Something went wrong</h1>
      <img
        src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
        alt="failure view"
        className="failure-view-image"
      />
    </div>
  )

  renderLoadingView = () => (
    <div className="">
      <Loader
        testid="loader"
        type="ThreeDots"
        color="#0b69ff"
        height="50"
        width="50"
      />
    </div>
  )

  repositoryItemList = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatsuConstants.success:
        return this.renderSuccess()
      case apiStatsuConstants.failure:
        return this.renderFailure()
      case apiStatsuConstants.progress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="bg-container">
        <div className="repos-container">
          <h1 className="popular-heading">Popular</h1>
          <ul className="filterItem-className" data-testid="loader">
            {languageFiltersData.map(eachData => (
              <LanguageFilterItem
                filterItems={eachData}
                key={eachData.id}
                activeFilterItems={this.activeFilterItems}
              />
            ))}
          </ul>
          <div className="container">{this.repositoryItemList()}</div>
        </div>
      </div>
    )
  }
}

export default GithubPopularRepos
