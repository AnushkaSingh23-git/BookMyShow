// ── Show error if redirected with ?error=1 ───────────
const params = new URLSearchParams(window.location.search);
if (params.get('error') === '1') {
  document.getElementById('errMsg').style.display = 'block';
}

// ── Basic form validation before submit ─────────────
function validateForm() {
  const email    = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value.trim();

  if (!email || !password) {
    document.getElementById('errMsg').style.display = 'block';
    document.getElementById('errMsg').textContent = 'Please fill in all fields.';
    return false; // stop form submission
  }

  if (!email.includes('@') && email.length < 10) {
    document.getElementById('errMsg').style.display = 'block';
    document.getElementById('errMsg').textContent = 'Enter a valid email or 10-digit mobile.';
    return false;
  }

  if (password.length < 6) {
    document.getElementById('errMsg').style.display = 'block';
    document.getElementById('errMsg').textContent = 'Password must be at least 6 characters.';
    return false;
  }

  return true; // allow form submission
}
