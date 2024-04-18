let num = 0;
function createQuestion() {
    num += 1;
    document.body.style.justifyContent = "start";
    document.getElementById('container').style.width = "60vw";
    document.getElementById('container').style.height = "80vh";
    document.getElementById('container').style.border = "0";
    if (num == 1) {
        document.querySelector('#container div button').style.width = '25vh';
        document.querySelector('#container div button').style.height = '8vh';
        document.querySelector('#container div button').style.position = 'relative';
        document.getElementById('button').innerHTML += document.querySelector('#container div:nth-child(2)').innerHTML;
        document.getElementById('container').innerHTML = "";

    } else {
        document.getElementById('result').innerHTML = document.getElementById('container').innerHTML + document.getElementById('result').innerHTML;
    }
    document.getElementById('container').innerHTML = `
    <div id="question" style="width: 60vw; margin-top: 50px; margin-bottom: 20px; text-align: left;">${num}. 표는 염기쌍의 수가 같은 이중가닥 DNA I~III의 염기 조성을 나타낸 것이다.</div>
    <table style="width: 100%; text-align: center;">
        <tr>
            <th rowspan="2">구분</th>
            <th colspan="5">염기 조성(%)</th>
        </tr>
        <tr>
            <th>A</th>
            <th>G</th>
            <th>T</th>
            <th>C</th>
            <th>계</th>
        </tr>
        <tr>
            <th>I</th>
            <td>?</td>
            <td>?</td>
            <td>?</td>
            <td>?</td>
            <td>100</td>
        </tr>
        <tr>
            <th>II</th>
            <td>?</td>
            <td>?</td>
            <td>?</td>
            <td>?</td>
            <td>100</td>
        </tr>
        <tr>
            <th>III</th>
            <td>?</td>
            <td>?</td>
            <td>?</td>
            <td>?</td>
            <td>100</td>
        </tr>
    </table>
    <div id="solve" style="width: 60vw; margin-top: 20px; text-align: left;">이 자료에 대한 설명으로 옳은 것만을 <보기>에서 있는 대로 고르시오
        <div style="color: dodgerblue;"><br>
            < 보기 ><br>
            <div style="position: relative; left: 10px;">
                <div>ㄱ. <span></span></div>
                <div>ㄴ. <span></span></div>
                <div>ㄷ. <span></span></div>
            <div><br>
            < 풀이 ><br>
            <div style="position: relative; left: 10px;">
                <div>ㄱ. <span></span></div>
                <div>ㄴ. <span></span></div>
                <div>ㄷ. <span></span></div>
            <div>
        </div>
    
    </div>
    `;



    
    table = Array.from(document.querySelectorAll('#container table td')).filter((e) => {
        return e.textContent != '100';
    })
    table.forEach((e, index) => {
        e.textContent = index;
    })
    //필요한 표 내용(td)만 필터링 후 index 위치 부여
    
    
    variable = Array(6).fill().map((e, index) => { return index });
    //[0, 1, .., 5]
    variable.splice(Math.floor(Math.random() * 6), 1);
    variable.splice(Math.floor(Math.random() * 6), 1);
    //요소 2개 제거 6개 중 하나 선택
    specialChar = [
        { 'type': '㉠', 'index': 2 * variable[0] + Math.floor(Math.random() * 2), 'value': null },
        { 'type': '㉡', 'index': 2 * variable[1] + Math.floor(Math.random() * 2), 'value': null },
        { 'type': '㉢', 'index': 2 * variable[2] + Math.floor(Math.random() * 2), 'value': null },
        { 'type': '㉣', 'index': 2 * variable[3] + Math.floor(Math.random() * 2), 'value': null }
    ];
    //표 내용(td) index 랜덤하게 부여
    specialChar.forEach((e) => {
        table[e.index].textContent = e.type;
    })
    //랜덤하게 부여된 index 위치에 맞게 특수기호 삽입

    


    for (let i = 0; i < 3; i++) {
        let Num = table.slice(4 * i, 4 * i + 4).map((e) => {
            return e.textContent
        }).filter((e) => {
            return !isNaN(e);
        })
        table[Number(Num[Math.floor(Math.random() * Num.length)])].textContent = 'Num';
    }
    //ㄱ~ㄹ을 배정하고 남은 자리 중 문제를 풀 때 제공할 숫자 자리를 Num으로 표시.



    table.filter((e) => {
        return !isNaN(e.textContent);
    }).map((e) => {
        e.textContent = '?';
    })
    //작업을 위해 표시해뒀던 인덱스 위치들을 다시 원상태로 복원



    table.filter((e) => {
        return e.textContent == 'Num';
    }).map((e) => {
        e.textContent = Math.floor(Math.random() * 50) + 1;
    })
    //Num으로 표시된 셀들에 1~50 랜덤 숫자 삽입


    

    //표 완성, 보기 만들기 스타트
    rand = [0, 1, 2];
    randR = [];
    randRe = [];
    randR[0] = Math.floor(Math.random() * rand.length);
    rand.splice(randR[0], 1);
    randR[1] = rand[Math.floor(Math.random() * rand.length)];
    rand.splice(rand.indexOf(randR[1]), 1);
    randR.push(rand[0])
    randRe = [...randR];

    let AT = [],
        GC = [];

    let resultA = [];
    for (i of randRe) {
        switch (i) {
            case 0:
                division = ['I', 'II', 'III'];
                selectDivision = [...division][Math.floor(Math.random() * division.length)];
                division.splice(division.indexOf(selectDivision), 1);
                selectDivision2 = division[Math.floor(Math.random() * division.length)];
                division = ['I', 'II', 'III'];
                //selectDivision의 A+T, G+C 값을 구해야 함
                AT = [],
                    GC = [];
                for (i of [selectDivision, selectDivision2]) {
                    table.slice(4 * division.indexOf(i), 4 * division.indexOf(i) + 4).forEach((e, index) => {
                        if (!isNaN(e.textContent)) {
                            if (index % 2 == 0) {
                                AT[i] = Number(e.textContent) * 2;
                                GC[i] = (50 - Number(e.textContent)) * 2;
                            } else {
                                GC[i] = Number(e.textContent) * 2;
                                AT[i] = (50 - Number(e.textContent)) * 2;
                            }
                        }
                    })
                }
                resultA.push([`이중 가닥 전체에서 염기 간 수소 결합의 총 수는 ${GC[selectDivision] > GC[selectDivision2] ? selectDivision2 : selectDivision}보다 ${GC[selectDivision] > GC[selectDivision2] ? selectDivision : selectDivision2}에서 많다.`,
                `A과 T은 2중 수소 결합, G과 C은 3중 수소 결합을 하므로, G과 C의 비율이 큰 DNA일수록 수소 결합의 총 수가 많기 때문에 G와 C의 비율이 ${GC[selectDivision] > GC[selectDivision2] ? GC[selectDivision2] : GC[selectDivision]}%(${GC[selectDivision] > GC[selectDivision2] ? GC[selectDivision2] / 2 : GC[selectDivision] / 2}+${GC[selectDivision] > GC[selectDivision2] ? GC[selectDivision2] / 2 : GC[selectDivision] / 2})인 DNA ${GC[selectDivision] > GC[selectDivision2] ? selectDivision2 : selectDivision}보다 ${GC[selectDivision] > GC[selectDivision2] ? GC[selectDivision] : GC[selectDivision2]}%(${GC[selectDivision] > GC[selectDivision2] ? GC[selectDivision] / 2 : GC[selectDivision2] / 2}+${GC[selectDivision] > GC[selectDivision2] ? GC[selectDivision] / 2 : GC[selectDivision2] / 2})인 DNA ${GC[selectDivision] > GC[selectDivision2] ? selectDivision : selectDivision2}의 수소 결합 총 수가 더 많다.`]);
                break;
            case 1:
                specialCharRand = Math.floor(Math.random() * 4);

                AT = [],
                    GC = [];
                division = ['I', 'II', 'III'];
                for (i of division) {
                    table.slice(4 * division.indexOf(i), 4 * division.indexOf(i) + 4).forEach((e, index) => {
                        if (!isNaN(e.textContent)) {
                            if (index % 2 == 0) {
                                AT[i] = Number(e.textContent) * 2;
                                GC[i] = (50 - Number(e.textContent)) * 2;
                            } else {
                                GC[i] = Number(e.textContent) * 2;
                                AT[i] = (50 - Number(e.textContent)) * 2;
                            }
                        }
                    })
                }
                numFill = Array(4).fill().map((e, index) => {
                    return index;
                })
                rand = Math.floor(Math.random() * 4);
                numFill.splice(rand, 1);
                rand = [rand, numFill[Math.floor(Math.random() * numFill.length)]]
                for (i of rand) {
                    if (specialChar[i].index % 2 == 0) {
                        specialChar[i].value = AT[division[Math.floor(specialChar[i].index / 4)]] / 2
                    } else {
                        specialChar[i].value = GC[division[Math.floor(specialChar[i].index / 4)]] / 2
                    }
                }
                resultA.push([`${specialChar[rand[0]].type} + ${specialChar[rand[1]].type} = 50`,
                `${specialChar[rand[0]].type}(${specialChar[rand[0]].value}) + ${specialChar[rand[1]].type}(${specialChar[rand[1]].value}) = ${specialChar[rand[0]].value + specialChar[rand[1]].value}이다. ${specialChar[rand[0]].value + specialChar[rand[1]].value == 50 ? '정답!' : '그래서 정답이 아니다.'}`]);
                break;
            case 2:
                specialCharRand = Math.floor(Math.random() * 4);

                AT = [],
                    GC = [];
                division = ['I', 'II', 'III'];
                for (i of division) {
                    table.slice(4 * division.indexOf(i), 4 * division.indexOf(i) + 4).forEach((e, index) => {
                        if (!isNaN(e.textContent)) {
                            if (index % 2 == 0) {
                                AT[i] = Number(e.textContent) * 2;
                                GC[i] = (50 - Number(e.textContent)) * 2;
                            } else {
                                GC[i] = Number(e.textContent) * 2;
                                AT[i] = (50 - Number(e.textContent)) * 2;
                            }
                        }
                    })
                }
                numFill = Array(4).fill().map((e, index) => {
                    return index;
                })
                rand = Math.floor(Math.random() * 4);
                numFill.splice(rand, 1);
                rand = [rand, numFill[Math.floor(Math.random() * numFill.length)]]
                for (i of rand) {
                    if (specialChar[i].index % 2 == 0) {
                        specialChar[i].value = AT[division[Math.floor(specialChar[i].index / 4)]] / 2
                    } else {
                        specialChar[i].value = GC[division[Math.floor(specialChar[i].index / 4)]] / 2
                    }
                }
                randomN = Math.floor(Math.random() * 2) == 1 ? specialChar[rand[0]].value + specialChar[rand[1]].value : Math.floor(Math.random() * 2)
                resultA.push([`${specialChar[rand[0]].type} + ${specialChar[rand[1]].type} = ${randomN}`,
                `${specialChar[rand[0]].type}(${specialChar[rand[0]].value}) + ${specialChar[rand[1]].type}(${specialChar[rand[1]].value}) = ${specialChar[rand[0]].value + specialChar[rand[1]].value}이다. ${specialChar[rand[0]].value + specialChar[rand[1]].value == randomN ? '정답!' : '그래서 정답이 아니다.'}`]);
                break;

            default:
                break;
        }
    }
    document.querySelector('#container #solve > div > div > div:nth-child(1) span').textContent = resultA[0][0];
    document.querySelector('#container #solve > div > div > div:nth-child(2) span').textContent = resultA[1][0];
    document.querySelector('#container #solve > div > div > div:nth-child(3) span').textContent = resultA[2][0];
    document.querySelector('#container #solve > div > div > div:nth-child(4) > div > div:nth-child(1) span').textContent = resultA[0][1];
    document.querySelector('#container #solve > div > div > div:nth-child(4) > div > div:nth-child(2) span').textContent = resultA[1][1];
    document.querySelector('#container #solve > div > div > div:nth-child(4) > div > div:nth-child(3) span').textContent = resultA[2][1];
    console.log(resultA)
    

}