console.log('hello');

let question_data = [];

const body = document.querySelector('body');

const question_div = document.querySelector('.question_div');
const loadmore = document.querySelector('.loadmore_container');

const backButton = document.querySelector('.div_button_back');

const opacity = document.querySelector('.opacity');

//const URL = 'https://opentdb.com/api.php?amount=20';

const button_start = document.querySelector('.button_start');
const title = document.querySelector('.title');


let array_answer = [];

let amount = 10;

let start = false;
let loading = false;


let category = '';
let totalLoaded = 0;
let right = 0;
let wrong = 0;

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}


function startQuiz() {

    start = true;
    
    console.log('Inizio quiz!');
    title.style.display = 'none';
    button_start.style.display = 'none';

    body.style.justifyContent = 'space-between';
    body.style.backgroundColor = 'orange';

    body.style.backgroundImage = "url('../foto3.jpg')";

    //backButton.style.display = 'block';

    opacity.style.display = 'none';

    document.querySelector('.choose_category').style.display = 'none';

    let URL = `https://opentdb.com/api.php?amount=${amount}`;

    if (document.querySelector('.choose_category').value != 'any') {
        URL = `https://opentdb.com/api.php?amount=${amount}&category=${document.querySelector('.choose_category').value}`;
    }

    category = document.querySelector('.choose_category').value;

    switch(category) {
        case 'any' :
            category = 'Any category';
            break;
        case '9':
            category = 'General knowledge';
            break;
        case '10':
            category = 'Books';
            break;
        case '11':
            category = 'Film';
            break;
        case '12':
            category = 'Music';
            break;
        case '15':
            category = 'Video Games';
            break;
        case '17':
            category = 'Science and nature';
            break;
        case '18':
            category = 'Computers';
            break;
        case '19':
            category = 'Mathematics';
            break;
        case '21':
            category = 'Sports';
            break;
        case '22':
            category = 'Geography';
            break;
        case '23':
            category = 'History';
            break;
    }

    document.querySelector('.stat_cat').innerHTML = `Category: ${category}`;
    totalLoaded = 10;
    document.querySelector('.stat_tot').innerHTML = `Total questions: ${totalLoaded}`;

    fetch(URL)
        .then(response => response.json())
        .then(data => {

            // document.querySelector("#myProgress").style.display = 'block';

            document.querySelector('.statistics_container').style.display = 'block';
            document.querySelector('.statistics_container').style.visibility = 'visible';

            console.log(data);
            
            question_data = [...question_data, ...data.results];
            
            for (let el of data.results){
                 
                console.log(el);

                body.style.display = 'block';

                const question_container = document.createElement('div');
                question_container.classList.add('question_container');

                // const category = document.createElement('h4');
                // category.innerHTML = `Category: ${el.category.toString()}`;
                // question_container.appendChild(category);

                const question = document.createElement('h2');
                question.innerHTML = `${el.question}`;
                question.style.textAlign = 'center';
                question.style.fontSize = '1.7rem';
                question.style.color = '#512500';
                question.style.fontWeight = '900';
                question.style.fontFamily = 'sans-serif';
                question_container.appendChild(question)

                const answer_container = document.createElement('div');
                answer_container.classList.add('answer_container');


                for (let wrong_answer of el.incorrect_answers) {

                    const answer = document.createElement('button');
                    answer.classList.add('wrong');
                    answer.classList.add('answer');
                    answer.innerHTML = `${wrong_answer.toString()}`
                    //answer_container.appendChild(answer);

                    answer.addEventListener('click',()=>{
                        
                        console.log(question_data.includes(el));
                        console.log(typeof(question_data));

                        if (question_data.includes(el)) {

                            console.log('No');

                            answer.style.backgroundColor = 'red';
                            
                            let index = question_data.indexOf(el);
                            console.log(index);

                            question_data.splice(index,1);

                            wrong += 1;

                            document.querySelector('.stat_wrong').innerHTML = `Wrong: ${wrong}`


                        }
                    
                        

                    })

                    array_answer.push(answer);

                }

                const right_answer = document.createElement('button');
                right_answer.classList.add('right');
                right_answer.classList.add('answer');
                right_answer.innerHTML = `${el.correct_answer.toString()}`;
                //answer_container.appendChild(right_answer);

                right_answer.addEventListener('click',()=>{

                    if (question_data.includes(el)) {

                        console.log('Daje');
                        right_answer.style.backgroundColor = 'green'
                        right_answer.style.color = 'white';
                        let index = question_data.indexOf(el);
                        question_data.splice(index,1);

                        right += 1;

                        document.querySelector('.stat_right').innerHTML = `Right: ${right}`

                    }
                })

                array_answer.push(right_answer);

                shuffleArray(array_answer);

                for (let el of array_answer) {
                    answer_container.appendChild(el);
                }

                question_container.appendChild(answer_container);

                question_div.appendChild(question_container);

                question_div.style.display = 'block';

                loadmore.style.display = 'block';


                array_answer = [];
                
            }

        });

}


document.addEventListener('scroll', ()=>{
    const rect = loadmore.getBoundingClientRect();
    if (rect.top < window.innerHeight && !loading && start) {
        loadMore();
    }
})

function loadMore() {

    loading = true;

    let URL = `https://opentdb.com/api.php?amount=${amount}`;

    if (document.querySelector('.choose_category').value != 'any') {
        URL = `https://opentdb.com/api.php?amount=${amount}&category=${document.querySelector('.choose_category').value}`;
    }

    fetch(URL)
        .then(response => response.json())
        .then(data => {

            // document.querySelector("#myProgress").style.display = 'block';

            console.log(data);
            console.log(data.results[0].category);
            
            question_data = [...question_data, ...data.results];
            
            for (let el of data.results){
                 
                console.log(el);

                body.style.display = 'block';

                const question_container = document.createElement('div');
                question_container.classList.add('question_container');

                const category = document.createElement('h4');
                category.innerHTML = `Category: ${el.category.toString()}`;
                question_container.appendChild(category);

                const question = document.createElement('h2');
                question.innerHTML = `${el.question}`;
                question.style.textAlign = 'center';
                question.style.fontSize = '2.2rem';
                question_container.appendChild(question)

                const answer_container = document.createElement('div');
                answer_container.classList.add('answer_container');


                for (let wrong_answer of el.incorrect_answers) {

                    const answer = document.createElement('button');
                    answer.classList.add('wrong');
                    answer.classList.add('answer');
                    answer.innerHTML = `${wrong_answer.toString()}`
                    //answer_container.appendChild(answer);

                    answer.addEventListener('click',()=>{

                        if (question_data.includes(el)) {

                            console.log('No');
                            answer.style.backgroundColor = 'red';
                            
                            let index = question_data.indexOf(el);
                            question_data.splice(index,1);

                        }
                    
                        

                    })

                    array_answer.push(answer);

                }

                const right_answer = document.createElement('button');
                right_answer.classList.add('right');
                right_answer.classList.add('answer');
                right_answer.innerHTML = `${el.correct_answer.toString()}`;
                //answer_container.appendChild(right_answer);

                right_answer.addEventListener('click',()=>{

                    if (question_data.includes(el)) {

                        console.log('Daje');
                        right_answer.style.backgroundColor = 'green'
                        right_answer.style.color = 'white';
                        let index = question_data.indexOf(el);
                        question_data.splice(index,1);

                    }
                })

                array_answer.push(right_answer);

                shuffleArray(array_answer);

                for (let el of array_answer) {
                    answer_container.appendChild(el);
                }

                question_container.appendChild(answer_container);

                question_div.appendChild(question_container);

                question_div.style.display = 'block';

                loadmore.style.display = 'block';


                array_answer = [];
            }

            loading = false;

        });
}

function resetAll(){
    console.log('reset');
    loading = false;
    start = false;
    title.style.display = 'block';
    button_start.style.display = 'block';
    document.querySelector('.choose_category').style.display = 'block';
    question_div.style.display = 'none';
    question_div.innerHTML = '';
    question_data = [];
    array_answer = [];
    body.style.display = 'flex';
    body.style.justifyContent = 'space-around';
    body.style.backgroundColor = 'orange';
    body.style.backgroundColor = 'white';
    loadmore.style.display = 'none';
    body.style.backgroundImage = "url('../foto1.jpg')"
    opacity.style.display = 'block';
    document.querySelector('.statistics_container').style.display = 'none';
    document.querySelector('.statistics_container').style.visibility = 'hidden';
    totalLoaded = 0;
    category = '';
}

// let i = 0;
// let width;

// function move() {
//   if (i == 0) {
//     i = 1;
//     let elem = document.getElementById("myBar");
//     width = 100;
//     let id = setInterval(frame, 500);
//     function frame() {
//       if (width <= 0) {
//         clearInterval(id);
//         i = 0;
//         width = 100;
//       } else {
//         width--;
//         elem.style.width = width + "%";
//         elem.innerHTML = width + '%';
//       }
//     }
//   }
// }

// move()