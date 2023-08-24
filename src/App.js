import React, { useState, useEffect } from 'react';
import { Accordion, Button } from 'react-bootstrap';
import AddMenuItemForm from './components/AddMenuItemForm';
import MenuTable from './components/MenuTable';
import { titlecase } from './helper';
import { menuItemsApi } from './services/apiService';

function App() {
  const [menuItems, setMenuItems] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [currentCategory, setCurrentCategory] = useState();

  useEffect(() => {
    fetchMenuItems();
  }, []);

  const fetchMenuItems = async () => {
    const response = await menuItemsApi.getAll();
    setMenuItems(response.data);
  };

  const handleAddItem = async (newItem) => {
    try {
      await menuItemsApi.create(newItem);
      fetchMenuItems();
    } catch (error) {
      console.error(error);
    }
  }

  const handleShowForm = (cat) => {
    setShowForm(true);
    setCurrentCategory(cat);
  };

  const handleCloseForm = () => {
    setShowForm(false);
  };

  const aggregateByCategory = () => {
    const aggregatedData = {};
    menuItems.forEach((item) => {
      if (!aggregatedData[item.category]) {
        aggregatedData[item.category] = [];
      }
      aggregatedData[item.category].push(item);
    });
    return aggregatedData;
  };

  const aggregatedMenuItems = aggregateByCategory();

  return (
    <div className="App">
      <h2 className='text-center m-4'>Finvestfx Asignment</h2>
      <Accordion>
        {Object.keys(aggregatedMenuItems).map((category) => {
          return (
            <>
              <Accordion.Item eventKey={category}>
                <Accordion.Header>{titlecase(category)}</Accordion.Header>
                <Accordion.Body className='d-flex justify-content-between align-center'>
                  <MenuTable 
                    menuItems={menuItems} 
                    setMenuItems={setMenuItems} 
                    aggregatedMenuItems={aggregatedMenuItems[category]}
                  />
                  <Button 
                    onClick={() => handleShowForm(category)} 
                    variant="primary" 
                    className='h-25'
                  >
                    Add New Item
                  </Button>
                </Accordion.Body>
              </Accordion.Item>
            </>
          )}
        )}
      </Accordion>
      <AddMenuItemForm show={showForm} handleClose={handleCloseForm} handleAdd={handleAddItem} category={currentCategory} />
    </div>
  );
}

export default App;
