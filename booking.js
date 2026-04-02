document.addEventListener('DOMContentLoaded', () => {

  // Create Seat Modal
  const seatModal = document.createElement('div');
  seatModal.id = 'seatModal';
  seatModal.style = `
    display:none; position:fixed; top:0; left:0; width:100%; height:100%;
    background:rgba(0,0,0,0.85); justify-content:center; align-items:center; overflow-y:auto;
  `;
  seatModal.innerHTML = `
    <div style="background:white; padding:20px; border-radius:8px; max-width:500px; width:90%; position:relative;">
      <span id="closeSeatModal" style="position:absolute; top:10px; right:15px; cursor:pointer; font-size:20px;">&times;</span>
      <h3>Select Your Seats</h3>
      <div id="seatMap" style="display:grid; grid-template-columns:repeat(8, 40px); gap:5px; margin-top:15px;"></div>
      <p style="margin-top:10px;">Selected Seats: <span id="selectedSeats">0</span></p>
      <p>Total Fare: ₹<span id="totalFare">0</span></p>
      <button id="confirmBooking" style="margin-top:10px; padding:8px 12px; background:rgb(244,69,98); color:white; border:none; border-radius:4px; cursor:pointer;">Confirm Booking</button>
    </div>
  `;
  document.body.appendChild(seatModal);

  const seatMap = document.getElementById('seatMap');
  const selectedSeatsEl = document.getElementById('selectedSeats');
  const totalFareEl = document.getElementById('totalFare');

  let selectedSeats = [];
  const seatPrice = 150; // fixed fare per seat
  let seats = [];

  // Open seat modal
  document.getElementById('checkSeats').addEventListener('click', () => {
    seatModal.style.display = 'flex';
    generateSeats();
  });

  // Close seat modal
  document.getElementById('closeSeatModal').addEventListener('click', () => {
    seatModal.style.display = 'none';
    selectedSeats = [];
    updateSelection();
  });

  function generateSeats() {
    seatMap.innerHTML = '';
    seats = [];
    for(let i=1; i<=40; i++) {  // 40 seats
      const seat = document.createElement('div');
      seat.className = 'seat';
      seat.dataset.seat = i;
      // Randomly mark some seats as booked
      if(Math.random() < 0.3) seat.classList.add('booked');
      seat.style.cssText = `
        width:35px; height:35px; border:1px solid #444; border-radius:5px;
        display:flex; justify-content:center; align-items:center; cursor:pointer;
        background:${seat.classList.contains('booked') ? 'red':'lightgray'};
      `;
      seat.innerText = i;
      seatMap.appendChild(seat);
      seats.push(seat);

      seat.addEventListener('click', () => {
        if(seat.classList.contains('booked')) return;
        if(seat.classList.contains('selected')) {
          seat.classList.remove('selected');
          seat.style.background = 'lightgray';
          selectedSeats = selectedSeats.filter(s => s !== seat.dataset.seat);
        } else {
          seat.classList.add('selected');
          seat.style.background = 'green';
          selectedSeats.push(seat.dataset.seat);
        }
        updateSelection();
      });
    }
  }

  function updateSelection() {
    selectedSeatsEl.innerText = selectedSeats.join(', ') || 0;
    totalFareEl.innerText = selectedSeats.length * seatPrice;
  }

  // Book Tickets button in modal
  document.getElementById('bookTickets').addEventListener('click', () => {
    if(selectedSeats.length === 0) {
      alert('Please select seats first!');
      return;
    }
    alert(`Booking confirmed for seats: ${selectedSeats.join(', ')}\nTotal Fare: ₹${selectedSeats.length * seatPrice}`);
    // Mark selected seats as booked
    selectedSeats.forEach(s => {
      const seat = seats.find(se => se.dataset.seat === s);
      seat.classList.add('booked');
      seat.classList.remove('selected');
      seat.style.background = 'red';
    });
    selectedSeats = [];
    updateSelection();
    seatModal.style.display = 'none';
  });

});