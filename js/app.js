// Viewer-only loader: populate page from localStorage if present, but do not expose any editing UI.
(function(){
  const defaultState = {
    profileImage: '',
    fullName: 'MASFIQUE AHMED',
    location: 'Dhaka, Bangladesh',
    profileText: `An ambitious and highly organized final-year Computer Science & Engineering student at American International University-Bangladesh (AIUB). Combines robust theoretical knowledge in object-oriented programming (C#, Java) and normalized database architecture (MySQL) with distinct real-world practical operations. Demonstrates comprehensive expertise in managing real-time data integrity, server-side parameter tracking, and active API integrations during premier competitive events. Eager to bring precise data modeling, backend programming skills, and a strong problem-solving mindset to the team at Paradise Auto Service.`,
    summaryList: ['Final-year CSE student (AIUB)','C#, Java, MySQL, API integrations','Backend & data modeling focus'],
    edu1img:'', edu2img:'', edu3img:'',
    projImgs:{ '1':'','2':'','3':'' },
    contactImg:'', contactEmail:'you@example.com', contactPhone:'+880-1xx-xxxxxxx', contactLocation:'Dhaka, Bangladesh'
  }

  function loadState(){
    try{
      const raw = localStorage.getItem('eportfolio_state')
      return raw ? JSON.parse(raw) : defaultState
    }catch(e){
      return defaultState
    }
  }
  const state = loadState()
  function qs(id){ return document.getElementById(id) }

  // Populate fields (viewer-only)
  if (qs('fullName')) qs('fullName').innerText = state.fullName
  if (qs('location')) qs('location').innerText = state.location
  if (qs('profileText')) qs('profileText').innerText = state.profileText
  if (qs('profileImage') && state.profileImage) qs('profileImage').src = state.profileImage
  if (qs('footerName')) qs('footerName').innerText = state.fullName

  if (qs('edu1-img') && state.edu1img) qs('edu1-img').src = state.edu1img
  if (qs('edu2-img') && state.edu2img) qs('edu2-img').src = state.edu2img
  if (qs('edu3-img') && state.edu3img) qs('edu3-img').src = state.edu3img

  for (let id of ['1','2','3']){
    const el = qs('proj-img-'+id)
    if (el && state.projImgs && state.projImgs[id]) el.src = state.projImgs[id]
  }

  if (qs('contact-img') && state.contactImg) qs('contact-img').src = state.contactImg
  if (qs('contactEmail')) qs('contactEmail').innerText = state.contactEmail
  if (qs('contactPhone')) qs('contactPhone').innerText = state.contactPhone
  if (qs('contactLocation')) qs('contactLocation').innerText = state.contactLocation
})();
