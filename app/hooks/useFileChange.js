import React, { useState } from 'react';

const useFileChange = () => {
  const [image, setImage] = useState(null);
  const [selectedImages, setSelectedImages] = useState([]);

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setImage(files);
    const fileUrls = files?.map((file) => URL.createObjectURL(file));
    setSelectedImages(fileUrls);
 
  }

  const handleDeleteImage = (index) => {
    setSelectedImages(selectedImages.filter((image, i) => i !== index));
    setImage(image.filter((image, i) => i !== index));
  }

  return { image, selectedImages, handleFileChange,setImage,setSelectedImages, handleDeleteImage };
}

export default useFileChange;