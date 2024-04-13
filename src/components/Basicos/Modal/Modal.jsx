import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { UilInfoCircle } from "@iconscout/react-unicons";
import "./Modal.css";

export default function Modal({ titulo, Componente }) {
  const [open, setOpen] = React.useState(false);
  const [scroll, setScroll] = React.useState("paper");

  const handleClickOpen = (scrollType) => () => {
    setOpen(true);
    setScroll(scrollType);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const descriptionElementRef = React.useRef(null);
  React.useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);

  return (
    <div>
      <div className="infoBotton2">
        <UilInfoCircle onClick={handleClickOpen("paper")} />{" "}
      </div>
      <div className="modalDialog2">
        <Dialog
          open={open}
          onClose={handleClose}
          scroll={scroll}
          aria-labelledby="scroll-dialog-title"
          aria-describedby="scroll-dialog-description"
          sx={{ "& .MuiPaper-root": { maxWidth: "none" } }}
        >
          <DialogTitle id="scroll-dialog-title">{titulo}</DialogTitle>
          <DialogContent dividers={scroll === "paper"}>
            <div
              id="scroll-dialog-description"
              ref={descriptionElementRef}
              tabIndex={-1}
            >
             { Componente &&<Componente/>}
            </div>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cerrar</Button>
          </DialogActions>
        </Dialog>
      </div>
    </div>
  );
}
