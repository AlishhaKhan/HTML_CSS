document.getElementById('generate').addEventListener('click', () => {
  const name = document.getElementById('name').value;
  const title = document.getElementById('title').value;
  const email = document.getElementById('email').value;
  const phone = document.getElementById('phone').value;
  const imageInput = document.getElementById('image-upload');

  if (imageInput.files && imageInput.files[0]) {
    const reader = new FileReader();
    reader.onload = function (e) {
      document.getElementById('profile-image').src = e.target.result;
    };
    reader.readAsDataURL(imageInput.files[0]);
  }

  const company = document.getElementById('company').value;
  const position = document.getElementById('position').value;
  const duration = document.getElementById('duration').value;

  const school = document.getElementById('school').value;
  const degree = document.getElementById('degree').value;
  const year = document.getElementById('year').value;

  const skills = document.getElementById('skills').value;

  // Set preview content
  document.getElementById('preview-name').innerText = name || 'Full Name';
  document.getElementById('preview-title').innerText = title || 'Job Title';
  document.getElementById('preview-email').innerText = email || 'Email';
  document.getElementById('preview-phone').innerText = phone || 'Phone Number';

  document.getElementById('preview-company').innerText = company ? `Company: ${company}` : '';
  document.getElementById('preview-position').innerText = position ? `Position: ${position}` : '';
  document.getElementById('preview-duration').innerText = duration ? `Duration: ${duration}` : '';

  document.getElementById('preview-school').innerText = school ? `School: ${school}` : '';
  document.getElementById('preview-degree').innerText = degree ? `Degree: ${degree}` : '';
  document.getElementById('preview-year').innerText = year ? `Year: ${year}` : '';

  document.getElementById('preview-skills').innerText = skills ? `Skills: ${skills}` : '';
});

document.getElementById('download-pdf').addEventListener('click', () => {
  const resume = document.getElementById('resume-preview');
  const options = {
    margin: 0.5,
    filename: 'resume.pdf',
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { scale: 2 },
    jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
  };

  html2pdf().set(options).from(resume).save();
});
