const readline = require('node:readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});
rl.question(`Jak masz na imie?`, imie => {


const wiek = 11
const ulubione_jedzenie = ["jablko","czokoladka","czipsa"]
function pelnoletnosc(name,old){
    if (old >= 18)
    {
        console.log(`${name} jest pełnoletnia`);
    }else
    {
        console.log(`${name} nie jest pełnoletnia`);
    }
}
function jedzenie(lista)
{
    console.log("Twoje ulubione jedzenie to: ")
    for (const listaKey in lista) {
        console.log("- "+ listaKey);
    }
}


console.log(`Hej ${imie}!`);
pelnoletnosc(imie,wiek);
jedzenie(ulubione_jedzenie);

    rl.close();
});

