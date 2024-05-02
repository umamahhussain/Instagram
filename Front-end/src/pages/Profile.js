import React, { useEffect, useState, useContext } from 'react';
import { UserContext } from '../App'
function Profile() {

  const [posts, setPosts] = useState([])
  const { state, dispatch } = useContext(UserContext)

  useEffect(() => {
    fetch('/myposts', {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then(res => res.json())
      .then((result) => {
        // console.log(result); // Log the result to see what the server is returning
        setPosts(result.mypost);

      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []); // Empty dependency array ensures the effect runs only once on mount


  console.log("State is: ", state)


  return (
    <div style={{ maxWidth: "1000px", margin: "5px auto" }}>
      <div style={{
        display: "flex", justifyContent: "space-around",
        margin: "18px 0px",
        borderBottom: "3px solid grey",
            background: ' rgb(189, 195, 199)',
            background: 'radial-gradient(circle, rgba(189, 195, 199, 1) 0%, rgba(44, 62, 80, 1) 100%)'
      }}>
        <div>
          <img style={{ width: "140px", height: "140px", borderRadius: "70px" ,padding:'10px' }}
            src="https://storage.ko-fi.com/cdn/useruploads/post/cb0018c0-22bd-4618-9d2f-ebf4208ab71c_fbphotoicon.png" alt="img" />
        </div>
        <div>


          <h4 style={{ color: 'midnightblue',fontWeight:'600' }}>{state ? state.username : 'refreshing'}</h4>
          <div style={{ display: 'flex', justifyContent: 'space-between', width: '108%' }}>
            <h6 style={{ color: 'midnightblue',fontWeight:'400' }}>{posts.length} posts</h6>
            {state && state.followers !== undefined ? (
              <h6 style={{ color: 'midnightblue',fontWeight:'400' }}>{state.followers.length} followers</h6>
            ) : (
              <h6>Loading followers...</h6>
            )}
            {state && state.following !== undefined ? (
              <h6 style={{ color: 'midnightblue',fontWeight:'400'}}>{state.following.length} following</h6>
            ) : (
              <h6>Loading following...</h6>
            )}
          </div>
        </div>
      </div>


      <div className='gallery' style={{backgroundColor:'whitesmoke'}}>
        {
          posts.map((item) => {
            return (
              <img className='item' width={"25%"} src={item.imageUrl} alt="prof" />
            )
          })
        }

      </div>

    </div>
  );
}

export default Profile;
