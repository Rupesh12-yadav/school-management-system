import Admin from "../models/Admin.js";
import generateToken from "../utils/generateToken.js";
  
// Generate JWT

// Register Controller
export const registerAdmin = async (req, res) => {
  const { name, email, password, role,domain } = req.body;

  try {
    const userExists = await Admin.findOne({ email });
    if(userExists) return res.status(400).json({ message: "User already exists" });

    const user = await Admin.create({ name, email, password, role,domain });

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      domain:user.domain,
      token: generateToken(user._id)
    });
  } catch(error){
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
}

// Login Controller
export const loginAdmin = async (req, res) => {
  const { email, password } = req.body;

  try {
    // 1️⃣ Find admin by email
    const user = await Admin.findOne({ email });

    // 2️⃣ Check password
    if (user && (await user.matchPassword(password))) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,                          // Admin
        token: generateToken(user._id, user.role) // Token me role include
      });
    } else {
      res.status(401).json({ message: "Invalid email or password" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Example Protected Controller
export const adminOnly = (req, res) => {
  res.json({ message: `Welcome Admin ${req.user.name}` });
}
