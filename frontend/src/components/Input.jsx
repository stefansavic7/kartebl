import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';


export default function Input({ fieldType, size = '20rem', labelText = 'default', defaultValue ="", helperText='', maxHh='40rem', rows=4, minValue=1,maxValue=1000, onChange, onBlur, name}) {
 
  const [value, setValue] = React.useState(defaultValue);


  const minMaxNum = (e) =>{
    const v = Math.max(minValue, Math.min(maxValue, Number(e.target.value)));;
    setValue(v);
    if (onChange) {
      onChange(e);
    }
  }

  const setV = (e) =>{
    setValue(e.target.value);
    
  }  

  const renderTextField = () => {
    const dynamicStyles = {
      width: size,
      '& .MuiOutlinedInput-root': {
        borderRadius: '0.5rem',
        
        '& fieldset': {
          borderColor: 'gray',
        },
        '&:hover fieldset': {
          borderColor: '#ec4899',
        },
        '&.Mui-focused fieldset': {
          borderColor: '#ec4899',
        },
        zIndex: 0,
      },
      '& .MuiInputLabel-root': {
        color: 'gray',
        transition: 'all 0.3s ease',
        zIndex: 1,
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
                onBlur={onBlur}
                value={value}
                onChange={setV}
                name={name}
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
                value={value}
                onChange={minMaxNum}
                name={name}    
                sx={dynamicStyles}
            />
            );
          case 'textArea':
            return (
              <TextField
                id="outlined-textarea"
                label={labelText}
                defaultValue={defaultValue}
                helperText={helperText}
                multiline
                rows={rows}
                name={name}
                sx={{
                  ...dynamicStyles,
                  '& .MuiInputBase-root': {
                    overflow: 'hidden',
                    alignItems: 'flex-start',
                    
                  },
                  '& .MuiInputBase-input': {
                    resize: 'vertical',
                    overflow: 'auto',
                    padding: '8px',
                    lineHeight: '1.5',
                    border: 'none',
                  },
                  '& textarea': {
                    resize: 'vertical',
                    border: 'none',
                    maxHeight: maxHh,
                  },
                }}
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
