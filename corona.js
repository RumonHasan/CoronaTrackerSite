// Fetching Japan Data
class jpData{
    async fetchJpData(){
        try{
            const url = "https://covid19-japan-web-api.now.sh/api/v1/prefectures";
            let fetchData = await fetch(url);
            let fetchJson = await fetchData.json();
            
            fetchJson = fetchJson.map(prefectureData =>{
                let prefId = prefectureData.id;
                let prefName = prefectureData.name_en;
                let prefTotalCases = prefectureData.cases;
                let prefDeaths = prefectureData.deaths;
                let prefDischarge = prefectureData.discharge;
                let prefHospitalize = prefectureData.hospitalize;
                let prefCritical = prefectureData.severe;
                let prefPopulation  = prefectureData.population;

                return{prefId, prefName, prefTotalCases, prefDeaths, prefDischarge, prefHospitalize, prefCritical, prefPopulation};
            })

            return fetchJson;
        }catch{
            console.log('Unable to fetch the Japan prefecture data...')
        }
    }
}

class jpUI{
    // populating prefecture lists 
    prefectureList(dataSet){
        let prefList = [];
        for(let i = 0; i < dataSet.length; i++){
            prefList.push(dataSet[i].prefName);
        }
        this.createPrefList(prefList);
        this.prefSearchFilter(prefList);
    }

    //creating prefecture list
    createPrefList(prefectures){
        const pref_list_element = document.querySelector('.pref-list');
        const number_pref = prefectures.length;
        console.log(number_pref)
        let i = 0; 
        let ul_list_id;
        let num_ul_list = 3; // dividing the list into three columns 

        prefectures.forEach((pref, index) =>{
            if(index % Math.ceil(number_pref/num_ul_list) == 0){
                ul_list_id = `list-${i}`;
                pref_list_element.innerHTML += `<ul id='${ul_list_id}'></ul>`;
                i++;
            }
            document.getElementById(`${ul_list_id}`).innerHTML += `<li 
            class="prefecture_name" id="${pref}">${pref}
            </li>`// fetch data to enable click function 
        })

    }

    //show pref list 
    showPrefList(){
        const change_pref_button = document.querySelector('.change-prefecture');
        const search_pref = document.querySelector('.search-pref');
        change_pref_button.addEventListener('click', e=>{
            search_pref.classList.toggle('hide');
            search_pref.classList.add('fadeIn');
        })
    }

    //close pref list
    closePrefList(){
        const close_button = document.querySelector('.close');
        const search_pref = document.querySelector('.search-pref');
        close_button.addEventListener('click', e=>{
            search_pref.classList.add('hide');
            search_pref.classList.add('fadeOut');
        })
    }

    prefSearchFilter(pref){ // subfunction to filter the prefectures from the drop down list 
        const pref_list = document.querySelector('.pref-list');

      // search input for prefecture list 
      const pref_input = document.getElementById('search-pref-input');
            pref_input.addEventListener('input', e=>{  
                let input = e.target.value;
                let pref_value = input.toLowerCase();

                pref.forEach(prefectures =>{
                    if(prefectures.toLowerCase().startsWith(pref_value)){ // starts with checks the starting index of array of index 
                        document.getElementById(prefectures).classList.remove('hide')
                    }else{
                        document.getElementById(prefectures).classList.add('hide');
                    }
                })
             })
        
    }
    displayTokyoVal(prefData){
        prefData.forEach(prefIndex=>{
            const tokyoTitle = document.querySelector('.prefecture-title');
            if(tokyoTitle.innerHTML === prefIndex.prefName){
                const tokyoTotal = document.getElementById('pref-total-value');
                const tokyoRecovered = document.getElementById('pref-total-recovered');
                const tokyoDeaths = document.getElementById('pref-total-deaths');
                const tokyoHospital = document.getElementById('pref-total-hospital');
                const tokyoCritical = document.getElementById('pref-total-critical');
                const tokyoPopulation = document.getElementById('pref-total-population');

                tokyoTotal.innerHTML = parseFloat(prefIndex.prefTotalCases).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
                tokyoRecovered.innerHTML = parseFloat(prefIndex.prefDischarge).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
                tokyoDeaths.innerHTML = parseFloat(prefIndex.prefDeaths).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
                tokyoHospital.innerHTML = parseFloat(prefIndex.prefHospitalize).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
                tokyoCritical.innerHTML = parseFloat(prefIndex.prefCritical).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
                tokyoPopulation.innerHTML = parseFloat(prefIndex.prefPopulation).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
            }
        })
    }

    // search and display pref data
    displayPrefData(prefData){
        console.log(prefData);
        prefData.forEach(prefIndex =>{
            const pref_name = document.getElementById(prefIndex.prefName);
            pref_name.addEventListener('click', e=>{
                let pref_name_event = e.target.innerText;
                let pref_lower = pref_name_event.toLowerCase();
                console.log(pref_lower);

                if(prefIndex.prefName.toLowerCase().indexOf(pref_lower)>-1){
                    const pref_title = document.querySelector('.prefecture');
                    const pref_total_list = document.querySelector('.pref-total');
                    const pref_recovered_list = document.querySelector('.pref-recovered');
                    const pref_deaths_list = document.querySelector('.pref-deaths');
                    const pref_hos = document.querySelector('.pref-hospital');
                    const pref_critical = document.querySelector('.pref-critical');
                    const pref_pop = document.querySelector('.pref-pop');
                    
                    const pref_name_div = pref_title.getElementsByTagName('div')[0];
                    const pref_total = pref_total_list.getElementsByTagName('div')[1];
                    const pref_recovered = pref_recovered_list.getElementsByTagName('div')[1];
                    const pref_deaths = pref_deaths_list.getElementsByTagName('div')[1];
                    const pref_hos_name = pref_hos.getElementsByTagName('div')[1];
                    const pref_critical_name = pref_critical.getElementsByTagName('div')[1];
                    const pref_pop_name = pref_pop.getElementsByTagName('div')[1];
                    
                    pref_name_div.innerHTML = prefIndex.prefName.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
                    pref_total.innerHTML = prefIndex.prefTotalCases.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
                    pref_recovered.innerHTML = prefIndex.prefDischarge.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
                    pref_deaths.innerHTML = prefIndex.prefDeaths.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
                    pref_hos_name.innerHTML = prefIndex.prefHospitalize.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
                    pref_critical_name.innerHTML = prefIndex.prefCritical.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
                    pref_pop_name.innerHTML = prefIndex.prefPopulation.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');

                }else{
                    console.log("Failed To Update The data!")
                }
            })
        })

    }

    // region based data function
    displayRegionBasedData(prefData){
        const Kanto = ['Tokyo', 'Kanagawa', 'Chiba', 'Saitama', 'Gunma', 'Ibaraki', 'Tochigi'];
        const Kansai = ['Osaka', 'Hyogo', 'Kyoto', 'Mie', 'Shiga', 'Nara', 'Wakayama'];
        const Chubu = ['Aichi', 'Shizuoka', 'Gifu', 'Yamanashi', 'Nagano', 'Ishikawa', 'Toyama', 'Niigata', 'Fukui'];
        const Kyushu = ['Okinawa', 'Kumamoto', 'Fukuoka', 'Kagoshima', 'Sago', 'Miyazaki', 'Nagasaki', 'Oita'];
        const Chugoku = ['Tottori', 'Shimane', 'Okayama', 'Hiroshima', 'Yamaguchi']
        const Hokkaido = ['Hokkaido'];
        const Tohoku = ['Akita', 'Miyagi', 'Fukushima', 'Aomori', 'Yamagata', 'Iwate'];
        const Shikoku = ['Tokushima', 'Ehime', 'Kagawa', 'Kōchi'];
        // ------------------KANTO ----------------
        let activeKanto = [];// value for Kanto region 
        let deathKanto = [];
        let confirmedKanto = [];

        prefData.forEach(prefIndex=>{
            for(let index = 0; index < Kanto.length; index++){
                if(Kanto[index] === prefIndex.prefName){
                    // Kanto Region
                    let hospitalizeCritical = [];
                    hospitalizeCritical.push(prefIndex.prefHospitalize);
                    hospitalizeCritical.push(prefIndex.prefCritical);
                    deathKanto.push(prefIndex.prefDeaths);
                    confirmedKanto.push(prefIndex.prefTotalCases);
                    let total = 0;
                    for(let i = 0; i < hospitalizeCritical.length; i++){
                        total += hospitalizeCritical[i];
                    }
                    activeKanto.push(total);

                }
            }
               // active
        let totalActive = activeKanto.reduce((a,b) =>{
            return a + b
        }, 0)
        const regionActiveValue = document.querySelector('.kanto-active-value');
        regionActiveValue.innerHTML = totalActive.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')

        // death
        let totalDeath = deathKanto.reduce((a,b) =>{
            return a + b
        },0)
        const regionDeathValue = document.querySelector('.kanto-death-value');
        regionDeathValue.innerHTML = totalDeath.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')

        // confirmed cases 
        let totalConfirmed = confirmedKanto.reduce((a,b) =>{
            return a + b
        },0)
        const regionTotalValue = document.querySelector('.kanto-total-value');
        regionTotalValue.innerHTML = totalConfirmed.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')

    })

        // -------------- Kansai ------------------
            let activeKansai = [];// value for Kanto region 
            let deathKansai = [];
            let confirmedKansai = [];
            //Kansai region
        prefData.forEach(prefIndex=>{
            for(let index = 0; index < Kansai.length; index++){
                if(Kansai[index] === prefIndex.prefName){
                    // Kansai Region
                    let hospitalizeCritical = [];
                    hospitalizeCritical.push(prefIndex.prefHospitalize);
                    hospitalizeCritical.push(prefIndex.prefCritical);
                    deathKansai.push(prefIndex.prefDeaths);
                    confirmedKansai.push(prefIndex.prefTotalCases);
                    let total = 0;
                    for(let i = 0; i < hospitalizeCritical.length; i++){
                        total += hospitalizeCritical[i];
                    }
                    activeKansai.push(total);

                }
            }
        })

            let totalActive = activeKansai.reduce((a,b) =>{
                return a + b
            }, 0)
            const regionActiveValue = document.querySelector('.kansai-active-value');
            regionActiveValue.innerHTML = totalActive.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
    
            // death
            let totalDeath = deathKansai.reduce((a,b) =>{
                return a + b
            },0)
            const regionDeathValue = document.querySelector('.kansai-death-value');
            regionDeathValue.innerHTML = totalDeath.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
    
            // confirmed cases 
            let totalConfirmed = confirmedKansai.reduce((a,b) =>{
                return a + b
            },0)
            const regionTotalValue = document.querySelector('.kansai-total-value');
            regionTotalValue.innerHTML = totalConfirmed.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
 

            // --------------- Chubu ------------------------
            let activeChubu = [];// value for Kanto region 
            let deathChubu = [];
            let confirmedChubu  = [];
            //Kansai region
        prefData.forEach(prefIndex=>{
            for(let index = 0; index < Chubu.length; index++){
                if(Chubu[index] === prefIndex.prefName){
                    // Kansai Region
                    let hospitalizeCritical = [];
                    hospitalizeCritical.push(prefIndex.prefHospitalize);
                    hospitalizeCritical.push(prefIndex.prefCritical);
                    deathChubu.push(prefIndex.prefDeaths);
                    confirmedChubu.push(prefIndex.prefTotalCases);
                    let total = 0;
                    for(let i = 0; i < hospitalizeCritical.length; i++){
                        total += hospitalizeCritical[i];
                    }
                    activeChubu.push(total);

                }
            }
       

            let totalActive = activeChubu.reduce((a,b) =>{
                return a + b
            }, 0)
            const regionActiveValue = document.querySelector('.chubu-active-value');
            regionActiveValue.innerHTML = totalActive.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
    
            // death
            let totalDeath = deathChubu.reduce((a,b) =>{
                return a + b
            },0)
            const regionDeathValue = document.querySelector('.chubu-death-value');
            regionDeathValue.innerHTML = totalDeath.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
    
            // confirmed cases 
            let totalConfirmed = confirmedChubu.reduce((a,b) =>{
                return a + b
            },0)
            const regionTotalValue = document.querySelector('.chubu-total-value');
            regionTotalValue.innerHTML = totalConfirmed.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
 
        })

        //---------------- Kyushu ----------------
        let activeKyushu = [];// value for Kanto region 
        let deathKyushu = [];
        let confirmedKyushu  = [];
        //Kansai region
    prefData.forEach(prefIndex=>{
        for(let index = 0; index < Kyushu.length; index++){
            if(Kyushu[index] === prefIndex.prefName){
                // Kansai Region
                let hospitalizeCritical = [];
                hospitalizeCritical.push(prefIndex.prefHospitalize);
                hospitalizeCritical.push(prefIndex.prefCritical);
                deathKyushu.push(prefIndex.prefDeaths);
                confirmedKyushu.push(prefIndex.prefTotalCases);
                let total = 0;
                for(let i = 0; i < hospitalizeCritical.length; i++){
                    total += hospitalizeCritical[i];
                }
                activeKyushu.push(total);

            }
        }
   

        let totalActive = activeKyushu.reduce((a,b) =>{
            return a + b
        }, 0)
        const regionActiveValue = document.querySelector('.kyushu-active-value');
        regionActiveValue.innerHTML = totalActive.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')

        // death
        let totalDeath = deathKyushu.reduce((a,b) =>{
            return a + b
        },0)
        const regionDeathValue = document.querySelector('.kyushu-death-value');
        regionDeathValue.innerHTML = totalDeath.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')

        // confirmed cases 
        let totalConfirmed = confirmedKyushu.reduce((a,b) =>{
            return a + b
        },0)
        const regionTotalValue = document.querySelector('.kyushu-total-value');
        regionTotalValue.innerHTML = totalConfirmed.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')

        })

        //------------------Chugoku--------------
        let activeChugoku = [];// value for Kanto region 
        let deathChugoku = [];
        let confirmedChugoku  = [];
        //Kansai region
    prefData.forEach(prefIndex=>{
        for(let index = 0; index < Chugoku.length; index++){
            if(Chugoku[index] === prefIndex.prefName){
                // Kansai Region
                let hospitalizeCritical = [];
                hospitalizeCritical.push(prefIndex.prefHospitalize);
                hospitalizeCritical.push(prefIndex.prefCritical);
                deathChugoku.push(prefIndex.prefDeaths);
                confirmedChugoku.push(prefIndex.prefTotalCases);
                let total = 0;
                for(let i = 0; i < hospitalizeCritical.length; i++){
                    total += hospitalizeCritical[i];
                }
                activeChugoku.push(total);

            }
        }
   

        let totalActive = activeChugoku.reduce((a,b) =>{
            return a + b
        }, 0)
        const regionActiveValue = document.querySelector('.chugoku-active-value');
        regionActiveValue.innerHTML = totalActive.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')

        // death
        let totalDeath = deathChugoku.reduce((a,b) =>{
            return a + b
        },0)
        const regionDeathValue = document.querySelector('.chugoku-death-value');
        regionDeathValue.innerHTML = totalDeath.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')

        // confirmed cases 
        let totalConfirmed = confirmedChugoku.reduce((a,b) =>{
            return a + b
        },0)
        const regionTotalValue = document.querySelector('.chugoku-total-value');
        regionTotalValue.innerHTML = totalConfirmed.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')

        })

        //------------------Hokkaido------------------------------
        let activeHokkaido = [];// value for Kanto region 
        let deathHokkaido = [];
        let confirmedHokkaido  = [];
        //Kansai region
    prefData.forEach(prefIndex=>{
        for(let index = 0; index < Hokkaido.length; index++){
            if(Hokkaido[index] === prefIndex.prefName){
                // Kansai Region
                let hospitalizeCritical = [];
                hospitalizeCritical.push(prefIndex.prefHospitalize);
                hospitalizeCritical.push(prefIndex.prefCritical);
                deathHokkaido.push(prefIndex.prefDeaths);
                confirmedHokkaido.push(prefIndex.prefTotalCases);
                let total = 0;
                for(let i = 0; i < hospitalizeCritical.length; i++){
                    total += hospitalizeCritical[i];
                }
                activeHokkaido.push(total);

            }
        }
   

        let totalActive = activeHokkaido.reduce((a,b) =>{
            return a + b
        }, 0)
        const regionActiveValue = document.querySelector('.hokkaido-active-value');
        regionActiveValue.innerHTML = totalActive.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')

        // death
        let totalDeath = deathHokkaido.reduce((a,b) =>{
            return a + b
        },0)
        const regionDeathValue = document.querySelector('.hokkaido-death-value');
        regionDeathValue.innerHTML = totalDeath.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')

        // confirmed cases 
        let totalConfirmed = confirmedHokkaido.reduce((a,b) =>{
            return a + b
        },0)
        const regionTotalValue = document.querySelector('.hokkaido-total-value');
        regionTotalValue.innerHTML = totalConfirmed.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')

        })

        //------------------Tohoku---------------------
        let activeTohoku = [];// value for Kanto region 
        let deathTohoku = [];
        let confirmedTohoku  = [];
        //Kansai region
    prefData.forEach(prefIndex=>{
        for(let index = 0; index < Tohoku.length; index++){
            if(Tohoku[index] === prefIndex.prefName){
                // Kansai Region
                let hospitalizeCritical = [];
                hospitalizeCritical.push(prefIndex.prefHospitalize);
                hospitalizeCritical.push(prefIndex.prefCritical);
                deathTohoku.push(prefIndex.prefDeaths);
                confirmedTohoku.push(prefIndex.prefTotalCases);
                let total = 0;
                for(let i = 0; i < hospitalizeCritical.length; i++){
                    total += hospitalizeCritical[i];
                }
                activeTohoku.push(total);

            }
        }
   

        let totalActive = activeTohoku.reduce((a,b) =>{
            return a + b
        }, 0)
        const regionActiveValue = document.querySelector('.tohoku-active-value');
        regionActiveValue.innerHTML = totalActive.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')

        // death
        let totalDeath = deathTohoku.reduce((a,b) =>{
            return a + b
        },0)
        const regionDeathValue = document.querySelector('.tohoku-death-value');
        regionDeathValue.innerHTML = totalDeath.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')

        // confirmed cases 
        let totalConfirmed = confirmedTohoku.reduce((a,b) =>{
            return a + b
        },0)
        const regionTotalValue = document.querySelector('.tohoku-total-value');
        regionTotalValue.innerHTML = totalConfirmed.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')

        })

        //----------------Shikoku---------------------
        let activeShikoku = [];// value for Kanto region 
        let deathShikoku = [];
        let confirmedShikoku  = [];
        //Kansai region
    prefData.forEach(prefIndex=>{
        for(let index = 0; index < Shikoku.length; index++){
            if(Shikoku[index] === prefIndex.prefName){
                // Kansai Region
                let hospitalizeCritical = [];
                hospitalizeCritical.push(prefIndex.prefHospitalize);
                hospitalizeCritical.push(prefIndex.prefCritical);
                deathShikoku.push(prefIndex.prefDeaths);
                confirmedShikoku.push(prefIndex.prefTotalCases);
                let total = 0;
                for(let i = 0; i < hospitalizeCritical.length; i++){
                    total += hospitalizeCritical[i];
                }
                activeShikoku.push(total);

            }
        }
   

        let totalActive = activeShikoku.reduce((a,b) =>{
            return a + b
        }, 0)
        const regionActiveValue = document.querySelector('.shikoku-active-value');
        regionActiveValue.innerHTML = totalActive.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')

        // death
        let totalDeath = deathShikoku.reduce((a,b) =>{
            return a + b
        },0)
        const regionDeathValue = document.querySelector('.shikoku-death-value');
        regionDeathValue.innerHTML = totalDeath.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')

        // confirmed cases 
        let totalConfirmed = confirmedShikoku.reduce((a,b) =>{
            return a + b
        },0)
        const regionTotalValue = document.querySelector('.shikoku-total-value');
        regionTotalValue.innerHTML = totalConfirmed.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')

        })
    }

    // pref active
    displayRegionActiveData(prefData){
        prefData.forEach(prefIndex=>{
            const prefBlock = document.getElementsByClassName('pref-block');
            for(let index = 0; index <prefBlock.length; index++){
                let prefTitle = prefBlock[index].getElementsByTagName('div')[0];
                if(prefTitle.innerHTML === prefIndex.prefName){
                    let prefValue = prefBlock[index].getElementsByTagName('div')[2];
                    prefValue.innerHTML = parseFloat(prefIndex.prefHospitalize + prefIndex.prefCritical).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
                }
            }
        })
    }

    //pref recovered
    displayRegionRecoveredData(){
        const prefBlock = document.getElementsByClassName('pref-block');

        // adding prefTitle for recovery and initializer 
            for(let index = 0; index<prefBlock.length; index++){
                const prefTitleRecovered = document.createElement('div');
                prefTitleRecovered.classList.add('title-pref-recovered');
                prefTitleRecovered.innerHTML += 'Recovered:';
                prefBlock[index].appendChild(prefTitleRecovered);
            }

        // recovery pref block div element 
            for(let i = 0; i < prefBlock.length; i++){
                const prefRecValue = document.createElement('div');
                prefRecValue.classList.add("recovered-pref");
                prefRecValue.classList.add('value-rec');
                prefRecValue.innerHTML += '0';
                prefBlock[i].appendChild(prefRecValue);
            }
    }

    //display rec value 
    displayRecVal(prefData){
        prefData.forEach(prefIndex=>{
            const prefBlock = document.getElementsByClassName('pref-block');
            for(let index = 0; index < prefBlock.length; index++){
                let prefTitle = prefBlock[index].getElementsByTagName('div')[0];
                if(prefTitle.innerHTML === prefIndex.prefName){
                    let prefRecValue = prefBlock[index].getElementsByTagName('div')[4];
                    prefRecValue.innerHTML = parseFloat(prefIndex.prefDischarge).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
                }
            }
        })
    }
}

//------------------------------World Table---------------------------------
// Global Data Fetching 
class getCoronaData{
    async fetchData(){
        try{
            const coronaURL = "https://coronavirus-19-api.herokuapp.com/countries"; //Using Heroku app api in order to retrieve the data 
            let dataParse = await fetch(coronaURL);
            let response = await dataParse.text();
            let responseJson = JSON.parse(response)

            responseJson = responseJson.map(dataIndex=>{
                let countryName = dataIndex.country;
                let totalCases = dataIndex.cases;
                let todayCases = dataIndex.todayCases;
                let deaths = dataIndex.deaths;
                let todayDeaths = dataIndex.todayDeaths;
                let active = dataIndex.active;
                let recovered = dataIndex.recovered
                let critical = dataIndex.critical;
                let totalTests = dataIndex.totalTests;

                return{countryName, totalCases, todayCases, deaths, todayDeaths, active, recovered, critical, totalTests};
            })  
            return responseJson;

        }catch{
            console.log("Unable to fetch the data, Check the URL")
        }
    }

}
class UI{
    // Data Display Table
    displayData(dataElements){
        let resultData = '';
        const tbody = document.querySelector('.tbody')
        dataElements.forEach(dataIndex=>{
            resultData = resultData + `<tr class="data-row">
            <td class="list" data-label="#"></td>
            <td class="countryName" data-label="Country:"><i class="fas fa-star"></i>${dataIndex.countryName}</td>
            <td class="totalCases" data-label="Total Cases:">${dataIndex.totalCases}</td>
            <td class="todayCases" data-label="Today Cases:">${dataIndex.todayCases}</td>
            <td class="deaths" data-label="Deaths:">${dataIndex.deaths}</td>
            <td class="todayDeaths" data-label="Today Deaths:">${dataIndex.todayDeaths}</td>
            <td class="active" data-label="Active:">${dataIndex.active}</td>
            <td class="recovered" data-label="Recovered:">${dataIndex.recovered}</td>
            <td class="critical" data-label="Critical:">${dataIndex.critical}</td>
            <td class="totalTests" data-label="Total Tests:">${dataIndex.totalTests}</td></tr>`

            tbody.innerHTML = resultData;
        })
    }

    // search Function 
    searchFunction(searchEvent){
        if(searchEvent){
            const tbody = document.querySelector('.tbody')
            const tRow = tbody.getElementsByTagName('tr');

            if(searchEvent === ''){
                for(let i = 0; i< tRow.length; i++){
                    tRow[i].style.display= '';
                }
            }else{
                let searchValue = searchEvent.trim();
                let searchValueLower = searchValue.toUpperCase();
                
                    for(let index = 0; index < tRow.length; index++){
                        let td = tRow[index].getElementsByTagName('td')[1];// searching by country
                        if(td){
                            let textValueCountry = td.textContent;
                            if(textValueCountry.toUpperCase().startsWith(searchValueLower)){
                                tRow[index].style.display = ''; 
                            }else{
                                tRow[index].style.display = 'none';
                            }
                        }
                    }
            }
        }
    }

    // Numbering function 
    listingFunction(){
        const tbody = document.querySelector('.tbody')
        const tRow = tbody.getElementsByTagName('tr');
        for(let index = 0; index < tRow.length ; index++){
            let td = tRow[index].getElementsByTagName('td')[0];
            if(td){
                td.innerHTML = index + 1
            };
        }   
    }
    //table subfunctions 
        //Total Test calculation subFunction
        totalTests(){
            const tbody = document.querySelector('.tbody')
            const tRow = tbody.getElementsByTagName('tr');
            let totalTest = 0;
            for(let index = 0; index < tRow.length; index++){
                let tdTotalTests = tRow[index].getElementsByTagName('td')[9];
                if(tdTotalTests){
                    let totalTestNum = parseFloat(tdTotalTests.innerHTML)
                    totalTest += totalTestNum
                }
            }            
            const tdTotalTests = document.querySelector('.totalTests');
            tdTotalTests.innerHTML = totalTest;
        }  

    //Number formatting
    numberFormatting(){
        const tbody = document.querySelector('.tbody')
        const tRow = tbody.getElementsByTagName('tr');
        for(let index = 0; index < tRow.length ; index++){
            for(let tdIndex = 2; tdIndex <= 9; tdIndex++){
                let td = tRow[index].getElementsByTagName('td');
                if(td){
                    let tdNumber = parseFloat(td[tdIndex].innerHTML)
                    // js regular expressions to format the number into million scale 
                    let tdFormat = tdNumber.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
                    td[tdIndex].innerHTML = tdFormat;
                }
            }
        }  
    }

       // quickFacts function
       quickFacts(dataElements){
            // selectors 
            const totalCases = document.querySelector('.total-confirmed');
            const totalDeath = document.querySelector('.total-deceased');
            const totalRecovered = document.querySelector('.total-recovered');
            const totalCritical = document.querySelector('.total-critical');

            // formatted numbers
            let totalCasesFormatted = dataElements[0].totalCases.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
            let totalDeathFormatted = dataElements[0].deaths.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
            let totalRecoveredFormatted = dataElements[0].recovered.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
            let totalCriticalFormatted = dataElements[0].critical.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');

            // html appending 
            let totalConfirmed = '';
            totalConfirmed += `<h1 class="total-cases-number">${totalCasesFormatted}</h1>`
            totalCases.innerHTML = totalConfirmed;

            let totaldeaths = '';
            totaldeaths += `<h1 class="total-death-number">${totalDeathFormatted}</h1>`
            totalDeath.innerHTML = totaldeaths;

            let totalrecovered = '';
            totalrecovered += `<h1 class="total-recovered-number">${totalRecoveredFormatted}</h1>`
            totalRecovered.innerHTML = totalrecovered;

            let totalcritical = '';
            totalcritical += `<h1 class="total-critical-number">${totalCriticalFormatted}</h1>`
            totalCritical.innerHTML = totalcritical;
    }

    //Create Fitler select options 
    fillSelectContinentOptions(){
      const optionSelector = document.querySelector('.continent-select');// main selector

      // setting default option for department selection 
      const defaultOption = document.createElement('option');
      const defaultOptionText = document.createTextNode('--Filter By Continent--');
      defaultOption.appendChild(defaultOptionText);
      defaultOption.setAttribute('value', 'default-option');
      optionSelector.appendChild(defaultOption);

      // populating the country list to the option select
      const continentNames = ['Asia', 'Africa', 'Oceania(Australia)', 'Europe', 'North America', 'South America'];
      for (let index = 0; index < continentNames.length; index++){
          const continentOptions = document.createElement('option');
          continentOptions.classList.add('continent-options');
          const optionCountries = document.createTextNode(continentNames[index]);
          continentOptions.appendChild(optionCountries);
        // appending the options to the parent div 
          optionSelector.appendChild(continentOptions);
      }
    }

    // Filtering Based On Continent Functions 
        // select Sub functions 
        displayAsiaData(asianCountries, allCountries, tableRows){   

                for(let i = 0; i < allCountries.length; i++){
                    if(asianCountries.indexOf(allCountries[i]) > -1){
                        tableRows[i].style.display ='';
                    }else{
                        tableRows[i].style.display = 'none';
                    }
                }
        }

        displayAfricaData(africanCountries, allCountries, tableRows){   

            for(let i = 0; i < allCountries.length; i++){
                if(africanCountries.indexOf(allCountries[i]) > -1){
                    tableRows[i].style.display ='';
                }else{
                    tableRows[i].style.display = 'none';
                }
            }
        }
        displayAustraliaData(OceaniaCountries, allCountries, tableRows){   

            for(let i = 0; i < allCountries.length; i++){
                if(OceaniaCountries.indexOf(allCountries[i]) > -1){
                    tableRows[i].style.display ='';
                }else{
                    tableRows[i].style.display = 'none';
                }
            }
        }
        displayEuropeData(EUCountries, allCountries, tableRows){   

            for(let i = 0; i < allCountries.length; i++){
                if(EUCountries.indexOf(allCountries[i]) > -1){
                    tableRows[i].style.display ='';
                }else{
                    tableRows[i].style.display = 'none';
                }
            }
        }
        displayNAData(NACountries, allCountries, tableRows){   

            for(let i = 0; i < allCountries.length; i++){
                if(NACountries.indexOf(allCountries[i]) > -1){
                    tableRows[i].style.display ='';
                }else{
                    tableRows[i].style.display = 'none';
                }
            }
        }
        displaySAData(SACountries, allCountries, tableRows){   

            for(let i = 0; i < allCountries.length; i++){
                if(SACountries.indexOf(allCountries[i]) > -1){
                    tableRows[i].style.display ='';
                }else{
                    tableRows[i].style.display = 'none';
                }
            }
        }

    // function for dataRepresentations using chart.js src 
    chartFunction(){
        let majorNationList = ['USA', 'Russia', 'China', 'Germany', 'UK', 'France', 'Japan', 'Israel', 'S. Korea', 'Saudi Arabia'];// comparing list 
        
        const tbody = document.querySelector('.tbody')
        const tRow = tbody.getElementsByTagName('tr');

        let majorNationRows = []; // contains all the table row data of the selected major nation rows 
        for(let index = 0; index < majorNationList.length; index++){
            for(let row = 0; row < tRow.length; row++ ){

                let tdCountry = tRow[row].getElementsByTagName('td')[1];// iterating by country name
                let tdCountryName = tdCountry.textContent || tdCountry.innerHTML;

                if(tdCountryName){
                     if(majorNationList[index].toLowerCase().indexOf(tdCountryName.toLowerCase()) > -1){
                         majorNationRows.push(tRow[row])// all the selected rows with the data 
                     }
                }
                
            }
        }
        let totalCaseArray = []; 
        for(let i = 0; i < majorNationRows.length; i++){
                let tdTotalCase = majorNationRows[i].getElementsByTagName('td')[2];
                let tdTotalCaseNumber = parseFloat(tdTotalCase.textContent);
                totalCaseArray.push(tdTotalCaseNumber); // pushes the total filtered cases inside the array 
            }
        
        // new chart object : type => apex charts

        // chart options
            const options = {
                chart:{
                    height: 450,
                    width: '100%',
                    type: 'bar',
                    background: '#212121',
                    foreColor: '#fff'
                },
                series: [{
                    name: 'Total Case Confirmed:',
                    data: totalCaseArray,
                }],

                xaxis:{
                    categories: majorNationList,
                },
                plotOptions:{
                    bar:{
                        horizontal: true
                    }
                },
                fill: {
                    colors: ["#ed4d4d"]
                },
                dataLabels: {
                    enabled: false
                },
                title: {
                    text: 'Total Cases: Major Nations',
                    align: 'center',
                    margin: 20,
                    offsetY: 20,
                    style: {
                        fontSize: '20px',
                        color: '#fff',
                        fontFamily: 'Fredoka One'
                    }
                }
            };
            //init chart
            const chart = new ApexCharts(document.querySelector('#corona-chart'), options);
            // render chart
            chart.render();
    }
}

class storage{ 
    static storeCoronaApiItems(coronaDataElements){
        localStorage.setItem('coronaDataElements', JSON.stringify(coronaDataElements))
        //upgrading API data is stored everytime the program is run
    }
}

document.addEventListener('DOMContentLoaded', ()=>{
    //Japan
    const uiJapan = new jpUI();
    const japanData = new jpData();
    
    // Japan Data fetching
    japanData.fetchJpData().then(jpDataIndex=>{
        uiJapan.prefectureList(jpDataIndex);
        
        // closing and opening pref list: subfunctions 
        uiJapan.showPrefList();
        uiJapan.closePrefList();

        //display default tokyo data values 
        uiJapan.displayTokyoVal(jpDataIndex);

        // main display pref data function 
        uiJapan.displayPrefData(jpDataIndex);

        //regional data display functions
        uiJapan.displayRegionBasedData(jpDataIndex);

        //regional data active values
        uiJapan.displayRegionActiveData(jpDataIndex);

        //regional recoverd values
        uiJapan.displayRegionRecoveredData();

        //regional recoverd value
        uiJapan.displayRecVal(jpDataIndex);
    })
 

    //World
    const ui = new UI();
    const coronaData = new  getCoronaData();

    // global Data fetching
    coronaData.fetchData().then(dataIndex=>{
        ui.displayData(dataIndex);
        ui.listingFunction();
        ui.totalTests();
        ui.quickFacts(dataIndex);
        ui.chartFunction();
        ui.numberFormatting();
        ui.fillSelectContinentOptions();

        storage.storeCoronaApiItems(dataIndex);
        //ui.dailyStats();
    }).then(e=>{
        //searchBlock event listener
        const searchText = document.querySelector('.search-txt');
        searchText.addEventListener('input', e=>{
            e.preventDefault();
            let searchEvent = e.target.value;
            ui.searchFunction(searchEvent);
        });

        // search by continent name 
        let searchContinentOptions = document.querySelector('.continent-select');
        searchContinentOptions.addEventListener('change', e=>{
            e.preventDefault();
            let selectEvent = e.target.value;

        // countries by continent 
        let Africa =  /* Africa */
        ['Algeria', 'Angolia', 'Benin', 'Botswana', 'Burkina', 'Burundi', 'Cameroon', 'Chad', 'Chana', 'Comoros Island', 'Congo', 'Congo', 'Ivory Coast', 'Djibouti', 'Egypt', 'Equatorial Guinea', 'Eritrea', 'Ethiopia', 'Gabon', 'Guinea', 'Guinea Bissau', 'Kenya', 'Lesotho', 'Liberia', 'Libya', 'Madagascar', 'Malawi', 'Mali', 'Mauritania', 'Mauritius', 'Morocco', 'Mozambique', 'Namibia', 'Niger', 'Nigeria', 'Rwanda', 'Sao Tome and Principe', 'Senegal', 'Seychelles', 'Sierra Leone', 'Somalia', 'South Africa', 'Sudan', 'Swaziland', 'Tanzania', 'Tunisia', 'Togo', 'Uganda', 'Zambia', 'Zimbabwe', 'Mayotte']
        /* Asia */
        let Asia = ['Afghanistan', 'Armenia', 'Azerbaijan', 'Bahrain', 'Bangladesh', 'Bhutan', 'Brunei', 'Cambodia', 'China', 'Cyprus', 'Georgia', 'Iran', 'Iraq', 'India', 'Indonesia', 'Israel', 'Japan', 'Jordan', 'Kazakstan', 'Kuwait', 'Kyrgyzstan', 'Laos', 'Lebanon', 'Malaysia', 'Mongolia', 'Myanmar', 'Nepal', 'North Korea', 'Oman', 'Pakistan', 'Palau', 'Phillipines', 'Quatar', 'Russian', 'Saudi Arabia', 'South Korea', 'Sri Lanka', 'Syria', 'Taiwan', 'Tajikstan', 'Thailand', 'Turkey', 'Turkmenistan', 'UAE', 'Uzbekistan', 'Vietnam', 'Yemen']
        /* Oceania */
        let Australia = ['Australia', 'Fiji', 'Kiribati', 'Marshall Islands', 'Nauru', 'New Zealand', 'Papua New Guinea', 'Tonga', 'Tuvalu', 'Vanuatu']   
        /* Europe */
        let Europe = ['Albania', 'Andorra', 'Austria', 'Belarus', 'Belgium', 'Bosnia and Herzegovina', 'Bulgaria', 'Cape Verde', 'Croatia', 'Czechia', 'Denmark', 'Estonia', 'Finland', 'France', 'Germany', 'Greece', 'Hungary', 'Iceland', 'Ireland', 'Italy', 'Latvia', 'Liechtenstein', 'Lithuania', 'Luxembourg', 'Macedonia', 'Malta', 'Moldova', 'Netherlands', 'Norway', 'Poland', 'Portugal', 'Romania', 'Russian', 'Slovakia', 'Slovenia', 'Spain', 'Sweden', 'Switzerland', 'Turkey', 'Ukraine', 'UK']
        let NorthAmerica =   /* North America */
        ['Barbados', 'Bahamas', 'Belize', 'Canada', 'Costa Rica', 'Cuba', 'Dominica', 'Dominican Republic', 'El Salvador', 'Greenland', 'Grenada', 'Guatemala', 'Haiti', 'Honduras', 'Jamaica', 'Mexico', 'Netherlands', 'Panama', 'St Kitts-Nevis', 'St Lucia', 'St Vincent Grenadines', 'Trinidad and Tobago', 'USA']
        let SouthAmerica =   /* South America */
        ['Argentina', 'Bolivia', 'Brazil', 'Chile', 'Colombia', 'Ecuador', 'French Guiana', 'Guyana', 'Nicaragua', 'Paraguay', 'Peru', 'Suriname', 'Uruguay', 'Venezuela']
        
        const tbody = document.querySelector('.tbody');
        const tRow = tbody.getElementsByTagName('tr');

        let tdCountryArray = []
        for(let i = 0; i < tRow.length; i++){
          let tdCountry = tRow[i].getElementsByTagName('td')[1];
          let name = tdCountry.textContent;
          tdCountryArray.push(name);
      }

        switch(selectEvent){
            case 'Asia':
                ui.displayAsiaData(Asia, tdCountryArray, tRow);
                break;
            case 'Africa':
                ui.displayAfricaData(Africa, tdCountryArray, tRow);
                break;
            case 'Oceania(Australia)':
                ui.displayAustraliaData(Australia, tdCountryArray, tRow);
                break;
            case 'Europe':
                ui.displayEuropeData(Europe, tdCountryArray, tRow);
                break;
            case 'North America':
                ui.displayNAData(NorthAmerica, tdCountryArray, tRow);
                break;
            case 'South America':
                ui.displaySAData(SouthAmerica, tdCountryArray, tRow);
                break;
        }

        })
    })
})