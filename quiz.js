document.addEventListener("DOMContentLoaded", function () {
    fetch('quizJSON.json')
        .then(response => response.json())
        .then(data => {
            const dataDisplay = document.getElementById("dataDisplay");

            // Create HTML elements to display the JSON data

            let idCounter =0;
            

            for (var q = 0; q < data.quizData.length; q++) 
            {
                const optionsElement = document.createElement("p");
                const questionElement = document.createElement("p");
                const wrapperElement = document.createElement("div");

               
                questionElement.textContent = "Questions " + (q+1)+":" + data.quizData[q].question;
                

                for (var j = 0; j < data.quizData[q].options.length; j++) {
                    
                    //idCounter%3 translate to the answer array

                    // Create a label and a radio button for each option
                    const label = document.createElement("label");
                    const radioButton = document.createElement("input");
                    radioButton.type = "radio";
                    radioButton.name = "question" + q;  // Grouping radio buttons by question number
                    radioButton.id = String(q)+":"+ idCounter;
                    radioButton.value = (data.quizData[q].options[j]);

                    // Set the label text to the option
                    label.appendChild(radioButton);
                    label.appendChild(document.createTextNode(data.quizData[q].options[j]));

                    //Append the label (containing the radio button and option text) to the optionsElement
                    optionsElement.appendChild(label);
                    optionsElement.appendChild(document.createElement("br")); // Line break after each option
                    idCounter++;
                }
                
                //const answerElement = document.createElement("p");
                //answerElement.textContent = data.quizData[q].options[data.quizData[q].answerIndex];

                // Append the elements to the "dataDisplay" div
                    let optionText="Option:";
                    wrapperElement.appendChild(questionElement);
                    wrapperElement.appendChild(optionsElement);
                    //wrapperElement.appendChild(answerElement);
                    wrapperElement.appendChild(document.createElement("hr"));
                    idCounter=0;

                dataDisplay.appendChild(wrapperElement);
            }
            document.getElementById("submitButton").addEventListener("click", submitButton); 

            function submitButton() 
            {
                let counterChecked=0;
                let correct=0;
                let correctQuestions=[];

                for (var t = 0; t < q; t++) 
                {
                    let checkRadio = document.querySelector
                    (
                        `input[name="question${t}"]:checked`
                    );
                    
             
                    if(checkRadio != null) 
                    {
                        
                        counterChecked++;
                        console.log(checkRadio.value);
                        console.log(data.quizData[t].options[data.quizData[t].answerIndex]);


                        if (checkRadio.value == data.quizData[t].options[data.quizData[t].answerIndex])
                        {
                            correct++;
                           
                            correctQuestions.push(checkRadio.name);
                            console.log(correctQuestions);

                        } //0

                    }

                   



                }

                if (correctQuestions.length > 0)
                 {
                    for (var r = 0; r < correctQuestions.length; r++)
                     {
                        let correctRadios = document.getElementsByName(correctQuestions[r]);
                        correctRadios.forEach(radio => 
                        {
                            // Apply style to the parent label of the radio button
                            radio.parentElement.parentElement.parentElement.style.backgroundColor = "lime";
                        });
                    }
                }

                // Now, highlight incorrect or unselected answers in red
                for (var t = 0; t < data.quizData.length; t++)
                {
                    let allRadios = document.getElementsByName(`question${t}`);
                    allRadios.forEach(radio => 
                    {
                        if (!correctQuestions.includes(radio.name)) 
                        {
                            // Set the background color of unselected/incorrect radio buttons to red
                            radio.parentElement.parentElement.parentElement.style.backgroundColor = "red";
                        }
                    });
                }

                console.log(counterChecked);
                console.log(q-counterChecked);
                console.log(correct);
                
            }
        })

    .catch(error => console.error("Error fetching JSON data:", error));
});