import React from 'react'

const Filter = (props) => {
  // console.log('filterissa')

  const handleFilterChange = props.handler
  const searchFilter = props.value

  return (
    <form>
      <div>
        filter shown with:
        <input
          value={searchFilter}
          onChange={handleFilterChange}
        />
      </div>
    </form>
  )
}

export default Filter
