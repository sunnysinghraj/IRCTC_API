const checkAdmin = (req, res, next) => {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied, admin privileges required.' });
    }
    next();
  };
  
  export default checkAdmin;
  