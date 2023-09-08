import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

const InventoryMasterPage = () => {
    const [inventories, setInventories] = useState([]);
    const [inventoryTypes, setInventoryTypes] = useState([]);
    const [selectedType, setSelectedType] = useState(null);
    const history = useHistory();

    useEffect(() => {
        fetchInventoryTypes();
    }, []);  

    const fetchInventories = () => {
        let url = '/api/inventory/filter';
        if (selectedType) {
            url += `?typeName=${selectedType.type}`;
        }
        axios.get(url)
            .then(response => {
                setInventories(response.data);
            })
    };
    const fetchInventoryTypes = () => {
        axios.get('/api/inventory/types')
            .then(response => {
                setInventoryTypes(response.data);
            })
    };

    const handleTypeChange = (e) => {
        const typeId = parseInt(e.target.value, 10);
        const type = inventoryTypes.find(t => t.id === typeId);
        setSelectedType(type);
    };

    const handleFilterClick = () => {
        fetchInventories();
    };


    let inventoryTable;
    if (inventories.length > 0) {
        inventoryTable = (
            <table className="table table-striped table-bordered mt-4">
                <thead>
                    <tr>
                        <th>Envanter Tipi</th>
                        <th>Marka</th>
                        <th>Model</th>
                        <th>Seri Numarası</th>
                        <th>İşlemler</th>
                    </tr>
                </thead>
                <tbody>
                    {inventories.map(inventory => (
                        <tr key={inventory.id}>
                            <td>{inventory.type.type}</td>
                            <td>{inventory.brand}</td>
                            <td>{inventory.model}</td>
                            <td>{inventory.serialNumber}</td>
                            <td>
                                <button className="btn btn-warning" onClick={() => history.push(`/inventorypage/${inventory.id}`)}>Güncelle</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        );
    } else {
        inventoryTable = <p className="alert alert-danger mt-4">Lütfen bir envanter tipi seçiniz.</p>;
    }

    return (
        <div className='container'>
            <div>
                <h1 className="text-center mt-2">Filtreleme</h1>
                <div className='row'>
                    <div className='col-10 mt-3'>
                    <select className="form-select" onChange={handleTypeChange}>
                        <option value="">Lütfen Envanter Tipi Seçiniz</option>
                        {inventoryTypes.map(type => (
                            <option key={type.id} value={type.id}>{type.type}</option>
                        ))}
                    </select>
                    </div>
                    <div className='col-2 mt-3'>
                        <button className="btn btn-success" onClick={handleFilterClick}>Filtrele</button> 
                    </div>
                </div>
            </div>
            
            <h1 className="text-center mt-3">Envanter Listesi</h1>
            {inventoryTable}
            
            <div className='row mb-3'>
                <div className='col text-center'>
                    <button className="mt-2 btn btn-primary" onClick={() => history.push('/inventorypage/')}>Yeni Zimmet Ekle</button>
                </div>
            </div>
       </div>
    );
}

export default InventoryMasterPage;
