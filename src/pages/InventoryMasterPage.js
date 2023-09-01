import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

const InventoryMasterPage = () => {
    const [inventories, setInventories] = useState([]);
    const [inventoryTypes, setInventoryTypes] = useState([]);
    const [selectedType, setSelectedType] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [shouldLoadInventories, setShouldLoadInventories] = useState(false); 
    const history = useHistory();

    useEffect(() => {
        if (shouldLoadInventories) {
            loadInventories();
            setShouldLoadInventories(false);  
        }
        loadInventoryTypes();
    }, [shouldLoadInventories]);

    const loadInventories = () => {
        let url = '/api/inventory/filter';
        if (selectedType) {
            url += `?typeName=${selectedType.type}`;
        }

        fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`error: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                setInventories(data);
                setIsLoading(false);
            })
            .catch(error => console.error("load ınventory error:", error));
    };

    const loadInventoryTypes = () => {
        fetch('/api/inventory/types')
            .then(response => response.json())
            .then(data => {
                if (Array.isArray(data)) {
                    setInventoryTypes(data);
                } else {
                    console.error("array error.");
                }
            })
            .catch(error => console.error("ınventorytype loading error:", error));
    };

    const handleTypeChange = (e) => {
        const typeId = parseInt(e.target.value, 10);
        const type = inventoryTypes.find(t => t.id === typeId);
        setSelectedType(type);
    };

    const handleFilterClick = () => {
        setShouldLoadInventories(true); 
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
                                <button className="btn btn-secondary" onClick={() => history.push(`/inventorypage/${inventory.id}`)}>Güncelle</button>
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
                    <select className="form-control" onChange={handleTypeChange}>
                        <option value="">Lütfen Envanter Tipi Seçiniz</option>
                        {inventoryTypes.map(type => (
                            <option key={type.id} value={type.id}>{type.type}</option>
                        ))}
                    </select>
                    </div>
                    <div className='col-2 mt-3'>
                        <button className="btn btn-secondary" onClick={handleFilterClick}>Filtrele</button> 
                    </div>
                </div>
            </div>
            
            <h1 className="text-center mt-3">Envanter Listesi</h1>
            {inventoryTable}
            
            <div className='row mb-3'>
                <div className='col text-center'>
                    <button className="mt-2 btn btn-secondary" onClick={() => history.push('/inventorypage/')}>Yeni Zimmet Ekle</button>
                </div>
            </div>
       </div>
    );
}

export default InventoryMasterPage;
