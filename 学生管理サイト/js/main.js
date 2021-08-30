let studentList = [];
//Function : lấy danh sách sinh viên từ backend
const fetchStudents = () => {
  axios({
    url: "http://svcy.myclass.vn/api/SinhVien/LayDanhSachSinhVien",
    method: "GET",
  })
    .then((res) => {
      studentList = res.data;
      renderStudents();
    })
    .catch((err) => {
      console.log(err);
    });
};

//function : hiển thị danh sách sinh viên ra màn hình
const renderStudents = () => {
  
  let htmlContent = "";
  for (let student of studentList) {
    htmlContent += `
    <tr>
         <td>${student.MaSV}</td>
         <td>${student.HoTen}</td>
         <td>${student.Email}</td>
         <td>${student.SoDT}</td>
         <td>${student.DiemToan}</td>
         <td>${student.DiemLy}</td>
         <td>${student.DiemHoa}</td>
          <td>
            <button class="btn btn-danger" onclick="deleteStudent('${student.MaSV}')">解消</button>
            <button class="btn btn-info" onclick="getStudent('${student.MaSV}')">修正</button>
          </td>
     </tr>`;
    console.log(student, htmlContent);
  }
  console.log(htmlContent);
  document.getElementById("tableDanhSach").innerHTML = htmlContent;
};

const addStudent = () => {
  const studentId = document.getElementById("id").value;
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const phone = document.getElementById("phone").value;
  const idCard = document.getElementById("idCard").value;
  const math = document.getElementById("math").value;
  const physics = document.getElementById("physics").value;
  const chemistry = document.getElementById("chemistry").value;

  const newStudent = new Student(
    studentId,
    name,
    email,
    phone,
    idCard,
    math,
    physics,
    chemistry
  );

  axios({
    url: "http://svcy.myclass.vn/api/SinhVien/ThemSinhVien",
    method: "POST",
    data: newStudent,
  })
    .then((res) => {
      //fetch danh sách student mới
      fetchStudents();
    })
    .catch((err) => {
      console.log(err);
    });
};

const deleteStudent = (id) => {
  axios({
    url: `http://svcy.myclass.vn/api/SinhVien/XoaSinhVien/${id}`,
    method: "DELETE",
  })
    .then((res) => {
      fetchStudents();
    })
    .catch((err) => {
      console.log(err);
    });
};

const getStudent = (id) => {
  axios({
    url: `http://svcy.myclass.vn/api/SinhVien/LayThongTinSinhVien/${id}`,
    method: "GET",
  })
    .then((res) => {
      console.log(res);

      document.getElementById("btnThem").click();

      document.getElementById("id").value = res.data.MaSV;
      document.getElementById("name").value = res.data.HoTen;
      document.getElementById("email").value = res.data.Email;
      document.getElementById("phone").value = res.data.SoDT;
      document.getElementById("idCard").value = res.data.CMND;
      document.getElementById("math").value = res.data.DiemToan;
      document.getElementById("physics").value = res.data.DiemLy;
      document.getElementById("chemistry").value = res.data.DiemHoa;

      document.getElementById("id").setAttribute("disabled", true);
    })
    .catch((err) => {
      console.log(err);
    });
};

const updateStudent = () => {
  const studentId = document.getElementById("id").value;
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const phone = document.getElementById("phone").value;
  const idCard = document.getElementById("idCard").value;
  const math = document.getElementById("math").value;
  const physics = document.getElementById("physics").value;
  const chemistry = document.getElementById("chemistry").value;

  const updatedStudent = new Student(
    studentId,
    name,
    email,
    phone,
    idCard,
    math,
    physics,
    chemistry
  );

  axios({
    url: "http://svcy.myclass.vn/api/SinhVien/CapNhatThongTinSinhVien",
    method: "PUT",
    data: updatedStudent,
  })
    .then((res) => {
      //clear form
      document.getElementById("btnReset").click();

      //ẩn popup
      document.getElementById("btnClose").click();

      //mở khóa ô input id
      document.getElementById("id").removeAttribute("disabled");

      //fetch danh sách student mới
      fetchStudents();
    })
    .catch((err) => {
      console.log(err);
    });
};

fetchStudents();
