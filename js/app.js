// Viewer-only single-page interactions: initialize AOS and handle video modal
(function(){
  // Initialize AOS (animations on scroll)
  if (window.AOS) AOS.init({duration:600,once:true});

  // Modal handling for intro video placeholder
  const play = document.getElementById('playVideo');
  const modal = document.getElementById('videoModal');
  const close = document.getElementById('closeModal');
  if (play && modal){
    play.addEventListener('click', ()=>{
      modal.style.display = 'flex';
    })
  }
  if (close && modal){
    close.addEventListener('click', ()=>{
      modal.style.display = 'none';
    })
  }
  // Click outside modal content closes
  if (modal){
    modal.addEventListener('click', (e)=>{
      if (e.target === modal) modal.style.display = 'none';
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
