const Filter = ({ filter, handleFilterChange }) => {
    console.log('Filter component rendered with filter:', filter)
    return (
        <form onSubmit={(event) => event.preventDefault()}>
            <div>
            filter shown with <input 
                value={filter}
                onChange={handleFilterChange}
            />
            </div>
        </form>
    )
}

export default Filter