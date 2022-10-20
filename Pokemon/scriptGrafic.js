

    let labelsP;
    let labels=[]; 
    let countTipos=[];
    let count=[];
    let tipos = [];
    const data = {
        labels: labels,
        datasets: [{
            label: 'Tipos de pokemons',
            backgroundColor: [
                'rgb(204, 0, 132)',
                'rgb(220, 99, 135)',
                'rgb(0, 26, 86)',
                'rgb(127, 192, 192)',
                'rgb(18, 10, 143)',
                'rgb(255, 19, 64)',
                'rgb(75, 12, 192)',
                'rgb(155, 196, 226)',
                'rgb(230, 230, 250)', 
                'rgb(255, 192, 203)'
              ],
            borderColor: 'rgb(255, 99, 132)',
            data:count,
        }]
    };

    const config = {
        type: 'bar',
        data: data,
        options: {responsive: true}
    };


    async function generarGrafic(){
        document.getElementById('grafic').classList.remove('hidden');
        document.getElementById('btnT').classList.add('hidden');
        document.getElementById('btnG').classList.add('hidden');
    
    
        await fetch("pokemon.json")
        .then((response) => response.json())
        .then((data) => {
            labelsP =  data.pokemon;
        });
        

        //tipos
        for (let i = 0; i < labelsP.length; i++) {
            for (let j = 0; j < labelsP[i].type.length; j++) {
                tipos[i] = labelsP[i].type[j]
            }
        }

        //Cuenta tipos
        tipos.forEach(e => countTipos[e] = (countTipos[e] || 0) + 1);
        console.log(countTipos); 
        //Únicos
        let mySet = new Set(tipos);

        //crea labels
        //cuenta tipos (separado)
        let i = 0;
        for (let item of mySet){
            labels[i] = item;
            count[i]= countTipos[labels[i]]
            i++
        }

        const myChart = new Chart(
            document.getElementById('myChart'),
            config
        );
    
    }