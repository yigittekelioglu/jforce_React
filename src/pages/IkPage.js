import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
//import StaffPage from './StaffPage';

//query değiştir ikisi farklıysa boş gelsin
const IkPage = () => {
    const [staffs, setStaffs] = useState([]); 
    const [filters, setFilters] = useState({});
    const [zimmetStaffs, setZimmetStaffs] = useState([]);
    const history = useHistory();

    //bunu açınca sayfaya otomatik db den her şeyi çekiyo
    useEffect(() => {
        fetchStaffs();
        fetchZimmetStaffs();
        
    }, []);


    const fetchStaffs = () => {
        const filterStaffParameters = {
            adi: filters.adi || undefined,
            soyadi: filters.soyadi || undefined,
            tckn: filters.tckn || undefined,
            birim: filters.birim || undefined,
        };
    
        axios.get('/api/staff/filter', {
            params: filterStaffParameters
        }).then(response => {
            setStaffs(response.data);
        });
    };

    const fetchZimmetStaffs = () => {
        const filterZimmetParameters = {
            adi: filters.zimmetAdi || undefined,
            sicilNumarasi: filters.zimmetSicilNumarasi || undefined,
        };
    
        axios.get('/api/inventory-assignment/staff-search', {
            params: filterZimmetParameters
        }).then(response => {
            setZimmetStaffs(response.data);
        });
    };
    
    //aynı fonksiyona indirgenebilme handlebuttonclick gibi? denedim oldu fakat yapılır mı?
    const handleFilterStaffChange = (e) => {
        const { name, value } = e.target;
        setFilters(prev => ({ ...prev, [name]: value }));
    };

    const handleFilterZimmetChange = (e) => {
        const { name, value } = e.target;
        setFilters(prev => ({ ...prev, [name]: value }));
    };

    const handleButtonClick = (item, type) => {
        if (type === "staff") {
            history.push(`/staffpage/${item.id}`);
        } else if (type === "zimmet") {
            //console.log("Stafke: ", item.id);
            history.push(`/assignments/${item.id}`);
        }
    };

    function birimConverter(birim) {
        if (birim === 'YAZILIM_GELISTIRME') {
            return 'Yazılım Geliştirme';
        } else if (birim === 'ARGE') {
            return 'Ar-Ge';
        } else {
            return birim;
        }
    }
    

   
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
                            <td>{birimConverter(staff.birim)}</td>
                            <td>
                                <button className="btn btn-warning" onClick={() => handleButtonClick(staff, 'staff')}>Güncelle</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        );
    } 
    else {
        staffTable = <p className="alert alert-danger mt-4">Hiç personel bulunamadı.</p>;
    }

    let zimmetTable;
    if(zimmetStaffs.length > 0){
        zimmetTable = (
            <table className="table table-striped table-bordered mt-4">
                <thead>
                    <tr>
                        <th>Adı</th>
                        <th>Soyadı</th>
                        <th>Sicil Numarası</th>
                        <th>Birim</th>
                        <th>İşlem</th> 
                    </tr>
                </thead>
                <tbody>
                    {
                        zimmetStaffs.map(staff => (
                            <tr key={staff.id}>
                                <td>{staff.adi}</td>
                                <td>{staff.soyadi}</td>                 
                                <td>{staff.sicilNumarasi}</td>
                                <td>{birimConverter(staff.birim)}</td> 
                                <td>
                                <button className="btn btn-warning" onClick={() => handleButtonClick(staff, 'zimmet')} >Zimmet İşlemleri</button>
                                </td> 
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        );
        
    }
    else {
        zimmetTable = <p className="alert alert-danger mt-4">Hiç personel bulunamadı.</p>
    }

    


    return (
        <div className='container'>
            <div>
                <h1 className="text-center mt-2">Personel Filtreleme</h1>
                <div className='row'>
                    <div className='col-3'>
                        <div className="mt-3">
                
                            <input className="form-control" name="adi" onChange={handleFilterStaffChange} placeholder="İsim"></input>
                        </div>
                    </div>
                    <div className='col-3'>
                        <div className="mt-3">
                            
                            <input className="form-control" name="soyadi" onChange={handleFilterStaffChange} placeholder="Soyisim"></input>
                        </div>
                    </div>
                    <div className='col-3'>
                        <div className="mt-3">
                           
                            <input className="form-control" name="tckn" onChange={handleFilterStaffChange} placeholder="TC"></input>
                        </div>
                    </div>
                    <div className='col-3'>
                        <div className="mt-3 ">
                            <select className="form-select" name="birim" onChange={handleFilterStaffChange}>
                                <option value="">Birim Seçiniz</option>
                                <option value="YAZILIM_GELISTIRME">Yazılım Geliştirme</option>
                                <option value="ARGE">Ar-Ge</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div className='row'>
                    <div className='col text-center'>
                        <button className="mt-4 btn btn-success" onClick={fetchStaffs}>
                            Filtrele
                        </button>
                    </div>
                </div>
            </div>
            
            <h1 className="text-center mt-3">Personel Listesi</h1>
            {staffTable}
        
            
            <div className='row'>
                <div className='col text-center'>
                    <button className="mt-2 btn btn-primary" onClick={() => history.push('/staffpage/')}>
                        Yeni Personel Ekle
                    </button>
                </div>
            </div>
            
            
            <h1 className="text-center mt-3">Zimmet Personel Filtreleme</h1>
            <div className='row'>
                <div className='col-5'>
                    <input className="form-control" name="zimmetAdi" onChange={handleFilterZimmetChange} placeholder="İsim"></input>
                </div>
                <div className='col-5'>
                    <input className="form-control" name="zimmetSicilNumarasi" onChange={handleFilterZimmetChange} placeholder="Sicil Numarası"></input>
                </div>
                <div className='col-2 text-center'>
                    <button className=" btn btn-success" onClick={fetchZimmetStaffs}>
                        Zimmete Göre Filtrele
                    </button>
                </div>
            </div>

            <h1 className="mt-3 text-center">Personel Listesi</h1>
            
            {zimmetTable}





        </div>
    );
    
    
}

export default IkPage;
