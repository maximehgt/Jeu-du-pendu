import React, { Component } from 'react'
import './App.css'

import * as Utils from './Utils';
import Drawing from './Drawing';

const ALPHABET = 'abcdefghijklmnopqrstuvwxyz'
const WORD_LIST = [
  'elephant',
  'mamouth',
  'cacahuete',
  'biere',
  'guitare',
  'crotte'
]
const DEFAULT_STATE = {
  counter: 0,
  completed: false,
  end: false
}
const MAX_STEP = 6

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      word: this.getRandomWord(),
      usedLetters: new Set(),
      ...DEFAULT_STATE
    }
  }
  
  /**
   * Functions to initialize the game
   */
  resetGame() {
    this.state.usedLetters.clear()
    this.setState({
      word: this.getRandomWord(),
      ...DEFAULT_STATE
    })
  }
  abortGame() {
    this.setState({ end: true })
  }
  winGame() {
    this.setState({ end: true, completed: true })
  }

  /**
   * Get a random word from the WORD_LIST above
   */
  getRandomWord() {
    // Get a random integer
    const index = Utils.getRandomInt(0, WORD_LIST.length)
    // Return the table's item which this random index
    return WORD_LIST[index]
  }

  /**
   * For a specific letter, check if it's included in the word or
   * if it has been already selected. If not, increment the counter.
   * Anyway, we memorize this letter
   * @param {*} letter 
   */
  handleLetter(letter) {
    // List of letters from the word
    const wordLetters = Utils.getArrayFromStringWithoutDuplicates(this.state.word)
    // All the selected letters by the user
    const usedLetters = this.state.usedLetters

    // Check if the selected letter is include in the word
    const isInclude = wordLetters.includes(letter)
    // Check if the letter has already been selected
    const isAlreadySelected = usedLetters.has(letter)

    // Update state parameters
    this.setState({
      counter: (!isInclude && !isAlreadySelected) ? this.state.counter + 1 : this.state.counter,
      usedLetters: this.state.usedLetters.add(letter)
    })
  }

  /**
   * Check if all the letters, of the word, has been found
   */
  isCompleted() {
    // List of letters from the word
    const wordLetters = Utils.getArrayFromStringWithoutDuplicates(this.state.word)
    // All the selected letters by the user
    const usedLetters = this.state.usedLetters

    // Give a boolean for each letter found or not by the user
    let checkLetters = [];
    wordLetters.forEach((letter, index) => {
      checkLetters[index] = usedLetters.has(letter)
    });
    const isSame = checkLetters.every(item => item === true)

    // Give the remaining steps before end
    const canContinue = (MAX_STEP - this.state.counter) > 0 ? true : false

    // Set the game completed if each letter has been found or if the max step is done
    if (isSame) {
      this.winGame()
    } else if (!canContinue) {
      this.abortGame()
    }
  }

  /**
   * LifeCycle : just after the renders
   */
  componentDidUpdate() {
    if (!this.state.end) {
      this.isCompleted() // check if the gamer win
    }
  }

  /**
   * Template
   */
  render() {
    const alphabet = ALPHABET.split('')
    const wordLetters = this.state.word.split('')

    return (
      <div className="game">
        <h1>Jeu du pendu</h1>

        <section className="game_body">
          <div>
            <p className="game_counter">
              <span>Erreurs : </span>
              {this.state.counter}
            </p>

            <ul className="game_word">
              {wordLetters.map((letter, index) => (
                <li className="game_word_letter" key={index}>
                  {this.state.usedLetters.has(letter) ? letter : '_'}
                </li>
              ))}
            </ul>
          </div>
          
          <Drawing counter={this.state.counter}/>
        </section>
        
        {!this.state.end ? (
          <ul className="game_keyboard">
            {alphabet.map((letter, index) => (
              <li
                className={`game_keyboard_letter${this.state.usedLetters.has(letter) ? ' game_keyboard_letter--used' : ''}`}
                key={index}
                onClick={() => this.handleLetter(letter)}
              >
                {letter}
              </li>
            ))}
            <button type="button" onClick={() => this.abortGame()}>Abandonner</button>
          </ul>
        ) : (
          <section className="game_reset">
            {this.state.completed ? (
              <p>
                Bien joué !!!!<br/>
                Vous avez trouvé le mot
                {this.state.counter > 0 ?
                  ` en faisant ${this.state.counter} erreur${this.state.counter > 1 ? 's' : ''}` :
                  " sans faire d'erreurs"
                }
              </p>
            ) :(
              <p>Vous n'avez pas trouvé le mot</p>
            )}
            <button type="button" onClick={() => this.resetGame()}>Commencer une nouvelle partie</button>
          </section>
        )}

        <details className="game_rules">
          <summary>Règles du jeu</summary>
          <article>
            <p>Le jeu du pendu consiste à deviner un mot, en essayant tour à tour des lettres possibles. Chaque essai révèle les lettres correspondantes dans le mot à deviner. Chaque essai infructueux (lettre non utilisée dans le mot) fait augmenter le compteur d'erreur.</p>
            <p>Vous n'avez que 6 essais pour gagner</p>
          </article>
        </details>
      </div>
    );
  }

}

export default App