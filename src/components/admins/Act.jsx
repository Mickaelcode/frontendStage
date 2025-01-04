import axios from "axios"
import { jwtDecode } from "jwt-decode"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

function Act() {

    const [search, Setsearch] = useState('')
    const [acts, setActs] = useState([])
    const [boxUpdate, setBoxUpdate] = useState(false)
    const [boxCreate, setBoxCreate] = useState(false)

    const navigate = useNavigate()
    const initData = {

        numAct: '',

        typeActe: 'BORN',

        nameCit: '',

        firstNameCit: '',

        dateOB: '',

        placeOB: '',

        nameCommune: '',

        province: 'ANTANANARIVO',

        father: '',

        mother: '',

        delivrance: '',

        fileActe: ''

    }
    const [dataAct, setDataAct] = useState(initData)



    const research = (e) => {
        Setsearch(e.target.value)
        console.log(search)
    }

    const handleCardCreate = () => {
        setBoxCreate(true)
    }

    const fetchAct = async () => {
        try {
            const token = localStorage.getItem('token')
            if (!token) navigate('/admin')

            const id = jwtDecode(token)
            if (id.role !== 'admin') navigate('/admin')

            const response = await axios.get('http://localhost:3005/api/act/lists')
            const data = response.data.act

            setActs(data)

        } catch (err) {
            console.log(err.message || err);

        }
    }

    const updateAct = (act) => {
        setDataAct({ ...act, fileActe: '' })
        setBoxUpdate(true)
    }

    const formatDateForInput = (isoString) => {
        const date = new Date(isoString);
        return date.toISOString().slice(0, 16);
    };
    const formatInputToISO = (datetimeLocal) => {
        const date = new Date(datetimeLocal);
        return date.toISOString();
    };
    const numActUpdate = e => setDataAct({ ...dataAct, numAct: e.target.value })
    const typeActUpdate = (e) => setDataAct({ ...dataAct, typeActe: e.target.value })
    const nameUpdate = (e) => setDataAct({ ...dataAct, nameCit: e.target.value })
    const firstNameCitUpdate = e => setDataAct({ ...dataAct, firstNameCit: e.target.value })
    const datOBUpdate = e => setDataAct({ ...dataAct, dateOB: formatInputToISO(e.target.value) })
    const placeOBUpdate = e => setDataAct({ ...dataAct, placeOB: e.target.value })
    const nameCommuneUpdate = e => setDataAct({ ...dataAct, nameCommune: e.target.value })
    const provinceUpdate = e => setDataAct({ ...dataAct, province: e.target.value })
    const fatherUpdate = e => setDataAct({ ...dataAct, father: e.target.value })
    const motherUpdate = e => setDataAct({ ...dataAct, mother: e.target.value })
    const delivranceUpdate = e => setDataAct({ ...dataAct, delivrance: formatInputToISO(e.target.value) })
    const fileActeUpdate = e => setDataAct({ ...dataAct, fileActe: e.target.files })



    const updateActForm = async (e) => {
        e.preventDefault();

        try {

            const formData = new FormData();
            for (const key in dataAct) {
                if (key === "fileActe" && dataAct.fileActe && dataAct.fileActe.length > 0) {
                    Array.from(dataAct.fileActe).forEach((file) => {
                        formData.append("files", file);
                    });
                } else {
                    formData.append(key, dataAct[key]);
                }
            }

            const response = await axios.put('http://localhost:3005/api/act/update', formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            console.log(response);
            fetchAct();
        } catch (err) {
            console.error(err.message || err);
        } finally {
            setBoxUpdate(false);
            setDataAct(initData)
        }
    };

    const createAct = async (e) => {
        e.preventDefault()
        try {

            const formData = new FormData();
            for (const key in dataAct) {
                if (key === "fileActe") {
                    Array.from(dataAct.fileActe).forEach((file) => {
                        formData.append("files", file);
                    });
                } else {
                    formData.append(key, dataAct[key]);
                }
            }

            const response = await axios.post('http://localhost:3005/api/act/create', formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            })
            console.log(response);
            fetchAct()

        } catch (err) {
            console.log(err.message || err.response);

        } finally {
            setBoxCreate(false)
            setDataAct(initData)
        }
    }


    const deleteAct = async numAct =>{
        try{
            const response = await axios.delete('http://localhost:3005/api/act/delete',{
                data:{
                    numAct
                }
            })
            console.log(response)
            fetchAct()
        }catch(err){
            console.log(err.message||err.response);
            
        }
    }





    useEffect(() => {
        fetchAct()
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
                        <form onSubmit={createAct} className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Update Act</h5>
                            </div>
                            <div className="modal-body">
                                <div className="row mb-4">
                                    <div className="col">
                                        <div className="form-outline">
                                            <input
                                                type="text"
                                                className="form-control"
                                                value={dataAct.numAct}
                                                onChange={numActUpdate}
                                            />
                                            <label className="form-label"> N° Act</label>
                                        </div>
                                    </div>
                                    <div className="col">
                                        <div className="form-outline">
                                            <select
                                                className="form-control"
                                                value={dataAct.typeActe}
                                                onChange={typeActUpdate}
                                            >
                                                <option value="BORN">BORN</option>
                                                <option value="DEATH">DEATH</option>
                                                <option value="WEDDING">WEDDING</option>
                                            </select>
                                            <label className="form-label">Type Act</label>
                                        </div>
                                    </div>
                                </div>
                                <div className="col">
                                    <div className="form-outline">
                                        <input
                                            type="text"
                                            className="form-control"
                                            value={dataAct.nameCit}
                                            onChange={nameUpdate}
                                        />
                                        <label className="form-label">Name</label>
                                    </div>
                                </div>
                                <div className="col">
                                    <div className="form-outline">
                                        <input
                                            type="text"
                                            className="form-control"
                                            value={dataAct.firstNameCit}
                                            onChange={firstNameCitUpdate}
                                        />
                                        <label className="form-label">First Name</label>
                                    </div>
                                </div>

                                <div className="col">
                                    <div className="form-outline">
                                        <input
                                            type="datetime-local"
                                            className="form-control"
                                            value={dataAct.dateOB ? formatDateForInput(dataAct.dateOB) : dataAct.dateOB}
                                            onChange={datOBUpdate}
                                        />
                                        <label className="form-label">Date of birth</label>
                                    </div>
                                </div>

                                <div className="col">
                                    <div className="form-outline">
                                        <input
                                            type="text"
                                            className="form-control"
                                            value={dataAct.placeOB}
                                            onChange={placeOBUpdate}
                                        />
                                        <label className="form-label">Place of birth</label>
                                    </div>
                                </div>

                                <div className="col">
                                    <div className="form-outline">
                                        <input
                                            type="text"
                                            className="form-control"
                                            value={dataAct.nameCommune}
                                            onChange={nameCommuneUpdate}
                                        />
                                        <label className="form-label">Commune</label>
                                    </div>
                                </div>

                                <div className="col">
                                    <div className="form-outline">
                                        <select
                                            className="form-control"
                                            value={dataAct.province}
                                            onChange={provinceUpdate}
                                        >
                                            <option value="ANTANANARIVO">ANTANANARIVO</option>
                                            <option value="FIANARANTSOA">FIANARANTSOA</option>
                                            <option value="MAHAJANGA">MAHAJANGA</option>
                                            <option value="TOAMASINA">TOAMASINA</option>
                                            <option value="ANTSIRANANA">ANTSIRANANA</option>
                                            <option value="TOLIARA">TOLIARA</option>
                                        </select>
                                        <label className="form-label">Province</label>
                                    </div>
                                </div>

                                <div className="col">
                                    <div className="form-outline">
                                        <input
                                            type="text"
                                            className="form-control"
                                            value={dataAct.father}
                                            onChange={fatherUpdate}
                                        />
                                        <label className="form-label">Father</label>
                                    </div>
                                </div>

                                <div className="col">
                                    <div className="form-outline">
                                        <input
                                            type="text"
                                            className="form-control"
                                            value={dataAct.mother}
                                            onChange={motherUpdate}
                                        />
                                        <label className="form-label">Mother</label>
                                    </div>
                                </div>

                                <div className="col">
                                    <div className="form-outline">
                                        <input
                                            type="datetime-local"
                                            className="form-control"
                                            value={dataAct.delivrance ? formatDateForInput(dataAct.delivrance) : dataAct.delivrance}
                                            onChange={delivranceUpdate}
                                        />
                                        <label className="form-label">Delivrance</label>
                                    </div>
                                </div>

                                <div className="col">
                                    <div className="form-outline">
                                        <input
                                            type="file"
                                            name="files"
                                            className="form-control"
                                            onChange={fileActeUpdate}
                                        />
                                        <label className="form-label">File Act</label>
                                    </div>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="submit" className="btn btn-primary">
                                    Create
                                </button>
                                <button
                                    type="button"
                                    className="btn btn-secondary"
                                    onClick={() => setBoxCreate(false)}
                                >
                                    Close
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )


        }


        <table className="table table-dark table-hover table-bordered my-5">
            <thead className="table-light">
                <tr>
                    <th>Act N°</th>
                    <th>Type</th>
                    <th>Name</th>
                    <th>First Name</th>
                    <th>Country</th>
                    <th>File Act</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {acts.map((act) => (
                    <tr key={act.numAct}>
                        <td>{act.numAct}</td>
                        <td>{act.typeActe}</td>
                        <td>{act.nameCit}</td>
                        <td>{act.firstNameCit}</td>
                        <td>{act.province}</td>
                        <td className="text-center">
                            <img
                                src={`data:image/png;base64,${act.fileActe}`}
                                alt="File Acte"
                                style={{ height: "70px", objectFit: "contain" }}
                            />
                        </td>
                        <td>
                            <div className="d-flex gap-2 justify-content-center">
                                <button
                                    className="btn btn-outline-primary btn-sm"
                                    onClick={() => updateAct(act)}
                                >
                                    <i className="bi bi-pencil"></i> Update
                                </button>
                                <button
                                    className="btn btn-outline-danger btn-sm"
                                    onClick={() => deleteAct(act.numAct)}
                                >
                                    <i className="bi bi-trash"></i> Delete
                                </button>
                            </div>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>


        {
            boxUpdate && (
                <div className="modal fade show d-block" tabIndex="-1" style={{ display: "block", backgroundColor: "rgba(0,0,0,0.5)" }} role="dialog">
                    <div className="modal-dialog modal-dialog-centered" role="document">
                        <form onSubmit={updateActForm} className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Update Act</h5>
                            </div>
                            <div className="modal-body">
                                <div className="row mb-4">
                                    <div className="col">
                                        <div className="form-outline">
                                            <select
                                                className="form-control"
                                                value={dataAct.typeActe}
                                                onChange={typeActUpdate}
                                            >
                                                <option value="BORN">BORN</option>
                                                <option value="DEATH">DEATH</option>
                                                <option value="WEDDING">WEDDING</option>
                                            </select>
                                            <label className="form-label">Type Act</label>
                                        </div>
                                    </div>
                                </div>
                                <div className="col">
                                    <div className="form-outline">
                                        <input
                                            type="text"
                                            className="form-control"
                                            value={dataAct.nameCit}
                                            onChange={nameUpdate}
                                        />
                                        <label className="form-label">Name</label>
                                    </div>
                                </div>
                                <div className="col">
                                    <div className="form-outline">
                                        <input
                                            type="text"
                                            className="form-control"
                                            value={dataAct.firstNameCit}
                                            onChange={firstNameCitUpdate}
                                        />
                                        <label className="form-label">First Name</label>
                                    </div>
                                </div>

                                <div className="col">
                                    <div className="form-outline">
                                        <input
                                            type="datetime-local"
                                            className="form-control"
                                            value={dataAct.dateOB ? formatDateForInput(dataAct.dateOB) : dataAct.dateOB}
                                            onChange={datOBUpdate}
                                        />
                                        <label className="form-label">Date of birth</label>
                                    </div>
                                </div>

                                <div className="col">
                                    <div className="form-outline">
                                        <input
                                            type="text"
                                            className="form-control"
                                            value={dataAct.placeOB}
                                            onChange={placeOBUpdate}
                                        />
                                        <label className="form-label">Place of birth</label>
                                    </div>
                                </div>

                                <div className="col">
                                    <div className="form-outline">
                                        <input
                                            type="text"
                                            className="form-control"
                                            value={dataAct.nameCommune}
                                            onChange={nameCommuneUpdate}
                                        />
                                        <label className="form-label">Commune</label>
                                    </div>
                                </div>

                                <div className="col">
                                    <div className="form-outline">
                                        <select
                                            className="form-control"
                                            value={dataAct.province}
                                            onChange={provinceUpdate}
                                        >
                                            <option value="ANTANANARIVO">ANTANANARIVO</option>
                                            <option value="FIANARANTSOA">FIANARANTSOA</option>
                                            <option value="MAHAJANGA">MAHAJANGA</option>
                                            <option value="TOAMASINA">TOAMASINA</option>
                                            <option value="ANTSIRANANA">ANTSIRANANA</option>
                                            <option value="TOLIARA">TOLIARA</option>
                                        </select>
                                        <label className="form-label">Province</label>
                                    </div>
                                </div>

                                <div className="col">
                                    <div className="form-outline">
                                        <input
                                            type="text"
                                            className="form-control"
                                            value={dataAct.father}
                                            onChange={fatherUpdate}
                                        />
                                        <label className="form-label">Father</label>
                                    </div>
                                </div>

                                <div className="col">
                                    <div className="form-outline">
                                        <input
                                            type="text"
                                            className="form-control"
                                            value={dataAct.mother}
                                            onChange={motherUpdate}
                                        />
                                        <label className="form-label">Mother</label>
                                    </div>
                                </div>

                                <div className="col">
                                    <div className="form-outline">
                                        <input
                                            type="datetime-local"
                                            className="form-control"
                                            value={dataAct.delivrance ? formatDateForInput(dataAct.delivrance) : dataAct.delivrance}
                                            onChange={delivranceUpdate}
                                        />
                                        <label className="form-label">Delivrance</label>
                                    </div>
                                </div>

                                <div className="col">
                                    <div className="form-outline">
                                        <input
                                            type="file"
                                            name="files"
                                            className="form-control"
                                            onChange={fileActeUpdate}
                                        />
                                        <label className="form-label">File Act</label>
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

export default Act