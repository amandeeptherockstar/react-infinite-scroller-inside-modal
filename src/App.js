import React, { useState } from "react";
import { Button } from "antd";
import Modal from "./Modal";
import "./App.css";

function App() {
  const [visible, setVisible] = useState(false);
  const handleCancel = () => setVisible(false);
  const handleOk = () => setVisible(false);
  return (
    <div className="App">
      <Button type="primary" onClick={() => setVisible(true)}>
        Open Modal
      </Button>
      <Modal
        destroyOnClose
        visible={visible}
        handleCancel={handleCancel}
        handleOk={handleOk}
      />
    </div>
  );
}

export default App;
