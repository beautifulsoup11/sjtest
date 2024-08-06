document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById("simja");
    const nameInput = document.getElementById("name");
    const numberInput = document.getElementById("number");
    const checkListButton = document.querySelector(".myeongdan button");
    const nameList = document.querySelector("ul");

    // Firebase 데이터베이스 참조
    const studentsRef = firebase.database().ref('students');

    function addStudent(name, number) {
        if (name && number) {
            studentsRef.push({ name, number })
                .then(() => {
                    nameInput.value = "";
                    numberInput.value = "";
                    displayStudentList();
                })
                .catch(error => console.error("Error adding student:", error));
        } else {
            alert("이름과 학번을 모두 입력해주세요.");
        }
    }

    function displayStudentList() {
        studentsRef.once('value')
            .then(snapshot => {
                nameList.innerHTML = "";
                snapshot.forEach(childSnapshot => {
                    const student = childSnapshot.val();
                    const listItem = document.createElement("li");
                    listItem.textContent = `${student.name} (${student.number})`;
                    nameList.appendChild(listItem);
                });
            })
            .catch(error => console.error("Error fetching student list:", error));
    }

    checkListButton.addEventListener("click", function() {
        displayStudentList();
    });

    form.addEventListener("submit", function(event) {
        event.preventDefault(); // Prevent form submission
        const name = nameInput.value.trim();
        const number = numberInput.value.trim();
        addStudent(name, number);
    });

    displayStudentList(); // Display list on page load
});
