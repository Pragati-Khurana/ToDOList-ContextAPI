import React from 'react'
import {createContext, useState, useEffect} from 'react';

export const Show = createContext();

const Context = ({children}) => {
    let [show, setShow] = useState(false);
    let [title, setTitle] = useState('');
    let [description, setDescription] = useState('');
    let [items, setItems] = useState(fetchData);
    let [id, setId] = useState(fetchId);
    let [updateItem, setUpdateItem] = useState(0);
    
    let [isLoading, setIsLoading] = useState(false);
    let [isAlert, setIsAlert] = useState(false);
    let [checkButton, setCheckButton] = useState('');
    let [filteredItems, setFilteredItems] = useState([]);

    useEffect(() => {
        localStorage.setItem('items',JSON.stringify(items));
        setFilteredItems(items);
      },[items])

      useEffect(() => {
        if(checkButton === '1')
            document.querySelector('#alert-div').innerHTML = "Record Added";
          else if(checkButton === '2')
            document.querySelector('#alert-div-delete-update').innerHTML = "Record Updated";
          else if(checkButton === '3')
            document.querySelector('#alert-div-delete-update').innerHTML = "Record Deleted";
          else if(checkButton === '4')
            document.querySelector('#alert-div').innerHTML = "Loading";
          else if(checkButton === '5')
            document.querySelector('#alert-div-delete-update').innerHTML = "All the records are deleted"; 
      },[checkButton]);


    function fetchId() {
        const data = JSON.parse(localStorage.getItem('items'));
    
        if(items.length === 0) {
          return 1;
        }
        else
        {
          return data[data.length-1].id + 1;
        }
      }
    
      function fetchData() {
        const data = localStorage.getItem('items');
    
        if(data)
          return JSON.parse(data);
        else
          return [];
      }

  return (  
    <Show.Provider value={{show, setShow, title, setTitle, description, setDescription, items, setItems, id, setId, updateItem, setUpdateItem, isLoading, setIsLoading, isAlert, setIsAlert, checkButton, setCheckButton, filteredItems, setFilteredItems}}>{children}</Show.Provider>
  )
};

export default Context
