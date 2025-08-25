export const authorizeRole = (requiredRole) => {
  return (req, res, next) => {
    const { role } = req.user;

    if (role !== requiredRole) {
      return res.status(403).json({ message: `Access denied: Requires ${requiredRole} role` });
    }
    next();
  };
};
