import { withRouter, useHistory } from 'react-router-dom';
import React, { useState, useEffect } from 'react';


const AdminPage = () => {
    const history = useHistory();


    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetch("/api/1.0/users")
        .then(response => {
            return response.json();
        })
        .then(data => {
            setUsers(data);
        })
    }, []);

    const assignRole = (userId, roleType) => {
        fetch(`/api/1.0/users/${userId}/role`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(roleType) 
        })
    }

    return (
        <div>
            <div className='container'>
                <h1 className="text-center mt-3">Admin Paneli</h1>
                <div className='row mt-3'>
                    <div className='col-6 text-center'>
                        <button className="mt-2 btn btn-secondary" onClick={() => history.push('/ik')}>
                            Ik Sayfası
                        </button>
                    </div>
                    <div className='col-6 text-center'>
                        <button className="mt-2 btn btn-secondary" onClick={() => history.push('/inventory')}>
                            Envanter Sayfası
                        </button>
                    </div>
                </div>
                
                <div className='row mt-3'>
                    <div className='col'>
                        <table className="table table-striped">
                            <thead>
                                <tr>
                                    <th scope="col">Kullanıcı Adı</th>
                                    <th scope="col">Atanmış Rol</th>
                                    <th scope="col">Yeni Rol Atama</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.map(user => (
                                    <tr key={user.id}>
                                        <td>{user.username}</td>
                                        <td>{user.role ? user.role.name : "Rol Atanmamış"}</td>
                                        <td>
                                            <select 
                                                className="form-select"
                                                defaultValue={user.role ? user.role.name : "NONE"} 
                                                onChange={(e) => assignRole(user.id, e.target.value)}>
                                                <option value="NONE">Rol Ata</option>
                                                <option value="ADMIN">Admin</option>
                                                <option value="IK">IK</option>
                                                <option value="INVENTORYMASTER">Inventory Master</option>
                                            </select>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default withRouter(AdminPage);
