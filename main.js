
// ========================================
// 1. إنشاء Class باسم Student
// ========================================

class Student {

    // Private Fields: بيانات خاصة لا يتم الوصول إليها مباشرة
    #grades;
    #attendance;

    constructor(name, grades, attendance) {

        this.name = name;

        // استخدام Set لحماية الدرجات والحضور
        this.grades = grades;
        this.attendance = attendance;

    }


    // ====================================
    // حماية الدرجات باستخدام Setter
    // ====================================

    set grades(value) {

        // التأكد أن الدرجات مصفوفة بها 3 عناصر
        if (!Array.isArray(value) || value.length !== 3) {

            throw new Error("يجب إدخال درجات المواد الثلاثة.");

        }

        // التأكد من صحة كل درجة
        for (let grade of value) {

            if (grade === "" || grade === null || grade === undefined) {

                throw new Error("يجب عدم ترك أي درجة فارغة.");

            }

            if (typeof grade !== "number" || !Number.isFinite(grade)) {

                throw new Error("الدرجات يجب أن تكون أرقامًا صحيحة.");

            }

            if (grade < 0 || grade > 100) {

                throw new Error("الدرجة يجب أن تكون بين 0 و100.");

            }

        }

        // تخزين الدرجات داخل الحقل الخاص
        this.#grades = [...value];

    }


    // Getter لقراءة الدرجات بأمان
    get grades() {

        return [...this.#grades];

    }


    // ====================================
    // حماية نسبة الحضور باستخدام Setter
    // ====================================

    set attendance(value) {

        if (value === "" || value === null || value === undefined) {

            throw new Error("يجب إدخال نسبة الحضور.");

        }

        if (typeof value !== "number" || !Number.isFinite(value)) {

            throw new Error("نسبة الحضور يجب أن تكون رقمًا.");

        }

        if (value < 0 || value > 100) {

            throw new Error("نسبة الحضور يجب أن تكون بين 0 و100.");

        }

        this.#attendance = value;

    }


    // Getter لقراءة نسبة الحضور
    get attendance() {

        return this.#attendance;

    }


    // ====================================
    // 2. حساب المتوسط باستخدام reduce
    // ====================================

    calculateAverage() {

        const total = this.#grades.reduce(function(sum, grade) {

            return sum + grade;

        }, 0);

        return total / this.#grades.length;

    }


    // ====================================
    // 3. تحديد التقدير
    // ====================================

    getGrade(average) {

        if (average >= 90) {

            return "A";

        } else if (average >= 80) {

            return "B";

        } else if (average >= 70) {

            return "C";

        } else if (average >= 60) {

            return "D";

        } else if (average >= 50) {

            return "E";

        } else {

            return "F";

        }

    }


    // ====================================
    // 4. تحديد النتيجة النهائية
    // ====================================

    getFinalResult() {

        const average = this.calculateAverage();

        if (average >= 50 && this.#attendance >= 75) {

            return "ناجح";

        } else {

            return "يحتاج مراجعة";

        }

    }

}


// ========================================
// 5. إنشاء مصفوفة الطلاب الرئيسية
// ========================================

const studentsList = [];


// ========================================
// 6. الإمساك بعناصر HTML باستخدام DOM
// ========================================

const studentNameInput = document.getElementById("studentName");

const grade1Input = document.getElementById("grade1");

const grade2Input = document.getElementById("grade2");

const grade3Input = document.getElementById("grade3");

const attendanceInput = document.getElementById("attendance");

const addStudentBtn = document.getElementById("addStudentBtn");

const mercyBtn = document.getElementById("mercyBtn");

const errorBox = document.getElementById("errorBox");

const studentsListBox = document.getElementById("studentsList");

const mercyReportBox = document.getElementById("mercyReport");


// ========================================
// 7. حماية أسماء الطلاب عند عرضها في HTML
// ========================================

function escapeHTML(value) {

    return String(value).replace(/[&<>"']/g, function(character) {

        const characters = {

            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
            "'": "&#39;"

        };

        return characters[character];

    });

}


// ========================================
// 8. عرض الطلاب على الشاشة
// ========================================

function displayStudents() {

    if (studentsList.length === 0) {

        studentsListBox.innerHTML = `
            <p class="text-muted text-center">
                لم يتم إضافة أي طالب حتى الآن.
            </p>
        `;

        return;

    }

    const studentsHTML = studentsList.map(function(student, index) {

        return `
            <div class="student-item">

                <h5>الطالب رقم ${index + 1}</h5>

                <p class="mb-1">
                    <strong>الاسم:</strong>
                    ${escapeHTML(student.name)}
                </p>

                <p class="mb-1">
                    <strong>المتوسط:</strong>
                    ${student.calculateAverage().toFixed(2)}
                </p>

                <p class="mb-0">
                    <strong>النتيجة:</strong>
                    ${student.getFinalResult()}
                </p>

            </div>
        `;

    }).join("");

    studentsListBox.innerHTML = studentsHTML;

}


// ========================================
// 9. زر إضافة طالب باستخدام Try / Catch
// ========================================

addStudentBtn.onclick = function() {

    // إخفاء رسالة الخطأ القديمة
    errorBox.textContent = "";

    errorBox.classList.add("d-none");


    try {

        // قراءة الاسم
        const name = studentNameInput.value.trim();

        if (name === "") {

            throw new Error("من فضلك أدخل اسم الطالب.");

        }


        // التأكد من عدم ترك أي حقل فارغ
        const inputs = [

            grade1Input.value,
            grade2Input.value,
            grade3Input.value,
            attendanceInput.value

        ];

        if (inputs.some(value => value.trim() === "")) {

            throw new Error("من فضلك املأ جميع حقول الدرجات والحضور.");

        }


        // تحويل القيم إلى أرقام
        const grades = [

            Number(grade1Input.value),
            Number(grade2Input.value),
            Number(grade3Input.value)

        ];

        const attendance = Number(attendanceInput.value);


        // إنشاء كائن جديد من Student
        const newStudent = new Student(

            name,

            grades,

            attendance

        );


        // إضافة الطالب إلى المصفوفة
        studentsList.push(newStudent);


        // عرض الطلاب على الشاشة
        displayStudents();


        // تفريغ حقول الإدخال بعد النجاح
        studentNameInput.value = "";

        grade1Input.value = "";

        grade2Input.value = "";

        grade3Input.value = "";

        attendanceInput.value = "";


        // مسح التقرير القديم
        mercyReportBox.innerHTML = `
            <p class="text-muted text-center">
                تم إضافة طالب جديد. اضغط على تفعيل لجنة الرأفة
                لتحديث التقرير.
            </p>
        `;


        console.log("تمت إضافة الطالب بنجاح:", newStudent);


    } catch (error) {

        // التقاط الخطأ وعرضه للمستخدم
        errorBox.textContent = error.message;

        errorBox.classList.remove("d-none");

    }

};


// ========================================
// 10. تفعيل لجنة الرأفة
// ========================================

mercyBtn.onclick = function() {

    // استخراج الطلاب المتعثرين باستخدام filter
    const studentsInMercy = studentsList.filter(function(student) {

        const average = student.calculateAverage();

        return average >= 40 && average <= 49;

    });


    // إضافة 5 درجات باستخدام map
    const mercyResults = studentsInMercy.map(function(student) {

        const oldAverage = student.calculateAverage();

        const newAverage = oldAverage + 5;

        return {

            name: student.name,

            oldAverage: oldAverage,

            newAverage: newAverage

        };

    });


    // جمع المتوسطات الجديدة باستخدام reduce
    const totalNewAverages = mercyResults.reduce(function(sum, student) {

        return sum + student.newAverage;

    }, 0);


    // الحماية من القسمة على صفر
    const mercyAverage = mercyResults.length > 0

        ? totalNewAverages / mercyResults.length

        : 0;


    // تجهيز أسماء الطلاب باستخدام Template Literals
    const studentsHTML = mercyResults.map(function(student) {

        return `
            <tr>
                <td>${escapeHTML(student.name)}</td>

                <td>${student.oldAverage.toFixed(2)}</td>

                <td>${student.newAverage.toFixed(2)}</td>
            </tr>
        `;

    }).join("");


    // عرض التقرير النهائي على الشاشة
    if (mercyResults.length > 0) {

        mercyReportBox.innerHTML = `

            <div class="alert alert-success">

                <h5>تم تفعيل لجنة الرأفة بنجاح</h5>

                <p>
                    <strong>عدد الطلاب المتعثرين:</strong>
                    ${mercyResults.length}
                </p>

            </div>

            <div class="table-responsive">

                <table class="table table-bordered text-center report-table">

                    <thead>
                        <tr>
                            <th>اسم الطالب</th>
                            <th>المتوسط قبل الرأفة</th>
                            <th>المتوسط بعد الرأفة</th>
                        </tr>
                    </thead>

                    <tbody>
                        ${studentsHTML}
                    </tbody>

                </table>

            </div>

            <div class="report-summary">

                <h5>المتوسط العام بعد الرأفة</h5>

                <h3>${mercyAverage.toFixed(2)}</h3>

            </div>

        `;

    } else {

        mercyReportBox.innerHTML = `

            <div class="alert alert-warning">

                <h5>لا يوجد طلاب متعثرون</h5>

                <p class="mb-0">
                    لم يتم العثور على طلاب متوسط درجاتهم
                    بين 40 و49.
                </p>

            </div>

            <div class="report-summary">

                <h5>المتوسط العام بعد الرأفة</h5>

                <h3>0.00</h3>

            </div>

        `;

    }


    // طباعة التقرير في Console أيضًا
    console.log("نتائج لجنة الرأفة:", mercyResults);

    console.log("المتوسط العام بعد الرأفة:", mercyAverage);

};
