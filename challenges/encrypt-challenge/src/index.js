// no magic numbers
const STRING_SEPARATOR = ""
const LETTER_INDEX_FROM_WORDVARIATION_ARRAY = (word) =>
  wordVariantion.indexOf(word)
const LETTER_INDEX_FROM_WORDTOCHANGE_ARRAY = (letter) =>
  wordToChange.indexOf(letter)

/**
 * Letter "e" -> "enter"
 * Letter "i" -> "imes"
 * Letter "a" -> "ai"
 * Letter "o" -> "ober"
 * Letter "u" -> "ufat"
 */

// Follwing the same sequence shown /\
const wordToChange = ["e", "i", "a", "o", "u"]
const wordVariantion = ["enter", "imes", "ai", "ober", "ufat"]

const entryInput = document.querySelector("input#entry")
const outputSpan = document.querySelector("span#output")
const switchInputs = document.querySelectorAll(".input-hidden")

const encrypt = (value) => {
  // Split the entire value/string into letters
  const splittedWords = value.split("")
  const encryptedLetters = splittedWords.map((letter) => {
    let encryptedLetter = letter

    if (wordToChange.includes(letter)) {
      const letterIndex = LETTER_INDEX_FROM_WORDTOCHANGE_ARRAY(letter)
      encryptedLetter = wordVariantion[letterIndex]
    }

    return encryptedLetter
  })

  return encryptedLetters.join(STRING_SEPARATOR)
}

const decrypt = (value) => {
  let decryptedValue = value

  wordVariantion.forEach((word) => {
    const wordIndex = LETTER_INDEX_FROM_WORDVARIATION_ARRAY(word)
    const wordRegex = new RegExp(`${word}`, "g")

    const replacementWord = wordToChange[wordIndex]
    decryptedValue = decryptedValue.replace(wordRegex, replacementWord)
  })

  return decryptedValue
}

const handleChange = (event) => {
  const { value } = event.target
  const isItSupposedToEncrypt = switchInputs[0].checked

  const outputText = isItSupposedToEncrypt ? encrypt(value) : decrypt(value)
  outputSpan.innerText = outputText
  console.log(isItSupposedToEncrypt)
}

entryInput.addEventListener("input", handleChange)
