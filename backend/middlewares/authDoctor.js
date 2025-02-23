import jwt from 'jsonwebtoken';

// Doctor auth middleware
const authDoctor = async (req, res, next) => {
  try {
    const dToken = req.headers['dtoken']; 
    if (!dToken) {
      return res.json({ success: false, message: 'Access Denied' });
    }
    const dToken_decode = jwt.verify(dToken, process.env.JWT_SECRET);
    req.body.docId = dToken_decode.id;
    next();
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export default authDoctor;
