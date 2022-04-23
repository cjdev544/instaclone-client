import { useEffect, useState } from 'react'
import { Search } from 'semantic-ui-react'

import useGetData from '../../../hooks/useGetData'
import SearchItem from './SeachItem'
import './InputSearch.scss'

const InputSearch = () => {
  const [search, setSearch] = useState('')
  const [results, setResults] = useState([])

  const { getUsersSearch, resultSearchUser } = useGetData()
  const { data, loading } = resultSearchUser

  useEffect(() => {
    if (search?.length !== 0) {
      getUsersSearch(search)
    } else {
      setSearch('')
    }
  }, [search])

  useEffect(() => {
    if (data?.search.length > 0) {
      const res = data.search.map((user) => ({
        key: user.id,
        title: user.name,
        username: user.username,
        avatar: user.avatar,
      }))
      setResults(res)
    } else {
      setResults([])
    }
  }, [data])

  const handleResultSelect = () => {
    setSearch('')
    setResults([])
  }

  return (
    <Search
      className='input-search'
      fluid
      placeholder='Busca'
      loading={loading}
      input={{ icon: 'search', iconPosition: 'left' }}
      onSearchChange={(e) => setSearch(e.target.value)}
      onResultSelect={handleResultSelect}
      value={search}
      results={results}
      resultRenderer={(e) => <SearchItem data={e} />}
      noResultsMessage='No se han encontrado resultados'
    ></Search>
  )
}

export default InputSearch
