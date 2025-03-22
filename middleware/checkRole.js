const checkRole = (allowedRoles) => {
    return (req, res, next ) => {
        if(!req.user){
            return res.status(401).json({
                success: false,
                message: 'User not authenticated'
            });
        }
        const userRole = req.user.role_id;
        if(Array.isArray(allowedRoles) ? allowedRoles.includes(userRole) : userRole === allowedRoles){
            next();
        }else{
            return res.status(403).json({
                success: false,
                message: 'User not authorized'
            });
        }
    }
}
module.exports = checkRole;