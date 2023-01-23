import axios from 'axios'
const baseUrl = '/api/users'

const signup = async credentials => {
  console.log("trying to create a new user frontend")
  const response = await axios.post(baseUrl, credentials)
  return response
}

export default { signup }
