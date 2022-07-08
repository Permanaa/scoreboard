import {
  Modal,
  ModalOverlay,
  ModalCloseButton,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalContent,
  FormControl,
  FormLabel,
  Input,
  Box,
  Button,
} from "@chakra-ui/react"
import { useEffect, useState } from "react"

const Settings = (props) => {
  const { isOpen, onClose, onSave, home, away } = props
  
  const [tempHome, setTempHome] = useState({})
  const [tempAway, setTempAway] = useState({})

  const handleClose = () => {
    onClose()
    setTempHome({...home})
    setTempAway({...away})
  }

  const handleSave = () => {
    onSave({ home: tempHome, away: tempAway })
    onClose()
  }

  useEffect(() => {
    setTempHome({...home});
    setTempAway({...away});
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Modal isOpen={isOpen} onClose={handleClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Pengaturan</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <Box>
            <FormControl>
              <FormLabel>Tim Kiri</FormLabel>
              <Box display="flex" alignItems="center" gap={3}>
                <Input
                  value={tempHome.name}
                  onChange={(e) => setTempHome(prev => ({ ...prev, name: e.target.value }))}
                />
                <Input
                  type="color"
                  width="20%"
                  value={tempHome.color}
                  onChange={(e) => setTempHome(prev => ({ ...prev, color: e.target.value }))}
                />
              </Box>
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Tim Kanan</FormLabel>
              <Box display="flex" alignItems="center" gap={3}>
                <Input
                  value={tempAway.name}
                  onChange={(e) => setTempAway(prev => ({ ...prev, name: e.target.value }))}
                />
                <Input
                  type="color"
                  width="20%"
                  value={tempAway.color}
                  onChange={(e) => setTempAway(prev => ({ ...prev, color: e.target.value }))}
                />
              </Box>
            </FormControl>
          </Box>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={handleSave}>Simpan</Button>
          <Button onClick={handleClose}>Batal</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default Settings;
