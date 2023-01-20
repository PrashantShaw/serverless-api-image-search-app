import './App.css';
import { DebounceInput } from 'react-debounce-input'
import { useEffect, useState } from 'react';

function App() {

  const [searchText, setSearchText] = useState('')
  const [images, setImages] = useState([])
  const serverless_API_URL = 'https://serverless-api.prashantshaw.workers.dev'
  // const serverless_API_URL = 'http://127.0.0.1:8787'

  function getImages(text) {
    return fetch(
      serverless_API_URL,
      {
        method: 'POST',
        headers: {
          'content-type': 'application/json'
        },
        body: JSON.stringify({ searchText: text })
      }
    )
  }

  useEffect(() => {
    if (!searchText) return

    getImages(searchText)
      .then(res => res.json())
      .then(data => setImages(data))
  }, [searchText])

  return (
    <div className='container' >
      <div className='search-box'>
        <DebounceInput
          className='search'
          // minLength={2}
          value={searchText}
          placeholder="Search image .."
          debounceTimeout={500}
          onChange={(e) => { setSearchText(e.target.value) }}
        />
      </div>
      <div className='images'>
        {images.map((imageObj, idx) => (
          <a href={imageObj.link}>
            <img src={imageObj.url} alt='something' />
          </a>
        ))}
      </div>
    </div>
  );
}

export default App;
