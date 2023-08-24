// AddMenuItemForm.js

import React, { useEffect, useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

function AddMenuItemForm({ show, handleClose, handleAdd, category }) {
  const [menuItem, setMenuItem] = useState({
      name: '',
      category: '',
      price: ''
  });

  useEffect(() => {
    setMenuItem({
      name: '',
      category: category,
      price: ''
    })
  }, [category])

  const handleSubmit = () => {
    console.log("menuItem", menuItem)
    handleAdd(menuItem);
    handleClose();
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add New Menu Item</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="formName">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              value={menuItem.name}
              onChange={(e) => setMenuItem({ ...menuItem, name: e.target.value })}
              required
            />
          </Form.Group>
          <Form.Group controlId="formCategory">
            <Form.Label>Category</Form.Label>
            <Form.Control
              disabled
              type="text"
              defaultValue={category}
              // value={category}
              required
            />
          </Form.Group>
          <Form.Group controlId="formPrice">
            <Form.Label>Price</Form.Label>
            <Form.Control
              type="number"
              value={menuItem.price}
              onChange={(e) => setMenuItem({ ...menuItem, price: e.target.value })}
              required
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          Add Item
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default AddMenuItemForm;
