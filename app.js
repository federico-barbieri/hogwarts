"use strict";


//blood list JSON
const blood = "https://petlatkea.dk/2021/hogwarts/families.json";

function fetchBlood(){
    fetch(blood)
    .then(response => {
        if (!response.ok) {
            throw Error(response.statusText);
        }
            return response.json();
    })
    .then(families => {
        // we have the data 
       // console.log(families); 
        handleBlood(families);
    })
    .catch (e => {
        // something went wrong
        console.error("An error has occured.", e.message);
    })
}

fetchBlood();

// create halfblood array

let halfBloodArray = [];
let pureBloodArray = [];

// create function to handle the blood families

function handleBlood(families){

   
       for (let i=0; i < families.half.length; i++){

        halfBloodArray.push(families.half[i]);
       }
       

       for (let i=0; i < families.pure.length; i++){
        pureBloodArray.push(families.pure[i]);
       }
};





//student list JSON
const students = "https://petlatkea.dk/2021/hogwarts/students.json";


function fetchStudents(){
        fetch(students)
    .then(response => {
        if (!response.ok) {
            throw Error(response.statusText);
        }
            return response.json();
    })
    .then(wizards => {
        // we have the data 
       // console.log(students); 
        handleWizards(wizards);
    })
    .catch (e => {
        // something went wrong
        console.error("An error has occured.", e.message);
    })
}


fetchStudents();

// create functions for each part of the wizard

function findFirstName(element){

    let firstName = element.fullname.trimStart();
    

    // find the first white space, that's where the first name ends

    let firstSpace = firstName.indexOf(' ');
    

    // if there is a white space...

    if (firstSpace !== -1){
        firstName = firstName.slice(0,firstSpace);
        
    
    } else{
           // if it doesn't have a space it means there is no last name
        firstName = firstName;     
        
    }

    // set name to lower case

    let lowerFirstName = firstName.toLowerCase();
    
   
    // grab first letter and set it to upper case
   
    let firstNameFirstChar =  lowerFirstName.charAt(0).toUpperCase();
    

    // concat first capital letter with the rest of the lower case word 

    firstName = firstNameFirstChar.concat(lowerFirstName.slice(1));


    return firstName;
    
    
}


function findMiddleName(element){

    let middleName = element.fullname.trimStart();

    // find the first white space, that's where the first name ends

    let whiteSpace = middleName.indexOf(' ');

    // if there is a white space...

    if (whiteSpace !== -1){
        

        // cut the first name off and trim the end in case of extra white space

        middleName = middleName.slice(whiteSpace).trimStart().trimEnd();

        // find if there is another white space

        let secondWhiteSpace = middleName.indexOf(' ');

        // if there is, cut the word from 0 until that second space
        if(secondWhiteSpace !== -1){
            middleName = middleName.slice(0, secondWhiteSpace);
        } else {
            middleName = "No middlename";
        }
    
    } else{
      
           // if it doesn't have a space it means there is no middle name
        middleName = "No middlename";        
    }

    // set middlename to lower case

    let lowerMiddleName = middleName.toLowerCase();
   
    // grab first letter and set it to upper case
   
    let middleNameFirstChar =  lowerMiddleName.charAt(0).toUpperCase();

    // concat first capital letter with the rest of the lower case word 

    middleName = middleNameFirstChar.concat(lowerMiddleName.slice(1));

    if (middleName.includes('"')){
        return "This is actually a nickname"
    } else{

       
    return middleName;

    }

}


function findLastName(element){

    let lastName = element.fullname.trimStart();
    

    // find the first white space, that's where the first name ends

    let whiteSpace1 = lastName.indexOf(' ');
    

    // if there is a white space...

    if (whiteSpace1 === -1){
          // if it doesn't have a space it means there is no last name
          return "There is no last name";  
    
     } else {
   
        // cut the first name off and trim the end in case of extra white space

        lastName = lastName.slice(whiteSpace1).trimStart().trimEnd();        

        // find if there is another white space

        let whiteSpace2 = lastName.indexOf(' ');
        
        
        // if there is, cut the word from 0 until that second space
        if(whiteSpace2 === -1){
            lastName = lastName;
            

            
        } else {
            lastName = lastName.slice(whiteSpace2);
            
        }
    
    } 

    // set middlename to lower case

    let lowerLastName = lastName.trimStart().toLowerCase();
    
   
    // grab first letter and set it to upper case
   
    let lastNameFirstChar =  lowerLastName.charAt(0).toUpperCase();

    

    // concat first capital letter with the rest of the lower case word 

    lastName = lastNameFirstChar.concat(lowerLastName.slice(1));

 
    return lastName;


}


function findHouse(element){
    let firstLetter = element.house.trimStart().charAt(0).toUpperCase();
    let restOfWord = element.house.trimStart().toLowerCase().slice(1).trimEnd();

    let actualHouse = firstLetter.concat(restOfWord);

    return actualHouse;
}


// create Wizard object

const Wizard = {
    name: "",
    middleName: "",
    lastName: "",
    nickName: "",
    house: "",
    blood: "",
    isInquisitor: false,
    isPrefect: false,
    isExpelled: false,
}

// create array to store every student as an object after the fetching

let studentsBigObject = [];


// create a function that styles the future student object

function beautifyStudent(myBigArray){
    myBigArray.forEach(student => {
  
        if (student.isExpelled === false){
        // BUILD TEMPLATE
        const myTemplate = document.getElementById('my-template').content;
        const clone = myTemplate.cloneNode(true);

        // name of student
        clone.querySelector(".li-name").textContent = `Name: ${student.name}`;
        // middle name of student
        clone.querySelector(".li-middlename").textContent = `Middle name: ${student.middleName}`;
        // last name of student
        clone.querySelector(".li-lastname").textContent = `Last name: ${student.lastName}`;

        // assign student image based on name
        if(student.name === "Leanne"){
            clone.querySelector(".student-pic").src = `imgs/students/leanne.png`;
        } else{
            clone.querySelector(".student-pic").src = `imgs/students/${student.lastName.toLowerCase()}_${student.name.charAt(0).toLowerCase()}.png`;
        }

       // assign background image based on house 
        let innerCard = clone.querySelector('.inner-card').classList.add(`${student.house}-background`);

               
      

        // assign type of blood
        if (student.name === "Zacharias"){
            clone.querySelector('.li-blood').textContent = "Blood: Half";
        } else{
            clone.querySelector('.li-blood').textContent = `Blood: ${student.blood}`;
        }

        // assign school logo
        clone.querySelector('.school-logo').src = "imgs/logo/school-logo.png";

        function destroyEvt(e){
            modalShowTime(student);
            e.target.removeEventListener('click', destroyEvt);

        }

        // FUNCTION THAT OPENS MODAL
        let studentInfoBtn = clone.querySelector(".student-info-btn").addEventListener('click', destroyEvt);
           

        // grab parent and append child
        const daddy = document.querySelector('#trying');
        daddy.appendChild(clone);

    } else{
        console.log("not this one")
    }

  })       
};


// create function that handles the data from the fetching
// and pushes each student into a bigger array of objects

function handleWizards(wizards){
    wizards.forEach(wizard => {

        // create new student object
        let newStudent = Object.create(Wizard);

        // ASSIGN FIRST NAME
        newStudent.name = findFirstName(wizard);

        // ASSIGN MIDDLE NAME
        newStudent.middleName = findMiddleName(wizard);

        // ASSIGN NICK NAME
      //  newStudent.nickName = findNickName(wizard);
      //  console.log(newStudent.nickName);
    
        // ASSIGN LAST NAME
        newStudent.lastName = findLastName(wizard);

        // ASSIGN HOUSE
        newStudent.house = findHouse(wizard);

        // ASSIGN BLOOD
        if (halfBloodArray.includes(newStudent.lastName)){
            newStudent.blood = "Half";
  
        } else if (pureBloodArray.includes(newStudent.lastName) && halfBloodArray.includes(newStudent.lastName) === false){
            newStudent.blood = "Pure";
        
        } else if (newStudent.name === "Zacharias"){
            newStudent.blood = "Half";
        
        } else if (newStudent.name === "Tracey"){
            newStudent.blood = "Pure";
        
        } else if (newStudent.name === "Kevin"){
            newStudent.blood = "Half";
        }

        // PUSH EACH NEW STUDENT TO THE STUDENT'S BIG OBJECT ARRAY
        studentsBigObject.push(newStudent);

       
        
});    

        // call the function that injects design to every aspect of the student
        beautifyStudent(studentsBigObject);
    
}



        // CREATE A FUNCTION THAT HANDLES THE INQUISITOR BUTTON

        // create a global variable that handles how many inquisitors exist already

        let numOfInquisitors = 0;

              

        function inquisitorRequest(student){
            if (student.house === "Slytherin" && student.isInquisitor === false){
                numOfInquisitors++;
                student.isInquisitor = true;
                console.log(`The number of current Inquisitors is ${numOfInquisitors}. The student is now an inquisitor. Their status is ${student.isInquisitor} `);
                            
            } else if (student.blood === "Pure" && student.isInquisitor === false){
                numOfInquisitors++;
                student.isInquisitor = true;
                console.log(`The number of current Inquisitors is ${numOfInquisitors}. The student is now an inquisitor. Their status is ${student.isInquisitor} `);
                    
            } else if (student.isInquisitor === true){
                student.isInquisitor = false;
                numOfInquisitors--;
                console.log(`The student is no longer an inquisitor. Their status is ${student.isInquisitor}. The number of current Inquisitors is ${numOfInquisitors}`);
        
            } else {
                console.log(`The student cannot be an inquisitor. Their status is ${student.isInquisitor}`)}
        }

        // CREATE A FUNCTION THAT HANDLES THE PREFECTS BUTTON

        // create a global variable that handles how many prefects exist already

        let numOfPrefects = [];

        // create a function that returns the number of prefects per house

        function houseInArray(array, house){
            let thatHouse = 0;
            for (let i = 0; i<array.length;i++){
                if (array[i] === house){
                    thatHouse++;
                }
            }
            return thatHouse;
        }


        function prefectRequest(student){

            let timesInArray = houseInArray(numOfPrefects, student.house);

            if(student.isPrefect === false && timesInArray === 2){
                console.log("There can only be 2 prefects per house.")
            
            } else if (student.isPrefect === false && timesInArray !== 2){
                student.isPrefect = true;
                numOfPrefects.push(student.house);
                console.log(`Num of prefects is ${numOfPrefects.length}`);
                console.log(`${student.name} is now a prefect of ${student.house}`);
                houseInArray(numOfPrefects, student.house);
                console.log(`${student.house} has ${houseInArray(numOfPrefects, student.house)} prefects`)
            
            } else if (student.isPrefect === true){
            student.isPrefect = false;
            
            numOfPrefects.pop();
            console.log(`Num of prefects is ${numOfPrefects.length}`);
            console.log(`${student.name} is no longer a prefect of ${student.house}`);
            console.log(`${student.house} has ${houseInArray(numOfPrefects, student.house)} prefects`)

            }
    }

    // create global array of expelled students
    let expelledStudents = [];


        // create function that deals with the modal

        function modalShowTime(student){

        // grab the modal
        let articleBorn = document.querySelector("#student-modal");
        // change its display from none to block
        articleBorn.style.display = "block";
        articleBorn.style.display = "flex";

        // change font depending on the house
        articleBorn.style.fontFamily = `var(--${student.house}-font)`;

        // add background according to house
        articleBorn.classList.add(`${student.house}-background`);

        // grab and reveal the img of the student
        let modalImg = document.querySelector('.modal-pic');

        if(student.name === "Leanne"){
            modalImg.src = `imgs/students/leanne.png`;
        } else{
            modalImg.src = `imgs/students/${student.lastName.toLowerCase()}_${student.name.charAt(0).toLowerCase()}.png`;
        }


        // reveal name
        let modalStudentName = document.querySelector('.modal-student-name');
        modalStudentName.textContent = `Name: ${student.name}`;

        // reveal middle name
        let modalStudentMiddleName = document.querySelector('.modal-student-middle-name');
        modalStudentMiddleName.textContent = `Middle Name: ${student.middleName}`;

        // reveal last name
        let modalStudentLastName = document.querySelector('.modal-student-last-name');
        modalStudentLastName.textContent = `Last Name: ${student.lastName}`;

        // reveal which house it belongs to
        let modalStudentHouse = document.querySelector('.modal-student-house');
        modalStudentHouse.textContent = `House: ${student.house}`;

        // reveal type of blood
        let modalStudentBlood = document.querySelector('.modal-student-blood');
        modalStudentBlood.textContent = `Blood: ${student.blood}`;


        // if the user wants to make the student an inquisitor
        let inquisitorBtn = document.querySelector('.modal-inquisitor-btn');
    
        // change inquisitors status
        let inquisitorStatus = document.querySelector('.information-inquisitor');
        inquisitorStatus.textContent = `Is Inquisitor: ${student.isInquisitor}`;      

        if (student.isInquisitor === false){
            inquisitorBtn.textContent = "Make Inquisitor";
            inquisitorBtn.style.backgroundColor = "green";

        } else {
            inquisitorBtn.textContent = "Remove Inquisitor";
            inquisitorBtn.style.backgroundColor = "red";
        }

        // if the user wants to make the student a prefect
        let prefectBtn = document.querySelector('.modal-prefect-btn');

        // if the user wants to expell the student
        let expellBtn = document.querySelector('.modal-expell-btn');

        // change expelled status
        let expelledStatus = document.querySelector('.information-expelled');

        // what's the actual prefect status on this student when 
        // I open the modal
        let prefectStatus = document.querySelector('.information-prefect');
       prefectStatus.textContent = `Is Prefect: ${student.isPrefect}`;  

        function btnsBackToNormal(){
        expelledStatus.textContent = `Is Expelled: ${student.isExpelled}`;
        expellBtn.style.display = "block";
        expellBtn.style.backgroundColor = "green";
        expelledStatus.style.color = "black";
        expelledStatus.style.backgroundColor = "transparent";
        expelledStatus.style.padding = "0";
        inquisitorStatus.textContent = `Is Inquisitor: ${student.isInquisitor}`;
        inquisitorBtn.style.display = "block";
        inquisitorBtn.style.backgroundColor = "green";
        inquisitorStatus.style.color = "black";
        inquisitorStatus.style.backgroundColor = "transparent";
        inquisitorStatus.style.padding = "0";
        prefectStatus.textContent = `Is Prefect: ${student.isPrefect}`;
        prefectBtn.style.display = "block";
        prefectBtn.style.backgroundColor = "green";
        prefectStatus.style.color = "black";
        prefectStatus.style.backgroundColor = "transparent";
        prefectStatus.style.padding = "0";
        }

        btnsBackToNormal();


        function expellTheStudent(){

            student.isExpelled = true;
            studentsBigObject = studentsBigObject.filter((element) => element.isExpelled === false);
            expelledStatus.textContent = `Is Expelled: ${student.isExpelled}`;
            expelledStatus.style.color = "white";
            expelledStatus.style.backgroundColor = "red";
            expelledStatus.style.padding = "1rem 1.5rem";
            console.log(`Trying to expell ${student.name}`);
            expelledStudents.push(student);
            console.log(expelledStudents);
            console.log(`${student.name} ${student.lastName} has been expelled from Hogwarts`);
            expellBtn.removeEventListener('click', expellTheStudent);
            expellBtn.style.display = "none";
            prefectBtn.style.display = "none";
            inquisitorBtn.style.display = "none";
            console.log(studentsBigObject);


            // for each expelled student we remove it from the array
            // of objects, remove every child element from the dashboard
            // and recreate the new list without expelled students

            // while the dashboard has children, remove them
            // so we can display new stuff again

           
            
        }



        expellBtn.addEventListener('click', expellTheStudent);
            

        



            

        if (student.isPrefect === false){
            prefectBtn.textContent = "Make Prefect";
            prefectBtn.style.backgroundColor = "green";

        } else {
            prefectBtn.textContent = "Remove Prefect";
            prefectBtn.style.backgroundColor = "red";
        }

         // prefect function
         function prefectBtnClick() {
            console.log('Prefecting attempted')
            console.log(`clicking ${student.name} button`);

            prefectStatus.textContent = `Is Prefect: ${student.isPrefect}`;

            
            prefectRequest(student);

            prefectStatus.textContent = `Is Prefect: ${student.isPrefect}`;


            if (student.isPrefect === false){
                prefectBtn.textContent = "Make Prefect";
                prefectBtn.style.backgroundColor = "green";

            } else {
                prefectBtn.textContent = "Remove Prefect";
                prefectBtn.style.backgroundColor = "red";
            }

       

        }

        // prefect event listener
        prefectBtn.addEventListener('click', prefectBtnClick);

        
        

        // inquisitor event listener
        inquisitorBtn.addEventListener('click',inquisitorBtnClick);

        

        // inquisitor function
        function inquisitorBtnClick() {
          //  console.log('Inquisitory clicked')
          //  console.log(`clicking ${student.name} button`);

            inquisitorStatus.textContent = `Is Inquisitor: ${student.isInquisitor}`;

            // esto está perfecto no lo toques por dios
            inquisitorRequest(student);

            if (student.isInquisitor === false){
                inquisitorBtn.textContent = "Make Inquisitor";
                inquisitorBtn.style.backgroundColor = "green";

            } else {
                inquisitorBtn.textContent = "Remove Inquisitor";
                inquisitorBtn.style.backgroundColor = "red";
            }

            inquisitorStatus.textContent = `Is Inquisitor: ${student.isInquisitor}`;

        }

       

        let closeModalBtn = document.querySelector('.close-modal-btn');

        function closeModal(event){

           

            // remove event listener for the btns
            
            inquisitorBtn.removeEventListener('click', inquisitorBtnClick);
            prefectBtn.removeEventListener('click', prefectBtnClick);
            event.target.removeEventListener('click', closeModal);
            articleBorn.style.display = "none";
            
        }

   // FUNCTION THAT CLOSES MODAL

   
    closeModalBtn.addEventListener('click', closeModal);

}


// figuring out sorting

const sortAscendingBtn = document.querySelector('.sortAscending');

const sortDescendingBtn = document.querySelector('.sortDescending');

function sortStudentsDescending(event){
    
    let studentsSorted = studentsBigObject.sort((a, b) => b.name.localeCompare(a.name));
    console.log(studentsSorted);
    event.target.removeEventListener('click', sortStudentsDescending);

}

function sortStudentsAscending(event){
    
    let studentsSorted = studentsBigObject.sort((a, b) => a.name.localeCompare(b.name));
    console.log(studentsSorted);
    event.target.removeEventListener('click', sortStudentsAscending);
}

sortAscendingBtn.addEventListener('click', sortStudentsAscending);

sortDescendingBtn.addEventListener('click', sortStudentsDescending);