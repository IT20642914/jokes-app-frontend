import React from "react";
import { Modal, Box, Button, Typography, Divider, Grid } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

interface ConfirmationModalProps {
  open: boolean;
  title: string;
  description: string;
  onClose: () => void;
  onConfirm: (confirm: boolean) => void;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  open,
  title,
  description,
  onClose,
  onConfirm,
}) => {
  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="confirmation-modal-title"
      aria-describedby="confirmation-modal-description"
    >
      <Box
        sx={{
          position: "absolute",
          borderRadius: 1,
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "30%",
          bgcolor: "background.paper",
          border: "1px solid #e0e0e0",
          boxShadow: 24,
          p: 1,
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "1rem",
          }}
        >
          <Typography id="confirmation-modal-title" variant="h6">
            {title}
          </Typography>
          <CloseIcon sx={{ cursor: "pointer" }} onClick={onClose} />
        </Box>
        <Divider />
        <Box sx={{ paddingInline: 4, paddingBottom: 4, paddingTop: 2 }}>
          <Typography
            sx={{ fontWeight: "600", marginBlock: "1rem", fontSize: "14px" }}
          >
            {description}
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Button
                fullWidth
                variant="contained"
                color="primary"
                sx={{ backgroundColor: "#437EF7", color: "#fff" }}
                onClick={() => onConfirm(true)}
              >
                Yes
              </Button>
            </Grid>
            <Grid item xs={6}>
              <Button
                fullWidth
                variant="contained"
                onClick={() => onConfirm(false)}
              >
                No
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Modal>
  );
};

export default ConfirmationModal;
