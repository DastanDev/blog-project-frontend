const baseUrl =
  process.env.NODE_ENV === "production"
    ? "https://blog-project-backend1.herokuapp.com/api"
    : "http://localhost:5000/api"

export default baseUrl
