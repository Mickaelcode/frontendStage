import axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

function User({token}) {
    const [search, Setsearch] = useState('')
    const [users, setUsers] = useState([])
    const navigate = useNavigate()

    const research = (e) => {
        Setsearch(e.target.value)
        console.log(search)
    }


    const fetchUsers = async () => {
        try {
            
            const response = await axios.get('http://localhost:3005/api/user/lists')
            const data = response.data.users
            setUsers(data)
        } catch (err) {
            console.log(err.message || err);
        }
    }



    const deleteUser = async (email)=>{
        try{

            const response = await axios.delete('http://localhost:3005/api/user/delete',
                {
                    data:{
                        email:email
                    }
                }
            )
            console.log(response)
            fetchUsers()

        }catch(err){
            console.log(err.message || err);
            
        }
    }



    useEffect(() => {
        fetchUsers()
    }, [])





    return <>

        {/* <input type="text" value={search} onChange={research} placeholder="search ..." /> */}
        <div className="input-group my-4">
            <input type="search" className="form-control rounded" aria-label="Search" aria-describedby="search-addon" value={search} onChange={research} placeholder="search ..." />
            <button type="button" className="btn btn-outline-primary" data-mdb-ripple-init>search</button>
        </div>

        <table className="table table-dark my-5">
            <thead>
                <tr>
                    <td>Name</td>
                    <td>First Name</td>
                    <td>Email</td>
                    <td>Actions</td>
                </tr>
            </thead>
            <tbody>

                {users.map((user) => (
                    <tr className="table-active" key={user.email}>
                        <td>{user.name}</td>
                        <td>{user.first_name}</td>
                        <td>{user.email}</td>
                        <td> <button className="btn btn-outline-danger btn-rounded" onClick={()=> deleteUser(user.email)}>Delete</button></td>

                    </tr>
                ))}

            </tbody>
        </table>
     

    </>
}

export default User

