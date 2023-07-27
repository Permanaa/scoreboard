import {
  Modal,
  ModalOverlay,
  ModalCloseButton,
  ModalHeader,
  ModalBody,
  ModalContent,
  Box,
} from "@chakra-ui/react"
import {
  ArrowRightIcon,
  RepeatClockIcon,
  DownloadIcon,
  ChatIcon
} from "@chakra-ui/icons"
import styles from "./control.module.css"
import { useLocalStorage } from "../../hooks/useLocalStorage"
import { ITeam } from "../../hooks/useHome"
import { writeFileXLSX, utils } from "xlsx"
import Link from "next/link"

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
  const { get } = useLocalStorage()

  const handleonNextRound = () => {
    onNextRound()
    onClose()
  }

  const handleReset = () => {
    onReset()
    onClose()
  }

  const handleExport = () => {
    const round = get<number>("round")

    const homeHistory = get<ITeam[]>("home-history")
    const awayHistory = get<ITeam[]>("away-history")

    const homeCurrent = get<ITeam>("home")
    const awayCurrent = get<ITeam>("away")

    homeHistory.push(homeCurrent)
    awayHistory.push(awayCurrent)

    const homeRoundData = homeHistory.reduce((acc, curr, index) => {
      return {...acc, [`Set ${index + 1}`]: curr.score}
    }, {})

    const awayRoundData = awayHistory.reduce((acc, curr, index) => {
      return {...acc, [`Set ${index + 1}`]: curr.score}
    }, {})

    const data = [
      {
        Team: homeCurrent.name,
        Point: homeCurrent.point,
        ...homeRoundData,
      },
      {
        Team: awayCurrent.name,
        Point: awayCurrent.point,
        ...awayRoundData
      }
    ]

    const roundHeader = new Array(round).fill(null).map((_, i) => `Set ${i + 1}`)

    const header = ["Team", ...roundHeader, "Point"]

    const fileTeam = `${homeCurrent.name} vs ${awayCurrent.name}`

    const date = new Date().toLocaleDateString(undefined, {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    })

    const workbook = utils.book_new()

    const worksheet = utils.json_to_sheet(data, { header })

    utils.book_append_sheet(workbook, worksheet)

    writeFileXLSX(workbook, `${fileTeam} - ${date}.xlsx`)
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
              <ArrowRightIcon fontSize={16} />
              Babak Selanjutnya
            </Box>
            <Box className={styles.button} onClick={handleReset}>
              <RepeatClockIcon fontSize={20} />
              Atur Ulang
            </Box>
            <Box className={styles.button} onClick={handleExport}>
              <DownloadIcon fontSize={20} />
              Export ke XLSX
            </Box>
            <Link href="/textboard">
              <Box className={styles.button}>
                <ChatIcon fontSize={20} />
                Papan Teks
              </Box>
            </Link>
          </Box>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}

export default Control;
