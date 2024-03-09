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
    <div style={{ maxWidth: "550px", margin: "0px auto" }}>
      <div style={{
        display: "flex", justifyContent: "space-around",
        margin: "18px 0px",
        borderBottom: "1px solid black"
      }}>
        <div>
          <img style={{ width: "160px", height: "160px", borderRadius: '80px' }}
            src="https://storage.ko-fi.com/cdn/useruploads/post/cb0018c0-22bd-4618-9d2f-ebf4208ab71c_fbphotoicon.png" alt="img" />
        </div>
        <div>


          <h2 style={{ color: 'rgb(255, 37, 146)' }}>{state ? state.username : 'refreshing'}</h2>
          <div style={{ display: 'flex', justifyContent: 'space-between', width: '108%' }}>
            <h5 style={{ color: 'rgb(255, 37, 146)' }}>{posts.length} posts</h5>
            {state && state.followers !== undefined ? (
              <h5 style={{ color: 'rgb(255, 37, 146)' }}>{state.followers.length} followers</h5>
            ) : (
              <h5>Loading followers...</h5>
            )}
            {state && state.following !== undefined ? (
              <h5 style={{ color: 'rgb(255, 37, 146)' }}>{state.following.length} following</h5>
            ) : (
              <h5>Loading following...</h5>
            )}
          </div>
        </div>
      </div>


      <div className='gallery'>
        {
          posts.map((item) => {
            return (
              <img className='item' width={"30%"} src={item.imageUrl} alt="prof" />
            )
          })
        }

      </div>

    </div>
  );
}

export default Profile;
