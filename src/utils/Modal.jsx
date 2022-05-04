import React from 'react';
import {Card, IconButton} from "@mui/material";
import x_button from "../Components/Project-Components/ProjectCreate.module.css";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import Modal from "@mui/material/Modal";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    p: 4,
};
export const ModalProps = (props) => (
    <Modal
        open={props.open} onClose={props.onClose}>
           <Card>
             <Card sx={style}>
                <div className={x_button.x_button}>
                <h2>{props.title}</h2>
   <IconButton  onClick={props.onClick} >
       <CloseOutlinedIcon color={'error'} />
                  </IconButton>
                       </div>
                 {props.Components_child}
                        </Card>
             </Card>
                 </Modal>

);
