import {
  Box,
  Editable,
  EditableInput,
  EditablePreview,
  Text
} from "@chakra-ui/react";
import {
  ArrowBackIcon
} from "@chakra-ui/icons"
import { useLocalStorageState } from "../hooks/useLocalStorage";
import Link from "next/link";
import { Do_Hyeon } from 'next/font/google'

const doHyun = Do_Hyeon({ weight: "400", subsets: ["latin"] })

export default function Textboard () {
  const [content, setContent] = useLocalStorageState<string>("textboard", "000000")

  return (
    <Box
      w="100vw"
      h="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
      className={doHyun.className}
    >
      <Box position="absolute" top={24} left={24}>
        <Link href="/">
          <Box display="flex" alignItems="center" gap={2}>
            <ArrowBackIcon fontSize={20} />
            <Text
              fontWeight={600}
              fontSize={16}
              letterSpacing="1.5px"
            >
              Scoreboard
            </Text>
          </Box>
        </Link>
      </Box>
      <Editable
        placeholder="000000"
        onChange={setContent}
        value={content}
        textAlign="center"
        w="100%"
        display="flex"
        alignItems="center"
        justifyContent="center"
        fontSize={256}
        fontWeight={700}
        letterSpacing="16px"
      >
        <EditablePreview />
        <EditableInput
          letterSpacing="16px"
          _focusVisible={{ outline:"none" }}
        />
      </Editable>
    </Box>
  )
}
