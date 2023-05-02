const API_KEY = "sk-YOUR-API-KEY";
const API_URL = "https://api.openai.com/v1/chat/completions";

const promptInput = document.getElementById("promptInput")
const generateBtn = document.getElementById("generateBtn")
const stopBtn = document.getElementById("stopBtn")
const resultText = document.getElementById("resultText")
const copyTextBtn = document.getElementById("copyTextBtn")



const generate = async () => {
    debugger
    if (!promptInput.value) {
        alert('Please enter a prompt');
        return
    }
    generateBtn.disabled = true;
    resultText.innerHTML = "Your response is generating...";

    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${API_KEY}`
            },
            body: JSON.stringify({
                model: "gpt-3.5-turbo",
                messages: [{ role: "user", content: promptInput.value }]
            })
        })

        const data = await response.json();
        console.log(data);
        resultText.innerHTML = data.choices[0].message.content;
    } catch (error) {
        resultText.innerHTML = 'Error cccured while generating';
        console.error("Error: ", error);
    }
    finally {
        generateBtn.disabled = false
        copyTextBtn.disabled = false;
    }
}


generateBtn.addEventListener("click", generate);
promptInput.addEventListener("keyup", (event) => {
    if (event.key === 'Enter') {
        generate();
    }
});

if (resultText.innerHTML.trim() === '') {
    debugger
    copyTextBtn.disabled = true;
    
}
const copyToClipboard = async  (text) => {
    debugger
    if (!text.trim()) {
        return;
    } 
    // resultText.select();
    // resultText.setSelectionRange(0, 99999);

   await navigator.clipboard.writeText(text).then(() => alert(text)).
    catch((err) => {
        console.error('Failed to Copy.. ', err);
    })

}
copyTextBtn.addEventListener('click', function () {
    copyToClipboard(resultText.innerHTML);
});
// stopBtn.addEventListener("click", stop);