// in1.js
document.addEventListener("DOMContentLoaded", function() {
    // Firebase 설정 및 초기화
    const firebaseConfig = {
        apiKey: "YOUR_API_KEY",
        authDomain: "YOUR_AUTH_DOMAIN",
        projectId: "YOUR_PROJECT_ID",
        storageBucket: "YOUR_STORAGE_BUCKET",
        messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
        appId: "YOUR_APP_ID"
    };

    // Firebase 초기화
    firebase.initializeApp(firebaseConfig);

    const form = document.getElementById("simja");
    const nameInput = document.getElementById("name");
    const numberInput = document.getElementById("number");
    const checkListButton = document.querySelector(".myeongdan button");
    const nameList = document.getElementById("studentList");

    const localStorageKey = "studentList_men_3rd"; // 페이지별로 다른 키 사용

    // localStorage에서 학생 명단을 가져오거나 초기화
    let studentList = JSON.parse(localStorage.getItem(localStorageKey)) || [];

    function addStudent(name, number) {
        if (studentList.length >= 5) {
            alert("명단이 가득 찼습니다.");
            return;
        }
        studentList.push({ name, number });
        localStorage.setItem(localStorageKey, JSON.stringify(studentList));
    }

    function displayStudentList() {
        nameList.innerHTML = ""; // 기존 리스트 초기화
        studentList.forEach(function(student) {
            const listItem = document.createElement("li");
            listItem.textContent = `${student.name} (${student.number})`;
            nameList.appendChild(listItem);
        });
    }

    checkListButton.addEventListener("click", function() {
        displayStudentList();
    });

    form.addEventListener("submit", function(event) {
        event.preventDefault(); // 폼 제출 방지
        const name = nameInput.value.trim();
        const number = numberInput.value.trim();

        if (name && number) {
            addStudent(name, number);
            nameInput.value = "";
            numberInput.value = "";
            displayStudentList(); // 리스트 즉시 업데이트
        } else {
            alert("이름과 학번을 모두 입력해주세요.");
        }
    });

    function resetListAtNoon() {
        const now = new Date();
        const noon = new Date();
        noon.setHours(12, 0, 0, 0);

        let timeUntilNoon = noon - now;

        if (timeUntilNoon < 0) {
            timeUntilNoon += 24 * 60 * 60 * 1000; // 다음 날 정오까지의 시간 계산
        }

        setTimeout(function() {
            studentList = [];
            localStorage.removeItem(localStorageKey);
            nameList.innerHTML = "";
            alert("명단이 초기화되었습니다.");
            resetListAtNoon(); // 다음 날 정오를 위한 초기화 예약
        }, timeUntilNoon);
    }

    // 페이지 로드 시 학생 명단 표시
    displayStudentList();

    // 매일 초기화 프로세스 시작
    resetListAtNoon();
});
