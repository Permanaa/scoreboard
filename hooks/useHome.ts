import { useEffect, useCallback } from "react";
import { useDisclosure } from '@chakra-ui/react'
import { useLocalStorageState } from "./useLocalStorage";

export interface ITeam {
  score: number;
  point: number;
  name: string;
  color: string;
  logo: string;
  logoSize: number;
}

const useActions = () => {
  const [home, setHome] = useLocalStorageState<ITeam>('home', {
    score: 0,
    point: 0,
    name: "Home",
    color: "#EC3232",
    logo: "",
    logoSize: 200,
  })

  const [away, setAway] = useLocalStorageState<ITeam>('away', {
    score: 0,
    point: 0,
    name: "Away",
    color: "#0081C2",
    logo: "",
    logoSize: 200,
  })

  const [homeHistory, setHomeHistory] = useLocalStorageState<ITeam[]>('home-history', [])

  const [awayHistory, setAwayHistory] = useLocalStorageState<ITeam[]>('away-history', [])

  const [round, setRound] = useLocalStorageState<number>('round', 1)

  const {
    isOpen: isOpenSettings,
    onOpen: onOpenSettings,
    onClose: onCloseSettings
  } = useDisclosure()

  const {
    isOpen: isOpenControl,
    onOpen: onOpenControl,
    onClose: onCloseControl,
  } = useDisclosure()

  const handleAdd = useCallback((team: string) => {
    if (team === "home") {
      setHome(prev => ({...prev, score: prev.score + 1}));
    } else {
      setAway(prev => ({...prev, score: prev.score + 1}));
    }
  }, [setAway, setHome])

  const handleMinus = useCallback((team: string) => {
    if (team === "home") {
      setHome(prev => ({...prev, score: prev.score - 1}));
    } else {
      setAway(prev => ({...prev, score: prev.score - 1}));
    }
  }, [setAway, setHome])

  const handleAddPoint = useCallback((team: string) => {
    if (team === "home") {
      setHome(prev => ({...prev, point: prev.point + 1}));
    } else {
      setAway(prev => ({...prev, point: prev.point + 1}));
    }
  }, [setAway, setHome])

  const handleMinusPoint = useCallback((team: string) => {
    if (team === "home") {
      setHome(prev => ({...prev, point: prev.point - 1}));
    } else {
      setAway(prev => ({...prev, point: prev.point - 1}));
    }
  }, [setAway, setHome])

  const handleSave = (data: { home: ITeam, away: ITeam }) => {
    setHome(data.home)
    setAway(data.away)
  }

  const handleReset = () => {
    setHome(prev => ({
      ...prev,
      score: 0,
      point: 0
    }))
    setAway(prev => ({
      ...prev,
      score: 0,
      point: 0
    }))
    setRound(1)
    setHomeHistory([])
    setAwayHistory([])
  }

  const handleNextRound = () => {
    setHomeHistory(prev => ([...prev, home]))
    setAwayHistory(prev => ([...prev, away]))
    setHome(prev => ({
      ...prev,
      score: 0,
    }))
    setAway(prev => ({
      ...prev,
      score: 0,
    }))
    setRound(prev => prev + 1)
  }

  const handleKeyPress = useCallback((event: KeyboardEvent) => {
    switch (event.key) {
      case "]":
        handleAdd("away")
        break
      case "[":
        handleMinus("away")
        break
      case "w":
        handleAdd("home")
        break
      case "q":
        handleMinus("home")
        break
      case "=":
        handleAddPoint("away")
        break
      case "-":
        handleMinusPoint("away")
        break
      case "2":
        handleAddPoint("home")
        break
      case "1":
        handleMinusPoint("home")
        break
    }
  }, [handleAdd, handleAddPoint, handleMinus, handleMinusPoint]);

  useEffect(() => {
    if (!isOpenControl && !isOpenSettings) {
      document.addEventListener('keydown', handleKeyPress);

      return () => {
        document.removeEventListener('keydown', handleKeyPress);
      };
    }
  }, [handleKeyPress, isOpenControl, isOpenSettings]);

  return {
    homeHistory,
    awayHistory,
    home, setHome,
    away, setAway,
    round, setRound,
    handleAdd,
    handleMinus,
    handleAddPoint,
    handleMinusPoint,
    isOpenSettings,
    onOpenSettings,
    onCloseSettings,
    handleSave,
    isOpenControl,
    onOpenControl,
    onCloseControl,
    handleReset,
    handleNextRound,
  }
}

export default useActions;
