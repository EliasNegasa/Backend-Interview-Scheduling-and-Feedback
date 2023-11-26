const isRecruiter = (req, res, next) => {
    // Check if the authenticated user has the admin role
    if (req.user.role !== 'Recruiter') 
    {
        console.log(req.user.role)
      return res.status(401).json({ error: 'Unauthorized' });
      }

  // console.log(req.user.role)
    next();
  };

  export default isRecruiter ;