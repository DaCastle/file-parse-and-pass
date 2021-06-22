import React from 'react';
import Button from '@material-ui/core/Button';
 
function Upload({buttonText}) {
  return (
    <label htmlFor="upload-file">
    <input
      hidden
      id="upload-file"
      name="upload-file"
      type="file"
    />
    <Button color="secondary" variant="contained" component="span">
      {buttonText}
    </Button>
  </label>
  )
}
 
export default Upload;