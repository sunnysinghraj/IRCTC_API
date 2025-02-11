const Booking = {
    id: 'serial primary key',
    train_id: 'integer references trains(id)',
    user_id: 'integer references users(id)',
  };
  
  export default Booking;
  