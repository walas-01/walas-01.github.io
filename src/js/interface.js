import {checkIfIsRawMaterial} from "./fetcher.js"


export async function addInputOption(name, showName) { // --------------------------- addInputOption
    const option = document.createElement("option")
    option.value = name
    option.innerText = showName
    form.querySelector("#inItem").appendChild(option)
}


 // ----------------------------------------------------------------------------------------------- [createItemCard]

export async function createItemCard(item, output) {
    const productRate = Number((output / item.outPerMin[0].amountPerMin).toFixed(1))

    const divCard = document.createElement("div")

    let mayBeButton = ``

    if(checkIfIsRawMaterial(item.inPerMin[0].name)){
        mayBeButton = `<button class="button">[ + ]</button>`
    }

    // to get before creating
    const machineIcon = await getMachineIcon(item.machine)
    //-----

    const html = `
    <li>
        <div class="card" name="${item.name}">
            <div class="card-img">
                <h5>${item.showName}</h5>
                <img  class="card-img-icon" src="${item.img}" alt="${item.name}">
            </div>
            <div class="card-output">
                <img src="/src/imgs/icons/icon_out.png" alt="outputIcon">
                <h5>${output.toFixed(1)}</h5>
                <p>/min</p>
            </div>
            <div class="card-machine">
                <img src="${machineIcon}" alt="${item.machine}">
                <p>${productRate}</p>
            </div>
            ${mayBeButton}
        </div>
    </li>
    `
    divCard.innerHTML = html

    const tree = document.querySelector(".itemCard-container")

    tree.appendChild(divCard)
}

 // ----------------------------------------------------------------------------------------------- [createChildCard]


export async function createChildCard(item, output) {
    const productRate = Number((output / item.outPerMin[0].amountPerMin).toFixed(1))

    const divCard = document.createElement("div")

    let mayBeButton = ``


    if(checkIfIsRawMaterial(item.inPerMin[0].name)){
        mayBeButton = `<button class="button">[ + ]</button>`
    }

    // to get before creating
    const machineIcon = await getMachineIcon(item.machine)
    //-----


    const html = `
    <li>
        <div class="card" name="${item.name}">
            <div class="card-img">
                <h5>${item.showName}</h5>
                <img  class="card-img-icon" src="${item.img}" alt="${item.name}">
            </div>
            <div class="card-output">
                <img src="/src/imgs/icons/icon_out.png" alt="outputIcon">
                <h5>${output.toFixed(1)}</h5>
                <p>/min</p>
            </div>
            <div class="card-machine">
                <img src="${machineIcon}" alt="${item.machine}">
                <p>${productRate}</p>
            </div>
            ${mayBeButton}
        </div>
    </li>
    `
    divCard.innerHTML = html

    /// return divCard
    return divCard
}



async function getMachineIcon(machineName){ // ---------------------- getMachineIcon
    const data = await fetch("/src/data/machines.json")
    const machineList = await data.json()
    const machine = machineList.find(mch => mch.name === machineName)
    return machine.img
}