// Viewer-only single-page interactions: initialize AOS and handle video modal + CV modal
(function(){
  // Initialize AOS (animations on scroll)
  if (window.AOS) AOS.init({duration:600,once:true});

  // Modal handling for intro video placeholder
  const play = document.getElementById('playVideo');
  const videoModal = document.getElementById('videoModal');
  const close = document.getElementById('closeModal');
  if (play && videoModal){
    play.addEventListener('click', ()=>{
      videoModal.style.display = 'flex';
    })
  }
  if (close && videoModal){
    close.addEventListener('click', ()=>{
      videoModal.style.display = 'none';
    })
  }
  // Click outside modal content closes
  if (videoModal){
    videoModal.addEventListener('click', (e)=>{
      if (e.target === videoModal) videoModal.style.display = 'none';
    })
  }

  // CV modal handling
  const viewCvBtn = document.getElementById('viewCvBtn');
  const cvModal = document.getElementById('cvModal');
  const closeCv = document.getElementById('closeCv');
  if (viewCvBtn && cvModal){
    viewCvBtn.addEventListener('click', ()=>{
      cvModal.style.display = 'flex';
    })
  }
  if (closeCv && cvModal){
    closeCv.addEventListener('click', ()=>{
      cvModal.style.display = 'none';
    })
  }
  if (cvModal){
    cvModal.addEventListener('click', (e)=>{
      if (e.target === cvModal) cvModal.style.display = 'none';
    })
  }

  // Populate page from localStorage if user previously saved content locally (optional)
  try{
    const raw = localStorage.getItem('eportfolio_state')
    if (raw){
      const state = JSON.parse(raw)
      if (state.fullName && document.getElementById('fullName')) document.getElementById('fullName').innerText = state.fullName
      if (state.location && document.getElementById('location')) document.getElementById('location').innerText = state.location
      if (state.profileText && document.getElementById('profileText')) document.getElementById('profileText').innerText = state.profileText
      if (state.profileImage && document.getElementById('profileImage')) document.getElementById('profileImage').src = state.profileImage
      if (state.contactEmail && document.getElementById('contactEmail')) document.getElementById('contactEmail').innerText = state.contactEmail
    }
  }catch(e){ /* ignore */ }
})();
