import { useState, useEffect, useCallback } from "react";
import { useDisclosure } from '@chakra-ui/react'

const useActions = () => {
  const [home, setHome] = useState({
    score: 0,
    point: 0,
    name: "Home",
    color: "#fc6c6c"
  });
  const [away, setAway] = useState({
    score: 0,
    point: 0,
    name: "Away",
    color: "#42c0ff"
  });
  
  const [round, setRound] = useState(1);

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

  const handleKeyPress = useCallback((event) => {
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
  }, []);

  useEffect(() => {
    if (!isOpenControl && !isOpenSettings) {
      document.addEventListener('keydown', handleKeyPress);

      return () => {
        document.removeEventListener('keydown', handleKeyPress);
      };
    }
  }, [handleKeyPress, isOpenControl, isOpenSettings]);

  const handleAdd = (team) => {
    if (team === "home") {
      setHome(prev => ({...prev, score: prev.score + 1}));
    } else {
      setAway(prev => ({...prev, score: prev.score + 1}));
    }
  }

  const handleMinus = (team) => {
    if (team === "home") {
      setHome(prev => ({...prev, score: prev.score - 1}));
    } else {
      setAway(prev => ({...prev, score: prev.score - 1}));
    }
  }

  const handleAddPoint = (team) => {
    if (team === "home") {
      setHome(prev => ({...prev, point: prev.point + 1}));
    } else {
      setAway(prev => ({...prev, point: prev.point + 1}));
    }
  }

  const handleMinusPoint = (team) => {
    if (team === "home") {
      setHome(prev => ({...prev, point: prev.point - 1}));
    } else {
      setAway(prev => ({...prev, point: prev.point - 1}));
    }
  }

  const handleSave = (data) => {
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
  }

  const handleNextRound = () => {
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

  return {
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
