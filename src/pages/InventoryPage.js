import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useHistory } from 'react-router-dom'; 

const InventoryPage = () => {
    const { id } = useParams(); 
    const history = useHistory(); 

    const [inventory, setInventory] = useState({
        type: '', 
        entryDate: '', 
        brand: '', 
        model: '', 
        serialNumber: '', 
        status: ''
    });

    useEffect(() => {
        if (id) {
            fetch(`/api/inventory/${id}`)
                .then(response => response.json())
                .then(data => {
                    setInventory(prev => ({
                        ...prev,
                        id: data.id || prev.id,
                        type: data.type || '',
                        entryDate: data.entryDate || '',
                        brand: data.brand || '',
                        model: data.model || '',
                        serialNumber: data.serialNumber || '',
                        status: data.status || ''
                    }))
                })                
                .catch(error => console.error("loading inventory error:", error));
        }
    }, [id]);
    

    const handleChange = (e) => {
        const { name, value } = e.target;
        setInventory(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        console.log("Data:", inventory);

        try {
            let response;
            if (inventory.id) {
                response = await axios.put(`/api/inventory/${inventory.id}`, inventory);
            } else {
                response = await axios.post('/api/inventory', inventory);
            }
            
            const data = response.data;
    
            setInventory({
                id: data.id || null,
                type: data.type || '',
                entryDate: data.entryDate || '',
                brand: data.brand || '',
                model: data.model || '',
                serialNumber: data.serialNumber || '',
                status: data.status || ''
            });

            
            history.push('/inventory');
        } catch (error) {
            console.error("ınventory submit error:", error);
        }
    };
    


    return (
        <div className='container'>
            <h1 className="text-center mt-2">Personel Bilgisi</h1>

            <form onSubmit={handleSubmit}>
                <div className='row mt-3'>
                    <div className='col-4 text-center'>
                        <label>Envanter Türü:</label>
                        <input className='form-control'
                        type="text" 
                        name="type" 
                        value={inventory.type?.type || inventory.type || ''}
                        onChange={handleChange}
                        />
                    </div>
                    <div className='col-4 text-center'>
                        <label>Giriş Tarihi:</label>
                        <input className='form-control'
                            type="date" 
                            name="entryDate" 
                            value={inventory.entryDate }
                            onChange={handleChange}
                        />
                    </div>
                    <div className='col-4 text-center'>
                        <label>Marka:</label>
                        <input className='form-control'
                            type="text" 
                            name="brand" 
                            value={inventory.brand || ''}
                            onChange={handleChange}
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
                            onChange={handleChange}
                        />
                    </div>
                    <div className='col-4 text-center'>
                        <label>Seri Numarası:</label>
                        <input className='form-control'
                            type="text" 
                            name="serialNumber" 
                            value={inventory.serialNumber || ''}
                            onChange={handleChange}
                        />
                    </div>
                    <div className='col-4 text-center'>
                        <label>Durumu:</label>
                        <select className='form-control'
                            name="status" 
                            value={inventory.status || ''}
                            onChange={handleChange}
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
                        <button className="mt-4 btn btn-secondary" type="submit">Kaydet</button>
                    </div>
                </div>
                
            </form>
        </div>
    );
}

export default InventoryPage;
