import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useHistory } from 'react-router-dom'; 
//cascade ile tipi bağlama yapmak gerek

const InventoryPage = () => {
    const { id } = useParams(); 
    const [inventory, setInventory] = useState({});
    const history = useHistory(); 
    //basta parametreleri belirtmek mş belirtmemek mi?


    useEffect(() => {
        if (id) {
            axios.get(`/api/inventory/${id}`)
                .then(response => {
                    setInventory(response.data);
                })
        }
    }, [id]);
    

    const handleInventoryChange = (e) => {
        const { name, value } = e.target;
        setInventory(prev => ({...prev,[name]: value}));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
    
        if (inventory.id) {
            axios.put(`/api/inventory/${inventory.id}`, inventory)
                .then(response => {
                    setInventory(response.data);
                    history.push('/inventory');
                })
        } 
        else {
            axios.post('/api/inventory', inventory)
                .then(response => {
                    setInventory(response.data);
                    history.push('/inventory');
                })
        }
    };
    
    


    return (
        <div className='container'>
            <h1 className="text-center mt-2">Envanter Bilgisi</h1>

            <form onSubmit={handleSubmit}>
                <div className='row mt-3'>
                    <div className='col-4 text-center'>
                        <label>Envanter Türü:</label>
                        <input className='form-control'
                        type="text" 
                        name="type" 
                        value={inventory.type?.type || inventory.type || ''}
                        onChange={handleInventoryChange}
                        />
                    </div>
                    <div className='col-4 text-center'>
                        <label>Giriş Tarihi:</label>
                        <input className='form-control'
                            type="date" 
                            name="entryDate" 
                            value={inventory.entryDate }
                            onChange={handleInventoryChange}
                        />
                    </div>
                    <div className='col-4 text-center'>
                        <label>Marka:</label>
                        <input className='form-control'
                            type="text" 
                            name="brand" 
                            value={inventory.brand || ''}
                            onChange={handleInventoryChange}
                        />
                    </div>
                </div>
                <div className='row mt-3'>
                    <div className='col-4 text-center'>
                        <label>Model:</label>
                        <input className='form-control'
                            type="text" 
                            name="model" 
                            value={inventory.model || ''}
                            onChange={handleInventoryChange}
                        />
                    </div>
                    <div className='col-4 text-center'>
                        <label>Seri Numarası:</label>
                        <input className='form-control'
                            type="text" 
                            name="serialNumber" 
                            value={inventory.serialNumber || ''}
                            onChange={handleInventoryChange}
                        />
                    </div>
                    <div className='col-4 text-center'>
                        <label>Durumu:</label>
                        <select className='form-select'
                            name="status" 
                            value={inventory.status || ''}
                            onChange={handleInventoryChange}
                        >
                            <option value="">Durum Seçiniz</option>
                            <option value="IN_PERSON">Kişide</option>
                            <option value="IN_OFFICE">Ofiste</option>
                            <option value="IN_STORAGE">Depoda</option>
                        </select>
                    </div>
                </div>
                <div className='row  mt-3 mb-3'>
                    <div className='col text-center'>
                        <button className="mt-4 btn btn-primary" type="submit">Kaydet</button>
                    </div>
                </div>
                
            </form>
        </div>
    );
}

export default InventoryPage;
