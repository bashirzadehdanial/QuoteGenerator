const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader')


let apiQuotes= []


function showLoadingSpinner(){
    loader.hidden = false;
    quoteContainer.hidden = true;
}


function hideLoadingSpinner(){
    if(!loader.hidden)
    loader.hidden = true;
    quoteContainer.hidden = false;
    
}

// Show New Quote
function newQuote() {
    showLoadingSpinner();
    //Pick a random quote from apiQuotes array
    const quote = apiQuotes[Math.floor(Math.random()* apiQuotes.length)];
    //check if Author field is blank and replace it with 'unknown'
    if (!quote.author){
        authorText.textContent = 'unknown'
    }else{
        authorText.textContent = quote.author;
    }

    //check Quote length to determine styling
    if (quote.text.length > 120){
        quoteText.classList.add('long-quote');
    }else{
        quoteText.classList.remove('long-quote');
    }

    //Set Quote, Hide Loader

    authorText.textContent = quote.author;
    quoteText.textContent = quote.text;
    hideLoadingSpinner()
}
//Get quotes from API
async function getQuotes(){
    showLoadingSpinner();
    const apiUrl = 'https://jacintodesign.github.io/quotes-api/data/quotes.json'
    try {
        const response = await fetch(apiUrl);
        apiQuotes = await response.json();
        newQuote()

    }catch(error){
       alert(error)
    }
}

//Tweet Quote 
function tweetQuote(){
    const twitterUrl = `https://twitter.com/intent/tweet?text = ${quoteText.textContent} - ${authorText.text}`
    window.open(twitterUrl, '_blank')
}

//Event Listeners
newQuoteBtn.addEventListener('click', newQuote);
twitterBtn.addEventListener('click', tweetQuote);


getQuotes()
