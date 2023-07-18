import {
  Modal,
  ModalOverlay,
  ModalCloseButton,
  ModalHeader,
  ModalBody,
  ModalContent,
  Box,
} from "@chakra-ui/react"
import { ArrowRightIcon, RepeatClockIcon } from "@chakra-ui/icons"
import styles from "./control.module.css"

const Control = ({
  isOpen,
  onClose,
  onReset,
  onNextRound,
}: {
  isOpen: boolean;
  onClose: () => void;
  onReset: () => void;
  onNextRound: () => void;
}) => {
  const handleonNextRound = () => {
    onNextRound()
    onClose()
  }

  const handleReset = () => {
    onReset()
    onClose()
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Panel Kontrol</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <Box className={styles.buttonWrapper}>
            <Box className={styles.button} onClick={handleonNextRound}>
              <ArrowRightIcon fontSize={18} />
              Babak Selanjutnya
            </Box>
            <Box className={styles.button} onClick={handleReset}>
              <RepeatClockIcon fontSize={22} />
              Atur Ulang
            </Box>
          </Box>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}

export default Control;
