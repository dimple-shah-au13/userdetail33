const loginBtn = document.querySelector('.login');
const logoutBtn = document.querySelector('.logout');
const signUpBtn = document.querySelector('.signup');

if (logoutBtn) {
  logoutBtn.addEventListener('click', function () {
    logout();
  });
}

if (signUpBtn) {
  signUpBtn.addEventListener('submit', (e) => {
    e.preventDefault();
    // const name = document.getElementById('s-name').value;
    // const email = document.getElementById('s-email').value;
    // const password = document.getElementById('s-password').value;
    // const passwordConfirm = document.getElementById('s-password-confirm').value;
    // const file = document.getElementById('photo').files[0];
    // const about = document.getElementById('s-about').value;

    const form = new FormData();
    form.append('name', document.getElementById('s-name').value);
    form.append('email', document.getElementById('s-email').value);

    form.append('password', document.getElementById('s-password').value);
    form.append(
      'passwordConfirm',
      document.getElementById('s-password-confirm').value
    );
    form.append('about', document.getElementById('s-about').value);
    form.append('photo', document.getElementById('photo').files[0]);
    console.log(form);
    signup(form);
  });
}
if (loginBtn) {
  loginBtn.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    login(email, password);
  });
}

const login = async (email, password) => {
  try {
    const res = await axios({
      method: 'POST',
      url: 'http://localhost:3000/api/v1/users/login',
      data: {
        email,
        password,
      },
    });

    if (res.data.status === 'Success') {
      window.setTimeout(() => {
        location.assign('/profile');
      }, 100);
    }
  } catch (err) {
    alert('invalid username or password');
  }
};

const signup = async (data) => {
  try {
    const res = await axios({
      method: 'POST',
      url: 'http://localhost:3000/api/v1/users/signup',
      data,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    console.log(res);

    if (res.data.status === 'Success') {
      window.setTimeout(() => {
        location.assign('/profile');
      }, 100);
    }
  } catch (err) {
    alert(err);
  }
};

const logout = async (id) => {
  try {
    const res = await axios({
      method: 'GET',
      url: `http://localhost:3000/api/v1/users/logout`,
    });
    console.log(res);

    if (res.data.status === 'Success') {
      console.log('logged outtttttt');
      window.setTimeout(() => {
        location.assign('/login');
      }, 1000);
    }
  } catch (err) {
    alert('Unable to LogOut');
  }
};