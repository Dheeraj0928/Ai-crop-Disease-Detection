import { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import React from "react";
import Card from "@material-ui/core/Card";
import { Button, CircularProgress, Box, Chip, Grid } from "@material-ui/core";
import { DropzoneArea } from 'material-ui-dropzone';
import Clear from '@material-ui/icons/Clear';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';

const axios = require("axios").default;

const useStyles = makeStyles((theme) => ({
  mainContainer: {
    minHeight: '80vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '40px 20px',
  },
  glassCard: {
    width: '100%',
    maxWidth: '1000px',
    borderRadius: '24px',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.15)',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
    [theme.breakpoints.up('md')]: {
      flexDirection: 'row',
    },
  },
  leftPanel: {
    padding: '40px',
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    background: 'rgba(46, 204, 113, 0.05)',
    minHeight: '400px',
  },
  rightPanel: {
    padding: '40px',
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    borderLeft: '1px solid rgba(0,0,0,0.05)',
    position: 'relative',
  },
  media: {
    height: 300,
    width: '100%',
    objectFit: 'cover',
    borderRadius: '16px',
    marginBottom: '20px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
  },
  clearButton: {
    marginTop: '20px',
    borderRadius: '50px',
    padding: '10px 30px',
    fontWeight: 600,
    textTransform: 'none',
    background: '#e74c3c',
    color: 'white',
    '&:hover': {
      background: '#c0392b',
    },
  },
  resultBox: {
    textAlign: 'center',
  },
  classLabel: {
    fontWeight: 800,
    color: '#27ae60',
    fontSize: '2rem',
    marginBottom: '10px',
    textTransform: 'capitalize',
  },
  confidenceText: {
    fontSize: '1.1rem',
    color: '#7f8c8d',
    marginBottom: '5px',
  },
  instructions: {
    marginBottom: '20px',
    color: '#34495e',
    textAlign: 'center',
  },
  loader: {
    color: '#2ecc71 !important',
  },
  dropzone: {
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }
}));

const Detect = () => {
  const classes = useStyles();
  const [selectedFile, setSelectedFile] = useState();
  const [preview, setPreview] = useState();
  const [data, setData] = useState();
  const [image, setImage] = useState(false);
  const [isLoading, setIsloading] = useState(false);
  
  const [error, setError] = useState(false);

  let confidence = 0;
console.log("API URL:", process.env.REACT_APP_API_URL);

  const sendFile = async () => {
    // If we have a file, we should try to send it, regardless of the 'image' flag synchronization
    if (selectedFile) {
      let formData = new FormData();
      formData.append("file", selectedFile);
      setIsloading(true); // Ensure loading is true before start
      setError(false);    // Reset error

      try {
        console.log("Sending file to API...");
        // Using environment variable or fallback to localhost
        let url = process.env.REACT_APP_API_URL || 'http://127.0.0.1:8000/predict';
        
        let res = await axios({
          method: "post",
          url: url,
          data: formData,
        });
        
        console.log("API Response:", res.status, res.data);

        if (res.status === 200) {
          setData(res.data);
        } else {
             setError("Unexpected response status: " + res.status);
        }
      } catch (error) {
        console.error("Error uploading file:", error);
        setError("Failed to process image. Please try again. " + (error.message || ""));
      }
      setIsloading(false);
    }
  }

  const clearData = () => {
    setData(null);
    setImage(false);
    setSelectedFile(null);
    setPreview(null);
    setError(false);
  };

  useEffect(() => {
    if (!selectedFile) {
      setPreview(undefined);
      return;
    }
    const objectUrl = URL.createObjectURL(selectedFile);
    setPreview(objectUrl);
  }, [selectedFile]);

  useEffect(() => {
    if (!preview) {
      return;
    }
    // sendFile relies on selectedFile, which is available if preview is available
    sendFile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [preview]);

  const onSelectFile = (files) => {
    if (!files || files.length === 0) {
      setSelectedFile(undefined);
      setImage(false);
      setData(undefined);
      setError(false);
      return;
    }
    setSelectedFile(files[0]);
    setData(undefined);
    setImage(true);
    setError(false);
  };

  if (data) {
    confidence = (parseFloat(data.pred_conf) * 100).toFixed(2);
  }

  return (
      <Container className={classes.mainContainer}>
        <Card className={`${classes.glassCard} fade-in`}>
          
          <div className={classes.leftPanel}>
             {!image ? (
                <>
                  <Typography variant="h5" className={classes.instructions}>
                    <b>Check Your Plant's Health</b>
                  </Typography>
                   <Typography variant="body1" style={{marginBottom: 20, textAlign: 'center', opacity: 0.7}}>
                    Upload a photo of a tomato leaf to get an instant disease diagnosis.
                  </Typography>
                  <Box width="100%">
                    <DropzoneArea
                        acceptedFiles={['image/*']}
                        dropzoneText={"Drag & Drop or Click to Upload"}
                        onChange={onSelectFile}
                        Icon={CloudUploadIcon}
                        showPreviewsInDropzone={false}
                        filesLimit={1}
                        classes={{ root: classes.dropzone }}
                    />
                  </Box>
                </>
             ) : (
               <>
                 <img src={preview} alt="Tomato leaf analysis" className={classes.media} />
                 <Button 
                    variant="contained" 
                    className={classes.clearButton} 
                    onClick={clearData}
                    startIcon={<Clear />}
                  >
                    Analyze Another
                  </Button>
               </>
             )}
          </div>

          <div className={classes.rightPanel}>
             {isLoading && (
               <Box display="flex" flexDirection="column" alignItems="center">
                 <CircularProgress size={60} className={classes.loader} />
                 <Typography variant="h6" style={{marginTop: 20, color: '#2ecc71'}}>
                   Analyzing Leaf Pattern...
                 </Typography>
                 <Typography variant="body2" style={{marginTop: 10, color: '#95a5a6'}}>
                   Our AI is looking for symptoms of Bacterial Spot, Early Blight, and more.
                 </Typography>
               </Box>
             )}

             {!isLoading && error && (
                 <Box textAlign="center" color="error.main">
                     <Typography variant="h6">Error</Typography>
                     <Typography>{error}</Typography>
                 </Box>
             )}

             {!isLoading && !data && !image && !error && (
               <Box textAlign="center" style={{opacity: 0.5}}>
                  <Typography variant="h1">🔍</Typography>
                  <Typography variant="h6" style={{marginTop: 20}}>Results will appear here</Typography>
               </Box>
             )}

             {!isLoading && !data && image && !error && (
               <Box textAlign="center" style={{opacity: 0.5}}>
                  <Typography variant="h6" style={{marginTop: 20}}>Awaiting results...</Typography>
                  <Typography variant="caption">If this takes too long, please try again.</Typography>
               </Box>
             )}

             {!isLoading && data && (
                <div className={`${classes.resultBox} fade-in`}>
                   <Typography variant="overline" style={{ fontSize: '1rem', letterSpacing: '3px', color: '#7f8c8d'}}>Status</Typography>
                   <Typography className={classes.classLabel}>
                     {data.pred_class}
                   </Typography>
                   
                   <Box marginTop={3} width="80%" marginX="auto">
                      <Box display="flex" justifyContent="space-between">
                         <Typography className={classes.confidenceText}>Confidence</Typography>
                         <Typography className={classes.confidenceText}><b>{confidence}%</b></Typography>
                      </Box>
                      <div className="confidence-bar-bg">
                        <div className="confidence-bar-fill" style={{width: `${confidence}%`}}></div>
                      </div>
                   </Box>

                   <Box marginTop={4}>
                      <Chip 
                        label={data.pred_class === "Healthy" ? "Healthy Plant" : "Action Required"} 
                        style={{
                            backgroundColor: data.pred_class === "Healthy" ? '#2ecc71' : '#e74c3c', 
                            color: 'white',
                            fontWeight: 'bold',
                            fontSize: '1rem',
                            padding: '10px'
                        }} 
                      />
                   </Box>
                </div>
             )}
          </div>

        </Card>
      </Container>
  );
};

export default Detect;
