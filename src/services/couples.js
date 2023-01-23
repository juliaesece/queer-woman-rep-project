import axios from 'axios'
// const baseUrl = 'api/couples'
const baseUrl = '/api/couples'

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => {
    return response.data
  })
}

const expGet = (param) => {
  const request = axios.get(baseUrl + param)
  return request.then(response => {
    return response.data
  })
}

const getMovies = () => {
  const request = axios.get(baseUrl + '/movies')
  return request.then(response => {
    return response.data
  })
}

const getTvShows = () => {
  const request = axios.get(baseUrl + '/tv-shows')
  return request.then(response => {
    return response.data
  })
}

const getHappies = () => {
  const request = axios.get(baseUrl + '/happy-ending')
  return request.then(response => {
    return response.data
  })
}

const getMoreDiversity = () => {
  const request = axios.get(baseUrl + '/more-diversity')
  return request.then(response => {
    return response.data
  })
}

const getPopularity = () => {
  const request = axios.get(baseUrl + '/popularity')
  return request.then(response => {
    return response.data
  })
}

const getMostLiked = () => {
  const request = axios.get(baseUrl + '/most-liked')
  return request.then(response => {
    return response.data
  })
}

const getRecentlyAdded = () => {
  const request = axios.get(baseUrl + '/recently-added')
  return request.then(response => {
    return response.data
  })
}

const getNewest = () => {
  const request = axios.get(baseUrl + '/newest')
  return request.then(response => {
    return response.data
  })
}

// no olvidar exportarlos!

const create = async newObject => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const toggleWatchedDB = async (id, newObject) => {
  console.log("update accionado desde frontend")
  const config = {
    headers: { Authorization: token },
  }
  //agregará user id a couple
  const response = await axios.put(`${baseUrl}/${id}/watched`, newObject, config)
  // y couple id a user
  return response.data
}

const voteUp = async (id, newObject) => {
  console.log("voteUp accionado desde frontend")
  const config = {
    headers: { Authorization: token },
  }
  //agregará user id a couple
  const response = await axios.put(`${baseUrl}/${id}/vote-up`, newObject, config)
  // y couple id a user
  return response.data
}

const voteDown = async (id, newObject) => {
  console.log("voteDown accionado desde frontend")
  const config = {
    headers: { Authorization: token },
  }
  //agregará user id a couple
  const response = await axios.put(`${baseUrl}/${id}/vote-down`, newObject, config)
  // y couple id a user
  return response.data
}

export default {
  expGet,
  getAll,
  getMovies,
  getTvShows,
  getHappies,
  getMoreDiversity,
  getPopularity,
  getMostLiked,
  getNewest,
  getRecentlyAdded,
  create,
  toggleWatchedDB,
  setToken,
  voteUp,
  voteDown
}
