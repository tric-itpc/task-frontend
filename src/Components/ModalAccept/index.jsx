import React from 'react';
import { Box, Button, Card, Modal, Typography} from '@mui/material';
import styles from './index.module.css';

const ModalAccept = ({ show, setShow }) => (
  <Modal open={show}>
    <Box
      className={styles.box}
      onClick={() => setShow(false)}
    >
      <Card
        className={styles.card}
        onClick={(event) => { event.stopPropagation(); }}
      >
        <Typography>Вы успешно прошли регистрацию</Typography>
        <Box className={styles.boxForButtons}>
          <Button color="success" onClick={() => setShow(false)}>Ок</Button>
        </Box>
      </Card>
    </Box>
  </Modal>
);

export {
  ModalAccept,
};
