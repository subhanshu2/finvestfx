import React, { useState, useMemo } from 'react';
import { Table, Button } from 'react-bootstrap';
import { menuItemsApi } from '../services/apiService';

const MenuTable = ({menuItems, setMenuItems, aggregatedMenuItems}) => {

  const [sortConfig, setSortConfig] = useState({ field: '', ascending: true });

  const requestSort = (field) => {
    let ascending = true;
    if (sortConfig.field === field && sortConfig.ascending) {
      ascending = false;
    }
    setSortConfig({ field, ascending });
  };

  const sortedData = useMemo(() => {
    if (sortConfig.field) {
      const sortedItems = [...aggregatedMenuItems].sort((a, b) => {
        if (a[sortConfig.field] < b[sortConfig.field]) {
          return sortConfig.ascending ? -1 : 1;
        }
        if (a[sortConfig.field] > b[sortConfig.field]) {
          return sortConfig.ascending ? 1 : -1;
        }
        return 0;
      });
      return sortedItems;
    }
    return aggregatedMenuItems;
  }, [aggregatedMenuItems, sortConfig]);

  const handlePriceChange = (_id, price) => {
    const updatedMenuItems = menuItems.map((item) => {
        return item._id === _id ? { ...item, price: parseFloat(price) } : item
    });
    setMenuItems(updatedMenuItems);
  };

  const handleSave = async (_id) => {
    const menuItem = menuItems.find((item) => item._id === _id);
    if (menuItem) {
      await menuItemsApi.update(_id, { price: menuItem.price })
    }
  };

  const handleReset = async (_id) => {
    const menuItem = menuItems.find((item) => item._id === _id);
    if (menuItem) {
      await menuItemsApi.update(_id, { price: menuItem.original_price })
      handlePriceChange(menuItem._id, menuItem.original_price)
    }
  };

  const handleDelete = async (_id) => {
      await menuItemsApi.delete(_id)
      setMenuItems(menuItems.filter(item => item._id !== _id))
  };

  return (
    <Table striped bordered hover className='w-75 p-3'>
      <thead>
        <tr>
          <th>Name</th>
          <th>Category</th>
          <th className='d-flex justify-content-between'>
            <span>Price</span> 
            <span role='button' onClick={() => requestSort('price')} className='pointer me-2'>
              {sortConfig.field === 'price' ? sortConfig.ascending ? '↑' : '↓' : 'sort'}
            </span>
          </th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {sortedData.map((item) => (
          <tr key={item._id}>
            <td>{item.name}</td>
            <td>{item.category}</td>
            <td>
              <input
                type="number"
                value={item.price}
                onChange={(event) => handlePriceChange(item._id, event.target.value)}
              />
            </td>
            <td className='d-flex justify-content-evenly'>
              <Button variant="primary" onClick={() => handleSave(item._id)}>
                Save
              </Button>
              <Button variant="secondary" onClick={() => handleReset(item._id)}>
                Reset
              </Button>
              <Button variant="danger" onClick={() => handleDelete(item._id)}>
                Delete
              </Button>
              
            </td>
          </tr>
        ))}
      </tbody>
  </Table>
)};

export default MenuTable;
