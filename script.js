let queue = 0;
const API_URL = "https://api.apify.com/v2/key-value-stores/tVaYRsPHLjNdNBu7S/records/LATEST?disableRedirect=true";
const countriesDOM = document.querySelector('#countries');

async function fetchFunc() {
    const response = await fetch(API_URL);
    const json = await response.json();
    return json;
}

fetchFunc()
    .then(data => {
        firstData(data);
        data.forEach(element => {
            const country = document.createElement('option');
            country.value = element["country"];
            country.textContent = element["country"];
            countriesDOM.appendChild(country);
            country.setAttribute("id", `${queue}`)
            queue ++;
        });

        $('#countries').change(function() { 
            function getSelectedOption(countriesDOM) {
                let opt;
                for (let i = 0; i < countriesDOM.options.length; i++ ) {
                    opt = countriesDOM.options[i];
                    if ( opt.selected === true ) {
                        break;
                    }
                }
                return opt;
            }

            const opt = getSelectedOption(countriesDOM);

            $("#dead").html(data[opt.id]["deceased"]);
            $("#case").html(data[opt.id]["infected"]);
            $("#recovered").html(data[opt.id]["recovered"]);
            $("#tested").html(data[opt.id]["tested"]);
        });
    })
    .catch(error => {
        console.log(error);
    }
)

const firstData = database => {
    document.querySelector('#dead').textContent = database[0]["deceased"];
    document.querySelector('#case').textContent = database[0]["infected"];
    document.querySelector('#recovered').textContent = database[0]["recovered"];
    document.querySelector('#tested').textContent = database[0]["tested"];
}