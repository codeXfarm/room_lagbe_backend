import { User } from "../models/user.model.js";

// Get all users
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    return res.status(200).json(users);
  } catch (error) {
    return res.status(500).json({ message: "Error fetching users", error });
  }
};

// Get a single user by ID
export const getUserByEmail = async (req, res) => {
  const { userEmail } = req.params;

  try {
    const user = await User.find({ email: userEmail });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ message: "Error fetching user", error });
  }
};

// Delete a user by ID
export const deleteUserById = async (req, res) => {
  const { userId } = req.params;
  try {
    const deletedUser = await User.findByIdAndDelete(userId);

    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    return res
      .status(200)
      .json({ success: true, message: "User deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Error deleting user", error });
  }
};

// Update user role by ID
export const updateUserRole = async (req, res) => {
  const { userId } = req.params;
  const { role } = req.body;
  try {
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { role },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    return res
      .status(200)
      .json({ message: "User role updated successfully", user: updatedUser });
  } catch (error) {
    return res.status(500).json({ message: "Error updating user role", error });
  }
};


export const updateUserDisplayNamePhotoURL = async (req, res) => {
  const { userId } = req.params;
  const { displayName, photoURL } = req.body;
  try {
    if (photoURL) {
      const updatedUser = await User.findByIdAndUpdate(
        userId,
        { displayName, photoURL },
        { new: true }
      );
      if (!updatedUser) {
        return res.status(404).json({ message: "User not found" });
      }
      return res.status(200).json({
        message: "User details updated successfully",
        user: updatedUser,
      });
    } else {
      const updatedUser = await User.findByIdAndUpdate(
        userId,
        { displayName },
        { new: true }
      );
      if (!updatedUser) {
        return res.status(404).json({ message: "User not found" });
      }
      return res.status(200).json({
        message: "User details updated successfully",
        user: updatedUser,
      });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error updating user details", error });
  }
};
