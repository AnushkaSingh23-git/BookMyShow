const randomPage1 = Math.floor(Math.random() * 20);
const randomPage2 = Math.floor(Math.random() * 20);
const randomPage3 = Math.floor(Math.random() * 20);

// ── Reusable function to load shows ──────────────────
function loadShows(page, cardId) {
  fetch(`https://api.tvmaze.com/shows?page=${page}`)
    .then(res => res.json())
    .then(data => {
      const card = document.getElementById(cardId);
      card.innerHTML = '';

      const shuffled = data.sort(() => Math.random() - 0.5);

      shuffled.slice(0, 5).forEach(show => {
        const div = document.createElement('div');
        div.style.cssText = 'width:17%; text-align:center; cursor:pointer; margin-bottom:20px';

        const poster = show.image
          ? show.image.medium
          : 'https://via.placeholder.com/210x295?text=No+Image';

        // ✅ Fixed: optional chaining prevents crash when show.rating is null
        const rating = show.rating?.average ?? 'N/A';
        const genre  = show.genres?.[0] ?? '';

        div.innerHTML = `
          <img src="${poster}" alt="${show.name}"
            style="width:100%; border-radius:5px; margin-block:15px; transition:0.3s"
            onmouseover="this.style.transform='scale(1.05)'"
            onmouseout="this.style.transform='scale(1)'"
          >
          <p style="font-size:13px; font-weight:600">${show.name}</p>
          <p style="font-size:12px; color:green">⭐ ${rating}/10</p>
          <p style="font-size:11px; color:gray">${genre}</p>
        `;
        card.appendChild(div);
      });
    })
    .catch(() => {
      document.getElementById(cardId).innerHTML =
        '<p style="color:red; text-align:center">Failed to load.</p>';
    });
}

// ── Load all 3 sections once on page load ─────────────
loadShows(randomPage1, 'movieCard');
loadShows(randomPage2, 'eventCard');
loadShows(randomPage3, 'premiereCard');