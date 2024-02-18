import React, { useState, useCallback } from 'react';
import { Tab, Tabs, Box, Typography, Paper, List, ListItem, ListItemText } from '@mui/material';
import { useDropzone } from 'react-dropzone';
import './TopLeft.css'; // Ensure to update CSS as per the changes mentioned

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 0, display:'flex',border: '1px solid red !important',flexDirection: 'column', overflow: 'hidden'}}> {/* Adjusted for scroll */}
          <Typography component={'span'}>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

const TopLeft = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [bankStatements, setBankStatements] = useState([]);
  const [invoices, setInvoices] = useState([]);

  const onDrop = useCallback((acceptedFiles) => {
    const files = acceptedFiles.map(file => ({
      path: file.path,
      name: file.name,
      size: file.size,
    }));

    if (activeTab === 0) {
      setBankStatements(prev => [...prev, ...files]);
    } else {
      setInvoices(prev => [...prev, ...files]);
    }
  }, [activeTab]);

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  const handleChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const renderFileList = (files) => (
    <List className="fileList" sx={{ maxHeight: '10vh', overflow: 'auto' }}> {/* Adjusted for scroll */}
      {files.map((file, index) => (
        <ListItem key={index}>
          <ListItemText 
            primary={file.name} 
            secondary={`Size: ${file.size} bytes`} 
            sx={{ 
              '.MuiListItemText-primary': { fontSize: '0.5rem' }, // Adjusted for readability
              '.MuiListItemText-secondary': { fontSize: '0.5rem' } // Adjusted for readability
            }}
          />
        </ListItem>
      ))}
    </List>
  );

  return (
    <div className='contentWrapper' style={{ maxHeight: '100%'}}> {/* Added style for containment */}
    <Paper sx={{ width: '100%', maxHeight:'100%', height:'100%' }}> {/* Adjusted for scroll */}
      <Tabs value={activeTab} onChange={handleChange} aria-label="file upload tabs">
        <Tab label={`Bank Statements (${bankStatements.length})`} />
        <Tab label={`Invoices (${invoices.length})`} />
      </Tabs>

      <TabPanel value={activeTab} index={0} style={{ maxHeight: '100%', overflow:'auto' }} >
        <div className="tabPanelContent">
          <div {...getRootProps()} className="dropzone" style={{maxHeight:'1vh', textAlign:'center'}}>
            <p>Add Files</p>
           <input {...getInputProps()} />
            
          </div>
          
          {renderFileList(bankStatements)}
        </div>
      </TabPanel>
      <TabPanel value={activeTab} index={1}>
        <div className="tabPanelContent">
          <div {...getRootProps()} className="dropzone">
            <input {...getInputProps()} />
            <p>Add Files</p>
          </div>
          
          {renderFileList(invoices)}
        </div>
      </TabPanel>
    </Paper>
    </div>
  );
};

export default TopLeft;
