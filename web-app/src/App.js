import React, {useState} from 'react';
import ImageUploader from './components/ImageUploader/ImageUploader';
import './App.css';
import 'antd/dist/antd.min.css';


function App() {
  const [imageUrl, setImageUrl] = useState('');

  return (
    <div className="app">
      { !imageUrl?
        <ImageUploader onImageUploaded={setImageUrl}/> :
        <img src={imageUrl} alt="Uploaded"/>
      }
    </div>
  );
}

export default App;
