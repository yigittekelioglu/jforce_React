import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const InventoryAssignmentPage = () => {
   
    const { id: staffId } = useParams();
    //console.log("Staff ID: ", staffId);
    const [assignments, setAssignments] = useState([]);
    const [unassignedInventories, setUnassignedInventories] = useState([]);
    const [showReturnPopup, setShowReturnPopup] = useState(false);
    const [showAddPopup, setShowAddPopup] = useState(false);
    const [selectedAssignment, setSelectedAssignment] = useState(null);
    const [returnDate, setReturnDate] = useState(new Date());
    const [pickupDate, setPickupDate] = useState(new Date());
    const [selectedInventory, setSelectedInventory] = useState(null);
    

    useEffect(() => {
        axios.get(`/api/inventory-assignment/assignments/${staffId}`)
            .then(response => {
                //console.log(response.data);
                setAssignments(response.data);
            });
    }, [staffId]);
    

    const handleOpenReturnPopup = (assignment) => {
        setSelectedAssignment(assignment);
        setShowReturnPopup(true);
    }

    const handleCloseReturnPopup = () => {
        setSelectedAssignment(null);
        setShowReturnPopup(false);
    }

    const handleOpenAddPopup = () => {
        axios.get('/api/inventory-assignment/unassigned-inventories')
            .then(response => {
                setUnassignedInventories(response.data);
            });
        setShowAddPopup(true);
    }

    const handleCloseAddPopup = () => {
        setShowAddPopup(false);
    }

    const handleReturnAssignmentClick = () => {    
        //console.log("ınventory id: ", selectedAssignment.inventory.id);
        //console.log("return date: ", returnDate);
        axios.post('/api/inventory-assignment/return-inventory',  {
            inventoryId: selectedAssignment.inventory.id,
            returnDate: returnDate
        })
        .then(response => {
            setAssignments(prev => prev.filter(assignment => assignment.id !== selectedAssignment.id));
            handleCloseReturnPopup();
        })
    }
    

    const handleAddAssignmentClick = () => {
        //console.log("Staff id: ", staffId);
        if (!selectedInventory) {      
            return;
        }
        else{
            axios.post('/api/inventory-assignment/assign', {
                staffId: staffId,
                inventoryId: selectedInventory,
                pickupDate: pickupDate
            })
            .then(response => {
                setAssignments(prev => [...prev, response.data]);
                handleCloseAddPopup();
            })
        }
    }
    


    let staffZimmetTable;
    if (assignments.length > 0) {
        staffZimmetTable = (
            <table className="table table-striped table-bordered mt-4">
                <thead>
                    <tr>
                        <th>Envanter Tipi</th>
                        <th>Marka/Model</th>
                        <th>İşlem</th>
                    </tr>
                </thead>
                <tbody>
                    {assignments.map(assignment => (
                        <tr key={assignment.id}>
                            <td>{assignment.inventory.type.type}</td> 
                            <td>{assignment.inventory.brand}</td> 
                            <td><button className="mt-2 btn btn-secondary" onClick={() => handleOpenReturnPopup(assignment)}>Zimmeti Geri Al</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        );
    } 
    else {
        staffZimmetTable = <p className="alert alert-danger mt-4">Bu kişi hiçbir zimmet eşyasına sahip değil.</p>;
    }

    function popUpModal() {
        if (showAddPopup) {
          return (
            <div className="modal show" tabIndex="-1" style={{ display: 'block' }}>
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header justify-content-center">
                                <h3 className="modal-title">Yeni Zimmet Ekle</h3>
                            </div>
                            <div className="modal-body">
                            <select className='form-control' onChange={(e) => setSelectedInventory(e.target.value)} value={selectedInventory}>
                                <option value="">Lütfen bir öğe seçiniz</option>
                                {unassignedInventories.map(inventory => (
                                    <option key={inventory.id} value={inventory.id}>
                                        {inventory.type.type} - {inventory.brand}
                                    </option>
                                ))}
                            </select>

                                <label>Verilme Tarihi: <input className='form-control' type="date" value={pickupDate} onChange={(e) => setPickupDate(e.target.value)} /></label>
                            </div>
                            <div className="modal-footer d-flex justify-content-center">
                                <button className="btn btn-secondary mr-2" onClick={handleAddAssignmentClick}>Onayla</button>
                                <button className="btn btn-secondary" onClick={handleCloseAddPopup}>İptal</button>
                            </div>
                        </div>
                    </div>
                </div>
          );
        }
        else if(showReturnPopup){
            return (
                <div className="modal show" tabIndex="-1" style={{ display: 'block' }}>
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header justify-content-center">
                                <h3 className="modal-title">Zimmeti Geri Al</h3>
                            </div>
                            <div className="modal-body">
                                <div className='row text-center'>
                                    <div className='col'>
                                        <label>Teslim Tarihi: <input className='form-control' type="date" value={returnDate} onChange={(e) => setReturnDate(e.target.value)} /></label>
                                    </div>
                                </div>
                            </div>
                            <div className="modal-footer d-flex justify-content-center">
                                <button className="btn btn-secondary mr-2" onClick={handleReturnAssignmentClick}>Onayla</button>
                                <button className="btn btn-secondary" onClick={handleCloseReturnPopup}>İptal</button>
                            </div>
                        </div>
                    </div>
                </div>
            );

        }
        else{
            return null;
        }
      }

    return (
        
        <div className='container'>

            <h1 className="text-center mt-3">Zimmet İşlemleri</h1>
            {staffZimmetTable}
            

            <div className='row'>
                <div className='col text-center'>
                    <button className="mt-2 btn btn-secondary" onClick={handleOpenAddPopup}>
                        Yeni Zimmet Ekle
                    </button>
                </div>
            </div>


            {popUpModal()}

        </div>
    );
};

export default InventoryAssignmentPage;
