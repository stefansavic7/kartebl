import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

export default function Input({ fieldType, size = '20rem', labelText = 'default', defaultValue ="", helperText='' }) {
  const renderTextField = () => {
    const dynamicStyles = {
      width: size,
      '& .MuiOutlinedInput-root': {
        borderRadius: '0.5rem',
        border: '1px solid #d1d5db',
        '& fieldset': {
          borderColor: 'gray',
        },
        '&:hover fieldset': {
          borderColor: '#ec4899',
        },
        '&.Mui-focused fieldset': {
          borderColor: '#ec4899',
        }
      },
      '& .MuiInputLabel-root': {
        color: 'gray',
        transition: 'all 0.3s ease',
        '&.Mui-focused': {
          color: '#ec4899',
        },
      },
      '& .MuiInputLabel-shrink': {
        transform: 'translate(11px, -9px) scale(0.75)',
        backgroundColor: '#ffffff',
        padding: '0 7px',
        transition: 'all 0.3s ease',
      },
      '& .MuiInputBase-input': {
        color: 'black',
        '&::placeholder': {
          color: '#6b7280',
        },
      },
    };

    switch (fieldType) {
        case 'outlined-required':
            return (
              <TextField
                required
                id="outlined-required"
                label={labelText}
                defaultValue={defaultValue}
                sx={dynamicStyles}
              />
            );
        case 'outlined-disabled':
            return (
              <TextField
                disabled
                id="outlined-disabled"
                label={labelText}
                defaultValue={defaultValue}
                sx={dynamicStyles}
              />
            );
        case 'password':
            return (
            <TextField
                id="outlined-password-input"
                label={labelText}
                type="password"
                autoComplete="current-password"
                sx={dynamicStyles}
            />
            );
        case 'number':
            return (
            <TextField
                id="outlined-number"
                label={labelText}
                type="number"
                sx={dynamicStyles}
            />
            );
        case 'helperText':
            return (
            <TextField
                id="outlined-helperText"
                label={labelText}
                defaultValue={defaultValue}
                helperText={helperText}
                sx={dynamicStyles}
            />
            );
      default:
        return null;
    }
  };

  return (
    <Box
      component="form"
      sx={{ '& .MuiTextField-root': { m: 1 } }}
      noValidate
      autoComplete="off"
    >
      <div>{renderTextField()}</div>
    </Box>
  );
}
