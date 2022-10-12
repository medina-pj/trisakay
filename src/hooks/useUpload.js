import { useState } from 'react';

import { storage } from '../firebase/config';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';

const useUpload = () => {
  const [error, setError] = useState(null);
  const [progress, setProgress] = useState(0);

  const uploadTask = async file => {
    return new Promise(function (resolve, reject) {
      const storageRef = ref(storage, `/files/${file.name}`);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        'state_changed',
        function (snapshot) {
          const percent = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
          setProgress(percent);
        },
        function error(err) {
          reject(err);
        },
        function complete() {
          getDownloadURL(uploadTask.snapshot.ref).then(url => {
            resolve(url);
          });
        }
      );
    });
  };

  const upload = async file => {
    try {
      setError(null);
      setProgress(0);

      if (!file) {
        throw new Error('file is required.');
      }

      const uploadedFile = await uploadTask(file);

      return uploadedFile;
    } catch (error) {
      setError(error.message);
    }
  };

  return { error, progress, upload };
};

export default useUpload;
