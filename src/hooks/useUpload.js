import { useState, useCallback } from 'react';
import api from '../services/api';

/**
 * File upload hook with progress tracking.
 *
 * @example
 * const { upload, uploading, progress, error, reset } = useUpload();
 * const url = await upload(file, '/upload/images');
 */
const useUpload = () => {
  const [uploading, setUploading] = useState(false);
  const [progress,  setProgress]  = useState(0);
  const [error,     setError]     = useState(null);
  const [uploadedUrl, setUploadedUrl] = useState(null);

  const upload = useCallback(async (file, endpoint = '/upload') => {
    setUploading(true);
    setProgress(0);
    setError(null);
    setUploadedUrl(null);

    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await api.post(endpoint, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        onUploadProgress: (e) => {
          if (e.total) setProgress(Math.round((e.loaded * 100) / e.total));
        },
      });

      const url = response.data?.url || response.data?.fileUrl || null;
      setUploadedUrl(url);
      setProgress(100);
      return url;
    } catch (err) {
      const msg = err.response?.data?.message || 'Upload failed';
      setError(msg);
      throw err;
    } finally {
      setUploading(false);
    }
  }, []);

  const uploadMultiple = useCallback(async (files, endpoint = '/upload') => {
    const urls = [];
    for (const file of files) {
      const url = await upload(file, endpoint);
      urls.push(url);
    }
    return urls;
  }, [upload]);

  const reset = useCallback(() => {
    setUploading(false);
    setProgress(0);
    setError(null);
    setUploadedUrl(null);
  }, []);

  return { upload, uploadMultiple, uploading, progress, error, uploadedUrl, reset };
};

export default useUpload;
