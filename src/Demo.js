import * as React from 'react';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import Slide from '@mui/material/Slide';
import DialogContent from '@mui/material/DialogContent';
import Typography from '@mui/material/Typography';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function FullScreenDialog() {
  const [open, setOpen] = React.useState(true);
  const [progress, setProgress] = React.useState(0);
  const [message, setMessage] = React.useState('Processing document...');
  const [url, setUrl] = React.useState("/source.gif");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  React.useEffect(() => {
    const timer = setInterval(() => {
      setProgress((oldProgress) => {
        if (oldProgress === 100) {
          setMessage('Processing document...');
          setUrl("/source.gif");
          return 0;
        }

        if (oldProgress > 25) {
          setUrl("/dna_new.gif");
          setMessage('Creating vector embeddings...');
        }

        if (oldProgress > 50) {
          setUrl("/cube.gif");
          setMessage('Creating model...');
        }

        if (oldProgress > 75) {
          setMessage('Training the model...');
        }
        const diff = Math.random() * 10;
        return Math.min(oldProgress + diff, 100);
      });
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        Open full-screen dialog
      </Button>
      <Dialog
        width={'300px'}
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}

      >
        <DialogContent
        // sx={{background:"#020a25",color:"#fff"}}
        >
          <Box sx={{ width: '350px' }}>
            <Typography variant="h5">Train Document</Typography>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <img src={url} style={{ height: "150px", objectFit: "cover" }} />
            </div>
            <Box sx={{ padding: '1rem' }}>
              <Typography variant="subtitle1" sx={{ marginBottom: '.5rem' }}>
                {message}
              </Typography>
              <LinearProgress
                variant="determinate" value={progress}
              />
            </Box>
          </Box>
        </DialogContent>
      </Dialog>
    </div>
  );
}
