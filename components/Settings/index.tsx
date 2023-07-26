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
  Text,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from "@chakra-ui/react"
import { ChangeEvent, useState, useRef } from "react"
import { ITeam } from "../../hooks/useHome";
import Image from "next/image";

const convertToBase64 = (file: Blob) => {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = () => {
      resolve(fileReader.result);
    };
    fileReader.onerror = (error) => {
      reject(error);
    };
  });
};

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
  const InputLogoHomeRef = useRef<HTMLInputElement>(null)
  const InputLogoAwayRef = useRef<HTMLInputElement>(null)

  const [tempHome, setTempHome] = useState<ITeam>(home)
  const [tempAway, setTempAway] = useState<ITeam>(away)

  const handleClose = () => {
    onClose()
    setTempHome(home)
    setTempAway(away)
  }

  const handleSave = () => {
    onSave({ home: tempHome, away: tempAway })
    onClose()
  }

  const handleChangeImageHome = async (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (files && files?.length) {
      const base64Logo = await convertToBase64(files[0]) as string
      setTempHome(prev => ({ ...prev, logo: base64Logo }))
    }
  }

  const handleChangeImageAway = async (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (files && files?.length) {
      const base64Logo = await convertToBase64(files[0]) as string
      setTempAway(prev => ({ ...prev, logo: base64Logo }))
    }
  }

  const handleRemoveLogoHome = () => {
    setTempHome(prev => ({ ...prev, logo: "" }))
  }

  const handleRemoveLogoAway = () => {
    setTempAway(prev => ({ ...prev, logo: "" }))
  }

  return (
    <Modal isOpen={isOpen} onClose={handleClose} size="6xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Pengaturan</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <Box display="flex" gap={12}>
            <FormControl mb={10}>
              <FormLabel mb={4}>Tim Kiri</FormLabel>
              <Box>
                <Box display="flex" alignItems="center" gap={3} mb={3}>
                  <Input
                    value={tempHome?.name}
                    onChange={(e) => setTempHome((prev) => ({ ...prev, name: e.target.value }))}
                  />
                  <Input
                    type="color"
                    width="80px"
                    cursor="pointer"
                    value={tempHome?.color}
                    onChange={(e) => setTempHome(prev => ({ ...prev, color: e.target.value }))}
                  />
                </Box>
                <Text mb={2}>Logo</Text>
                <Box display="flex" gap={3} mb={3}>
                  <Input
                    type="file"
                    onChange={handleChangeImageHome}
                    accept="image/*"
                    value=""
                    display="none"
                    ref={InputLogoHomeRef}
                  />
                  <Button onClick={() => InputLogoHomeRef.current?.click()}>
                    Pilih File
                  </Button>
                  <Button onClick={handleRemoveLogoHome}>
                    Hapus
                  </Button>
                </Box>
                <Text mb={2}>Ukuran</Text>
                <Box mb={8}>
                  <NumberInput
                    width={128}
                    value={tempHome?.logoSize}
                    onChange={(valString) => setTempHome(prev => ({ ...prev, logoSize: Number(valString) }))}
                  >
                    <NumberInputField />
                    <NumberInputStepper>
                      <NumberIncrementStepper />
                      <NumberDecrementStepper />
                    </NumberInputStepper>
                  </NumberInput>
                </Box>
                {!!tempHome.logo && (
                  <Image
                    width={tempHome?.logoSize}
                    height={tempHome?.logoSize}
                    src={tempHome.logo}
                    alt="logo home"
                    style={{
                      width: tempHome?.logoSize,
                      height: tempHome?.logoSize,
                      objectFit: "contain"
                    }}
                  />
                )}
              </Box>
            </FormControl>

            <FormControl>
              <FormLabel mb={4}>Tim Kanan</FormLabel>
              <Box>
                <Box display="flex" alignItems="center" gap={3} mb={3}>
                  <Input
                    value={tempAway?.name}
                    onChange={(e) => setTempAway(prev => ({ ...prev, name: e.target.value }))}
                  />
                  <Input
                    type="color"
                    width="80px"
                    cursor="pointer"
                    value={tempAway?.color}
                    onChange={(e) => setTempAway(prev => ({ ...prev, color: e.target.value }))}
                  />
                </Box>
                <Text mb={2}>Logo</Text>
                <Box display="flex" gap={3} mb={3}>
                  <Input
                    type="file"
                    onChange={handleChangeImageAway}
                    accept="image/*"
                    value=""
                    display="none"
                    ref={InputLogoAwayRef}
                  />
                  <Button onClick={() => InputLogoAwayRef.current?.click()}>
                    Pilih File
                  </Button>
                  <Button onClick={handleRemoveLogoAway}>
                    Hapus
                  </Button>
                </Box>
                <Text mb={2}>Ukuran</Text>
                <Box mb={8}>
                  <NumberInput
                    width={128}
                    value={tempAway?.logoSize}
                    onChange={(valString) => setTempAway(prev => ({ ...prev, logoSize: Number(valString) }))}
                  >
                    <NumberInputField />
                    <NumberInputStepper>
                      <NumberIncrementStepper />
                      <NumberDecrementStepper />
                    </NumberInputStepper>
                  </NumberInput>
                </Box>
                {!!tempAway.logo && (
                  <Image
                    width={tempAway?.logoSize}
                    height={tempAway?.logoSize}
                    src={tempAway.logo}
                    alt="logo away"
                    style={{
                      width: tempAway?.logoSize,
                      height: tempAway?.logoSize,
                      objectFit: "contain"
                    }}
                  />
                )}
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
