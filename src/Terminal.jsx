import { useState, useRef, useEffect } from 'react'
import './Terminal.css'
import data from './Subcomponents/data.json'
import about from "./Subcomponents/about.jsx"
import renderHelp from './Subcomponents/help.jsx'
import renderContact from './Subcomponents/contact.jsx'
import renderPrompt from './Subcomponents/prompt.jsx'
import renderProjects from './Subcomponents/projects.jsx'

const MAX_INPUT_COMMAND_LENGTH = 20
const INTRO_TYPING_SPEED_MS = 60

export default function Terminal() {
  // ====== Rendering Functions ======

  const defineCommands = () => {
    const commands = {
      help: renderHelp(),
      h: renderHelp(),
      bye: "Goodbye!",
      '': "",
      contact: renderContact(),
      c: renderContact(),
      secret: 'You found a secret, you deserve a cookie! (a real one, not the web kind)',
      "about":about(),
      projects:renderProjects()
    }
    return commands
  }
  // ====== Rendering Functions End ======

  // ====== React Hooks ======
  const [input, setInput] = useState('');
  const [introText, setIntroText] = useState('');
  const [commandHistory, setCommandHistory] = useState([]);
  const [inputHistory, setInputHistory] = useState([])
  const [clipboardNotification, setClipboardNotification] = useState(false)
  const intro = `Welcome! Starting terminal... Done. Try the 'help' command !`
  const commands = defineCommands()
  const terminalRef = useRef();
  const inputRef = useRef()
  const historyRef = useRef(-1)
  const textRef = useRef("")

  useEffect(() => {
    typeText(intro, textRef, setIntroText)
  }, []);
  // ====== React Hooks End ======

  // ====== Input Handlers ======
  const handleInputChange = (event) => {
    let command = event.target.value
    if (command.length < MAX_INPUT_COMMAND_LENGTH)
      setInput(command)
  }

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      processCommand(input);
      return
    }
    if (event.key === 'ArrowUp') {
      if (historyRef.current <= inputHistory.length - 2)
        historyRef.current++
      setInput(inputHistory[historyRef.current])
      setTimeout(() => {
        inputRef.current.setSelectionRange(inputRef.current.value.length, inputRef.current.value.length);
      }, 10)
      return
    }
    if (event.key === 'ArrowDown') {
      if (historyRef.current > 0)
        historyRef.current--
      setInput(inputHistory[historyRef.current])
      setTimeout(() => {
        inputRef.current.setSelectionRange(inputRef.current.value.length, inputRef.current.value.length);
      }, 10)
      return
    }
  }

  const handleTerminalClick = () => {
    inputRef.current.focus()
  }
  // ====== Input Handlers End ======

  // ====== Helper functions ======
  

  function typeText(textToType, indexRef, setItem) {
    let t = setInterval(() => {
      setItem((prevText) => {
        indexRef.current = prevText + textToType.charAt(prevText.length)
        return prevText + textToType.charAt(prevText.length);
      });
      if (indexRef.current.length >= textToType.length - 1) {
        clearInterval(t);
      }
    }, INTRO_TYPING_SPEED_MS);
  }
  // ====== Helper Functions End======

  // ====== Command Processing ======
  function cleanInput(inputString) {
    inputString = inputString.toLowerCase()
    return inputString.replace(/^\s+|\s+$/g, '').replace(/\s+/g, ' ');
  }

  const processCommand = (command) => {
    command = cleanInput(command)

    setInputHistory(prev => {
      const newArray = prev
      newArray.unshift(command)
      return newArray
    })
    historyRef.current = -1

    console.log(command)
    let newOutput;

    if (commands.hasOwnProperty(command)) {
      newOutput = commands[command];

    } else {
      newOutput = 'Command not recognized: ' + command;
    }

    setCommandHistory((prevHistory) => [
      ...prevHistory,
      (
        <div>
          <span>{renderPrompt()}{command}</span>
          <br />
          <span>{newOutput}</span>
        </div>
      ),
    ]);

    setInput('');

    setTimeout(() => {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight
    }, 10)

  }
  // ====== Command Processing End======

  return (
    <div className='' id="terminal-wrapper">
      <div id="top-bar">
        <span id="terminal-title">{data['terminal-title']}</span>
        <span id="controls">
          <span className='round-button'></span>
          <span className='round-button'></span>
          <span className='round-button red-button'></span>
        </span>
      </div>
      <div id="terminal" ref={terminalRef} onClick={handleTerminalClick}>
        <span id="terminal-output">
          <p id="introP">{introText}</p>
          {commandHistory}
          {renderPrompt()}
        </span>
        <input id="user-input" value={input}
          ref={inputRef}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          autoFocus
          autoComplete="off"
          spellCheck={false}></input>
      </div>
      {clipboardNotification && <span className='notification'>Copied to clipboard</span>}
    </div>
  )
}
