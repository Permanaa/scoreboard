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
import { useState } from "react"
import { ITeam } from "../../hooks/useHome";

const Settings = ({
  isOpen,
  onClose,
  onSave,
  home,
  away,
}: {
  isOpen: boolean;
  onClose: () => void;
  onSave: ({ home, away }: { home: ITeam, away: ITeam }) => void;
  home: ITeam;
  away: ITeam;
}) => {
  const [tempHome, setTempHome] = useState<ITeam>(home)
  const [tempAway, setTempAway] = useState<ITeam>(away)

  const handleClose = () => {
    onClose()
    setTempHome(home)
    setTempAway(away)
  }

  const handleSave = () => {
    onSave({ home: tempHome as ITeam, away: tempAway as ITeam })
    onClose()
  }

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
                  value={tempHome?.name}
                  onChange={(e) => setTempHome((prev) => ({ ...prev, name: e.target.value } as ITeam))}
                />
                <Input
                  type="color"
                  width="20%"
                  value={tempHome?.color}
                  onChange={(e) => setTempHome(prev => ({ ...prev, color: e.target.value } as ITeam))}
                />
              </Box>
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Tim Kanan</FormLabel>
              <Box display="flex" alignItems="center" gap={3}>
                <Input
                  value={tempAway?.name}
                  onChange={(e) => setTempAway(prev => ({ ...prev, name: e.target.value } as ITeam))}
                />
                <Input
                  type="color"
                  width="20%"
                  value={tempAway?.color}
                  onChange={(e) => setTempAway(prev => ({ ...prev, color: e.target.value } as ITeam))}
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
