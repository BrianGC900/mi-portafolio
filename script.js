function addRecommendation() {
    // Get the message of the new recommendation
    let recommendation = document.getElementById("new_recommendation");
    // If the user has left a recommendation, display a pop-up
    if (recommendation.value != null && recommendation.value.trim() != "") {
      console.log("New recommendation added");
      //Call showPopup here
      showPopup(true);
      // Create a new 'recommendation' element and set it's value to the user's message
      var element = document.createElement("div");
      element.setAttribute("class","recommendation");
      element.innerHTML = "\<span\>&#8220;\</span\>" + recommendation.value + "\<span\>&#8221;\</span\>";
      // Add this element to the end of the list of recommendations
      document.getElementById("all_recommendations").appendChild(element); 
      
      // Reset the value of the textarea
      recommendation.value = "";
    }
  }
  
  function showPopup(bool) {
    if (bool) {
      document.getElementById('popup').style.visibility = 'visible'
    } else {
      document.getElementById('popup').style.visibility = 'hidden'
    }
  }

// Función para traducir un nodo de texto
async function translateText(text, targetLanguage) {
  const apiKey = 'AIzaSyA5wql9qxaBOMaZhC6Ix4A_WsFz-Yi-XUU'; // Coloca aquí tu API key
  const url = `https://translation.googleapis.com/language/translate/v2?key=${apiKey}`;
  
  const response = await fetch(url, {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({
          q: text,
          target: targetLanguage
      })
  });

  const data = await response.json();
  if (data.data && data.data.translations) {
      return data.data.translations[0].translatedText;
  } else {
      console.error('Translation error:', data);
      return text; // Retorna el texto original si hay un error
  }
}

// Función para traducir el contenido de todo el body
async function translateBodyContent(language) {
  // Obtén todos los nodos de texto en el body
  const elements = document.body.getElementsByTagName("*");

  for (let element of elements) {
      // Si el elemento tiene nodos de texto, traducir el contenido
      for (let node of element.childNodes) {
          if (node.nodeType === Node.TEXT_NODE && node.nodeValue.trim() !== "") {
              const translatedText = await translateText(node.nodeValue, language);
              node.nodeValue = translatedText; // Actualiza el texto traducido
          }
      }
  }
}

// Detecta el cambio de idioma en el selector
function onLanguageChange() {
  const selectedLanguage = document.getElementById('languageSelector').value;
  translateBodyContent(selectedLanguage);
}

  