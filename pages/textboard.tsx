import {
  Box,
  Editable,
  EditableInput,
  EditablePreview,
  Text
} from "@chakra-ui/react";
import {
  ArrowBackIcon,
  AddIcon,
  MinusIcon
} from "@chakra-ui/icons"
import { useLocalStorageState } from "../hooks/useLocalStorage";
import Link from "next/link";
import { Do_Hyeon } from 'next/font/google'

const doHyun = Do_Hyeon({ weight: "400", subsets: ["latin"] })

export default function Textboard () {
  const [content, setContent] = useLocalStorageState<string[]>("textboard", ["000000"])

  const addField = () => {
    setContent(prev => [...prev, "000000"])
  }
  
  const updateField = (index: number) => (value: string) => {
    const newContent = [...content]
    newContent[index] = value

    setContent(newContent)
  }

  const removeField = (index: number) => {
    const newContent = [...content]
    newContent.splice(index, 1)

    setContent(newContent)
  }

  return (
    <Box
      minH="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
      overflow="hidden"
      className={doHyun.className}
    >
      <Box position="fixed" top={24} left={24}>
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
      <Box position="fixed" top={24} right={24}>
        <Box onClick={addField} cursor="pointer">
          <AddIcon fontSize={20} />
        </Box>
      </Box>
      <Box display="flex" flexDirection="column">
        {!!content && content.map((item, index) => {
          return (
            <Box key={index} display="flex" alignItems="center">
              <Editable
                placeholder="000000"
                onChange={updateField(index)}
                value={item}
                textAlign="center"
                w="100%"
                display="flex"
                alignItems="center"
                justifyContent="center"
                fontSize={384}
                fontWeight={700}
                letterSpacing="16px"
                lineHeight={1}
                p={0}
              >
                <EditablePreview p={0} />
                <EditableInput
                  letterSpacing="16px"
                  p={0}
                  _focusVisible={{ outline:"none" }}
                />
              </Editable>
              {!!content && content.length > 1 && (
                <Box onClick={() => removeField(index)} cursor="pointer" padding={4}>
                  <MinusIcon />
                </Box>
              )}
            </Box>
          )
        })}        
      </Box>
    </Box>
  )
}
