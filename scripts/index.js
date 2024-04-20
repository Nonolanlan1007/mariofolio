const emailRegex = new RegExp(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/)

function sendEmail () {
    const button = document.querySelector("#contactSubmitInput")
    const email = document.querySelector("#contactEmailInput")
    if (!email.value || !emailRegex.test(email.value)) return alert("Adresse email invalide !")

    if (email.value === "mario.supermariobrosplumbing@gmail.com") {
        const mario = document.querySelector("#footerPipeLarge")
        if (mario) mario.classList.add("frozen")
        const foundEasterEggs = localStorage.getItem("easterEggs") ? JSON.parse(localStorage.getItem("easterEggs")) : null
        if (foundEasterEggs && !foundEasterEggs.find(e => e === "email")) localStorage.setItem("easterEggs", JSON.stringify([...foundEasterEggs, "email"]))
        else if (!foundEasterEggs) localStorage.setItem("easterEggs", '["email"]')
        updateEasterEggs()
        return
    } else {
        const mario = document.querySelector("#footerPipeLarge")
        if (mario) mario.classList.remove("frozen")
    }

    const content = document.querySelector("#contactContentInput")
    if (!content.value) return alert("Veuillez ajouter un message.")

    button.disabled = true
    fetch("http://135.125.59.195:3000/send-mail", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ email: email.value })
    }).then((res) => {
        if (!res.ok) alert("Une erreur est survenue")
        else alert("Votre demande de contact a bien été prise en compte.\nVous allez recevoir un mail de confirmation dans les minutes à venir.")
        button.disabled = false
    }).catch((res) => {
        if (!res.ok) alert("Une erreur est survenue")
        else alert("Votre demande de contact a bien été prise en compte.\nVous allez recevoir un mail de confirmation dans les minutes à venir.")
        button.disabled = false
    })
}

function avatarClicked () {
    const audio = document.querySelector("#itsmemario")
    if (audio) audio.play()
    const foundEasterEggs = localStorage.getItem("easterEggs") ? JSON.parse(localStorage.getItem("easterEggs")) : null
    if (foundEasterEggs && !foundEasterEggs.find(e => e === "avatar_click")) localStorage.setItem("easterEggs", JSON.stringify([...foundEasterEggs, "avatar_click"]))
    else if (!foundEasterEggs) localStorage.setItem("easterEggs", '["avatar_click"]')
    updateEasterEggs()
}

function updateEasterEggs () {
    const allEasterEggs = 4;
    const allCount = document.querySelector("#easterEggsLength")
    allCount.innerText = allEasterEggs
    const foundEasterEggs = localStorage.getItem("easterEggs") ? JSON.parse(localStorage.getItem("easterEggs")) : null
    if (foundEasterEggs) {
        const foundCounter = document.querySelector("#foundEasterEggsLength")
        foundCounter.innerText = foundEasterEggs.length
    }
}

function handleHeartEgg () {
    const foundEasterEggs = localStorage.getItem("easterEggs") ? JSON.parse(localStorage.getItem("easterEggs")) : null
    if (foundEasterEggs && !foundEasterEggs.find(e => e === "heart_hover")) localStorage.setItem("easterEggs", JSON.stringify([...foundEasterEggs, "heart_hover"]))
    else if (!foundEasterEggs) localStorage.setItem("easterEggs", '["heart_hover"]')
    updateEasterEggs()
}

function startTruckAnimation () {
    const truck = document.querySelector("#smbpTruck")
    if (truck) {
        truck.classList.add("animate")
        setTimeout(() => truck.classList.remove("animate"), 4000)
    }
    const foundEasterEggs = localStorage.getItem("easterEggs") ? JSON.parse(localStorage.getItem("easterEggs")) : null
    if (foundEasterEggs && !foundEasterEggs.find(e => e === "truck")) localStorage.setItem("easterEggs", JSON.stringify([...foundEasterEggs, "truck"]))
    else if (!foundEasterEggs) localStorage.setItem("easterEggs", '["truck"]')
    updateEasterEggs()
}

updateEasterEggs()
