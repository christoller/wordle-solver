import { useState } from 'react';

export function LetterInput(props: any) {
    const [firstLetter, setFirstLetter] = useState('');
    const [secondLetter, setSecondLetter] = useState('');
    const [thirdLetter, setThirdLetter] = useState('');
    const [fourthLetter, setFourthLetter] = useState('');
    const [fifthLetter, setFifthLetter] = useState('');
    const [validUnmatchedLetters, setValidUnmatchedLetters] = useState('');
    const [displaySuggestions, setDisplaySuggestions] = useState<string[]>([]);
    let confirmedLetters: string[] = [];
    let confirmedLettersIndex: any[] = [];
    const answerList = props.answerList;
    const possibleAnswers: string[] = [];

    const handleClick = () => {
        confirmedLetters.push(firstLetter);
        confirmedLetters.push(secondLetter);
        confirmedLetters.push(thirdLetter);
        confirmedLetters.push(fourthLetter);
        confirmedLetters.push(fifthLetter);
        const validUnmatchedLettersArray = validUnmatchedLetters.split(' ');

        for (let index in confirmedLetters) {
            if (confirmedLetters[index] !== '') {
                confirmedLettersIndex.push(parseInt(index));
            }
        }
        answerList.forEach((answer: string) => {
            let count = 0;
            confirmedLettersIndex.forEach((letterIndex: number) => {
                if (answer[letterIndex] === confirmedLetters[letterIndex]) {
                    count += 1;
                }
            });

            if (count === confirmedLettersIndex.length) {
                if (validUnmatchedLettersArray.length > 0) {
                    validUnmatchedLettersArray.forEach((letter: string) => {
                        if (answer.includes(letter)) {
                            possibleAnswers.push(answer);
                        }
                    });
                } else {
                    possibleAnswers.push(answer);
                }
            }
        });

        setDisplaySuggestions(possibleAnswers);
        console.log(`possible answers: ${possibleAnswers}`);
        confirmedLetters = [];
        confirmedLettersIndex = [];
    };

    return (
        <div>
            <div className='letter-inputs-container'>
                <form action=''>
                    <p>Input correct letters into the appropriate box</p>
                    <input
                        type='text'
                        className='input-box'
                        maxLength={1}
                        onChange={(e: any) => {
                            setFirstLetter(e.target.value);
                        }}
                    />
                    <input
                        type='text'
                        className='input-box'
                        maxLength={1}
                        onChange={(e: any) => {
                            setSecondLetter(e.target.value);
                        }}
                    />
                    <input
                        type='text'
                        className='input-box'
                        maxLength={1}
                        onChange={(e: any) => {
                            setThirdLetter(e.target.value);
                        }}
                    />
                    <input
                        type='text'
                        className='input-box'
                        maxLength={1}
                        onChange={(e: any) => {
                            setFourthLetter(e.target.value);
                        }}
                    />
                    <input
                        type='text'
                        className='input-box'
                        maxLength={1}
                        onChange={(e: any) => {
                            setFifthLetter(e.target.value);
                        }}
                    />
                    <p className='second-text'>
                        Add any letters that are valid but not in the correct
                        places, seperated by a space
                    </p>
                    <input
                        type='text'
                        className='input-box-unmatched'
                        onChange={(e: any) => {
                            setValidUnmatchedLetters(e.target.value);
                        }}
                    />
                </form>

                <button onClick={handleClick} className='submit-btn'>
                    Check
                </button>
            </div>
            <h3>Possible Answers</h3>
            <div className='word-suggestions-container'>
                {displaySuggestions.sort().map((word) => (
                    <div>{word}</div>
                ))}
            </div>
        </div>
    );
}
