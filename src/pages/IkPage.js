import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import StaffPage from './StaffPage';

const IkPage = () => {
    const [staffs, setStaffs] = useState([]); 
    const [filters, setFilters] = useState({});
    const history = useHistory();

    //bunu açınca sayfaya otomatik db den her şeyi çekiyo
    /* 
    useEffect(() => {
        fetchStaffs();
    }, []);*/

    const fetchStaffs = () => {
        const requestParams = {
            adi: filters.adi || undefined,
            soyadi: filters.soyadi || undefined,
            tckn: filters.tckn || undefined,
            birim: filters.birim || undefined,
        };
    
        axios.get('/api/staff/filter', {
            params: requestParams
        }).then(response => {
            setStaffs(response.data);
        });
    };
    

    const handleFilterChange = (event) => {
        const { name, value } = event.target;
        setFilters(currentFilters => ({ ...currentFilters, [name]: value }));
    };

    const handleEditClick = (staff) => {
        history.push(`/staffpage/${staff.id}`);
    };

    let staffTable;
    if (staffs.length > 0) {
        staffTable = (
            <table className="table table-striped table-bordered mt-4">
                <thead>
                    <tr>
                        <th>Sicil Bilgisi</th>
                        <th>Adı</th>
                        <th>Soyadı</th>
                        <th>TCKN</th>
                        <th>Birim</th>
                        <th>İşlem</th>
                    </tr>
                </thead>
                <tbody>
                    {staffs.map(staff => (
                        <tr key={staff.id}>
                            <td>{staff.sicilNumarasi}</td>
                            <td>{staff.adi}</td>
                            <td>{staff.soyadi}</td>
                            <td>{staff.tckn}</td>
                            <td>{staff.birim}</td>
                            <td>
                                <button className="btn btn-secondary" onClick={() => handleEditClick(staff)}>Güncelle</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        );
    } else {
        staffTable = <p className="alert alert-danger mt-4">Hiç personel bulunamadı.</p>;
    }

    


    return (
        <div className='container'>
            <div>
                <h1 className="text-center mt-2">Filtreleme</h1>
                <div className='row'>
                    <div className='col-3'>
                        <div className="mt-3">
                
                            <input className="form-control" name="adi" onChange={handleFilterChange} placeholder="İsim"></input>
                        </div>
                    </div>
                    <div className='col-3'>
                        <div className="mt-3">
                            
                            <input className="form-control" name="soyadi" onChange={handleFilterChange} placeholder="Soyisim"></input>
                        </div>
                    </div>
                    <div className='col-3'>
                        <div className="mt-3">
                           
                            <input className="form-control" name="tckn" onChange={handleFilterChange} placeholder="TC"></input>
                        </div>
                    </div>
                    <div className='col-3'>
                        <div className="mt-3">
                            <select className="form-control" name="birim" onChange={handleFilterChange}>
                                <option value="">Birim Seçiniz</option>
                                <option value="YAZILIM_GELISTIRME">Yazılım Geliştirme</option>
                                <option value="ARGE">Ar-Ge</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div className='row'>
                    <div className='col text-center'>
                        <button className="mt-4 btn btn-secondary" onClick={fetchStaffs}>
                            Filtrele
                        </button>
                    </div>
                </div>
            </div>
            
            <h1 className="text-center mt-3">Personel Listesi</h1>
            {staffTable}
        
            
            <div className='row'>
                <div className='col text-center'>
                    <button className="mt-4 btn btn-secondary" onClick={() => history.push('/staffpage/new')}>
                        Yeni Personel Ekle
                    </button>
                </div>
            </div>
        </div>
    );
    
    
}

export default IkPage;
