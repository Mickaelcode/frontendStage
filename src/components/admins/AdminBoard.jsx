// import Navbar from "./Navbar"
import { useNavigate } from "react-router-dom"
import Act from "./Act"
import Admin from "./Admin"
import User from "./User"
import Notification from "./Notification"
import { useEffect, useState } from "react"
import axios from "axios"
function AdminBoard() {

    const [adminBox, setAdminBox] = useState(false)
    const [homeBox, setHomeBox] = useState(false)
    const [userBox, setUserBox] = useState(false)
    const [demandBox, setDemandBox] = useState(false)
    const [actBox, setActBox] = useState(false)
    const [notifBox, setNotifBox] = useState(true)
    const navigate = useNavigate()

    useEffect(() => {
        const token = localStorage.getItem('token')
        if (!token) navigate('/admin')
        axios.defaults.headers.common['authorizations'] = `Bearer ${token}`;
    }, [])


    const boxAdmin = () => {
        setAdminBox(true)
        setHomeBox(false)
        setUserBox(false)
        setActBox(false)
        setNotifBox(false)
    }
    const boxHome = () => {
        setHomeBox(true)
        setAdminBox(false)
        setUserBox(false)
        setActBox(false)
        setNotifBox(false)
        
    }

    const boxAct = () => {
        setActBox(true)
        setHomeBox(false)
        setAdminBox(false)
        setUserBox(false)
        setNotifBox(false)

    }
    const boxUser = () => {
        setUserBox(true)
        setHomeBox(false)
        setAdminBox(false)
        setActBox(false)
        setNotifBox(false)
    }
    const boxDemand = () => {
        setDemandBox(true)
    }
    const boxNotif = () => {
        setNotifBox(true)
        setUserBox(false)
        setHomeBox(false)
        setAdminBox(false)
        setActBox(false)
    }

    return <>


        <nav className="navbar navbar-expand-lg fixed-top navbar-scroll">
            <div className="container">
                {/* <img src="http://mid.gov.mg/wp-content/uploads/2024/04/logo-mininterieur_2.jpg" height="70" alt=""
                    loading="lazy" /> */}
                <button className="navbar-toggler ps-0" type="button" data-mdb-toggle="collapse" data-mdb-target="#navbarExample01"
                    aria-controls="navbarExample01" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon d-flex justify-content-start align-items-center">
                        <i className="fas fa-bars"></i>
                    </span>
                </button>
                <div className="collapse navbar-collapse" id="navbarExample01">
                    <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                        <li className="nav-item active"><a className="nav-link" href="#" onClick={boxHome}>Home</a></li>
                        <li className="nav-item "><a className="nav-link" aria-current="page" href="#" onClick={boxAdmin}>Admins</a></li>
                        <li className="nav-item "><a className="nav-link" href="#" onClick={boxUser}>Users</a></li>
                        <li className="nav-item "><a className="nav-link" href="#" onClick={boxAct}>Acts</a></li>
                        <li className="nav-item "><a className="nav-link" href="#" onClick={boxDemand}>Demands</a></li>
                        <li className="nav-item "><a className="nav-link" href="#" onClick={boxNotif}>Notifications </a></li>
                    </ul>
                </div>
            </div>
        </nav>
        <br /><br />
        <div className="my-5 flex justify-center items-center h-screen">
            {

                adminBox && <Admin></Admin>
            }
            {
                homeBox && <div>
                    <h1>Bienvenue cher admininstrateur !</h1>
                </div>
            }

            {
                userBox && <User></User>
            }
            {
                actBox && <Act />
            }
            {
                notifBox && <Notification></Notification>
            }
        </div>

    </>
}

export default AdminBoard