import React,{useEffect,useState,useContext} from 'react'
import {UserContext} from '../App'
import {useParams} from 'react-router-dom'


const Profile  = ()=>
{
    const [userProfile, setProfile] = useState({ user: {}, posts: [] });
   const [showFollow,setshowFollow]=useState(true)
    const {state,dispatch} = useContext(UserContext)
    const {userid} = useParams()
   
    useEffect(()=>{
       fetch(`/user/${userid}`,{
           headers:{
               "Authorization":"Bearer "+localStorage.getItem("jwt")
           }
       }).then(res=>res.json())
       .then(result=>{
        console.log(result)
            setProfile(result)
       })
    },[])

console.log("User Profile is: ",userProfile)





const followUser=()=>{
    fetch('/follow',{
      method:"put",
      headers:
      {
        "Content-Type": "application/json",
        Authorization: 'Bearer ' + localStorage.getItem("jwt")
          },
          body: JSON.stringify({
            followID:userid
          })
    }).then((res) => res.json())
    .then((result) => {
        dispatch({type:"UPDATE",payload:{following:result.following,followers:result.followers}})
      console.log(result); // Log the result to see what the server is returning
      localStorage.setItem("user",JSON.stringify(result))
      setProfile(prevState=>{
        return{
            ...prevState,
            user:{
                ...prevState.user,
                followers:[...prevState.user.followers,result._id]

            }

        }
      })
    })
    setshowFollow(false)
  }





  const unfollowUser=()=>{
    fetch('/unfollow',{
      method:"put",
      headers:
      {
        "Content-Type": "application/json",
        Authorization: 'Bearer ' + localStorage.getItem("jwt")
          },
          body: JSON.stringify({
            unfollowID:userid
          })
    }).then((res) => res.json())
    .then((result) => {
        dispatch({type:"UPDATE",payload:{following:result.following,followers:result.followers}})
      console.log(result); // Log the result to see what the server is returning
      localStorage.setItem("user",JSON.stringify(result))

      setProfile(prevState=>{
        const newfollower=prevState.user.followers.filter(item=>item!=DataTransfer._id)
        return{
            ...prevState,
            user:{
                ...prevState.user,
                followers:newfollower

            }
        }
      })
    })
    setshowFollow(true)
  }





    
   return (
       <>
       {userProfile ?
       <div style={{maxWidth:"550px",margin:"0px auto"}}>
           <div style={{
               display:"flex",
               justifyContent:"space-around",
               margin:"18px 0px",
               borderBottom:"1px solid grey"
           }}>
               <div>
                   <img style={{width:"160px",height:"160px",borderRadius:"80px"}}
                   src="https://storage.ko-fi.com/cdn/useruploads/post/cb0018c0-22bd-4618-9d2f-ebf4208ab71c_fbphotoicon.png"
                   />
               </div>
               <div>
                   <h4>{userProfile.user.username}</h4>
                   
                   <div style={{display:"flex",justifyContent:"space-between",width:"108%"}}>
                       <h6>{userProfile.posts.length} posts</h6>
                       <h6>{userProfile?.user?.followers ? userProfile.user.followers.length : 'Refreshing...'} followers</h6>
<h6>{userProfile?.user?.following ? userProfile.user.following.length : 'Refreshing...'} following</h6>

{
    showFollow?
    <button  className="btn" style={{ backgroundColor: "rgb(255, 37, 146)", color: "white",margin:"10px" }}
    type="submit" name="action" onClick={()=>followUser()}>Follow </button>
:
<button className="btn" style={{ backgroundColor: "rgb(255, 37, 146)", color: "white" ,margin:"10px"}}
type="submit" name="action" onClick={()=>unfollowUser()} >Unfollow</button>
}
                     

                    
                   </div>
                   
                  

               </div>
           </div>
     
           <div className="gallery">
               {
                   userProfile.posts.map(item=>{
                    return(
                        <img className='item' width={"30%"} src={item.imageUrl} alt="prof"/>
                      )
                   })
               }

           
           </div>
       </div>
       
       
       : <h2>loading...!</h2>}
       
       </>
   )
}


export default Profile