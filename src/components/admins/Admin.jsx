import axios from "axios"
import { jwtDecode } from "jwt-decode"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

function Admin() {
    const [search, Setsearch] = useState('')
    const [admins, setAdmins] = useState([])
    const [boxUpdate, setBoxUpdate] = useState(false)
    const [boxCreate, setBoxCreate] = useState(false)
    const navigate = useNavigate()

    const initData = {
        email_admin: '',
        name_admin: '',
        first_name_admin: '',
        password_admin: ''
    }
    const [dataAdmin, setdataAdmin] = useState(initData)

    const research = (e) => {
        Setsearch(e.target.value)
        console.log(search)
    }

    const handleCardCreate = () => {
        setBoxCreate(!boxCreate)
    }

    const fetchAdmins = async () => {
        try {
            // const token = localStorage.getItem('token')
            // if (!token) navigate('/admin')
            // const userId = jwtDecode(token)
            // if(userId.role!=='admin') navigate('/admin')
            const response = await axios.get('http://localhost:3005/api/admin/lists')
            const data = response.data.admin
            setAdmins(data)
        } catch (err) {
            console.log(err.message || err);
        }
    }

    const emailUpdate = (e) => {
        setdataAdmin({ ...dataAdmin, email_admin: e.target.value })

    }
    const nameUpdate = (e) => {
        setdataAdmin({ ...dataAdmin, name_admin: e.target.value })

    }


    const fisrtNameUpdate = (e) => {
        setdataAdmin({ ...dataAdmin, first_name_admin: e.target.value })
    }

    const pwdUpdate = (e) => {
        setdataAdmin({ ...dataAdmin, password_admin: e.target.value })

    }

    const updateAdmin = (admin) => {
        setBoxUpdate(!boxUpdate)
        setdataAdmin(admin)
    }

    const updateAdminForm = async (e) => {
        e.preventDefault()
        console.log(dataAdmin)
        try {
            const response = await axios.put('http://localhost:3005/api/admin/update', dataAdmin)
            console.log(response)
            setBoxUpdate(false)
            fetchAdmins()
        } catch (err) {
            console.log(err)
        }
        finally {
            setdataAdmin(initData)
        }
    }




    const createAdmin = async (e) => {
        e.preventDefault()
        try {
            console.log(dataAdmin)
            const data = {
                email: dataAdmin.email_admin,
                name: dataAdmin.name_admin,
                first_name: dataAdmin.first_name_admin,
                password: dataAdmin.password_admin
            }
            console.log(data)
            const response = await axios.post('http://localhost:3005/api/admin/create', data)
            console.log(response)
            fetchAdmins()
        } catch (err) {

            console.log(err.message || err)
        } finally {
            setBoxCreate(false)
            setdataAdmin(initData)
        }
    }


    const deleteAdmin = async (email) => {
        try {

            const response = await axios.delete('http://localhost:3005/api/admin/delete',
                {
                    data: {
                        email_admin: email
                    }
                }
            )
            console.log(response)
            fetchAdmins()

        } catch (err) {
            console.log(err.message || err);

        }
    }



    useEffect(() => {
        fetchAdmins()
    }, [])





    return <>
        <button className="btn btn-info my-5 d-flex gap-4 " onClick={handleCardCreate}> create</button>

        <div className="input-group my-4">
            <input type="search" className="form-control rounded" aria-label="Search" aria-describedby="search-addon" value={search} onChange={research} placeholder="search ..." />
            <button type="button" className="btn btn-outline-primary" data-mdb-ripple-init>search</button>
        </div>


        {
            boxCreate && (
                <div className="modal fade show d-block" tabIndex="-1" style={{ display: "block", backgroundColor: "rgba(0,0,0,0.5)" }} role="dialog">
                    <div className="modal-dialog modal-dialog-centered" role="document">
                        <form onSubmit={createAdmin} className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Create Admin</h5>
                            </div>
                            <div className="modal-body">
                                <div className="row mb-4">
                                    <div className="col">
                                        <div className="form-outline">
                                            <input
                                                type="text"
                                                className="form-control"
                                                value={dataAdmin.first_name_admin}
                                                onChange={fisrtNameUpdate}
                                            />
                                            <label className="form-label">First name</label>
                                        </div>
                                    </div>
                                    <div className="col">
                                        <div className="form-outline">
                                            <input
                                                type="text"
                                                className="form-control"
                                                value={dataAdmin.name_admin}
                                                onChange={nameUpdate}
                                            />
                                            <label className="form-label">Last name</label>
                                        </div>
                                    </div>
                                </div>

                                <div className="form-outline mb-4">
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={dataAdmin.email_admin}
                                        onChange={emailUpdate}
                                    />
                                    <label className="form-label">Email address</label>
                                </div>

                                <div className="form-outline mb-4">
                                    <input
                                        type="password"
                                        className="form-control"
                                        value={dataAdmin.password_admin}
                                        onChange={pwdUpdate}
                                    />
                                    <label className="form-label">Password</label>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="submit" className="btn btn-primary">
                                    Create
                                </button>
                                <button
                                    type="button"
                                    className="btn btn-secondary"
                                    onClick={handleCardCreate}
                                >
                                    Close
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )
        }


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

                {admins.map((admin) => (
                    <tr className="table-active" key={admin.email_admin}>
                        <td>{admin.name_admin}</td>
                        <td>{admin.first_name_admin}</td>
                        <td>{admin.email_admin}</td>
                        <td> <button className="btn btn-outline-primary btn-rounded me-3" onClick={() => updateAdmin(admin)}>Update</button>
                            <button className="btn btn-outline-danger btn-rounded " onClick={() => deleteAdmin(admin.email_admin)}>Delete</button>
                        </td>

                    </tr>
                ))}

            </tbody>
        </table>
        {
            boxUpdate && (
                <div className="modal fade show d-block" tabIndex="-1" style={{ display: "block", backgroundColor: "rgba(0,0,0,0.5)" }} role="dialog">
                    <div className="modal-dialog modal-dialog-centered" role="document">
                        <form onSubmit={updateAdminForm} className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Update Admin</h5>
                            </div>
                            <div className="modal-body">
                                <div className="row mb-4">
                                    <div className="col">
                                        <div className="form-outline">
                                            <input
                                                type="text"
                                                className="form-control"
                                                value={dataAdmin.first_name_admin}
                                                onChange={fisrtNameUpdate}
                                            />
                                            <label className="form-label">First name</label>
                                        </div>
                                    </div>
                                    <div className="col">
                                        <div className="form-outline">
                                            <input
                                                type="text"
                                                className="form-control"
                                                value={dataAdmin.name_admin}
                                                onChange={nameUpdate}
                                            />
                                            <label className="form-label">Last name</label>
                                        </div>
                                    </div>
                                </div>

                            </div>
                            <div className="modal-footer">
                                <button type="submit" className="btn btn-primary">
                                    Update
                                </button>
                                <button
                                    type="button"
                                    className="btn btn-secondary"
                                    onClick={() => setBoxUpdate(false)}
                                >
                                    Close
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )
        }




    </>
}

export default Admin

