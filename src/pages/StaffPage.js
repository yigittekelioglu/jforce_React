import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useHistory, useParams } from 'react-router-dom'; 

const StaffPage = () => {
    const [staff, setStaff] = useState({});
    const history = useHistory();
    const { id } = useParams(); 

    useEffect(() => {
        if (id) {
            fetchStaff();
        }
    }, [id]);

    const fetchStaff = () => {
        axios.get(`/api/staff/${id}`)
            .then(response => {
                setStaff(response.data);
            })
    };

    const handleSubmit = (e) => {
        e.preventDefault(); //page refreshlenınce datanın gitmemesini sağlıyo

        if (staff.id) {
            axios.put(`/api/staff/${staff.id}`, staff)
                .then(response => {
                    setStaff(response.data);
                    history.push('/ik');
                })      
        } 
        else {
            axios.post(`/api/staff`, staff)
                .then(response => {
                    setStaff(response.data);
                    history.push('/ik');
                })
        }
    };

    const handleStaffChange = (e) => {
        const { name, value } = e.target;
        setStaff(prev => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const fileReader = new FileReader();
            fileReader.onloadend = () => {
                setStaff({ ...staff, profilFoto: fileReader.result });
            };
            fileReader.readAsDataURL(file);
        }
    };
    

    return (
        <form onSubmit={handleSubmit}>
            <div className='container'>
                <h1 className="text-center mt-2">Personel Bilgisi</h1>
                <div className='row mt-3'>
                    <div className='col-6 text-center'>
                        <label>Adı:</label>
                        <input className="form-control" name="adi" value={staff.adi || ''} onChange={handleStaffChange} />
                    </div>
                    <div className='col-6 text-center'>
                        <label>Soyadı:</label>
                        <input className="form-control" name="soyadi" value={staff.soyadi || ''} onChange={handleStaffChange} />
                    </div>
                </div>

                <div className='row mt-4'>
                    <div className='col-6 text-center'>
                        <label>Cinsiyet:</label>
                        <select className="form-select " name="cinsiyet" value={staff.cinsiyet || ''} onChange={handleStaffChange}>
                            <option value="">Cinsiyet Seçiniz</option>
                            <option value="M">Erkek</option>
                            <option value="F">Kadın</option>
                        </select>
                    </div>
                    <div className='col-6 text-center'>
                        <label>Doğum Tarihi:</label>
                        <input className="form-control" type="date" name="dogumTarihi" value={staff.dogumTarihi || ''} onChange={handleStaffChange} />
                    </div>
                </div>

                <div className='row mt-4'>
                    <div className='col-6 text-center'>
                        <label>Medeni Durumu:</label>
                        <input className="form-control" name="medeniDurumu" value={staff.medeniDurumu || ''} onChange={handleStaffChange} />
                    </div>
                    <div className='col-6 text-center'>
                        <label>TCKN:</label>
                        <input className="form-control" name="tckn" value={staff.tckn || ''} onChange={handleStaffChange} />
                    </div>
                </div>

                <div className='row mt-4'>
                    <div className='col-6 text-center'>
                        <label>Sicil Numarası:</label>
                        <input className="form-control" name="sicilNumarasi" value={staff.sicilNumarasi || ''} onChange={handleStaffChange} />
                    </div>
                    <div className='col-6 text-center'>
                        <label>Mezuniyet Durumu:</label>
                        <select className="form-select" name="mezuniyetDurumu" value={staff.mezuniyetDurumu || ''} onChange={handleStaffChange}>
                            <option value="">Mezuniyet Durumu Seçiniz</option>
                            <option value="LISANS">Lisans</option>
                            <option value="ONLISANS">Önlisans</option>
                            <option value="YUKSEK_LISANS">Yüksek Lisans</option>
                            <option value="DOKTORA">Doktora</option>
                        </select>
                    </div>
                </div>

                <div className='row mt-4'>
                    <div className='col-6 text-center'>
                        <label>Birim:</label>
                        <select className="form-select" name="birim" value={staff.birim || ''} onChange={handleStaffChange}>
                            <option value="">Birim Seçiniz</option>
                            <option value="YAZILIM_GELISTIRME">Yazılım Geliştirme</option>
                            <option value="ARGE">Ar-Ge</option>
                        </select>
                    </div>
                    <div className='col-6 text-center'>
                        <label>Görev:</label>
                        <select className="form-select" name="gorev" value={staff.gorev || ''} onChange={handleStaffChange}>
                            <option value="">Görev Seçiniz</option>
                            <option value="YAZILIM_GELISTIRME_UZMANI">Yazılım Geliştirme Uzmanı</option>
                            <option value="YONETMEN_YARDIMCISI">Yönetmen Yardımcısı</option>
                            <option value="YONETMEN">Yönetmen</option>
                        </select>
                    </div>
                </div>

                <div className='row mt-4'>
                    <div className='col-6 d-flex justify-content-center flex-column'>
                        <label className="text-center mb-2">Çalışma Durumu:</label>
                        <input className="form-check mx-auto" type="checkbox" name="calismaDurumu" checked={staff.calismaDurumu || false} onChange={(e) => setStaff({...staff, calismaDurumu: e.target.checked})} />
                    </div>
                    <div className='col-6 text-center'>
                        <label>Profil Foto:</label>
                        <input className="form-control" type="file" name="profilFoto" onChange={handleFileChange} />
                    </div>
                </div>

                <div className='row mt-4'>
                    <div className='col-6 text-center'>
                        <label>İşe Giriş Tarihi:</label>
                        <input className="form-control" type="date" name="iseGirisTarihi" value={staff.iseGirisTarihi || ''} onChange={handleStaffChange} />
                    </div>
                    <div className='col-6 text-center'>
                        <label>İşe Başladığı Pozisyon:</label>
                        <input className="form-control" name="iseBasladigiPozisyon" value={staff.iseBasladigiPozisyon || ''} onChange={handleStaffChange} />
                    </div>
                </div>

                <div className='row mt-4'>
                    <div className='col-6 text-center'>
                        <label>İşe Başladığı Ünvan:</label>
                        <input className="form-control" name="iseBasladigiUnvan" value={staff.iseBasladigiUnvan || ''} onChange={handleStaffChange} />
                    </div>
                    <div className='col-6 text-center'>
                        <label>İşten Ayrılma Tarihi:</label>
                        <input className="form-control" type="date" name="istenAyrilmaTarihi" value={staff.istenAyrilmaTarihi || ''} onChange={handleStaffChange} />
                    </div>
                </div>

                <div className='row mt-4'>
                    <div className='col text-center'>
                        <label>İşten Ayrılma Nedeni:</label>
                        <textarea className="form-control" name="istenAyrilmaNedeni" rows="5" value={staff.istenAyrilmaNedeni || ''} onChange={handleStaffChange} />
                    </div>
                </div>

                <div className='row mt-3 mb-3'>
                    <div className='col text-center'>
                        <button className="mt-4 btn btn-primary" type='submit'>
                            Kaydet
                        </button>
                    </div>
                </div>

            </div>
        </form>

    );
}

export default StaffPage;
