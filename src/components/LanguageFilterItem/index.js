import './index.css'

const LanguageFilterItem = props => {
  const {filterItems, activeFilterItems} = props
  const {id, language} = filterItems

  const selectedLanguageItem = () => {
    activeFilterItems(id)
  }
  return (
    <button className="button" onClick={selectedLanguageItem} type="button">
      <li key={id} className="filter-items">
        {language}
      </li>
    </button>
  )
}

export default LanguageFilterItem
