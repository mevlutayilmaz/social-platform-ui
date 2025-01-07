import Stories from "../../components/stories/Stories"
import Posts from "../../components/posts/Posts"
import Share from "../../components/share/Share"
import "./home.scss"
import AuthService from "../../services/AuthService"

const Home = () => {

  return (
    <div className="home">
      <h6>usrename: {AuthService.getUsername()}</h6>
      <Stories/>
      {/* <Share/> */}
      {/* <Posts/> */}
    </div>
  )
}

export default Home