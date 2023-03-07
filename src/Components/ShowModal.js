import React from 'react';
import { useContext, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import { Show } from './Context';
import { FaSpinner } from "react-icons/fa";

const ShowModal = () => {

    const handleClose = () => setShow(false);
    // const handleShow = () => setShow(true);
    let {show, setShow, title, setTitle, description, setDescription, items, setItems, id, setId, updateItem, setUpdateItem, isLoading, setIsLoading, isAlert, setIsAlert, setCheckButton} = useContext(Show);

    useEffect(() => {
        if(isLoading) {
            setIsAlert(true);
            setCheckButton('4');
        }
    },[isLoading])

    const submitForm = function(e) {
        e.preventDefault();
        document.querySelector('#add_btn').disabled = true;
        setIsLoading(true);
        
         setTimeout(() => {
            setIsLoading(false);
            setCheckButton('1');
            document.querySelector('#add_btn').disabled = false;
            let newItem = {
                id:id, title, description
              }
              
              setItems([...items, newItem]);
              
              setId(id+1);
              setTitle('');
              setDescription('');
        }, 1000);
        
        setTimeout(() => {
          setIsAlert(false);
        },3000);      
    }

    function saveEditedRecord(e) {
        e.preventDefault();
        const newItems = items.map((item) => {
          if(updateItem !== item.id)
            return item;
          else {
            return {
              ...item,
              title, description
            };
          }
        })
  
        setItems(newItems);
        setTitle('');
        setDescription('');
  
        setCheckButton('2');
        setUpdateItem(0);
        setShow(false);
        setIsAlert(true);
        setTimeout(() => {
          setIsAlert(false);
          
        },3000);
    }

  return (
    <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{updateItem===0?'Add Item':'Update Item'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        {
              isAlert?<div className="alert alert-danger" role="alert" id="alert-div"></div>:<></> 
          }
        <form className="form-container" onSubmit={updateItem===0?submitForm:saveEditedRecord}>
            <label className="form-label">Title</label>
            <input type="text" className="form-control form-control-lg" onChange={(e) => setTitle(e.target.value)} value={title} required />

            <br />
            <label className="form-label">Description</label>
            <textarea className="form-control form-control-lg" rows="4" onChange={(e) => setDescription(e.target.value)} value={description}></textarea>
            
            <br />

          {updateItem===0?
            <button type="submit" className="btn btn-primary btn-lg" id="add_btn">{isLoading?<FaSpinner /> :<></>} Add Item</button>:
            <button type="submit" className="btn btn-primary btn-lg" id="update_btn">{isLoading?<FaSpinner /> :<></>}Update Item</button>
            }
        </form>
        </Modal.Body>
      </Modal>
  )
}

export default ShowModal
