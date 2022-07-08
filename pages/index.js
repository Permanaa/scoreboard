import styles from '../styles/Home.module.css'
import { Box, Heading, Center, Divider } from '@chakra-ui/react'
import { SettingsIcon, MinusIcon, HamburgerIcon } from '@chakra-ui/icons'
import useActions from "../hooks/home";
import Settings from '../components/Settings';
import Control from '../components/Control';

export default function Home() {
  const {
    home,
    away,
    handleAdd,
    handleMinus,
    handleAddPoint,
    isOpenSettings,
    onOpenSettings,
    onCloseSettings,
    handleSave,
    isOpenControl,
    onOpenControl,
    onCloseControl,
    handleReset,
    round,
    handleNextRound,
  } = useActions();

  return (
    <Box className={styles.root}>
      <Box className={styles.header}>
        <Box className={styles.utils} cursor="pointer" onClick={onOpenSettings}>
          <SettingsIcon fontSize={25} color="white" />
        </Box>
        <Box className={styles.title}>
          <Heading as="h1">SET</Heading>
        </Box>
        <Box className={styles.utils} cursor="pointer" onClick={onOpenControl}>
          <HamburgerIcon fontSize={25} color="white" />
        </Box>
        <Box className={styles.round}>
          {/* <Box fontSize={80}>SET</Box> */}
          <Box fontSize={80}>{round}</Box>
        </Box>
      </Box>
      <Box className={styles.main}>
        <Box className={styles.column} backgroundColor={home.color}>
          <Box className={`${styles.teamWrapper} ${styles.teamLeft}`}>
            <Box className={styles.teamName}>
              {home.name}
            </Box>
            <Box
              className={styles.teamSet}
              onClick={() => handleAddPoint("home")}
            >
              {home.point}
            </Box>
          </Box>
          <Box onClick={() => handleAdd("home")} cursor="pointer">
            {home.score}
          </Box>
          <Box
            className={`${styles.minus} ${styles.minusLeft}`}
            cursor="pointer"
            onClick={() => handleMinus("home")}
          >
            <MinusIcon />
          </Box>
        </Box>
        <Box className={styles.column} backgroundColor={away.color}>
          <Box className={`${styles.teamWrapper} ${styles.teamRight}`}>
            <Box
              className={styles.teamSet}
              onClick={() => handleAddPoint("away")}
            >
              {away.point}
            </Box>
            <Box className={`${styles.teamName}`}>
              {away.name}
            </Box>
          </Box>
          <Box onClick={() => handleAdd("away")} cursor="pointer">
            {away.score}
          </Box>
          <Box
            className={`${styles.minus} ${styles.minusRight}`}
            cursor="pointer"
            onClick={() => handleMinus("away")}
          >
            <MinusIcon />
          </Box>
        </Box>
      </Box>
      <Settings
        isOpen={isOpenSettings}
        onClose={onCloseSettings}
        onSave={handleSave}
        home={home}
        away={away}
      />
      <Control
        isOpen={isOpenControl}
        onClose={onCloseControl}
        onReset={handleReset}
        onNextRound={handleNextRound}
      />
    </Box>
  )
}
