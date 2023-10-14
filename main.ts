#! /usr/bin/env node

// Quiz System

import inquirer from "inquirer";
import chalk from "chalk";

console.log(chalk.blueBright.bold('\t\tWelcome to Quiz System'));
console.log(chalk.whiteBright('\t\t----------------------'));

// Question Interface
interface Question {
    questionText: string;
    options: string[];
    correctAnswer: string;
}

// Questions
const questions: Question[] = [
    {
        questionText: 'What is the capital of Pakistan?',
        options: ['Karachi','Peshawar','Islamabad','Lahore'],
        correctAnswer: 'Islamabad'
    },
    {
        questionText: 'Which is the national language of Pakistan?',
        options: ['Sindhi','Pashto','Punjabi','Urdu'],
        correctAnswer: 'Urdu'
    },
    {
        questionText: 'How many provincess are there in Pakistan?',
        options: ['Two','Four','One','Five'],
        correctAnswer: 'Four'
    },
    {
        questionText: 'What is the national game of Pakistan?',
        options: ['Hockey','Football','Cricket','Chess'],
        correctAnswer: 'Hockey'
    },
    {
        questionText: 'How many continents in the world?',
        options: ['Five','Seven','Eight','Six'],
        correctAnswer: 'Seven'
    },
    {
        questionText: 'Which is the largest mountain in the world?',
        options: ['K2','Rakaposhi','Hindukush','Mount Everest'],
        correctAnswer: 'Mount Everest'
    },
    {
        questionText: 'What is atomic mass of Sodium(Na)?',
        options: ['22','23','20','21'],
        correctAnswer: '23'
    },
    {
        questionText: 'What is the largest mammal on Earth?',
        options: [' hippopotamus','African Elephant','Blue whale','Polar Bear'],
        correctAnswer: 'Blue whale'
    },
    {
        questionText: 'Who painted the Mona Lisa?',
        options: ['Pablo Picasso','Vincent van Gogh','Leonardo da Vinci','Johannes Vermeer'],
        correctAnswer: 'Blue whale'
    },
    {
        questionText: 'What is the chemical symbol for gold?',
        options: ['Au','Ag','Cl','Ge'],
        correctAnswer: 'Au'
    },
];

// Quiz Class
class Quiz {
    private questions: Question[];
    private currentQuestionIndex: number;
    private score: number;

    constructor(questions: Question[]) {
        // this.questions = Math.floor(Math.random() * questions);
        this.questions = questions;
        this.currentQuestionIndex = 0;
        this.score = 0;
    };

    // Get the current question
    getCurrentQuestion(): Question {
        return this.questions[this.currentQuestionIndex];
    };

    // Checking if quiz is ended
    isQuizEnd(): boolean {
        return this.currentQuestionIndex === this.questions.length;
    }

    // Submitting answer
    submitAnswer(answer: string) {
        const currentQuestion = this.getCurrentQuestion();

        if (currentQuestion.correctAnswer === answer) {
            this.score++;
        };

        this.currentQuestionIndex++;
    };

    

    // Get the quiz result 
    getQuizResult(): string {
        const totalQuestion = this.questions.length;
        const correctAnswers = this.score;

        if(correctAnswers <= 2) {
            console.log(chalk.red('Nalaik Kahen ke'));
        } 
        else if(correctAnswers > 2 && correctAnswers < 7) {
            console.log(chalk.magenta('Can do Better'));
        }
        else if(correctAnswers > 7 && correctAnswers < 10) {
            console.log(chalk.magenta('Fabulous'));
        }
        

        return chalk.greenBright(`You scored ${correctAnswers} from ${totalQuestion}`);
    };
    

    // Run the quiz
    async runQuiz() {
        while(!this.isQuizEnd()) {
            const currentQuestion = this.getCurrentQuestion();

            const answer = await inquirer.prompt([
                {
                    name: 'choice',
                    type: 'list',
                    message: chalk.white(currentQuestion.questionText),
                    choices: currentQuestion.options
                },
            ]);

            this.submitAnswer(answer.choice);
        }

        // Display quiz result
        console.log(this.getQuizResult());
        
    };
};

// Creating object/instance of quiz
const quiz = new Quiz(questions);

// Start the quiz
quiz.runQuiz();


