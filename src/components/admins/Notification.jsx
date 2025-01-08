import axios from "axios";
import { useEffect, useState } from "react";

function Notification() {
    const [data, setData] = useState([]);
    const [modalData, setModalData] = useState(null);

    const fetchNotif = async () => {
        try {
            const token = localStorage.getItem('token')
            console.log('token',token);
            axios.defaults.headers["authorization"] = `Bearer ${token}`;
            
            const response = await axios.get("http://localhost:3005/api/demand/lists");
            console.log(response);
            
        } catch (err) {
            console.error('Nooo'+err.message || err.response);
        }
    };

    useEffect(() => {
        fetchNotif();
    }, []);

    const openModal = (demand) => {
        setModalData(demand);
    };

    const closeModal = () => {
        setModalData(null);
    };


    const handleAction = async (action) => {
        try{
            let response;
            let content;
            switch(action){
                case "ACCEPTE":{
                    content = {
                        idDemande:modalData.id,
                        status:action
                    }
                    response =  await axios.put('http://localhost:3005/api/demand/update',content)
                    break
                }
                case "REFUSED":{
                    content = {
                        idDemande:modalData.id,
                        status:action
                    }
                    response =  await axios.put('http://localhost:3005/api/demand/update',content)
                    break
                }

                case "YES":{
                    content = {
                        idDemande:modalData.id,
                        paid:action
                    }
                    response =  await axios.put('http://localhost:3005/api/demand/update',content)
                    break
                }

            }

            console.log(response)
            fetchNotif()
        }catch(err){
            console.log(err.response||err.message)
        }finally{

            closeModal();
        }
    };

    return (
        <div className="container py-4">
            <h1 className="mb-4">Notifications</h1>
            <ul className="list-group">
                {data.map((demand) => (
                    <li
                        key={demand.id}
                        className="list-group-item d-flex justify-content-between align-items-center"
                        style={{ cursor: "pointer" }}
                        onClick={() => openModal(demand)}
                    >
                        <div>
                            <p className="mb-1">
                                <strong>User demand:</strong> {demand.emailUser}
                            </p>
                            <p className="mb-0">
                                <strong>Act Demand:</strong> {demand.actDemand}
                            </p>
                        </div>
                        <span className="badge bg-primary rounded-pill">Voir</span>
                    </li>
                ))}
            </ul>

            {modalData && (
                <div
                    className="modal fade show d-block"
                    tabIndex="-1"
                    style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
                >
                    <div className="modal-dialog modal-lg">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Notification Details</h5>
                                <button
                                    type="button"
                                    className="btn-close"
                                    onClick={closeModal}
                                ></button>
                            </div>
                            <div className="modal-body">
                                <p>
                                    <strong>User demand:</strong> {modalData.emailUser}
                                </p>
                                <p>
                                    <strong>Type act:</strong> {modalData.actDemand}
                                </p>
                                <p>
                                    <strong>N° act:</strong> {modalData.numAct}
                                </p>
                                <p>
                                    <strong>Name:</strong> {modalData.name}
                                </p>
                                <p>
                                    <strong>First Name:</strong> {modalData.firstName}
                                </p>
                                <p>
                                    <strong>Date of birth:</strong> {modalData.dateOfBirth}
                                </p>
                                <p>
                                    <strong>Place of birth:</strong> {modalData.placeOfBirth}
                                </p>
                                <p>
                                    <strong>Attachments:</strong>
                                </p>
                                <div className="d-flex gap-2 flex-wrap">
                                    {modalData.attachment?.map((att, key) => (
                                        <img
                                            key={key}
                                            src={`data:image/png;base64,${att}`}
                                            alt={`Attachment ${key}`}
                                            className="img-thumbnail"
                                            style={{ height: "100px", width: "100px" }}
                                        />
                                    ))}
                                </div>
                            </div>
                            <div className="modal-footer">
                                {modalData.status === "ACCEPTE" ? (
                                    <button
                                        className="btn btn-secondary"
                                        onClick={()=> handleAction('YES')}
                                    >
                                        Envoyer
                                    </button>
                                ) : (
                                    <>
                                        <button
                                            className="btn btn-success"
                                            onClick={() => handleAction("ACCEPTE")}
                                        >
                                            Accepter
                                        </button>
                                        <button
                                            className="btn btn-danger"
                                            onClick={() => handleAction("REFUSED")}
                                        >
                                            Refuser
                                        </button>
                                    </>
                                )}
                                <button
                                    className="btn btn-secondary"
                                    onClick={closeModal}
                                >
                                    Annuler
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Notification;
