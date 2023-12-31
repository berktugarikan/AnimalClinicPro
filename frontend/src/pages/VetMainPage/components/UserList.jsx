import { Spinner } from "@/shared/components/Spinner";
import { useCallback, useEffect, useState} from "react";
import { UserListItem } from "./UserListItem";


export function UserList (){
     const [userPage,setUserPage] = useState({
        content:[{username:"test"}],
        last: false,
        first: false,
        number:0
     });

     const [searchTerm,setSearchTerm]=useState("");
     const [selectedUserId,setSelectedId]= useState(null);


     const [apiProgress,setApiProgress]=useState(false);

     const getUsers = useCallback(async(page) => {
            setApiProgress(true);
            try{
                const response = await LoadUserspage();
                setUserPage(response.data);
            } catch{

            } finally {
              setApiProgress(false) ;
            }


    
     })

     useEffect(() => {
       getUsers();
     }, []);

     return (
        <div className="card">
        <div className="card-header text-center fs-4" style={{ display:'flex',justifyContent:'space-between'}}>
             <span>User List </span>
             <div style={{ marginleft:'auto'}}>
             <input
             type="text"
             placeholder="Search UserName"
             value={searchTerm}
             onChange={(e) => setSearchTerm(e.target.value)}
             style={{width:'185px',height:'30px'}}/>
             </div>
             </div>
        <ul className="list-group list-group-flush">
            {userPage.content
            .filter((user) =>
            user.username.toLowerCase().includes(searchTerm.toLowerCase())
            )
            .map((user) => {
          return <UserListItem 
           key = {user.id}
           user={user}
           selected={user.id===selectedUserId}
           onSelect={() => setSelectedUserId(user.id)}/>;
            })}
        </ul>
        <div className="card-footer text-center">
            {apiProgress &&  <Spinner />} 
        {!apiProgress && !userPage.first && <button className="btn btn-outline-secondary btn-sm float-start custom-btn" onClick={ () => getUsers(userPage.number-1)}>Previous</button>}
        {!apiProgress && !userPage.last && <button  className="btn btn-outline-secondary btn-sm float-end custom-btn" onClick={ () => getUsers(userPage.number+1)}>Next</button>}
        </div>
       
        </div>
     );
}