import './App.css';
import React, {useEffect, useState} from 'react';
import Display from './Components/Display';
import ShowModal from './Components/ShowModal';
import { useContext } from 'react';
import { Show } from './Components/Context';

function App() {
 
  let [searchField, setSearchField] = useState('');
  let [sortedItems, setSortedItems] = useState('');

  let {show, setShow, setTitle, setDescription, items, setItems, setUpdateItem, isAlert, setIsAlert, checkButton, setCheckButton, filteredItems, setFilteredItems} = useContext(Show);

  function deleteItem(paraId) {
    const newItems = items.filter((item) => paraId !== item.id);
    setItems(newItems);
    
    setCheckButton('3');
    setIsAlert(true);
    setTimeout(() => {
      setIsAlert(false);
    },3000);
  }


  function editItem(paraId) {
    setShow(true);
    const [editItem] = items.filter((item) => paraId === item.id);
    setTitle(editItem.title);
    setDescription(editItem.description);
    setUpdateItem(paraId);
  }

  useEffect(() => {
    let filteredItems;

    if(searchField === '')
      filteredItems = items;
    else
      filteredItems = items.filter((item) => item.title.toLocaleLowerCase().includes(searchField));
      setFilteredItems(filteredItems);
  },[searchField, items])

  function searchItem(value) {
    let search=0;
    value===null?search=0:search=1;

    if(search===1) {
      setSearchField(value.toLocaleLowerCase());
    }
    else {
      setSearchField('');
    }
  }

  useEffect(() => {
    let newArray = [...items];

    if(sortedItems === 'asc')
      newArray = newArray.sort((a,b) => a.title.localeCompare(b.title));
    else if(sortedItems === 'des')
      newArray = newArray.sort((a,b) => b.title.localeCompare(a.title));

    setFilteredItems(newArray);
  },[sortedItems, items])

  function sortItem(value) {
      
      if(value === "asc")
        setSortedItems('asc');
      else if(value === "des")
        setSortedItems('des');
      else 
        setSortedItems('');
  }

  return (
    <div className="App">
      <div className="main">
        <div className="title">TO-DO LIST APP 2</div>
        
        <div className="display-container">
          {items.length===0 && <div className="no-value-container">No item in the list</div> &&
          <button type="button" className="btn btn-dark btn-lg" onClick={() => {
                  setShow(true);
          }} >Add Item</button>
          }
          {
              isAlert && (checkButton === '3' || checkButton==='2' || checkButton==='5')?<div className="alert alert-danger" role="alert" id="alert-div-delete-update"></div>:<></>
          }
          {items.length>0 && <div>
            {/*Search Box*/ }
            <div className="row">
              <div className="col-4">
                <input type="search" className="form-control w-25" onChange={(e) => searchItem(e.target.value)} placeholder="Search Title" />
              </div>
              <div className="col-3">
                <button type="button" className="btn btn-dark btn-lg" onClick={() => {
                  setShow(true);
                }} >Add Item</button>
              </div>
              <div className="col-5">
              <select className="form-select" onChange={(e) => sortItem(e.target.value)}>
                <option defaultValue>Sort</option>
                <option value="uns">Un-sort</option>
                <option value="asc">Ascending</option>
                <option value="des">Descending</option>
              </select>
              </div>
            </div> 

            <table className="table content-container">
              <thead>
                <tr>
                  <th scope="col">Title</th>
                  <th scope="col">Description</th>
                  <th scope="col">Delete</th>
                  <th scope="col">Edit</th>
                </tr>
              </thead>
              <tbody>
                <Display items={filteredItems} deleteItem={deleteItem} editItem={editItem}/>
              </tbody>
            </table>
            <button type="button" className="btn btn-primary btn-lg" onClick={() => {
              setItems([]);
              setCheckButton('5');
              setIsAlert(true);
              setTimeout(() => {
                setIsAlert(false);
              },3000);
            }}>Clear All</button>
          </div>
          }
          
        </div>
      </div>
      {show?<ShowModal />:<></>}
    </div>
  );
}

export default App;
